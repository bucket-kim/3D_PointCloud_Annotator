#!/bin/bash
#
# run_premarket_scan.sh — guarded runner for the premarket gappers scan.
#
# Invoked by the launchd agent com.brian.premarket-gappers at 8:30 ET on
# weekdays. If the Mac was asleep at 8:30, launchd runs this once on wake;
# the guards below decide whether a catch-up scan is still appropriate.
#
# Guards:
#   - weekday only (Mon-Fri, New York calendar)
#   - before market close (skip once NY time >= 16:00 -> data is stale)
#   - run at most once per day (skip if today's output file already exists)
#
set -uo pipefail

PROJECT_DIR="/Users/briankim/Documents/GitHub/3D_PointCloud_Annotator"
SPEC="${PROJECT_DIR}/premarket_gappers.json"
LOG="${HOME}/Library/Logs/premarket-gappers.log"
CLAUDE="/usr/local/bin/claude"
JQ="/usr/bin/jq"

cd "$PROJECT_DIR" || exit 1

# All date logic is anchored to the New York calendar regardless of system tz.
NY_DATE="$(TZ=America/New_York date +%F)"        # YYYY-MM-DD
NY_DOW="$(TZ=America/New_York date +%u)"          # 1=Mon .. 7=Sun
NY_HHMM="$(TZ=America/New_York date +%H%M)"       # e.g. 0830, 1535
OUT="${PROJECT_DIR}/premarket_gappers_${NY_DATE}.json"

log() { echo "[$(TZ=America/New_York date '+%F %H:%M:%S %Z')] $*" >> "$LOG"; }

# --- guard: weekday only ----------------------------------------------------
if [ "$NY_DOW" -gt 5 ]; then
  log "SKIP weekend (NY day-of-week=$NY_DOW)"
  exit 0
fi

# --- guard: already ran today -----------------------------------------------
if [ -f "$OUT" ]; then
  log "SKIP already ran today (found $OUT)"
  exit 0
fi

# --- guard: data stale (at/after market close 16:00 ET) ---------------------
if [ "$((10#$NY_HHMM))" -ge 1600 ]; then
  log "SKIP premarket data stale (NY time ${NY_HHMM} >= market close 1600)"
  exit 0
fi

# --- run the scan -----------------------------------------------------------
log "RUN scan for ${NY_DATE} (NY time ${NY_HHMM})"
SCANNED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [ ! -f "$SPEC" ]; then log "ERROR spec not found: $SPEC"; exit 1; fi
SPEC_JSON="$(cat "$SPEC")"

PROMPT="You are running a stock scan defined by this JSON spec:

${SPEC_JSON}

Execute it exactly: WebFetch the data_source.url and parse the listed fields; apply every filter; sort and limit per ranking; then for each surviving ticker WebFetch news_catalyst.url_template (substituting the ticker) using news_catalyst.prompt_template verbatim, and honor news_catalyst.on_failure (set catalyst=null and headlines=[] when the fetch fails OR there is no ticker-specific catalyst). Build the result per output.schema. Use scanned_at=\"${SCANNED_AT}\". Output ONLY the final JSON object — no prose, no code fences."

ENVELOPE="$($CLAUDE -p "$PROMPT" --allowedTools WebFetch --output-format json 2>>"$LOG")"

if [ -z "$ENVELOPE" ]; then
  log "ERROR no response from claude (timeout/crash)"
  exit 1
fi
if printf '%s' "$ENVELOPE" | $JQ -e '.is_error == true' >/dev/null 2>&1; then
  log "ERROR claude call failed: $(printf '%s' "$ENVELOPE" | $JQ -r '.result // "unknown"')"
  exit 1
fi

RESULT="$(printf '%s' "$ENVELOPE" | $JQ -r '.result // empty' | sed '/^```/d')"

# Validate before writing so a bad response never clobbers a good file.
if ! printf '%s' "$RESULT" | $JQ -e '.gappers | type == "array"' >/dev/null 2>&1; then
  log "ERROR result was not valid scan JSON; not writing $OUT"
  exit 1
fi

printf '%s\n' "$RESULT" > "$OUT"
N="$(printf '%s' "$RESULT" | $JQ '.gappers | length')"
TOP="$(printf '%s' "$RESULT" | $JQ -r '.gappers[0:3] | map("\(.symbol) (\(.gap_pct)%) — \(.catalyst // "no catalyst")") | join(", ")')"
log "DONE saved $OUT — Premarket Gappers: ${N} names. Top: ${TOP}"
exit 0
