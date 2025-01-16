import {
  useEffect,
  useState,
  useRef,
  html,
} from '../../../../deps/htm-preact.js';

function Comments({
  comment,
  handleCommentChange,
  placeholderText,
  sendCtaText,
}) {
  const maxLength = 500;
  const [hasComment, setHasComment] = useState(false);
  const [displaySend, setDisplaySend] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [charCount, setCharCount] = useState(maxLength);

  const textArea = useRef(null);

  useEffect(() => {
    if (textArea && textArea.current) {
      textArea.current.focus();
    }
  }, [textArea]);

  const onCommentChange = (e) => {
    const { value } = e.target;
    setHasComment(!!value);
    setCharCount(maxLength - value.length);
    if (handleCommentChange) {
      handleCommentChange(value);
    }
  };

  const onBlur = (e) => {
    setDisplaySend(!!e.target.value);
    setHasFocus(false);
  };

  const onFocus = () => {
    setDisplaySend(true);
    setHasFocus(true);
  };

  const onCtaCoverClick = () => textArea.current && textArea.current.focus();

  let commentsClass = 'hlx-Review-commentFields is-Visible';
  if (hasFocus) {
    commentsClass += ' has-focus';
  }

  const disabledElement = html`
    <input disabled=${!hasComment} type="submit" value=${sendCtaText} />
  `;

  const charCountElement = html`
    <span class="comment-counter">${charCount}/${maxLength}</span>
  `;
  return html`
    <fieldset className=${commentsClass}>
      <label htmlFor="rating-comments">${placeholderText}</label>
      <textarea
        id="rating-comments"
        ref=${textArea}
        cols="40"
        maxlength=${maxLength}
        name="rating-comments"
        aria-label=${placeholderText}
        onInput=${onCommentChange}
        onFocus=${onFocus}
        value=${comment}
        onBlur=${onBlur}
      ></textarea>
      <div id="ctaCover" onClick=${onCtaCoverClick}>
        ${charCountElement}
      </div>
        ${displaySend && disabledElement}
    </fieldset>
  `;
}

export default Comments;
