// The purpose of this file is to change the font color of the body to orange to test insertScript

/* eslint-disable no-unused-vars */
/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */

// function to wait for an element to exist because insertScript adds scripts to the head
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
// source: https://stackoverflow.com/a/61511955

// change the font color of the body to orange
waitForElm('body').then((elm) => {
  elm.style.color = 'orange';
});

// alternate:  setTimeout(() => { document.querySelector('body').style.color = 'orange'; }, 1000);
