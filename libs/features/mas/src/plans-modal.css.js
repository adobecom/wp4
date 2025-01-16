import { css } from 'lit';

const styles = css`
    :host {
        --consonant-plan-modal-includes: hidden;
    }

    #container {
        display: flex;
        flex-direction: column;
    }

    #title {
        align-items: center;
        display: flex;
        gap: var(--consonant-merch-spacing-xs);
        order: 1;
    }

    h2 {
        margin: 0;
    }

    ul {
        list-style-type: none;
        padding-inline-start: 0;
        margin: 0;
    }

    #description {
        order: 2;
    }

    #actions {
        order: 3;
    }

    #includes {
        order: 4;
    }

    #seeMore {
        margin-top: var(--consonant-merch-spacing-xs);
    }

    #extra {
        order: 5;
    }

    #recommended {
        order: 6;
    }

    #includes ul {
        height: calc((var(--consonant-plan-modal-includes-limit, 5) * 36px));
        padding-inline-start: 0;
        overflow-y: var(--consonant-plan-modal-includes);
        scrollbar-width: none;
    }

    #extra li::before,
    #recommended li::before {
        content: '\\B7';
        margin-right: 8px;
    }

    @media screen and (min-width: 901px) {
        #includes ul {
            height: calc(
                min(max(var(--consonant-plan-modal-includes-limit), 5), 12) *
                    36px
            );
        }
        #container {
            max-width: 1000px;
            height: 637px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 52px min-content repeat(5, 1fr);
            overflow: hidden;
        }

        #title {
            grid-column: 1 / span 2;
            grid-row: 1;
            order: unset;
        }

        #description {
            display: flex;
            gap: var(--consonant-merch-spacing-xs);
            align-items: center;
            grid-column: 1 / span 2;
            grid-row: 2;
            order: unset;
        }

        #includes {
            grid-column: 1;
            grid-row: 3 / span 5;
            order: unset;
        }

        ul::-webkit-scrollbar {
            display: none;
        }

        #includes li {
            display: flex;
            gap: var(--consonant-merch-spacing-xs);
            align-items: center;
        }

        #extra {
            grid-column: 2;
            grid-row: 3 / span 2;
            order: unset;
        }

        #recommended {
            grid-column: 2;
            grid-row: 5 / span 2;
            order: unset;
        }

        merch-subscription-panel {
            grid-row: 1 / span 5;
            background-color: var(--spectrum-gray-100);
            order: unset;
        }
    }
`;

export default styles;
