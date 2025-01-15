export default ({
  color,
  loaderDuration,
  redirectUrl,
  productName,
  animationCount,
  animationDuration,
  tooltipMessage,
  tooltipDuration,
}) => `<div>
  <p>
    <picture>
      <source type="image/webp" srcset="http://localhost:2000/test/features/webapp-prompt/mocks/media-icon.png" media="(min-width: 600px)">
      <source type="image/webp" srcset="http://localhost:2000/test/features/webapp-prompt/mocks/media-icon.png">
      <source type="image/png" srcset="http://localhost:2000/test/features/webapp-prompt/mocks/media-icon.png" media="(min-width: 600px)">
      <img loading="lazy" alt="" src="http://localhost:2000/test/features/webapp-prompt/mocks/media-icon.png">
    </picture>
  </p>
  <h2 id="taking-you-to-creative-cloud">Taking you to Creative Cloud</h2>
  <h3 id="cancel-to-stay-on-web-page">Cancel to stay on web page</h3>
  <p><em><a href="https://www.adobe.com/">Stay on this page</a></em></p>
  <div class="section-metadata">
   ${color && `<div>
      <div>loader-color</div>
      <div>${color}</div>
    </div>`}
    ${loaderDuration && `<div>
      <div>loader-duration</div>
      <div>${loaderDuration}</div>
    </div>`}
    ${redirectUrl && `<div>
      <div>redirect-url</div>
      <div><a href="${redirectUrl}">${redirectUrl}</a></div>
    </div>`}
    ${productName && `<div>
      <div>product-name</div>
      <div>${productName}</div>
    </div>`}
    ${animationCount && `<div>
      <div>dismissal-animation-count</div>
      <div>${animationCount}</div>
    </div>`}
    ${animationDuration && `<div>
      <div>dismissal-animation-duration</div>
      <div>${animationDuration}</div>
    </div>`}
    ${tooltipMessage && `<div>
      <div>dismissal-tooltip-message</div>
      <div>${tooltipMessage}</div>
    </div>`}
    ${tooltipDuration && `<div>
      <div>dismissal-tooltip-duration</div>
      <div>${tooltipDuration}</div>
    </div>`}
    <div>
      <div>pause-on-hover</div>
      <div>on</div>
    </div>
  </div>
</div>`;
