import { css } from 'lit';

export const styles = css`
    :host {
        box-sizing: border-box;
        --background-color: var(--qs-background-color, #f6f6f6);
        --text-color: #000;
        --radius: 5px;
        --border-color: var(--qs-border-color, #e8e8e8);
        --border-width: var(--qs-border-width, 1px);
        --label-font-size: var(--qs-label-font-size, 12px);
        --font-size: var(--qs-font-size, 12px);
        --label-color: var(--qs-lable-color, #000);
        --input-height: var(--qs-input-height, 30px);
        --input-width: var(--qs-input-width, 72px);
        --button-width: var(--qs-button-width, 30px);
        --font-size: var(--qs-font-size, 12px);
        --picker-fill-icon: var(
            --chevron-down-icon,
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="10" height="6" aria-hidden="true" viewBox="0 0 10 6"><path fill="%23787878" d="M9.99 1.01A1 1 0 0 0 8.283.3L5 3.586 1.717.3A1 1 0 1 0 .3 1.717L4.293 5.7a1 1 0 0 0 1.414 0L9.7 1.717a1 1 0 0 0 .29-.707z"/></svg>')
        );
        --qs-transition: var(--transition);

        display: block;
        position: relative;
        color: var(--text-color);
        line-height: var(--qs-line-height, 2);
    }

    .text-field {
        display: flex;
        align-items: center;
        width: var(--input-width);
        position: relative;
        margin-top: 6px;
    }

    .text-field-input {
        font-family: inherit;
        padding: 0;
        font-size: var(--font-size);
        height: var(--input-height);
        width: calc(var(--input-width) - var(--button-width));
        border: var(--border-width) solid var(--border-color);
        border-top-left-radius: var(--radius);
        border-bottom-left-radius: var(--radius);
        border-right: none;
        padding-inline-start: 12px;
        box-sizing: border-box;
        -moz-appearance: textfield;
    }

    .text-field-input::-webkit-inner-spin-button,
    .text-field-input::-webkit-outer-spin-button {
        margin: 0;
        -webkit-appearance: none;
    }

    .label {
        font-size: var(--label-font-size);
        color: var(--label-color);
    }

    .picker-button {
        width: var(--button-width);
        height: var(--input-height);
        position: absolute;
        inset-inline-end: 0;
        border: var(--border-width) solid var(--border-color);
        border-top-right-radius: var(--radius);
        border-bottom-right-radius: var(--radius);
        background-color: var(--background-color);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
    }

    .picker-button-fill {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: var(--picker-fill-icon);
        background-position: center;
        background-repeat: no-repeat;
    }

    .popover {
        position: absolute;
        top: var(--input-height);
        left: 0;
        width: var(--input-width);
        border-radius: var(--radius);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        z-index: 100;
        margin-top: var(--popover-margin-top, 6px);
        transition: var(--qs-transition);
        opacity: 0;
        box-sizing: border-box;
    }

    .popover.open {
        opacity: 1;
        background: #ffffff;
        border: var(--border-width) solid var(--border-color);
    }

    .popover.closed {
        max-height: 0;
        opacity: 0;
    }

    ::slotted(p) {
        margin: 0;
    }

    .item {
        display: flex;
        align-items: center;
        color: var(--text-color);
        font-size: var(--font-size);
        padding-inline-start: 12px;
        box-sizing: border-box;
    }

    .item.highlighted {
        background-color: var(--background-color);
    }
`;
