/*
Enables body scroll locking (for iOS Mobile and Tablet, Android, desktop Safari/Chrome/Firefox) without breaking scrolling of a target element.
Usage example: when opening a modal, disable body scroll by calling enableBodyScroll, and enable it back when closing the modal by calling disableBodyScroll.
*/

const isIosDevice = /iP(ad|hone|od)/.test(window?.navigator?.platform) || (window?.navigator?.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
let documentListenerAdded = false;
let previousBodyOverflowSetting;

export const disableBodyScroll = (targetElement) => {
    if (!targetElement) return;
    if (isIosDevice) {
        document.body.style.position = 'fixed';
        targetElement.ontouchmove = (event) => {
            if (event.targetTouches.length === 1) {
                event.stopPropagation();
            }
        };
        if (!documentListenerAdded) {
            document.addEventListener('touchmove', (e) => e.preventDefault());
            documentListenerAdded = true;
        }
    } else {
        previousBodyOverflowSetting = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }
};

export const enableBodyScroll = (targetElement) => {
    if (!targetElement) return;
    if (isIosDevice) {
        targetElement.ontouchstart = null;
        targetElement.ontouchmove = null;
        document.body.style.position = '';
        document.removeEventListener('touchmove', (e) => e.preventDefault());
        documentListenerAdded = false;
    } else {
        if (previousBodyOverflowSetting !== undefined) {
            document.body.style.overflow = previousBodyOverflowSetting;
            previousBodyOverflowSetting = undefined;
        }
    }
};
