import { css } from 'lit';

export const styles = css`
    :host {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        max-width: 972px;
        background-color: #f8f8f8;
    }

    sp-theme {
        display: contents;
    }

    ::slotted(p) {
        margin: 0;
    }

    .cards {
        display: flex;
        gap: var(--consonant-merch-spacing-xs);
    }

    #backButton {
        position: absolute;
        border-width: 0;
    }

    ::slotted([slot='detail-xl']) {
        font-size: 18px;
        font-weight: bold;
        color: #2c2c2c;
        margin: 0;
    }

    ::slotted([slot='merch-whats-included']) {
        align-self: auto;
        width: 100%;
        position: absolute;
        background: #fff;
        height: 100%;
        padding: 30px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    ::slotted([slot$='-footer']) {
        flex-basis: 100%;
    }

    ::slotted([slot='merch-whats-included'].hidden) {
        display: none;
    }

    /* Mobile */

    .mobile {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        max-height: 100vh;
        padding: 30px 30px 0 30px;
        width: 100vw;
        gap: 16px;
    }

    .mobile #backButton {
        top: 12px;
        left: 12px;
    }

    .mobile ::slotted([slot='detail-xl']) {
        max-width: 455px;
        width: 100%;
    }

    .mobile[data-step='2'] {
        padding-top: 54px;
        background-color: #f5f5f5; /* make a variable */
    }

    [data-step='2'] sp-tabs {
        display: none;
    }

    #card-icons-title {
        display: flex;
        align-items: center;
        gap: 8px;
        align-self: center;
        max-width: 400px;
        width: 100%;
    }

    #card-icons-title h3 {
        margin: 0;
        font-size: 18px;
    }

    .mobile sp-tabs {
        width: 100%;
        max-width: 455px;
    }

    .mobile sp-tab-panel {
        height: calc(100vh - 268px);
        flex: 1;
    }

    .mobile .cards {
        padding-top: 2px;
        align-items: center;
        flex: 1;
        flex-direction: column;
        overflow-y: auto;
        padding-bottom: 50px;
    }

    .mobile #continueButton {
        align-items: center;
        width: 100%;
        height: 120px;
        display: flex;
        gap: 16px;
        flex-direction: column;
        place-content: center;
        position: fixed;
        bottom: 0;
        box-shadow: 0px -8px 10px -5px rgba(112, 112, 112, 0.1);
        background-color: #fff;
        padding: 0 30px;
    }

    #continueButton sp-button {
        width: 80%;
        min-width: 110px;
        max-width: 300px;
    }

    .mobile ::slotted(merch-card) {
        width: 300px;
    }

    .mobile #content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 30px 30px 0 30px;
    }

    .desktop {
        display: flex;
        width: 972px;
        min-height: 680px;
        position: relative;
        flex: 1;
    }

    .desktop .cards {
        flex-wrap: wrap;
    }

    .desktop #content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 30px 30px 0 30px;
    }

    .desktop #content slot[name='single-card'] {
        display: block;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    ::slotted(merch-card[slot='single-card']) {
        box-shadow: none;
    }

    .desktop ::slotted([slot='detail-xl']) {
        font-size: 20px;
    }

    .desktop aside {
        background-color: #f5f5f5;
        border-radius: 8px; /* not sure if necessary */
        display: flex;
        flex-direction: column;
        width: 360px;
        box-sizing: border-box;
        padding: 0 30px 0 30px;
    }

    .desktop sp-tabs {
        margin: 12px 0 30px 0;
    }

    sp-tab-panel {
        padding-top: 20px;
    }

    .desktop ::slotted(merch-card) {
        width: 268px;
    }

    .desktop ::slotted(merch-subscription-panel) {
        margin-top: 40px;
    }

    .desktop #continueButton {
        position: absolute;
        bottom: 30px;
        right: 30px;
    }

    .desktop #backButton {
        left: 30px;
        bottom: 30px;
    }
`;
