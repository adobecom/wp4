// TODO: css variables, a11y, r12s ;)
import { css } from 'lit';

export const styles = css`
    :host {
        --merch-focused-outline: var(--merch-color-focus-ring) auto 1px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        gap: var(--consonant-merch-spacing-xs);
        width: 100%;
        min-width: 300px;
        max-width: 378px;
        visibility: hidden;
    }

    :host([ready]) {
        visibility: visible;
    }

    slot[name='header'] {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    ::slotted(h4),
    ::slotted(h5) {
        margin: 0;
    }

    ::slotted(h4) {
        font-size: 18px !important;
        font-weight: bold;
        line-height: 22px !important;
    }

    ::slotted(h5) {
        font-size: 14px !important;
        font-weight: normal;
        line-height: 17px !important;
    }

    #spinner {
        display: flex;
        justify-content: center;
    }

    #stock:focus-within {
        outline: var(--merch-focused-outline);
        outline-offset: 8px;
    }

    #footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    ::slotted(merch-secure-transaction) {
        order: 2;
    }

    sp-theme {
        display: contents;
    }

    sp-button {
        order: 3;
    }

    :host([layout='desktop']) ::slotted(merch-quantity-select) {
        width: 100%;
    }

    :host([layout='mobile']) sp-button {
        width: 80%;
        max-width: 300px;
    }

    ::slotted(merch-stock) {
        order: 1;
        max-width: 460px;
    }

    ::slotted(merch-quantity-select) {
        order: 1;
    }

    :host([layout='mobile']) #footer {
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 187px;
        display: flex;
        gap: 16px;
        flex-direction: column;
        flex-wrap: nowrap;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0px -8px 10px -5px rgba(112, 112, 112, 0.1);
        background-color: #fff;
        padding: 15px 30px;
        box-sizing: border-box;
    }

    ::slotted(merch-offer-select) {
        overflow-y: auto;
        max-height: calc(100vh - 420px);
    }

    a[is='checkout-link'] {
        display: none;
    }
`;
