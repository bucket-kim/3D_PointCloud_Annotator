import styled from "styled-components";

export const AnnotationPanelStyleContainer = styled.div`
    position: absolute;
    right: 0;
    width: 24rem;
    height: 100vh;
    box-sizing: border-box;
    /* padding: 1rem; */
    border-left: 1px solid #272d38;
    background-color: #0F121A;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .file-panel-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid #272d38;
        padding: 1.5rem;
        h3 {
            text-transform: uppercase;
            color: #6D7278;
        }
        .file-conatiner {
            background-color: #131921;
            padding: 1rem;
            border-radius: 0.5rem;
            border: #272d38 1px solid;
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }
    }

    .stat-panel-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid #272d38;
        padding: 1.5rem;
        .title {
            h3 {
                text-transform: uppercase;
                color: #6D7278;
            }
        }
        .data-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            .data-label {
                padding: 1rem;
                border-radius: 0.5rem;
                border: #272d38 1px solid;
                display: flex;
                flex-direction: column;
                gap: .5rem;
                p {
                     color: #6D7278;
                }
            }
        }
    }
    
    .save-panel-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid #272d38;
        padding: 1.5rem;
        .title {
            h3 {
                text-transform: uppercase;
                color: #6D7278;
            }
        }

        label {
            color: #6D7278;
        }

        input {
            background-color: transparent;
            padding: 1rem;
            border-radius: 0.5rem;
            border: #272d38 1px solid;
            color: white;
        }

        span {
            color: #43954E;
        }
    }

    .result-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* border-bottom: 1px solid #272d38; */
        padding: 1.5rem;

        h3 {
            text-transform: uppercase;
            color: #6D7278;
        }

        .annotation-lists {
            ul {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                li {
                    list-style: none;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border: #272d38 1px solid;
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    p {
                        display: flex;
                        flex-direction: column;
                        gap: .5rem;

                        span:nth-child(2) {
                            color: #6D7278;
                        }
                    }
                }
            }
        }
    }
`