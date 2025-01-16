var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/@spectrum-web-components/base/src/version.js
var version;
var init_version = __esm({
  "../node_modules/@spectrum-web-components/base/src/version.js"() {
    version = "0.43.0";
  }
});

// ../node_modules/@spectrum-web-components/base/src/Base.js
import { LitElement as m } from "/libs/deps/lit-all.min.js";
function SpectrumMixin(s10) {
  class o13 extends s10 {
    get isLTR() {
      return this.dir === "ltr";
    }
    hasVisibleFocusInTree() {
      const n6 = ((r9 = document) => {
        var l7;
        let t13 = r9.activeElement;
        for (; t13 != null && t13.shadowRoot && t13.shadowRoot.activeElement; )
          t13 = t13.shadowRoot.activeElement;
        const a10 = t13 ? [t13] : [];
        for (; t13; ) {
          const i12 = t13.assignedSlot || t13.parentElement || ((l7 = t13.getRootNode()) == null ? void 0 : l7.host);
          i12 && a10.push(i12), t13 = i12;
        }
        return a10;
      })(this.getRootNode())[0];
      if (!n6)
        return false;
      try {
        return n6.matches(":focus-visible") || n6.matches(".focus-visible");
      } catch (r9) {
        return n6.matches(".focus-visible");
      }
    }
    connectedCallback() {
      if (!this.hasAttribute("dir")) {
        let e16 = this.assignedSlot || this.parentNode;
        for (; e16 !== document.documentElement && !p(e16); )
          e16 = e16.assignedSlot || e16.parentNode || e16.host;
        if (this.dir = e16.dir === "rtl" ? e16.dir : this.dir || "ltr", e16 === document.documentElement)
          c.add(this);
        else {
          const { localName: n6 } = e16;
          n6.search("-") > -1 && !customElements.get(n6) ? customElements.whenDefined(n6).then(() => {
            e16.startManagingContentDirection(this);
          }) : e16.startManagingContentDirection(this);
        }
        this._dirParent = e16;
      }
      super.connectedCallback();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._dirParent && (this._dirParent === document.documentElement ? c.delete(this) : this._dirParent.stopManagingContentDirection(this), this.removeAttribute("dir"));
    }
  }
  return o13;
}
var c, g, w, p, SpectrumElement;
var init_Base = __esm({
  "../node_modules/@spectrum-web-components/base/src/Base.js"() {
    "use strict";
    init_version();
    c = /* @__PURE__ */ new Set();
    g = () => {
      const s10 = document.documentElement.dir === "rtl" ? document.documentElement.dir : "ltr";
      c.forEach((o13) => {
        o13.setAttribute("dir", s10);
      });
    };
    w = new MutationObserver(g);
    w.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    p = (s10) => typeof s10.startManagingContentDirection != "undefined" || s10.tagName === "SP-THEME";
    SpectrumElement = class extends SpectrumMixin(m) {
    };
    SpectrumElement.VERSION = version;
  }
});

// ../node_modules/@spectrum-web-components/base/src/sizedMixin.js
import { property as S } from "/libs/deps/lit-all.min.js";
function SizedMixin(r9, { validSizes: i12 = ["s", "m", "l", "xl"], noDefaultSize: s10, defaultSize: t13 = "m" } = {}) {
  class e16 extends r9 {
    constructor() {
      super(...arguments);
      this._size = t13;
    }
    get size() {
      return this._size || t13;
    }
    set size(n6) {
      const p13 = s10 ? null : t13, z = n6 && n6.toLocaleLowerCase(), x2 = i12.includes(z) ? z : p13;
      if (x2 && this.setAttribute("size", x2), this._size === x2)
        return;
      const c12 = this._size;
      this._size = x2, this.requestUpdate("size", c12);
    }
    update(n6) {
      !this.hasAttribute("size") && !s10 && this.setAttribute("size", this.size), super.update(n6);
    }
  }
  return m2([S({ type: String })], e16.prototype, "size", 1), e16;
}
var a, u, m2, ElementSizes;
var init_sizedMixin = __esm({
  "../node_modules/@spectrum-web-components/base/src/sizedMixin.js"() {
    "use strict";
    a = Object.defineProperty;
    u = Object.getOwnPropertyDescriptor;
    m2 = (r9, i12, s10, t13) => {
      for (var e16 = t13 > 1 ? void 0 : t13 ? u(i12, s10) : i12, l7 = r9.length - 1, o13; l7 >= 0; l7--)
        (o13 = r9[l7]) && (e16 = (t13 ? o13(i12, s10, e16) : o13(e16)) || e16);
      return t13 && e16 && a(i12, s10, e16), e16;
    };
    ElementSizes = { xxs: "xxs", xs: "xs", s: "s", m: "m", l: "l", xl: "xl", xxl: "xxl" };
  }
});

// ../node_modules/@spectrum-web-components/base/src/index.js
var src_exports = {};
__export(src_exports, {
  ElementSizes: () => ElementSizes,
  SizedMixin: () => SizedMixin,
  SpectrumElement: () => SpectrumElement,
  SpectrumMixin: () => SpectrumMixin
});
import * as lit_star from "/libs/deps/lit-all.min.js";
var init_src = __esm({
  "../node_modules/@spectrum-web-components/base/src/index.js"() {
    "use strict";
    init_Base();
    init_sizedMixin();
    __reExport(src_exports, lit_star);
  }
});

// ../node_modules/@spectrum-web-components/base/src/decorators.js
var decorators_exports = {};
import * as decorators_star from "/libs/deps/lit-all.min.js";
var init_decorators = __esm({
  "../node_modules/@spectrum-web-components/base/src/decorators.js"() {
    "use strict";
    __reExport(decorators_exports, decorators_star);
  }
});

// ../node_modules/@spectrum-web-components/base/src/directives.js
import { ifDefined } from "/libs/deps/lit-all.min.js";
import { repeat } from "/libs/deps/lit-all.min.js";
import { classMap } from "/libs/deps/lit-all.min.js";
import { styleMap } from "/libs/deps/lit-all.min.js";
import { until } from "/libs/deps/lit-all.min.js";
import { live } from "/libs/deps/lit-all.min.js";
import { when } from "/libs/deps/lit-all.min.js";
import { join } from "/libs/deps/lit-all.min.js";
import { unsafeHTML } from "/libs/deps/lit-all.min.js";
var init_directives = __esm({
  "../node_modules/@spectrum-web-components/base/src/directives.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/base/src/define-element.js
function defineElement(e16, n6) {
  window.__swc, customElements.define(e16, n6);
}
var init_define_element = __esm({
  "../node_modules/@spectrum-web-components/base/src/define-element.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/shared/src/like-anchor.js
function LikeAnchor(s10) {
  class r9 extends s10 {
    renderAnchor({ id: i12, className: t13, ariaHidden: a10, labelledby: l7, tabindex: d12, anchorContent: g5 = src_exports.html`<slot></slot>` }) {
      return src_exports.html`<a
                    id=${i12}
                    class=${ifDefined(t13)}
                    href=${ifDefined(this.href)}
                    download=${ifDefined(this.download)}
                    target=${ifDefined(this.target)}
                    aria-label=${ifDefined(this.label)}
                    aria-labelledby=${ifDefined(l7)}
                    aria-hidden=${ifDefined(a10 ? "true" : void 0)}
                    tabindex=${ifDefined(d12)}
                    referrerpolicy=${ifDefined(this.referrerpolicy)}
                    rel=${ifDefined(this.rel)}
                >${g5}</a>`;
    }
  }
  return n2([(0, decorators_exports.property)()], r9.prototype, "download", 2), n2([(0, decorators_exports.property)()], r9.prototype, "label", 2), n2([(0, decorators_exports.property)()], r9.prototype, "href", 2), n2([(0, decorators_exports.property)()], r9.prototype, "target", 2), n2([(0, decorators_exports.property)()], r9.prototype, "referrerpolicy", 2), n2([(0, decorators_exports.property)()], r9.prototype, "rel", 2), r9;
}
var u2, f, n2;
var init_like_anchor = __esm({
  "../node_modules/@spectrum-web-components/shared/src/like-anchor.js"() {
    "use strict";
    init_src();
    init_decorators();
    init_directives();
    u2 = Object.defineProperty;
    f = Object.getOwnPropertyDescriptor;
    n2 = (s10, r9, p13, i12) => {
      for (var t13 = i12 > 1 ? void 0 : i12 ? f(r9, p13) : r9, a10 = s10.length - 1, l7; a10 >= 0; a10--)
        (l7 = s10[a10]) && (t13 = (i12 ? l7(r9, p13, t13) : l7(t13)) || t13);
      return i12 && t13 && u2(r9, p13, t13), t13;
    };
  }
});

// ../node_modules/focus-visible/dist/focus-visible.js
var require_focus_visible = __commonJS({
  "../node_modules/focus-visible/dist/focus-visible.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory();
    })(exports, function() {
      "use strict";
      function applyFocusVisiblePolyfill(scope) {
        var hadKeyboardEvent = true;
        var hadFocusVisibleRecently = false;
        var hadFocusVisibleRecentlyTimeout = null;
        var inputTypesAllowlist = {
          text: true,
          search: true,
          url: true,
          tel: true,
          email: true,
          password: true,
          number: true,
          date: true,
          month: true,
          week: true,
          time: true,
          datetime: true,
          "datetime-local": true
        };
        function isValidFocusTarget(el) {
          if (el && el !== document && el.nodeName !== "HTML" && el.nodeName !== "BODY" && "classList" in el && "contains" in el.classList) {
            return true;
          }
          return false;
        }
        function focusTriggersKeyboardModality(el) {
          var type = el.type;
          var tagName = el.tagName;
          if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) {
            return true;
          }
          if (tagName === "TEXTAREA" && !el.readOnly) {
            return true;
          }
          if (el.isContentEditable) {
            return true;
          }
          return false;
        }
        function addFocusVisibleClass(el) {
          if (el.classList.contains("focus-visible")) {
            return;
          }
          el.classList.add("focus-visible");
          el.setAttribute("data-focus-visible-added", "");
        }
        function removeFocusVisibleClass(el) {
          if (!el.hasAttribute("data-focus-visible-added")) {
            return;
          }
          el.classList.remove("focus-visible");
          el.removeAttribute("data-focus-visible-added");
        }
        function onKeyDown(e16) {
          if (e16.metaKey || e16.altKey || e16.ctrlKey) {
            return;
          }
          if (isValidFocusTarget(scope.activeElement)) {
            addFocusVisibleClass(scope.activeElement);
          }
          hadKeyboardEvent = true;
        }
        function onPointerDown(e16) {
          hadKeyboardEvent = false;
        }
        function onFocus(e16) {
          if (!isValidFocusTarget(e16.target)) {
            return;
          }
          if (hadKeyboardEvent || focusTriggersKeyboardModality(e16.target)) {
            addFocusVisibleClass(e16.target);
          }
        }
        function onBlur(e16) {
          if (!isValidFocusTarget(e16.target)) {
            return;
          }
          if (e16.target.classList.contains("focus-visible") || e16.target.hasAttribute("data-focus-visible-added")) {
            hadFocusVisibleRecently = true;
            window.clearTimeout(hadFocusVisibleRecentlyTimeout);
            hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
              hadFocusVisibleRecently = false;
            }, 100);
            removeFocusVisibleClass(e16.target);
          }
        }
        function onVisibilityChange(e16) {
          if (document.visibilityState === "hidden") {
            if (hadFocusVisibleRecently) {
              hadKeyboardEvent = true;
            }
            addInitialPointerMoveListeners();
          }
        }
        function addInitialPointerMoveListeners() {
          document.addEventListener("mousemove", onInitialPointerMove);
          document.addEventListener("mousedown", onInitialPointerMove);
          document.addEventListener("mouseup", onInitialPointerMove);
          document.addEventListener("pointermove", onInitialPointerMove);
          document.addEventListener("pointerdown", onInitialPointerMove);
          document.addEventListener("pointerup", onInitialPointerMove);
          document.addEventListener("touchmove", onInitialPointerMove);
          document.addEventListener("touchstart", onInitialPointerMove);
          document.addEventListener("touchend", onInitialPointerMove);
        }
        function removeInitialPointerMoveListeners() {
          document.removeEventListener("mousemove", onInitialPointerMove);
          document.removeEventListener("mousedown", onInitialPointerMove);
          document.removeEventListener("mouseup", onInitialPointerMove);
          document.removeEventListener("pointermove", onInitialPointerMove);
          document.removeEventListener("pointerdown", onInitialPointerMove);
          document.removeEventListener("pointerup", onInitialPointerMove);
          document.removeEventListener("touchmove", onInitialPointerMove);
          document.removeEventListener("touchstart", onInitialPointerMove);
          document.removeEventListener("touchend", onInitialPointerMove);
        }
        function onInitialPointerMove(e16) {
          if (e16.target.nodeName && e16.target.nodeName.toLowerCase() === "html") {
            return;
          }
          hadKeyboardEvent = false;
          removeInitialPointerMoveListeners();
        }
        document.addEventListener("keydown", onKeyDown, true);
        document.addEventListener("mousedown", onPointerDown, true);
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("touchstart", onPointerDown, true);
        document.addEventListener("visibilitychange", onVisibilityChange, true);
        addInitialPointerMoveListeners();
        scope.addEventListener("focus", onFocus, true);
        scope.addEventListener("blur", onBlur, true);
        if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
          scope.host.setAttribute("data-js-focus-visible", "");
        } else if (scope.nodeType === Node.DOCUMENT_NODE) {
          document.documentElement.classList.add("js-focus-visible");
          document.documentElement.setAttribute("data-js-focus-visible", "");
        }
      }
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;
        var event;
        try {
          event = new CustomEvent("focus-visible-polyfill-ready");
        } catch (error) {
          event = document.createEvent("CustomEvent");
          event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
        }
        window.dispatchEvent(event);
      }
      if (typeof document !== "undefined") {
        applyFocusVisiblePolyfill(document);
      }
    });
  }
});

// ../node_modules/@spectrum-web-components/shared/src/focus-visible.js
var i, FocusVisiblePolyfillMixin;
var init_focus_visible = __esm({
  "../node_modules/@spectrum-web-components/shared/src/focus-visible.js"() {
    "use strict";
    i = true;
    try {
      document.body.querySelector(":focus-visible");
    } catch (a10) {
      i = false, Promise.resolve().then(() => __toESM(require_focus_visible(), 1));
    }
    FocusVisiblePolyfillMixin = (a10) => {
      var s10, t13;
      const n6 = (l7) => {
        if (l7.shadowRoot == null || l7.hasAttribute("data-js-focus-visible"))
          return () => {
          };
        if (self.applyFocusVisiblePolyfill)
          self.applyFocusVisiblePolyfill(l7.shadowRoot), l7.manageAutoFocus && l7.manageAutoFocus();
        else {
          const e16 = () => {
            self.applyFocusVisiblePolyfill && l7.shadowRoot && self.applyFocusVisiblePolyfill(l7.shadowRoot), l7.manageAutoFocus && l7.manageAutoFocus();
          };
          return self.addEventListener("focus-visible-polyfill-ready", e16, { once: true }), () => {
            self.removeEventListener("focus-visible-polyfill-ready", e16);
          };
        }
        return () => {
        };
      }, o13 = Symbol("endPolyfillCoordination");
      class c12 extends (t13 = a10, s10 = o13, t13) {
        constructor() {
          super(...arguments);
          this[s10] = null;
        }
        connectedCallback() {
          super.connectedCallback && super.connectedCallback(), i || requestAnimationFrame(() => {
            this[o13] == null && (this[o13] = n6(this));
          });
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(), i || requestAnimationFrame(() => {
            this[o13] != null && (this[o13](), this[o13] = null);
          });
        }
      }
      return c12;
    };
  }
});

// ../node_modules/@spectrum-web-components/shared/src/focusable.js
function u3() {
  return new Promise((s10) => requestAnimationFrame(() => s10()));
}
var d3, b, n3, Focusable;
var init_focusable = __esm({
  "../node_modules/@spectrum-web-components/shared/src/focusable.js"() {
    "use strict";
    init_src();
    init_decorators();
    init_focus_visible();
    d3 = Object.defineProperty;
    b = Object.getOwnPropertyDescriptor;
    n3 = (s10, a10, e16, t13) => {
      for (var i12 = t13 > 1 ? void 0 : t13 ? b(a10, e16) : a10, o13 = s10.length - 1, r9; o13 >= 0; o13--)
        (r9 = s10[o13]) && (i12 = (t13 ? r9(a10, e16, i12) : r9(i12)) || i12);
      return t13 && i12 && d3(a10, e16, i12), i12;
    };
    Focusable = class extends FocusVisiblePolyfillMixin(SpectrumElement) {
      constructor() {
        super(...arguments);
        this.disabled = false;
        this.autofocus = false;
        this._tabIndex = 0;
        this.manipulatingTabindex = false;
        this.autofocusReady = Promise.resolve();
      }
      get tabIndex() {
        if (this.focusElement === this) {
          const t13 = this.hasAttribute("tabindex") ? Number(this.getAttribute("tabindex")) : NaN;
          return isNaN(t13) ? -1 : t13;
        }
        const e16 = parseFloat(this.hasAttribute("tabindex") && this.getAttribute("tabindex") || "0");
        return this.disabled || e16 < 0 ? -1 : this.focusElement ? this.focusElement.tabIndex : e16;
      }
      set tabIndex(e16) {
        if (this.manipulatingTabindex) {
          this.manipulatingTabindex = false;
          return;
        }
        if (this.focusElement === this) {
          if (e16 !== this._tabIndex) {
            this._tabIndex = e16;
            const t13 = this.disabled ? "-1" : "" + e16;
            this.manipulatingTabindex = true, this.setAttribute("tabindex", t13);
          }
          return;
        }
        if (e16 === -1 ? this.addEventListener("pointerdown", this.onPointerdownManagementOfTabIndex) : (this.manipulatingTabindex = true, this.removeEventListener("pointerdown", this.onPointerdownManagementOfTabIndex)), e16 === -1 || this.disabled) {
          this.setAttribute("tabindex", "-1"), this.removeAttribute("focusable"), e16 !== -1 && this.manageFocusElementTabindex(e16);
          return;
        }
        this.setAttribute("focusable", ""), this.hasAttribute("tabindex") ? this.removeAttribute("tabindex") : this.manipulatingTabindex = false, this.manageFocusElementTabindex(e16);
      }
      onPointerdownManagementOfTabIndex() {
        this.tabIndex === -1 && setTimeout(() => {
          this.tabIndex = 0, this.focus({ preventScroll: true }), this.tabIndex = -1;
        });
      }
      async manageFocusElementTabindex(e16) {
        this.focusElement || await this.updateComplete, e16 === null ? this.focusElement.removeAttribute("tabindex") : this.focusElement.tabIndex = e16;
      }
      get focusElement() {
        throw new Error("Must implement focusElement getter!");
      }
      focus(e16) {
        this.disabled || !this.focusElement || (this.focusElement !== this ? this.focusElement.focus(e16) : HTMLElement.prototype.focus.apply(this, [e16]));
      }
      blur() {
        const e16 = this.focusElement || this;
        e16 !== this ? e16.blur() : HTMLElement.prototype.blur.apply(this);
      }
      click() {
        if (this.disabled)
          return;
        const e16 = this.focusElement || this;
        e16 !== this ? e16.click() : HTMLElement.prototype.click.apply(this);
      }
      manageAutoFocus() {
        this.autofocus && (this.dispatchEvent(new KeyboardEvent("keydown", { code: "Tab" })), this.focusElement.focus());
      }
      firstUpdated(e16) {
        super.firstUpdated(e16), (!this.hasAttribute("tabindex") || this.getAttribute("tabindex") !== "-1") && this.setAttribute("focusable", "");
      }
      update(e16) {
        e16.has("disabled") && this.handleDisabledChanged(this.disabled, e16.get("disabled")), super.update(e16);
      }
      updated(e16) {
        super.updated(e16), e16.has("disabled") && this.disabled && this.blur();
      }
      async handleDisabledChanged(e16, t13) {
        const i12 = () => this.focusElement !== this && typeof this.focusElement.disabled != "undefined";
        e16 ? (this.manipulatingTabindex = true, this.setAttribute("tabindex", "-1"), await this.updateComplete, i12() ? this.focusElement.disabled = true : this.setAttribute("aria-disabled", "true")) : t13 && (this.manipulatingTabindex = true, this.focusElement === this ? this.setAttribute("tabindex", "" + this._tabIndex) : this.removeAttribute("tabindex"), await this.updateComplete, i12() ? this.focusElement.disabled = false : this.removeAttribute("aria-disabled"));
      }
      async getUpdateComplete() {
        const e16 = await super.getUpdateComplete();
        return await this.autofocusReady, e16;
      }
      connectedCallback() {
        super.connectedCallback(), this.autofocus && (this.autofocusReady = new Promise(async (e16) => {
          await u3(), await u3(), e16();
        }), this.updateComplete.then(() => {
          this.manageAutoFocus();
        }));
      }
    };
    n3([(0, decorators_exports.property)({ type: Boolean, reflect: true })], Focusable.prototype, "disabled", 2), n3([(0, decorators_exports.property)({ type: Boolean })], Focusable.prototype, "autofocus", 2), n3([(0, decorators_exports.property)({ type: Number })], Focusable.prototype, "tabIndex", 1);
  }
});

// ../node_modules/@lit-labs/observers/mutation-controller.js
var t3;
var init_mutation_controller = __esm({
  "../node_modules/@lit-labs/observers/mutation-controller.js"() {
    t3 = class {
      constructor(t13, { target: s10, config: i12, callback: h9, skipInitial: o13 }) {
        this.t = /* @__PURE__ */ new Set(), this.o = false, this.i = false, this.h = t13, null !== s10 && this.t.add(s10 ?? t13), this.l = i12, this.o = o13 ?? this.o, this.callback = h9, window.MutationObserver ? (this.u = new MutationObserver((t14) => {
          this.handleChanges(t14), this.h.requestUpdate();
        }), t13.addController(this)) : console.warn("MutationController error: browser does not support MutationObserver.");
      }
      handleChanges(t13) {
        this.value = this.callback?.(t13, this.u);
      }
      hostConnected() {
        for (const t13 of this.t)
          this.observe(t13);
      }
      hostDisconnected() {
        this.disconnect();
      }
      async hostUpdated() {
        const t13 = this.u.takeRecords();
        (t13.length || !this.o && this.i) && this.handleChanges(t13), this.i = false;
      }
      observe(t13) {
        this.t.add(t13), this.u.observe(t13, this.l), this.i = true, this.h.requestUpdate();
      }
      disconnect() {
        this.u.disconnect();
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/shared/src/observe-slot-text.js
function ObserveSlotText(c12, e16, s10 = []) {
  var a10, i12;
  const o13 = (f3) => (m9) => f3.matches(m9);
  class t13 extends (i12 = c12, a10 = p4, i12) {
    constructor(...n6) {
      super(n6);
      this.slotHasContent = false;
      new t3(this, { config: { characterData: true, subtree: true }, callback: (d12) => {
        for (const r9 of d12)
          if (r9.type === "characterData") {
            this.manageTextObservedSlot();
            return;
          }
      } });
    }
    manageTextObservedSlot() {
      if (!this[p4])
        return;
      const n6 = [...this[p4]].filter((d12) => {
        const r9 = d12;
        return r9.tagName ? !s10.some(o13(r9)) : r9.textContent ? r9.textContent.trim() : false;
      });
      this.slotHasContent = n6.length > 0;
    }
    update(n6) {
      if (!this.hasUpdated) {
        const { childNodes: d12 } = this, r9 = [...d12].filter((g5) => {
          const l7 = g5;
          return l7.tagName ? s10.some(o13(l7)) ? false : e16 ? l7.getAttribute("slot") === e16 : !l7.hasAttribute("slot") : l7.textContent ? l7.textContent.trim() : false;
        });
        this.slotHasContent = r9.length > 0;
      }
      super.update(n6);
    }
    firstUpdated(n6) {
      super.firstUpdated(n6), this.updateComplete.then(() => {
        this.manageTextObservedSlot();
      });
    }
  }
  return u4([(0, decorators_exports.property)({ type: Boolean, attribute: false })], t13.prototype, "slotHasContent", 2), u4([(0, decorators_exports.queryAssignedNodes)({ slot: e16, flatten: true })], t13.prototype, a10, 2), t13;
}
var h2, x, u4, p4;
var init_observe_slot_text = __esm({
  "../node_modules/@spectrum-web-components/shared/src/observe-slot-text.js"() {
    "use strict";
    init_decorators();
    init_mutation_controller();
    h2 = Object.defineProperty;
    x = Object.getOwnPropertyDescriptor;
    u4 = (c12, e16, s10, o13) => {
      for (var t13 = o13 > 1 ? void 0 : o13 ? x(e16, s10) : e16, a10 = c12.length - 1, i12; a10 >= 0; a10--)
        (i12 = c12[a10]) && (t13 = (o13 ? i12(e16, s10, t13) : i12(t13)) || t13);
      return o13 && t13 && h2(e16, s10, t13), t13;
    };
    p4 = Symbol("assignedNodes");
  }
});

// ../node_modules/@spectrum-web-components/shared/src/get-label-from-slot.js
var getLabelFromSlot;
var init_get_label_from_slot = __esm({
  "../node_modules/@spectrum-web-components/shared/src/get-label-from-slot.js"() {
    "use strict";
    getLabelFromSlot = (r9, l7) => {
      if (r9)
        return null;
      const t13 = l7.assignedNodes().reduce((e16, n6) => n6.textContent ? e16 + n6.textContent : e16, "");
      return t13 ? t13.trim() : null;
    };
  }
});

// ../node_modules/@spectrum-web-components/progress-circle/src/progress-circle.css.js
var e5, progress_circle_css_default;
var init_progress_circle_css = __esm({
  "../node_modules/@spectrum-web-components/progress-circle/src/progress-circle.css.js"() {
    "use strict";
    init_src();
    e5 = src_exports.css`
    .fill-submask-2{animation:1s linear infinite b}@keyframes a{0%{transform:rotate(90deg)}1.69%{transform:rotate(72.3deg)}3.39%{transform:rotate(55.5deg)}5.08%{transform:rotate(40.3deg)}6.78%{transform:rotate(25deg)}8.47%{transform:rotate(10.6deg)}10.17%{transform:rotate(0)}11.86%{transform:rotate(0)}13.56%{transform:rotate(0)}15.25%{transform:rotate(0)}16.95%{transform:rotate(0)}18.64%{transform:rotate(0)}20.34%{transform:rotate(0)}22.03%{transform:rotate(0)}23.73%{transform:rotate(0)}25.42%{transform:rotate(0)}27.12%{transform:rotate(0)}28.81%{transform:rotate(0)}30.51%{transform:rotate(0)}32.2%{transform:rotate(0)}33.9%{transform:rotate(0)}35.59%{transform:rotate(0)}37.29%{transform:rotate(0)}38.98%{transform:rotate(0)}40.68%{transform:rotate(0)}42.37%{transform:rotate(5.3deg)}44.07%{transform:rotate(13.4deg)}45.76%{transform:rotate(20.6deg)}47.46%{transform:rotate(29deg)}49.15%{transform:rotate(36.5deg)}50.85%{transform:rotate(42.6deg)}52.54%{transform:rotate(48.8deg)}54.24%{transform:rotate(54.2deg)}55.93%{transform:rotate(59.4deg)}57.63%{transform:rotate(63.2deg)}59.32%{transform:rotate(67.2deg)}61.02%{transform:rotate(70.8deg)}62.71%{transform:rotate(73.8deg)}64.41%{transform:rotate(76.2deg)}66.1%{transform:rotate(78.7deg)}67.8%{transform:rotate(80.6deg)}69.49%{transform:rotate(82.6deg)}71.19%{transform:rotate(83.7deg)}72.88%{transform:rotate(85deg)}74.58%{transform:rotate(86.3deg)}76.27%{transform:rotate(87deg)}77.97%{transform:rotate(87.7deg)}79.66%{transform:rotate(88.3deg)}81.36%{transform:rotate(88.6deg)}83.05%{transform:rotate(89.2deg)}84.75%{transform:rotate(89.2deg)}86.44%{transform:rotate(89.5deg)}88.14%{transform:rotate(89.9deg)}89.83%{transform:rotate(89.7deg)}91.53%{transform:rotate(90.1deg)}93.22%{transform:rotate(90.2deg)}94.92%{transform:rotate(90.1deg)}96.61%{transform:rotate(90deg)}98.31%{transform:rotate(89.8deg)}to{transform:rotate(90deg)}}@keyframes b{0%{transform:rotate(180deg)}1.69%{transform:rotate(180deg)}3.39%{transform:rotate(180deg)}5.08%{transform:rotate(180deg)}6.78%{transform:rotate(180deg)}8.47%{transform:rotate(180deg)}10.17%{transform:rotate(179.2deg)}11.86%{transform:rotate(164deg)}13.56%{transform:rotate(151.8deg)}15.25%{transform:rotate(140.8deg)}16.95%{transform:rotate(130.3deg)}18.64%{transform:rotate(120.4deg)}20.34%{transform:rotate(110.8deg)}22.03%{transform:rotate(101.6deg)}23.73%{transform:rotate(93.5deg)}25.42%{transform:rotate(85.4deg)}27.12%{transform:rotate(78.1deg)}28.81%{transform:rotate(71.2deg)}30.51%{transform:rotate(89.1deg)}32.2%{transform:rotate(105.5deg)}33.9%{transform:rotate(121.3deg)}35.59%{transform:rotate(135.5deg)}37.29%{transform:rotate(148.4deg)}38.98%{transform:rotate(161deg)}40.68%{transform:rotate(173.5deg)}42.37%{transform:rotate(180deg)}44.07%{transform:rotate(180deg)}45.76%{transform:rotate(180deg)}47.46%{transform:rotate(180deg)}49.15%{transform:rotate(180deg)}50.85%{transform:rotate(180deg)}52.54%{transform:rotate(180deg)}54.24%{transform:rotate(180deg)}55.93%{transform:rotate(180deg)}57.63%{transform:rotate(180deg)}59.32%{transform:rotate(180deg)}61.02%{transform:rotate(180deg)}62.71%{transform:rotate(180deg)}64.41%{transform:rotate(180deg)}66.1%{transform:rotate(180deg)}67.8%{transform:rotate(180deg)}69.49%{transform:rotate(180deg)}71.19%{transform:rotate(180deg)}72.88%{transform:rotate(180deg)}74.58%{transform:rotate(180deg)}76.27%{transform:rotate(180deg)}77.97%{transform:rotate(180deg)}79.66%{transform:rotate(180deg)}81.36%{transform:rotate(180deg)}83.05%{transform:rotate(180deg)}84.75%{transform:rotate(180deg)}86.44%{transform:rotate(180deg)}88.14%{transform:rotate(180deg)}89.83%{transform:rotate(180deg)}91.53%{transform:rotate(180deg)}93.22%{transform:rotate(180deg)}94.92%{transform:rotate(180deg)}96.61%{transform:rotate(180deg)}98.31%{transform:rotate(180deg)}to{transform:rotate(180deg)}}@keyframes c{0%{transform:rotate(-90deg)}to{transform:rotate(270deg)}}:host{--spectrum-progress-circle-track-border-color:var(--spectrum-gray-300);--spectrum-progress-circle-fill-border-color:var(--spectrum-accent-content-color-default);--spectrum-progress-circle-track-border-color-over-background:var(--spectrum-transparent-white-300);--spectrum-progress-circle-fill-border-color-over-background:var(--spectrum-transparent-white-900);--spectrum-progress-circle-size:var(--spectrum-progress-circle-size-medium);--spectrum-progress-circle-thickness:var(--spectrum-progress-circle-thickness-medium);--spectrum-progress-circle-track-border-style:solid}:host([size=s]){--spectrum-progress-circle-size:var(--spectrum-progress-circle-size-small);--spectrum-progress-circle-thickness:var(--spectrum-progress-circle-thickness-small)}:host([size=l]){--spectrum-progress-circle-size:var(--spectrum-progress-circle-size-large);--spectrum-progress-circle-thickness:var(--spectrum-progress-circle-thickness-large)}@media (forced-colors:active){:host{--highcontrast-progress-circle-fill-border-color:Highlight;--highcontrast-progress-circle-fill-border-color-over-background:Highlight}.track{--spectrum-progress-circle-track-border-style:double}}:host{position:var(--mod-progress-circle-position,relative);direction:ltr;display:inline-block;transform:translateZ(0)}:host,.track{inline-size:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size));block-size:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size))}.track{box-sizing:border-box;border-style:var(--highcontrast-progress-circle-track-border-style,var(--mod-progress-circle-track-border-style,var(--spectrum-progress-circle-track-border-style)));border-width:var(--mod-progress-circle-thickness,var(--spectrum-progress-circle-thickness));border-radius:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size));border-color:var(--mod-progress-circle-track-border-color,var(--spectrum-progress-circle-track-border-color))}.fills{block-size:100%;inline-size:100%;position:absolute;inset-block-start:0;inset-inline-start:0}.fill{box-sizing:border-box;inline-size:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size));block-size:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size));border-style:solid;border-width:var(--mod-progress-circle-thickness,var(--spectrum-progress-circle-thickness));border-radius:var(--mod-progress-circle-size,var(--spectrum-progress-circle-size));border-color:var(--highcontrast-progress-circle-fill-border-color,var(--mod-progress-circle-fill-border-color,var(--spectrum-progress-circle-fill-border-color)))}:host([static=white]) .track{border-color:var(--mod-progress-circle-track-border-color-over-background,var(--spectrum-progress-circle-track-border-color-over-background))}:host([static=white]) .fill{border-color:var(--highcontrast-progress-circle-fill-border-color-over-background,var(--mod-progress-circle-fill-border-color-over-background,var(--spectrum-progress-circle-fill-border-color-over-background)))}.fillMask1,.fillMask2{transform-origin:100%;block-size:100%;inline-size:50%;position:absolute;overflow:hidden;transform:rotate(180deg)}.fillSubMask1,.fillSubMask2{transform-origin:100%;block-size:100%;inline-size:100%;overflow:hidden;transform:rotate(-180deg)}.fillMask2{transform:rotate(0)}:host([indeterminate]) .fills{will-change:transform;transform-origin:50%;animation:1s cubic-bezier(.25,.78,.48,.89) infinite c;transform:translateZ(0)}:host([indeterminate]) .fillSubMask1{will-change:transform;animation:1s linear infinite a;transform:translateZ(0)}:host([indeterminate]) .fillSubMask2{will-change:transform;animation:1s linear infinite b;transform:translateZ(0)}:host{block-size:var(--mod-progress-circle-size,var(--_spectrum-progress-circle-size));inline-size:var(--mod-progress-circle-size,var(--_spectrum-progress-circle-size));--spectrum-progress-circle-size:inherit;--spectrum-progresscircle-m-over-background-track-fill-color:var(--spectrum-alias-track-fill-color-overbackground);--_spectrum-progress-circle-size:var(--spectrum-progress-circle-size,var(--spectrum-progress-circle-size-medium))}:host([size=s]){--_spectrum-progress-circle-size:var(--spectrum-progress-circle-size,var(--spectrum-progress-circle-size-small))}:host([size=l]){--_spectrum-progress-circle-size:var(--spectrum-progress-circle-size,var(--spectrum-progress-circle-size-large))}slot{display:none}.track,.fill{block-size:var(--mod-progress-circle-size,var(--_spectrum-progress-circle-size));border-radius:var(--mod-progress-circle-size,var(--_spectrum-progress-circle-size));inline-size:var(--mod-progress-circle-size,var(--_spectrum-progress-circle-size))}:host([indeterminate]) .fills,:host([indeterminate]) .fillSubMask1,:host([indeterminate]) .fillSubMask2{animation-duration:var(--spectrum-animation-duration-2000)}
`;
    progress_circle_css_default = e5;
  }
});

// ../node_modules/@spectrum-web-components/progress-circle/src/ProgressCircle.js
var p5, c6, i2, ProgressCircle;
var init_ProgressCircle = __esm({
  "../node_modules/@spectrum-web-components/progress-circle/src/ProgressCircle.js"() {
    "use strict";
    init_src();
    init_decorators();
    init_get_label_from_slot();
    init_directives();
    init_progress_circle_css();
    p5 = Object.defineProperty;
    c6 = Object.getOwnPropertyDescriptor;
    i2 = (o13, s10, e16, r9) => {
      for (var t13 = r9 > 1 ? void 0 : r9 ? c6(s10, e16) : s10, l7 = o13.length - 1, n6; l7 >= 0; l7--)
        (n6 = o13[l7]) && (t13 = (r9 ? n6(s10, e16, t13) : n6(t13)) || t13);
      return r9 && t13 && p5(s10, e16, t13), t13;
    };
    ProgressCircle = class extends SizedMixin(SpectrumElement, { validSizes: ["s", "m", "l"] }) {
      constructor() {
        super(...arguments);
        this.indeterminate = false;
        this.label = "";
        this.overBackground = false;
        this.progress = 0;
      }
      static get styles() {
        return [progress_circle_css_default];
      }
      makeRotation(e16) {
        return this.indeterminate ? void 0 : `transform: rotate(${e16}deg);`;
      }
      willUpdate(e16) {
        e16.has("overBackground") && (this.static = this.overBackground ? "white" : this.static || void 0);
      }
      render() {
        const e16 = [this.makeRotation(-180 + 3.6 * Math.min(this.progress, 50)), this.makeRotation(-180 + 3.6 * Math.max(this.progress - 50, 0))], r9 = ["Mask1", "Mask2"];
        return src_exports.html`
            <slot @slotchange=${this.handleSlotchange}></slot>
            <div class="track"></div>
            <div class="fills">
                ${r9.map((t13, l7) => src_exports.html`
                        <div class="fill${t13}">
                            <div
                                class="fillSub${t13}"
                                style=${ifDefined(e16[l7])}
                            >
                                <div class="fill"></div>
                            </div>
                        </div>
                    `)}
            </div>
        `;
      }
      handleSlotchange() {
        const e16 = getLabelFromSlot(this.label, this.slotEl);
        e16 && (this.label = e16);
      }
      firstUpdated(e16) {
        super.firstUpdated(e16), this.hasAttribute("role") || this.setAttribute("role", "progressbar");
      }
      updated(e16) {
        super.updated(e16), !this.indeterminate && e16.has("progress") ? this.setAttribute("aria-valuenow", "" + this.progress) : this.hasAttribute("aria-valuenow") && this.removeAttribute("aria-valuenow"), e16.has("label") && (this.label.length ? this.setAttribute("aria-label", this.label) : e16.get("label") === this.getAttribute("aria-label") && this.removeAttribute("aria-label"));
      }
    };
    i2([(0, decorators_exports.property)({ type: Boolean, reflect: true })], ProgressCircle.prototype, "indeterminate", 2), i2([(0, decorators_exports.property)({ type: String })], ProgressCircle.prototype, "label", 2), i2([(0, decorators_exports.property)({ type: Boolean, reflect: true, attribute: "over-background" })], ProgressCircle.prototype, "overBackground", 2), i2([(0, decorators_exports.property)({ reflect: true })], ProgressCircle.prototype, "static", 2), i2([(0, decorators_exports.property)({ type: Number })], ProgressCircle.prototype, "progress", 2), i2([(0, decorators_exports.query)("slot")], ProgressCircle.prototype, "slotEl", 2);
  }
});

// ../node_modules/@spectrum-web-components/progress-circle/sp-progress-circle.js
var sp_progress_circle_exports = {};
var init_sp_progress_circle = __esm({
  "../node_modules/@spectrum-web-components/progress-circle/sp-progress-circle.js"() {
    "use strict";
    init_ProgressCircle();
    init_define_element();
    defineElement("sp-progress-circle", ProgressCircle);
  }
});

// ../node_modules/@spectrum-web-components/shared/src/focusable-selectors.js
var e11, o6, userFocusableSelector, focusableSelector;
var init_focusable_selectors = __esm({
  "../node_modules/@spectrum-web-components/shared/src/focusable-selectors.js"() {
    "use strict";
    e11 = ["button", "[focusable]", "[href]", "input", "label", "select", "textarea", "[tabindex]"];
    o6 = ':not([tabindex="-1"])';
    userFocusableSelector = e11.join(`${o6}, `) + o6;
    focusableSelector = e11.join(", ");
  }
});

// ../node_modules/@spectrum-web-components/shared/src/first-focusable-in.js
var firstFocusableIn, firstFocusableSlottedIn;
var init_first_focusable_in = __esm({
  "../node_modules/@spectrum-web-components/shared/src/first-focusable-in.js"() {
    "use strict";
    init_focusable_selectors();
    firstFocusableIn = (e16) => e16.querySelector(userFocusableSelector);
    firstFocusableSlottedIn = (e16) => e16.assignedElements().find((o13) => o13.matches(userFocusableSelector));
  }
});

// ../node_modules/@spectrum-web-components/shared/src/get-active-element.js
var init_get_active_element = __esm({
  "../node_modules/@spectrum-web-components/shared/src/get-active-element.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/shared/src/observe-slot-presence.js
function ObserveSlotPresence(l7, s10) {
  var o13, i12;
  const r9 = Array.isArray(s10) ? s10 : [s10];
  class a10 extends (i12 = l7, o13 = t9, i12) {
    constructor(...e16) {
      super(e16);
      this[o13] = /* @__PURE__ */ new Map();
      this.managePresenceObservedSlot = () => {
        let e17 = false;
        r9.forEach((n6) => {
          const c12 = !!this.querySelector(`:scope > ${n6}`), g5 = this[t9].get(n6) || false;
          e17 = e17 || g5 !== c12, this[t9].set(n6, !!this.querySelector(`:scope > ${n6}`));
        }), e17 && this.updateComplete.then(() => {
          this.requestUpdate();
        });
      };
      new t3(this, { config: { childList: true, subtree: true }, callback: () => {
        this.managePresenceObservedSlot();
      } }), this.managePresenceObservedSlot();
    }
    get slotContentIsPresent() {
      if (r9.length === 1)
        return this[t9].get(r9[0]) || false;
      throw new Error("Multiple selectors provided to `ObserveSlotPresence` use `getSlotContentPresence(selector: string)` instead.");
    }
    getSlotContentPresence(e16) {
      if (this[t9].has(e16))
        return this[t9].get(e16) || false;
      throw new Error(`The provided selector \`${e16}\` is not being observed.`);
    }
  }
  return a10;
}
var t9;
var init_observe_slot_presence = __esm({
  "../node_modules/@spectrum-web-components/shared/src/observe-slot-presence.js"() {
    "use strict";
    init_mutation_controller();
    t9 = Symbol("slotContentIsPresent");
  }
});

// ../node_modules/@spectrum-web-components/shared/src/platform.js
function n4(o13) {
  return typeof window != "undefined" && window.navigator != null ? o13.test(window.navigator.userAgent) : false;
}
function e12(o13) {
  return typeof window != "undefined" && window.navigator != null ? o13.test(window.navigator.platform) : false;
}
function isMac() {
  return e12(/^Mac/);
}
function isIPhone() {
  return e12(/^iPhone/);
}
function isIPad() {
  return e12(/^iPad/) || isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAndroid() {
  return n4(/Android/);
}
var init_platform = __esm({
  "../node_modules/@spectrum-web-components/shared/src/platform.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/shared/src/reparent-children.js
function T2(o13, i12, l7 = []) {
  for (let e16 = 0; e16 < i12.length; ++e16) {
    const n6 = i12[e16], r9 = o13[e16], t13 = r9.parentElement || r9.getRootNode();
    l7[e16] && l7[e16](n6), t13 && t13 !== r9 && t13.replaceChild(n6, r9), delete o13[e16];
  }
  return i12;
}
var reparentChildren;
var init_reparent_children = __esm({
  "../node_modules/@spectrum-web-components/shared/src/reparent-children.js"() {
    "use strict";
    reparentChildren = (o13, i12, { position: l7, prepareCallback: e16 } = { position: "beforeend" }) => {
      let { length: n6 } = o13;
      if (n6 === 0)
        return () => o13;
      let r9 = 1, t13 = 0;
      (l7 === "afterbegin" || l7 === "afterend") && (r9 = -1, t13 = n6 - 1);
      const a10 = new Array(n6), c12 = new Array(n6), p13 = document.createComment("placeholder for reparented element");
      do {
        const d12 = o13[t13];
        e16 && (c12[t13] = e16(d12)), a10[t13] = p13.cloneNode();
        const m9 = d12.parentElement || d12.getRootNode();
        m9 && m9 !== d12 && m9.replaceChild(a10[t13], d12), i12.insertAdjacentElement(l7, d12), t13 += r9;
      } while (--n6 > 0);
      return function() {
        return T2(a10, o13, c12);
      };
    };
  }
});

// ../node_modules/@spectrum-web-components/shared/src/random-id.js
function randomID() {
  return Array.from(crypto.getRandomValues(new Uint8Array(4)), (r9) => `0${(r9 & 255).toString(16)}`.slice(-2)).join("");
}
var init_random_id = __esm({
  "../node_modules/@spectrum-web-components/shared/src/random-id.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/shared/src/index.js
var init_src2 = __esm({
  "../node_modules/@spectrum-web-components/shared/src/index.js"() {
    "use strict";
    init_first_focusable_in();
    init_focus_visible();
    init_focusable();
    init_focusable_selectors();
    init_get_active_element();
    init_like_anchor();
    init_observe_slot_presence();
    init_observe_slot_text();
    init_platform();
    init_reparent_children();
    init_get_label_from_slot();
    init_random_id();
  }
});

// ../node_modules/@spectrum-web-components/base/src/condition-attribute-with-id.js
function conditionAttributeWithoutId(t13, i12, n6) {
  const e16 = t13.getAttribute(i12);
  let r9 = e16 ? e16.split(/\s+/) : [];
  r9 = r9.filter((s10) => !n6.find((o13) => s10 === o13)), r9.length ? t13.setAttribute(i12, r9.join(" ")) : t13.removeAttribute(i12);
}
function conditionAttributeWithId(t13, i12, n6) {
  const e16 = Array.isArray(n6) ? n6 : [n6], r9 = t13.getAttribute(i12), s10 = r9 ? r9.split(/\s+/) : [];
  return e16.every((d12) => s10.indexOf(d12) > -1) ? () => {
  } : (s10.push(...e16), t13.setAttribute(i12, s10.join(" ")), () => conditionAttributeWithoutId(t13, i12, e16));
}
var init_condition_attribute_with_id = __esm({
  "../node_modules/@spectrum-web-components/base/src/condition-attribute-with-id.js"() {
    "use strict";
  }
});

// ../node_modules/@spectrum-web-components/reactive-controllers/src/ElementResolution.js
var elementResolverUpdatedSymbol, ElementResolutionController;
var init_ElementResolution = __esm({
  "../node_modules/@spectrum-web-components/reactive-controllers/src/ElementResolution.js"() {
    "use strict";
    elementResolverUpdatedSymbol = Symbol("element resolver updated");
    ElementResolutionController = class {
      constructor(e16, { selector: t13 } = { selector: "" }) {
        this._element = null;
        this._selector = "";
        this.mutationCallback = (e17) => {
          let t14 = false;
          e17.forEach((s10) => {
            if (!t14) {
              if (s10.type === "childList") {
                const r9 = this.element && [...s10.removedNodes].includes(this.element), l7 = !!this.selector && [...s10.addedNodes].some(this.elementIsSelected);
                t14 = t14 || r9 || l7;
              }
              if (s10.type === "attributes") {
                const r9 = s10.target === this.element, l7 = !!this.selector && this.elementIsSelected(s10.target);
                t14 = t14 || r9 || l7;
              }
            }
          }), t14 && this.resolveElement();
        };
        this.elementIsSelected = (e17) => {
          var t14;
          return this.selectorIsId ? (e17 == null ? void 0 : e17.id) === this.selectorAsId : (t14 = e17 == null ? void 0 : e17.matches) == null ? void 0 : t14.call(e17, this.selector);
        };
        this.host = e16, this.selector = t13, this.observer = new MutationObserver(this.mutationCallback), this.host.addController(this);
      }
      get element() {
        return this._element;
      }
      set element(e16) {
        if (e16 === this.element)
          return;
        const t13 = this.element;
        this._element = e16, this.host.requestUpdate(elementResolverUpdatedSymbol, t13);
      }
      get selector() {
        return this._selector;
      }
      set selector(e16) {
        e16 !== this.selector && (this.releaseElement(), this._selector = e16, this.resolveElement());
      }
      get selectorAsId() {
        return this.selector.slice(1);
      }
      get selectorIsId() {
        return !!this.selector && this.selector.startsWith("#");
      }
      hostConnected() {
        this.resolveElement(), this.observer.observe(this.host.getRootNode(), { subtree: true, childList: true, attributes: true });
      }
      hostDisconnected() {
        this.releaseElement(), this.observer.disconnect();
      }
      resolveElement() {
        if (!this.selector) {
          this.releaseElement();
          return;
        }
        const e16 = this.host.getRootNode();
        this.element = this.selectorIsId ? e16.getElementById(this.selectorAsId) : e16.querySelector(this.selector);
      }
      releaseElement() {
        this.element = null;
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/overlay-timer.js
var OverlayTimer;
var init_overlay_timer = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/overlay-timer.js"() {
    "use strict";
    OverlayTimer = class {
      constructor(e16 = {}) {
        this.warmUpDelay = 1e3;
        this.coolDownDelay = 1e3;
        this.isWarm = false;
        this.timeout = 0;
        Object.assign(this, e16);
      }
      async openTimer(e16) {
        if (this.cancelCooldownTimer(), !this.component || e16 !== this.component)
          return this.component && (this.close(this.component), this.cancelCooldownTimer()), this.component = e16, this.isWarm ? false : (this.promise = new Promise((o13) => {
            this.resolve = o13, this.timeout = window.setTimeout(() => {
              this.resolve && (this.resolve(false), this.isWarm = true);
            }, this.warmUpDelay);
          }), this.promise);
        if (this.promise)
          return this.promise;
        throw new Error("Inconsistent state");
      }
      close(e16) {
        this.component && this.component === e16 && (this.resetCooldownTimer(), this.timeout > 0 && (clearTimeout(this.timeout), this.timeout = 0), this.resolve && (this.resolve(true), delete this.resolve), delete this.promise, delete this.component);
      }
      resetCooldownTimer() {
        this.isWarm && (this.cooldownTimeout && window.clearTimeout(this.cooldownTimeout), this.cooldownTimeout = window.setTimeout(() => {
          this.isWarm = false, delete this.cooldownTimeout;
        }, this.coolDownDelay));
      }
      cancelCooldownTimer() {
        this.cooldownTimeout && window.clearTimeout(this.cooldownTimeout), delete this.cooldownTimeout;
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/AbstractOverlay.js
function nextFrame() {
  return new Promise((i12) => requestAnimationFrame(() => i12()));
}
var overlayTimer, noop, guaranteedAllTransitionend, AbstractOverlay;
var init_AbstractOverlay = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/AbstractOverlay.js"() {
    "use strict";
    init_src();
    init_reparent_children();
    init_overlay_timer();
    overlayTimer = new OverlayTimer();
    noop = () => {
    };
    guaranteedAllTransitionend = (i12, v2, e16) => {
      const r9 = new AbortController(), n6 = /* @__PURE__ */ new Map(), a10 = () => {
        r9.abort(), e16();
      };
      let m9, l7;
      const t13 = requestAnimationFrame(() => {
        m9 = requestAnimationFrame(() => {
          l7 = requestAnimationFrame(() => {
            a10();
          });
        });
      }), p13 = (o13) => {
        o13.target === i12 && (n6.set(o13.propertyName, n6.get(o13.propertyName) - 1), n6.get(o13.propertyName) || n6.delete(o13.propertyName), n6.size === 0 && a10());
      }, d12 = (o13) => {
        o13.target === i12 && (n6.has(o13.propertyName) || n6.set(o13.propertyName, 0), n6.set(o13.propertyName, n6.get(o13.propertyName) + 1), cancelAnimationFrame(t13), cancelAnimationFrame(m9), cancelAnimationFrame(l7));
      };
      i12.addEventListener("transitionrun", d12, { signal: r9.signal }), i12.addEventListener("transitionend", p13, { signal: r9.signal }), i12.addEventListener("transitioncancel", p13, { signal: r9.signal }), v2();
    };
    AbstractOverlay = class _AbstractOverlay extends SpectrumElement {
      constructor() {
        super(...arguments);
        this.dispose = noop;
        this.offset = 0;
        this.willPreventClose = false;
      }
      async applyFocus(e16, r9) {
      }
      get delayed() {
        return false;
      }
      set delayed(e16) {
      }
      get disabled() {
        return false;
      }
      set disabled(e16) {
      }
      get elementResolver() {
        return this._elementResolver;
      }
      set elementResolver(e16) {
        this._elementResolver = e16;
      }
      async ensureOnDOM(e16) {
      }
      async makeTransition(e16) {
        return null;
      }
      async manageDelay(e16) {
      }
      async manageDialogOpen() {
      }
      async managePopoverOpen() {
      }
      managePosition() {
      }
      get open() {
        return false;
      }
      set open(e16) {
      }
      get placementController() {
        return this._placementController;
      }
      set placementController(e16) {
        this._placementController = e16;
      }
      requestSlottable() {
      }
      returnFocus() {
      }
      get state() {
        return "closed";
      }
      set state(e16) {
      }
      manuallyKeepOpen() {
      }
      static update() {
        const e16 = new CustomEvent("sp-update-overlays", { bubbles: true, composed: true, cancelable: true });
        document.dispatchEvent(e16);
      }
      static async open(e16, r9, n6, a10) {
        await Promise.resolve().then(() => (init_sp_overlay(), sp_overlay_exports));
        const m9 = arguments.length === 2, l7 = n6 || e16, t13 = new this();
        let p13 = false;
        t13.dispose = () => {
          t13.addEventListener("sp-closed", () => {
            p13 || (d12(), p13 = true), requestAnimationFrame(() => {
              t13.remove();
            });
          }), t13.open = false, t13.dispose = noop;
        };
        const d12 = reparentChildren([l7], t13, { position: "beforeend", prepareCallback: (s10) => {
          const c12 = s10.slot;
          return s10.removeAttribute("slot"), () => {
            s10.slot = c12;
          };
        } });
        if (!m9 && l7 && a10) {
          const s10 = e16, c12 = r9, u13 = a10;
          return _AbstractOverlay.applyOptions(t13, { ...u13, delayed: u13.delayed || l7.hasAttribute("delayed"), trigger: u13.virtualTrigger || s10, type: c12 === "modal" ? "modal" : c12 === "hover" ? "hint" : "auto" }), s10.insertAdjacentElement("afterend", t13), await t13.updateComplete, t13.open = true, t13.dispose;
        }
        const y2 = r9;
        return t13.append(l7), _AbstractOverlay.applyOptions(t13, { ...y2, delayed: y2.delayed || l7.hasAttribute("delayed") }), t13.updateComplete.then(() => {
          t13.open = true;
        }), t13;
      }
      static applyOptions(e16, r9) {
        var n6, a10;
        e16.delayed = !!r9.delayed, e16.receivesFocus = (n6 = r9.receivesFocus) != null ? n6 : "auto", e16.triggerElement = r9.trigger || null, e16.type = r9.type || "modal", e16.offset = (a10 = r9.offset) != null ? a10 : 0, e16.placement = r9.placement, e16.willPreventClose = !!r9.notImmediatelyClosable;
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/VirtualTrigger.js
var VirtualTrigger;
var init_VirtualTrigger = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/VirtualTrigger.js"() {
    "use strict";
    init_AbstractOverlay();
    VirtualTrigger = class {
      constructor(t13, i12) {
        this.x = 0;
        this.y = 0;
        this.x = t13, this.y = i12;
      }
      updateBoundingClientRect(t13, i12) {
        this.x = t13, this.y = i12, AbstractOverlay.update();
      }
      getBoundingClientRect() {
        return { width: 0, height: 0, top: this.y, right: this.x, y: this.y, x: this.x, bottom: this.y, left: this.x, toJSON() {
        } };
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/events.js
var BeforetoggleClosedEvent, BeforetoggleOpenEvent, OverlayStateEvent;
var init_events = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/events.js"() {
    "use strict";
    BeforetoggleClosedEvent = class extends Event {
      constructor() {
        super("beforetoggle", { bubbles: false, composed: false });
        this.currentState = "open";
        this.newState = "closed";
      }
    };
    BeforetoggleOpenEvent = class extends Event {
      constructor() {
        super("beforetoggle", { bubbles: false, composed: false });
        this.currentState = "closed";
        this.newState = "open";
      }
    };
    OverlayStateEvent = class extends Event {
      constructor(r9, l7, { publish: o13, interaction: s10, reason: n6 }) {
        super(r9, { bubbles: o13, composed: o13 });
        this.overlay = l7;
        this.detail = { interaction: s10, reason: n6 };
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/OverlayDialog.js
function OverlayDialog(h9) {
  class p13 extends h9 {
    async manageDialogOpen() {
      const e16 = this.open;
      if (await this.managePosition(), this.open !== e16)
        return;
      const i12 = await this.dialogMakeTransition(e16);
      this.open === e16 && await this.dialogApplyFocus(e16, i12);
    }
    async dialogMakeTransition(e16) {
      let i12 = null;
      const m9 = (t13, s10) => async () => {
        if (t13.open = e16, !e16) {
          const n6 = () => {
            t13.removeEventListener("close", n6), a10(t13, s10);
          };
          t13.addEventListener("close", n6);
        }
        if (s10 > 0)
          return;
        const o13 = e16 ? BeforetoggleOpenEvent : BeforetoggleClosedEvent;
        this.dispatchEvent(new o13()), e16 && (t13.matches(userFocusableSelector) && (i12 = t13), i12 = i12 || firstFocusableIn(t13), i12 || t13.querySelectorAll("slot").forEach((r9) => {
          i12 || (i12 = firstFocusableSlottedIn(r9));
        }), !(!this.isConnected || this.dialogEl.open) && this.dialogEl.showModal());
      }, a10 = (t13, s10) => () => {
        if (this.open !== e16)
          return;
        const o13 = e16 ? "sp-opened" : "sp-closed";
        if (s10 > 0) {
          t13.dispatchEvent(new OverlayStateEvent(o13, this, { interaction: this.type, publish: false }));
          return;
        }
        if (!this.isConnected || e16 !== this.open)
          return;
        const n6 = async () => {
          const r9 = this.triggerElement instanceof VirtualTrigger;
          this.dispatchEvent(new OverlayStateEvent(o13, this, { interaction: this.type, publish: r9 })), t13.dispatchEvent(new OverlayStateEvent(o13, this, { interaction: this.type, publish: false })), this.triggerElement && !r9 && this.triggerElement.dispatchEvent(new OverlayStateEvent(o13, this, { interaction: this.type, publish: true })), this.state = e16 ? "opened" : "closed", this.returnFocus(), await nextFrame(), await nextFrame(), e16 === this.open && e16 === false && this.requestSlottable();
        };
        !e16 && this.dialogEl.open ? (this.dialogEl.addEventListener("close", () => {
          n6();
        }, { once: true }), this.dialogEl.close()) : n6();
      };
      return this.elements.forEach((t13, s10) => {
        guaranteedAllTransitionend(t13, m9(t13, s10), a10(t13, s10));
      }), i12;
    }
    async dialogApplyFocus(e16, i12) {
      this.applyFocus(e16, i12);
    }
  }
  return p13;
}
var init_OverlayDialog = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/OverlayDialog.js"() {
    "use strict";
    init_first_focusable_in();
    init_VirtualTrigger();
    init_AbstractOverlay();
    init_events();
    init_src2();
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/OverlayPopover.js
function f2(a10) {
  let c12 = false;
  try {
    c12 = a10.matches(":popover-open");
  } catch (e16) {
  }
  let p13 = false;
  try {
    p13 = a10.matches(":open");
  } catch (e16) {
  }
  return c12 || p13;
}
function OverlayPopover(a10) {
  class c12 extends a10 {
    async manageDelay(e16) {
      if (e16 === false || e16 !== this.open) {
        overlayTimer.close(this);
        return;
      }
      this.delayed && await overlayTimer.openTimer(this) && (this.open = !e16);
    }
    async shouldHidePopover(e16) {
      if (e16 && this.open !== e16)
        return;
      const o13 = async ({ newState: i12 } = {}) => {
        i12 !== "open" && await this.placementController.resetOverlayPosition();
      };
      if (!f2(this.dialogEl)) {
        o13();
        return;
      }
      this.dialogEl.addEventListener("toggle", o13, { once: true });
    }
    async shouldShowPopover(e16) {
      let o13 = false;
      try {
        o13 = this.dialogEl.matches(":popover-open");
      } catch (u13) {
      }
      let i12 = false;
      try {
        i12 = this.dialogEl.matches(":open");
      } catch (u13) {
      }
      e16 && this.open === e16 && !o13 && !i12 && this.isConnected && (this.dialogEl.showPopover(), await this.managePosition());
    }
    async ensureOnDOM(e16) {
      await nextFrame(), C || await this.shouldHidePopover(e16), await this.shouldShowPopover(e16), await nextFrame();
    }
    async makeTransition(e16) {
      if (this.open !== e16)
        return null;
      let o13 = null;
      const i12 = (t13, s10) => () => {
        if (t13.open = e16, s10 === 0) {
          const r9 = e16 ? BeforetoggleOpenEvent : BeforetoggleClosedEvent;
          this.dispatchEvent(new r9());
        }
        if (!e16 || (t13.matches(userFocusableSelector) && (o13 = t13), o13 = o13 || firstFocusableIn(t13), o13))
          return;
        t13.querySelectorAll("slot").forEach((r9) => {
          o13 || (o13 = firstFocusableSlottedIn(r9));
        });
      }, u13 = (t13, s10) => async () => {
        if (this.open !== e16)
          return;
        const n6 = e16 ? "sp-opened" : "sp-closed";
        if (s10 > 0) {
          t13.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: false }));
          return;
        }
        const r9 = async () => {
          if (this.open !== e16)
            return;
          await nextFrame();
          const d12 = this.triggerElement instanceof VirtualTrigger;
          this.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: d12 })), t13.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: false })), this.triggerElement && !d12 && this.triggerElement.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: true })), this.state = e16 ? "opened" : "closed", this.returnFocus(), await nextFrame(), await nextFrame(), e16 === this.open && e16 === false && this.requestSlottable();
        };
        if (this.open !== e16)
          return;
        const v2 = f2(this.dialogEl);
        e16 !== true && v2 && this.isConnected ? (this.dialogEl.addEventListener("beforetoggle", () => {
          r9();
        }, { once: true }), this.dialogEl.hidePopover()) : r9();
      };
      return this.elements.forEach((t13, s10) => {
        guaranteedAllTransitionend(t13, i12(t13, s10), u13(t13, s10));
      }), o13;
    }
  }
  return c12;
}
var C;
var init_OverlayPopover = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/OverlayPopover.js"() {
    "use strict";
    init_first_focusable_in();
    init_VirtualTrigger();
    init_AbstractOverlay();
    init_events();
    init_src2();
    C = CSS.supports("(overlay: auto)");
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/OverlayNoPopover.js
function OverlayNoPopover(a10) {
  class m9 extends a10 {
    async managePopoverOpen() {
      await this.managePosition();
    }
    async manageDelay(e16) {
      if (e16 === false || e16 !== this.open) {
        overlayTimer.close(this);
        return;
      }
      this.delayed && await overlayTimer.openTimer(this) && (this.open = !e16);
    }
    async ensureOnDOM(e16) {
      document.body.offsetHeight;
    }
    async makeTransition(e16) {
      if (this.open !== e16)
        return null;
      let o13 = null;
      const h9 = (t13, r9) => () => {
        if (e16 !== this.open)
          return;
        if (t13.open = e16, r9 === 0) {
          const i12 = e16 ? BeforetoggleOpenEvent : BeforetoggleClosedEvent;
          this.dispatchEvent(new i12());
        }
        if (e16 !== true || (t13.matches(userFocusableSelector) && (o13 = t13), o13 = o13 || firstFocusableIn(t13), o13))
          return;
        t13.querySelectorAll("slot").forEach((i12) => {
          o13 || (o13 = firstFocusableSlottedIn(i12));
        });
      }, u13 = (t13, r9) => async () => {
        if (this.open !== e16)
          return;
        const n6 = e16 ? "sp-opened" : "sp-closed";
        if (t13.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type })), r9 > 0)
          return;
        const i12 = this.triggerElement instanceof VirtualTrigger;
        this.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: i12 })), this.triggerElement && !i12 && this.triggerElement.dispatchEvent(new OverlayStateEvent(n6, this, { interaction: this.type, publish: true })), this.state = e16 ? "opened" : "closed", this.returnFocus(), await nextFrame(), await nextFrame(), e16 === this.open && e16 === false && this.requestSlottable();
      };
      return this.elements.forEach((t13, r9) => {
        guaranteedAllTransitionend(t13, h9(t13, r9), u13(t13, r9));
      }), o13;
    }
  }
  return m9;
}
var init_OverlayNoPopover = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/OverlayNoPopover.js"() {
    "use strict";
    init_first_focusable_in();
    init_VirtualTrigger();
    init_AbstractOverlay();
    init_events();
    init_src2();
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/OverlayStack.js
var c10, h8, overlayStack;
var init_OverlayStack = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/OverlayStack.js"() {
    "use strict";
    c10 = "showPopover" in document.createElement("div");
    h8 = class {
      constructor() {
        this.root = document.body;
        this.stack = [];
        this.handlePointerdown = (t13) => {
          this.pointerdownPath = t13.composedPath(), this.lastOverlay = this.stack.at(-1);
        };
        this.handlePointerup = () => {
          const t13 = this.pointerdownPath;
          if (this.pointerdownPath = void 0, !this.stack.length || !(t13 != null && t13.length))
            return;
          const e16 = this.stack.length - 1, s10 = this.stack.filter((n6, i12) => !t13.find((a10) => a10 === n6 || a10 === (n6 == null ? void 0 : n6.triggerElement) && (n6 == null ? void 0 : n6.type) === "hint" || i12 === e16 && n6 !== this.lastOverlay && n6.triggerInteraction === "longpress") && !n6.shouldPreventClose() && n6.type !== "manual");
          s10.reverse(), s10.forEach((n6) => {
            this.closeOverlay(n6);
            let i12 = n6.parentOverlayToForceClose;
            for (; i12; )
              this.closeOverlay(i12), i12 = i12.parentOverlayToForceClose;
          });
        };
        this.handleBeforetoggle = (t13) => {
          const { target: e16, newState: s10 } = t13;
          s10 !== "open" && this.closeOverlay(e16);
        };
        this.handleKeydown = (t13) => {
          if (t13.code !== "Escape" || !this.stack.length)
            return;
          const e16 = this.stack.at(-1);
          if ((e16 == null ? void 0 : e16.type) === "page") {
            t13.preventDefault();
            return;
          }
          c10 || (e16 == null ? void 0 : e16.type) !== "manual" && e16 && this.closeOverlay(e16);
        };
        this.bindEvents();
      }
      get document() {
        return this.root.ownerDocument || document;
      }
      bindEvents() {
        this.document.addEventListener("pointerdown", this.handlePointerdown), this.document.addEventListener("pointerup", this.handlePointerup), this.document.addEventListener("keydown", this.handleKeydown);
      }
      closeOverlay(t13) {
        const e16 = this.stack.indexOf(t13);
        e16 > -1 && this.stack.splice(e16, 1), t13.open = false;
      }
      overlaysByTriggerElement(t13) {
        return this.stack.filter((e16) => e16.triggerElement === t13);
      }
      add(t13) {
        if (this.stack.includes(t13)) {
          const e16 = this.stack.indexOf(t13);
          e16 > -1 && (this.stack.splice(e16, 1), this.stack.push(t13));
          return;
        }
        if (t13.type === "auto" || t13.type === "modal" || t13.type === "page") {
          const e16 = "sp-overlay-query-path", s10 = new Event(e16, { composed: true, bubbles: true });
          t13.addEventListener(e16, (n6) => {
            const i12 = n6.composedPath();
            this.stack.forEach((r9) => {
              !i12.find((o13) => o13 === r9) && r9.type !== "manual" && this.closeOverlay(r9);
            });
          }, { once: true }), t13.dispatchEvent(s10);
        } else if (t13.type === "hint") {
          if (this.stack.some((s10) => s10.type !== "manual" && s10.triggerElement && s10.triggerElement === t13.triggerElement)) {
            t13.open = false;
            return;
          }
          this.stack.forEach((s10) => {
            s10.type === "hint" && this.closeOverlay(s10);
          });
        }
        requestAnimationFrame(() => {
          this.stack.push(t13), t13.addEventListener("beforetoggle", this.handleBeforetoggle, { once: true });
        });
      }
      remove(t13) {
        this.closeOverlay(t13);
      }
    };
    overlayStack = new h8();
  }
});

// ../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x2,
    right: x2 + width,
    bottom: y2 + height,
    x: x2,
    y: y2
  };
}
var min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap;
var init_floating_ui_utils = __esm({
  "../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v2) => ({
      x: v2,
      y: v2
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
  }
});

// ../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var computePosition, arrow, flip, offset, shift, size;
var init_floating_ui_core = __esm({
  "../node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x: x2,
        y: y2
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i12 = 0; i12 < validMiddleware.length; i12++) {
        const {
          name,
          fn
        } = validMiddleware[i12];
        const {
          x: nextX,
          y: nextY,
          data,
          reset
        } = await fn({
          x: x2,
          y: y2,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x2 = nextX != null ? nextX : x2;
        y2 = nextY != null ? nextY : y2;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data
          }
        };
        if (reset && resetCount <= 50) {
          resetCount++;
          if (typeof reset === "object") {
            if (reset.placement) {
              statefulPlacement = reset.placement;
            }
            if (reset.rects) {
              rects = reset.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset.rects;
            }
            ({
              x: x2,
              y: y2
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i12 = -1;
        }
      }
      return {
        x: x2,
        y: y2,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    arrow = (options) => ({
      name: "arrow",
      options,
      async fn(state) {
        const {
          x: x2,
          y: y2,
          placement,
          rects,
          platform: platform2,
          elements,
          middlewareData
        } = state;
        const {
          element,
          padding = 0
        } = evaluate(options, state) || {};
        if (element == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x: x2,
          y: y2
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform2.getDimensions(element);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
        if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
        const min$1 = minPadding;
        const max2 = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset3 = clamp(min$1, center, max2);
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset3,
            centerOffset: center - offset3 - alignmentOffset,
            ...shouldAddOffset && {
              alignmentOffset
            }
          },
          reset: shouldAddOffset
        };
      }
    });
    flip = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "flip",
        options,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const initialSideAxis = getSideAxis(initialPlacement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
          if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d12) => d12.overflows[0] <= 0).sort((a10, b6) => a10.overflows[1] - b6.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$filter2;
                  const placement2 = (_overflowsData$filter2 = overflowsData.filter((d12) => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d12.placement);
                      return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === "y";
                    }
                    return true;
                  }).map((d12) => [d12.placement, d12.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a10, b6) => a10[1] - b6[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    offset = function(options) {
      if (options === void 0) {
        options = 0;
      }
      return {
        name: "offset",
        options,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x: x2,
            y: y2,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x2 + diffCoords.x,
            y: y2 + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "shift",
        options,
        async fn(state) {
          const {
            x: x2,
            y: y2,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x3,
                  y: y3
                } = _ref;
                return {
                  x: x3,
                  y: y3
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const coords = {
            x: x2,
            y: y2
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x2,
              y: limitedCoords.y - y2
            }
          };
        }
      };
    };
    size = function(options) {
      if (options === void 0) {
        options = {};
      }
      return {
        name: "size",
        options,
        async fn(state) {
          const {
            placement,
            rects,
            platform: platform2,
            elements
          } = state;
          const {
            apply = () => {
            },
            ...detectOverflowOptions
          } = evaluate(options, state);
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === "y";
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          const maximumClippingWidth = width - overflow.left - overflow.right;
          const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
          const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if (isYAxis) {
            availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
          } else {
            availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform2.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };
  }
});

// ../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e16) {
      return false;
    }
  });
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css2 = getComputedStyle(element);
  return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isTopLayer(currentNode)) {
      return null;
    }
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
var init_floating_ui_utils_dom = __esm({
  "../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
  }
});

// ../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css2 = getComputedStyle(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x2 = ($ ? round(rect.width) : rect.width) / width;
  let y2 = ($ ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html2 = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html2.scrollWidth, html2.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html2.scrollHeight, html2.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x2 += max(html2.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html2 = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html2.clientWidth;
  let height = html2.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x2 = rect.left + scroll.scrollLeft - offsets.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x2,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
function isRTL(element) {
  return getComputedStyle(element).direction === "rtl";
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e16) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, getElementRects, platform, offset2, shift2, flip2, size2, arrow2, computePosition2;
var init_floating_ui_dom = __esm({
  "../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    getElementRects = async function(data) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      const floatingDimensions = await getDimensionsFn(data.floating);
      return {
        reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
        floating: {
          x: 0,
          y: 0,
          width: floatingDimensions.width,
          height: floatingDimensions.height
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    offset2 = offset;
    shift2 = shift;
    flip2 = flip;
    size2 = size;
    arrow2 = arrow;
    computePosition2 = (reference, floating, options) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/PlacementController.js
function c11(o13) {
  if (typeof o13 == "undefined")
    return 0;
  const t13 = window.devicePixelRatio || 1;
  return Math.round(o13 * t13) / t13;
}
var p11, C2, T3, placementUpdatedSymbol, PlacementController;
var init_PlacementController = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/PlacementController.js"() {
    "use strict";
    init_floating_ui_dom();
    p11 = 8;
    C2 = 100;
    T3 = (o13) => {
      var e16;
      return (e16 = { left: ["right", "bottom", "top"], "left-start": ["right-start", "bottom", "top"], "left-end": ["right-end", "bottom", "top"], right: ["left", "bottom", "top"], "right-start": ["left-start", "bottom", "top"], "right-end": ["left-end", "bottom", "top"], top: ["bottom", "left", "right"], "top-start": ["bottom-start", "left", "right"], "top-end": ["bottom-end", "left", "right"], bottom: ["top", "left", "right"], "bottom-start": ["top-start", "left", "right"], "bottom-end": ["top-end", "left", "right"] }[o13]) != null ? e16 : [o13];
    };
    placementUpdatedSymbol = Symbol("placement updated");
    PlacementController = class {
      constructor(t13) {
        this.originalPlacements = /* @__PURE__ */ new WeakMap();
        this.allowPlacementUpdate = false;
        this.closeForAncestorUpdate = () => {
          !this.allowPlacementUpdate && this.options.type !== "modal" && this.cleanup && this.target.dispatchEvent(new Event("close", { bubbles: true })), this.allowPlacementUpdate = false;
        };
        this.updatePlacement = () => {
          this.computePlacement();
        };
        this.resetOverlayPosition = () => {
          !this.target || !this.options || (this.clearOverlayPosition(), this.host.offsetHeight, this.computePlacement());
        };
        this.host = t13, this.host.addController(this);
      }
      async placeOverlay(t13 = this.target, e16 = this.options) {
        if (this.target = t13, this.options = e16, !t13 || !e16)
          return;
        const m9 = autoUpdate(e16.trigger, t13, this.closeForAncestorUpdate, { ancestorResize: false, elementResize: false, layoutShift: false }), h9 = autoUpdate(e16.trigger, t13, this.updatePlacement, { ancestorScroll: false });
        this.cleanup = () => {
          var n6;
          (n6 = this.host.elements) == null || n6.forEach((a10) => {
            a10.addEventListener("sp-closed", () => {
              const r9 = this.originalPlacements.get(a10);
              r9 && a10.setAttribute("placement", r9), this.originalPlacements.delete(a10);
            }, { once: true });
          }), m9(), h9();
        };
      }
      async computePlacement() {
        var g5, u13;
        const { options: t13, target: e16 } = this;
        await (document.fonts ? document.fonts.ready : Promise.resolve());
        const m9 = t13.trigger instanceof HTMLElement ? flip2() : flip2({ padding: p11, fallbackPlacements: T3(t13.placement) }), [h9 = 0, n6 = 0] = Array.isArray(t13 == null ? void 0 : t13.offset) ? t13.offset : [t13.offset, 0], a10 = (g5 = this.host.elements.find((i12) => i12.tipElement)) == null ? void 0 : g5.tipElement, r9 = [offset2({ mainAxis: h9, crossAxis: n6 }), shift2({ padding: p11 }), m9, size2({ padding: p11, apply: ({ availableWidth: i12, availableHeight: d12, rects: { floating: x2 } }) => {
          const b6 = Math.max(C2, Math.floor(d12)), l7 = x2.height;
          this.initialHeight = this.isConstrained && this.initialHeight || l7, this.isConstrained = l7 < this.initialHeight || b6 <= l7;
          const O = this.isConstrained ? `${b6}px` : "";
          Object.assign(e16.style, { maxWidth: `${Math.floor(i12)}px`, maxHeight: O });
        } }), ...a10 ? [arrow2({ element: a10, padding: t13.tipPadding || p11 })] : []], { x: P2, y: E2, placement: s10, middlewareData: f3 } = await computePosition2(t13.trigger, e16, { placement: t13.placement, middleware: r9, strategy: "fixed" });
        if (Object.assign(e16.style, { top: "0px", left: "0px", translate: `${c11(P2)}px ${c11(E2)}px` }), e16.setAttribute("actual-placement", s10), (u13 = this.host.elements) == null || u13.forEach((i12) => {
          this.originalPlacements.has(i12) || this.originalPlacements.set(i12, i12.getAttribute("placement")), i12.setAttribute("placement", s10);
        }), a10 && f3.arrow) {
          const { x: i12, y: d12 } = f3.arrow;
          Object.assign(a10.style, { top: s10.startsWith("right") || s10.startsWith("left") ? "0px" : "", left: s10.startsWith("bottom") || s10.startsWith("top") ? "0px" : "", translate: `${c11(i12)}px ${c11(d12)}px` });
        }
      }
      clearOverlayPosition() {
        this.target && (this.target.style.removeProperty("max-height"), this.target.style.removeProperty("max-width"), this.initialHeight = void 0, this.isConstrained = false);
      }
      hostConnected() {
        document.addEventListener("sp-update-overlays", this.resetOverlayPosition);
      }
      hostUpdated() {
        var t13;
        this.host.open || ((t13 = this.cleanup) == null || t13.call(this), this.cleanup = void 0);
      }
      hostDisconnected() {
        var t13;
        (t13 = this.cleanup) == null || t13.call(this), this.cleanup = void 0, document.removeEventListener("sp-update-overlays", this.resetOverlayPosition);
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/InteractionController.js
var InteractionTypes, InteractionController;
var init_InteractionController = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/InteractionController.js"() {
    "use strict";
    InteractionTypes = ((r9) => (r9[r9.click = 0] = "click", r9[r9.hover = 1] = "hover", r9[r9.longpress = 2] = "longpress", r9))(InteractionTypes || {});
    InteractionController = class {
      constructor(e16, { overlay: t13, isPersistent: r9, handleOverlayReady: i12 }) {
        this.target = e16;
        this.isLazilyOpen = false;
        this.isPersistent = false;
        this.isPersistent = !!r9, this.handleOverlayReady = i12, this.isPersistent && this.init(), this.overlay = t13;
      }
      get activelyOpening() {
        return false;
      }
      get open() {
        var e16, t13;
        return (t13 = (e16 = this.overlay) == null ? void 0 : e16.open) != null ? t13 : this.isLazilyOpen;
      }
      set open(e16) {
        if (e16 !== this.open) {
          if (this.isLazilyOpen = e16, this.overlay) {
            this.overlay.open = e16;
            return;
          }
          e16 && (customElements.whenDefined("sp-overlay").then(async () => {
            const { Overlay: t13 } = await Promise.resolve().then(() => (init_Overlay(), Overlay_exports));
            this.overlay = new t13(), this.overlay.open = true;
          }), Promise.resolve().then(() => (init_sp_overlay(), sp_overlay_exports)));
        }
      }
      get overlay() {
        return this._overlay;
      }
      set overlay(e16) {
        var t13;
        e16 && this.overlay !== e16 && (this.overlay && this.overlay.removeController(this), this._overlay = e16, this.overlay.addController(this), this.initOverlay(), this.prepareDescription(this.target), (t13 = this.handleOverlayReady) == null || t13.call(this, this.overlay));
      }
      prepareDescription(e16) {
      }
      releaseDescription() {
      }
      shouldCompleteOpen() {
      }
      init() {
      }
      initOverlay() {
      }
      abort() {
        var e16;
        this.releaseDescription(), (e16 = this.abortController) == null || e16.abort();
      }
      hostConnected() {
        this.init();
      }
      hostDisconnected() {
        this.isPersistent || this.abort();
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/LongpressController.js
var g3, LONGPRESS_INSTRUCTIONS, LongpressController;
var init_LongpressController = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/LongpressController.js"() {
    "use strict";
    init_platform();
    init_condition_attribute_with_id();
    init_random_id();
    init_AbstractOverlay();
    init_InteractionController();
    g3 = 300;
    LONGPRESS_INSTRUCTIONS = { touch: "Double tap and long press for additional options", keyboard: "Press Space or Alt+Down Arrow for additional options", mouse: "Click and hold for additional options" };
    LongpressController = class extends InteractionController {
      constructor() {
        super(...arguments);
        this.type = InteractionTypes.longpress;
        this.longpressState = null;
        this.releaseDescription = noop;
        this.handlePointerup = () => {
          var e16;
          clearTimeout(this.timeout), this.target && (this.longpressState = ((e16 = this.overlay) == null ? void 0 : e16.state) === "opening" ? "pressed" : null, document.removeEventListener("pointerup", this.handlePointerup), document.removeEventListener("pointercancel", this.handlePointerup));
        };
      }
      get activelyOpening() {
        return this.longpressState === "opening" || this.longpressState === "pressed";
      }
      handleLongpress() {
        this.open = true, this.longpressState = this.longpressState === "potential" ? "opening" : "pressed";
      }
      handlePointerdown(e16) {
        !this.target || e16.button !== 0 || (this.longpressState = "potential", document.addEventListener("pointerup", this.handlePointerup), document.addEventListener("pointercancel", this.handlePointerup), "holdAffordance" in this.target) || (this.timeout = setTimeout(() => {
          this.target && this.target.dispatchEvent(new CustomEvent("longpress", { bubbles: true, composed: true, detail: { source: "pointer" } }));
        }, g3));
      }
      handleKeydown(e16) {
        const { code: t13, altKey: o13 } = e16;
        o13 && t13 === "ArrowDown" && (e16.stopPropagation(), e16.stopImmediatePropagation());
      }
      handleKeyup(e16) {
        const { code: t13, altKey: o13 } = e16;
        if (t13 === "Space" || o13 && t13 === "ArrowDown") {
          if (!this.target)
            return;
          e16.stopPropagation(), this.target.dispatchEvent(new CustomEvent("longpress", { bubbles: true, composed: true, detail: { source: "keyboard" } })), setTimeout(() => {
            this.longpressState = null;
          });
        }
      }
      prepareDescription(e16) {
        if (this.releaseDescription !== noop || !this.overlay.elements.length)
          return;
        const t13 = document.createElement("div");
        t13.id = `longpress-describedby-descriptor-${randomID()}`;
        const o13 = isIOS() || isAndroid() ? "touch" : "keyboard";
        t13.textContent = LONGPRESS_INSTRUCTIONS[o13], t13.slot = "longpress-describedby-descriptor";
        const n6 = e16.getRootNode(), s10 = this.overlay.getRootNode();
        n6 === s10 ? this.overlay.append(t13) : (t13.hidden = !("host" in n6), e16.insertAdjacentElement("afterend", t13));
        const i12 = conditionAttributeWithId(e16, "aria-describedby", [t13.id]);
        this.releaseDescription = () => {
          i12(), t13.remove(), this.releaseDescription = noop;
        };
      }
      shouldCompleteOpen() {
        this.longpressState = this.longpressState === "pressed" ? null : this.longpressState;
      }
      init() {
        var t13;
        (t13 = this.abortController) == null || t13.abort(), this.abortController = new AbortController();
        const { signal: e16 } = this.abortController;
        this.target.addEventListener("longpress", () => this.handleLongpress(), { signal: e16 }), this.target.addEventListener("pointerdown", (o13) => this.handlePointerdown(o13), { signal: e16 }), this.prepareDescription(this.target), !this.target.holdAffordance && (this.target.addEventListener("keydown", (o13) => this.handleKeydown(o13), { signal: e16 }), this.target.addEventListener("keyup", (o13) => this.handleKeyup(o13), { signal: e16 }));
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/ClickController.js
var ClickController;
var init_ClickController = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/ClickController.js"() {
    "use strict";
    init_InteractionController();
    ClickController = class extends InteractionController {
      constructor() {
        super(...arguments);
        this.type = InteractionTypes.click;
        this.preventNextToggle = false;
      }
      handleClick() {
        this.preventNextToggle || (this.open = !this.open), this.preventNextToggle = false;
      }
      handlePointerdown() {
        this.preventNextToggle = this.open;
      }
      init() {
        var t13;
        (t13 = this.abortController) == null || t13.abort(), this.abortController = new AbortController();
        const { signal: e16 } = this.abortController;
        this.target.addEventListener("click", () => this.handleClick(), { signal: e16 }), this.target.addEventListener("pointerdown", () => this.handlePointerdown(), { signal: e16 });
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/HoverController.js
var d10, HoverController;
var init_HoverController = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/HoverController.js"() {
    "use strict";
    init_condition_attribute_with_id();
    init_random_id();
    init_InteractionController();
    init_AbstractOverlay();
    d10 = 300;
    HoverController = class extends InteractionController {
      constructor() {
        super(...arguments);
        this.type = InteractionTypes.hover;
        this.elementIds = [];
        this.focusedin = false;
        this.pointerentered = false;
      }
      handleTargetFocusin() {
        this.target.matches(":focus-visible") && (this.open = true, this.focusedin = true);
      }
      handleTargetFocusout() {
        this.focusedin = false, !this.pointerentered && (this.open = false);
      }
      handleTargetPointerenter() {
        var e16;
        this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = void 0), !((e16 = this.overlay) != null && e16.disabled) && (this.open = true, this.pointerentered = true);
      }
      handleTargetPointerleave() {
        this.doPointerleave();
      }
      handleHostPointerenter() {
        this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = void 0);
      }
      handleHostPointerleave() {
        this.doPointerleave();
      }
      prepareDescription() {
        if (!this.overlay.elements.length)
          return;
        const e16 = this.target.getRootNode(), t13 = this.overlay.elements[0].getRootNode(), r9 = this.overlay.getRootNode();
        e16 === r9 ? this.prepareOverlayRelativeDescription() : e16 === t13 && this.prepareContentRelativeDescription();
      }
      prepareOverlayRelativeDescription() {
        const e16 = conditionAttributeWithId(this.target, "aria-describedby", [this.overlay.id]);
        this.releaseDescription = () => {
          e16(), this.releaseDescription = noop;
        };
      }
      prepareContentRelativeDescription() {
        const e16 = [], t13 = this.overlay.elements.map((i12) => (e16.push(i12.id), i12.id || (i12.id = `${this.overlay.tagName.toLowerCase()}-helper-${randomID()}`), i12.id));
        this.elementIds = e16;
        const r9 = conditionAttributeWithId(this.target, "aria-describedby", t13);
        this.releaseDescription = () => {
          r9(), this.overlay.elements.map((i12, n6) => {
            i12.id = this.elementIds[n6];
          }), this.releaseDescription = noop;
        };
      }
      doPointerleave() {
        this.pointerentered = false;
        const e16 = this.target;
        this.focusedin && e16.matches(":focus-visible") || (this.hoverTimeout = setTimeout(() => {
          this.open = false;
        }, d10));
      }
      init() {
        var t13;
        (t13 = this.abortController) == null || t13.abort(), this.abortController = new AbortController();
        const { signal: e16 } = this.abortController;
        this.target.addEventListener("focusin", () => this.handleTargetFocusin(), { signal: e16 }), this.target.addEventListener("focusout", () => this.handleTargetFocusout(), { signal: e16 }), this.target.addEventListener("pointerenter", () => this.handleTargetPointerenter(), { signal: e16 }), this.target.addEventListener("pointerleave", () => this.handleTargetPointerleave(), { signal: e16 }), this.overlay && this.initOverlay();
      }
      initOverlay() {
        if (!this.abortController)
          return;
        const { signal: e16 } = this.abortController;
        this.overlay.addEventListener("pointerenter", () => this.handleHostPointerenter(), { signal: e16 }), this.overlay.addEventListener("pointerleave", () => this.handleHostPointerleave(), { signal: e16 });
      }
    };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/strategies.js
var strategies;
var init_strategies = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/strategies.js"() {
    "use strict";
    init_ClickController();
    init_HoverController();
    init_LongpressController();
    strategies = { click: ClickController, longpress: LongpressController, hover: HoverController };
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/slottable-request-event.js
var SlottableRequestEvent, removeSlottableRequest;
var init_slottable_request_event = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/slottable-request-event.js"() {
    "use strict";
    SlottableRequestEvent = class extends Event {
      constructor(e16, n6, t13) {
        super("slottable-request", { bubbles: false, cancelable: true, composed: false }), this.name = e16, this.data = n6, this.slotName = t13 !== void 0 ? `${e16}.${t13}` : e16;
      }
    };
    removeSlottableRequest = Symbol("remove-slottable-request");
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/overlay.css.js
var o12, overlay_css_default;
var init_overlay_css = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/overlay.css.js"() {
    "use strict";
    init_src();
    o12 = src_exports.css`
    :host{pointer-events:none;--swc-overlay-animation-distance:var(--spectrum-spacing-100);display:contents}:host(:has(>sp-tooltip)){--swc-overlay-animation-distance:var(--spectrum-tooltip-animation-distance)}.dialog{box-sizing:border-box;--sp-overlay-open:true;background:0 0;border:0;max-width:calc(100vw - 16px);height:auto;max-height:calc(100dvh - 16px);margin:0;padding:0;display:flex;position:fixed;inset:0 auto auto 0;overflow:visible;opacity:1!important}.dialog:not([is-visible]){display:none}.dialog:focus{outline:none}dialog:modal{--mod-popover-filter:var(--spectrum-popover-filter)}:host(:not([open])) .dialog{--sp-overlay-open:false}.dialog::backdrop{display:none}.dialog:before{content:"";position:absolute;inset:-999em;pointer-events:auto!important}.dialog:not(.not-immediately-closable):before{display:none}.dialog>div{width:100%}::slotted(*){pointer-events:auto;visibility:visible!important}::slotted(sp-popover){position:static}.dialog:not([actual-placement])[placement*=top]{padding-block:var(--swc-overlay-animation-distance);margin-top:var(--swc-overlay-animation-distance)}.dialog:not([actual-placement])[placement*=right]{padding-inline:var(--swc-overlay-animation-distance);margin-left:calc(-1*var(--swc-overlay-animation-distance))}.dialog:not([actual-placement])[placement*=bottom]{padding-block:var(--swc-overlay-animation-distance);margin-top:calc(-1*var(--swc-overlay-animation-distance))}.dialog:not([actual-placement])[placement*=left]{padding-inline:var(--swc-overlay-animation-distance);margin-left:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=top]{padding-block:var(--swc-overlay-animation-distance);margin-top:var(--swc-overlay-animation-distance)}.dialog[actual-placement*=right]{padding-inline:var(--swc-overlay-animation-distance);margin-left:calc(-1*var(--swc-overlay-animation-distance))}.dialog[actual-placement*=bottom]{padding-block:var(--swc-overlay-animation-distance);margin-top:calc(-1*var(--swc-overlay-animation-distance))}.dialog[actual-placement*=left]{padding-inline:var(--swc-overlay-animation-distance);margin-left:var(--swc-overlay-animation-distance)}slot[name=longpress-describedby-descriptor]{display:none}@supports selector(:open){.dialog{opacity:0}.dialog:open{opacity:1;--mod-popover-filter:var(--spectrum-popover-filter)}}@supports selector(:popover-open){.dialog{opacity:0}.dialog:popover-open{opacity:1;--mod-popover-filter:var(--spectrum-popover-filter)}}@supports (overlay:auto){.dialog{transition:all var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s)),translate 0s,display var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s));transition-behavior:allow-discrete;display:none}.dialog:popover-open,.dialog:modal{display:flex}}@supports (not selector(:open)) and (not selector(:popover-open)){:host:not([open]) .dialog{pointer-events:none}.dialog[actual-placement]{z-index:calc(var(--swc-overlay-z-index-base,1000) + var(--swc-overlay-open-count))}}
`;
    overlay_css_default = o12;
  }
});

// ../node_modules/@spectrum-web-components/overlay/src/Overlay.js
var Overlay_exports = {};
__export(Overlay_exports, {
  LONGPRESS_INSTRUCTIONS: () => LONGPRESS_INSTRUCTIONS,
  Overlay: () => Overlay
});
var b5, E, r8, B, p12, i10, Overlay;
var init_Overlay = __esm({
  "../node_modules/@spectrum-web-components/overlay/src/Overlay.js"() {
    "use strict";
    init_src();
    init_decorators();
    init_ElementResolution();
    init_directives();
    init_random_id();
    init_AbstractOverlay();
    init_OverlayDialog();
    init_OverlayPopover();
    init_OverlayNoPopover();
    init_OverlayStack();
    init_VirtualTrigger();
    init_PlacementController();
    init_LongpressController();
    init_strategies();
    init_slottable_request_event();
    init_overlay_css();
    b5 = Object.defineProperty;
    E = Object.getOwnPropertyDescriptor;
    r8 = (u13, a10, e16, t13) => {
      for (var o13 = t13 > 1 ? void 0 : t13 ? E(a10, e16) : a10, s10 = u13.length - 1, l7; s10 >= 0; s10--)
        (l7 = u13[s10]) && (o13 = (t13 ? l7(a10, e16, o13) : l7(o13)) || o13);
      return t13 && o13 && b5(a10, e16, o13), o13;
    };
    B = "showPopover" in document.createElement("div");
    p12 = OverlayDialog(AbstractOverlay);
    B ? p12 = OverlayPopover(p12) : p12 = OverlayNoPopover(p12);
    i10 = class i11 extends p12 {
      constructor() {
        super(...arguments);
        this._delayed = false;
        this._disabled = false;
        this.offset = 0;
        this._open = false;
        this.lastRequestSlottableState = false;
        this.receivesFocus = "auto";
        this._state = "closed";
        this.triggerElement = null;
        this.type = "auto";
        this.wasOpen = false;
        this.closeOnFocusOut = (e16) => {
          if (!e16.relatedTarget)
            return;
          const t13 = new Event("overlay-relation-query", { bubbles: true, composed: true });
          e16.relatedTarget.addEventListener(t13.type, (o13) => {
            o13.composedPath().includes(this) || (this.open = false);
          }), e16.relatedTarget.dispatchEvent(t13);
        };
      }
      get delayed() {
        var e16;
        return ((e16 = this.elements.at(-1)) == null ? void 0 : e16.hasAttribute("delayed")) || this._delayed;
      }
      set delayed(e16) {
        this._delayed = e16;
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e16) {
        var t13;
        this._disabled = e16, e16 ? ((t13 = this.strategy) == null || t13.abort(), this.wasOpen = this.open, this.open = false) : (this.bindEvents(), this.open = this.open || this.wasOpen, this.wasOpen = false);
      }
      get hasNonVirtualTrigger() {
        return !!this.triggerElement && !(this.triggerElement instanceof VirtualTrigger);
      }
      get placementController() {
        return this._placementController || (this._placementController = new PlacementController(this)), this._placementController;
      }
      get open() {
        return this._open;
      }
      set open(e16) {
        var t13;
        e16 && this.disabled || e16 !== this.open && ((t13 = this.strategy) != null && t13.activelyOpening && !e16 || (this._open = e16, this.open && (i11.openCount += 1), this.requestUpdate("open", !this.open), this.open && this.requestSlottable()));
      }
      get state() {
        return this._state;
      }
      set state(e16) {
        var o13;
        if (e16 === this.state)
          return;
        const t13 = this.state;
        this._state = e16, (this.state === "opened" || this.state === "closed") && ((o13 = this.strategy) == null || o13.shouldCompleteOpen()), this.requestUpdate("state", t13);
      }
      get elementResolver() {
        return this._elementResolver || (this._elementResolver = new ElementResolutionController(this)), this._elementResolver;
      }
      get usesDialog() {
        return this.type === "modal" || this.type === "page";
      }
      get popoverValue() {
        if ("popover" in this)
          switch (this.type) {
            case "modal":
            case "page":
              return;
            case "hint":
              return "manual";
            default:
              return this.type;
          }
      }
      get requiresPosition() {
        return !(this.type === "page" || !this.open || !this.triggerElement || !this.placement && this.type !== "hint");
      }
      managePosition() {
        if (!this.requiresPosition || !this.open)
          return;
        const e16 = this.offset || 0, t13 = this.triggerElement, o13 = this.placement || "right", s10 = this.tipPadding;
        this.placementController.placeOverlay(this.dialogEl, { offset: e16, placement: o13, tipPadding: s10, trigger: t13, type: this.type });
      }
      async managePopoverOpen() {
        super.managePopoverOpen();
        const e16 = this.open;
        if (this.open !== e16 || (await this.manageDelay(e16), this.open !== e16) || (await this.ensureOnDOM(e16), this.open !== e16))
          return;
        const t13 = await this.makeTransition(e16);
        this.open === e16 && await this.applyFocus(e16, t13);
      }
      async applyFocus(e16, t13) {
        if (!(this.receivesFocus === "false" || this.type === "hint")) {
          if (await nextFrame(), await nextFrame(), e16 === this.open && !this.open) {
            this.hasNonVirtualTrigger && this.contains(this.getRootNode().activeElement) && this.triggerElement.focus();
            return;
          }
          t13 == null || t13.focus();
        }
      }
      returnFocus() {
        var t13;
        if (this.open || this.type === "hint")
          return;
        const e16 = () => {
          var l7, m9;
          const o13 = [];
          let s10 = document.activeElement;
          for (; (l7 = s10 == null ? void 0 : s10.shadowRoot) != null && l7.activeElement; )
            s10 = s10.shadowRoot.activeElement;
          for (; s10; ) {
            const h9 = s10.assignedSlot || s10.parentElement || ((m9 = s10.getRootNode()) == null ? void 0 : m9.host);
            h9 && o13.push(h9), s10 = h9;
          }
          return o13;
        };
        this.receivesFocus !== "false" && ((t13 = this.triggerElement) != null && t13.focus) && (this.contains(this.getRootNode().activeElement) || e16().includes(this) || document.activeElement === document.body) && this.triggerElement.focus();
      }
      async manageOpen(e16) {
        if (!(!this.isConnected && this.open) && (this.hasUpdated || await this.updateComplete, this.open ? (overlayStack.add(this), this.willPreventClose && (document.addEventListener("pointerup", () => {
          this.dialogEl.classList.toggle("not-immediately-closable", false), this.willPreventClose = false;
        }, { once: true }), this.dialogEl.classList.toggle("not-immediately-closable", true))) : (e16 && this.dispose(), overlayStack.remove(this)), this.open && this.state !== "opened" ? this.state = "opening" : !this.open && this.state !== "closed" && (this.state = "closing"), this.usesDialog ? this.manageDialogOpen() : this.managePopoverOpen(), this.type === "auto")) {
          const t13 = this.getRootNode();
          this.open ? t13.addEventListener("focusout", this.closeOnFocusOut, { capture: true }) : t13.removeEventListener("focusout", this.closeOnFocusOut, { capture: true });
        }
      }
      bindEvents() {
        var e16;
        (e16 = this.strategy) == null || e16.abort(), this.strategy = void 0, this.hasNonVirtualTrigger && this.triggerInteraction && (this.strategy = new strategies[this.triggerInteraction](this.triggerElement, { overlay: this }));
      }
      handleBeforetoggle(e16) {
        e16.newState !== "open" && this.handleBrowserClose();
      }
      handleBrowserClose() {
        var e16;
        if (!((e16 = this.strategy) != null && e16.activelyOpening)) {
          this.open = false;
          return;
        }
        this.manuallyKeepOpen();
      }
      manuallyKeepOpen() {
        this.open = true, this.placementController.allowPlacementUpdate = true, this.manageOpen(false);
      }
      handleSlotchange() {
        var e16, t13;
        this.elements.length ? this.hasNonVirtualTrigger && ((t13 = this.strategy) == null || t13.prepareDescription(this.triggerElement)) : (e16 = this.strategy) == null || e16.releaseDescription();
      }
      shouldPreventClose() {
        const e16 = this.willPreventClose;
        return this.willPreventClose = false, e16;
      }
      requestSlottable() {
        this.lastRequestSlottableState !== this.open && (this.open || document.body.offsetHeight, this.dispatchEvent(new SlottableRequestEvent("overlay-content", this.open ? {} : removeSlottableRequest)), this.lastRequestSlottableState = this.open);
      }
      willUpdate(e16) {
        var o13;
        if (this.hasAttribute("id") || this.setAttribute("id", `${this.tagName.toLowerCase()}-${randomID()}`), e16.has("open") && (this.hasUpdated || this.open) && this.manageOpen(e16.get("open")), e16.has("trigger")) {
          const [s10, l7] = ((o13 = this.trigger) == null ? void 0 : o13.split("@")) || [];
          this.elementResolver.selector = s10 ? `#${s10}` : "", this.triggerInteraction = l7;
        }
        let t13 = false;
        e16.has(elementResolverUpdatedSymbol) && (t13 = this.triggerElement, this.triggerElement = this.elementResolver.element), e16.has("triggerElement") && (t13 = e16.get("triggerElement")), t13 !== false && this.bindEvents();
      }
      updated(e16) {
        super.updated(e16), e16.has("placement") && (this.placement ? this.dialogEl.setAttribute("actual-placement", this.placement) : this.dialogEl.removeAttribute("actual-placement"), this.open && typeof e16.get("placement") != "undefined" && this.placementController.resetOverlayPosition()), e16.has("state") && this.state === "closed" && typeof e16.get("state") != "undefined" && this.placementController.clearOverlayPosition();
      }
      renderContent() {
        return src_exports.html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
      }
      get dialogStyleMap() {
        return { "--swc-overlay-open-count": i11.openCount.toString() };
      }
      renderDialog() {
        return src_exports.html`
            <dialog
                class="dialog"
                part="dialog"
                placement=${ifDefined(this.requiresPosition ? this.placement || "right" : void 0)}
                style=${styleMap(this.dialogStyleMap)}
                @close=${this.handleBrowserClose}
                @cancel=${this.handleBrowserClose}
                @beforetoggle=${this.handleBeforetoggle}
                ?is-visible=${this.state !== "closed"}
            >
                ${this.renderContent()}
            </dialog>
        `;
      }
      renderPopover() {
        return src_exports.html`
            <div
                class="dialog"
                part="dialog"
                placement=${ifDefined(this.requiresPosition ? this.placement || "right" : void 0)}
                popover=${ifDefined(this.popoverValue)}
                style=${styleMap(this.dialogStyleMap)}
                @beforetoggle=${this.handleBeforetoggle}
                @close=${this.handleBrowserClose}
                ?is-visible=${this.state !== "closed"}
            >
                ${this.renderContent()}
            </div>
        `;
      }
      render() {
        const e16 = this.type === "modal" || this.type === "page";
        return src_exports.html`
            ${e16 ? this.renderDialog() : this.renderPopover()}
            <slot name="longpress-describedby-descriptor"></slot>
        `;
      }
      connectedCallback() {
        super.connectedCallback(), this.addEventListener("close", () => {
          this.open = false;
        }), this.hasUpdated && this.bindEvents();
      }
      disconnectedCallback() {
        var e16;
        (e16 = this.strategy) == null || e16.releaseDescription(), this.open = false, super.disconnectedCallback();
      }
    };
    i10.styles = [overlay_css_default], i10.openCount = 1, r8([(0, decorators_exports.property)({ type: Boolean })], i10.prototype, "delayed", 1), r8([(0, decorators_exports.query)(".dialog")], i10.prototype, "dialogEl", 2), r8([(0, decorators_exports.property)({ type: Boolean })], i10.prototype, "disabled", 1), r8([(0, decorators_exports.queryAssignedElements)({ flatten: true, selector: ':not([slot="longpress-describedby-descriptor"], slot)' })], i10.prototype, "elements", 2), r8([(0, decorators_exports.property)({ type: Number })], i10.prototype, "offset", 2), r8([(0, decorators_exports.property)({ type: Boolean, reflect: true })], i10.prototype, "open", 1), r8([(0, decorators_exports.property)()], i10.prototype, "placement", 2), r8([(0, decorators_exports.property)({ attribute: "receives-focus" })], i10.prototype, "receivesFocus", 2), r8([(0, decorators_exports.query)("slot")], i10.prototype, "slotEl", 2), r8([(0, decorators_exports.state)()], i10.prototype, "state", 1), r8([(0, decorators_exports.property)({ type: Number, attribute: "tip-padding" })], i10.prototype, "tipPadding", 2), r8([(0, decorators_exports.property)()], i10.prototype, "trigger", 2), r8([(0, decorators_exports.property)({ attribute: false })], i10.prototype, "triggerElement", 2), r8([(0, decorators_exports.property)({ attribute: false })], i10.prototype, "triggerInteraction", 2), r8([(0, decorators_exports.property)()], i10.prototype, "type", 2);
    Overlay = i10;
  }
});

// ../node_modules/@spectrum-web-components/overlay/sp-overlay.js
var sp_overlay_exports = {};
var init_sp_overlay = __esm({
  "../node_modules/@spectrum-web-components/overlay/sp-overlay.js"() {
    "use strict";
    init_define_element();
    init_Overlay();
    defineElement("sp-overlay", Overlay);
  }
});

// src/plans-modal.js
import { LitElement, html } from "/libs/deps/lit-all.min.js";

// ../node_modules/@spectrum-web-components/theme/src/theme-light.css.js
init_src();
var e = src_exports.css`
    :root,:host{--spectrum-global-color-status:Verified;--spectrum-global-color-version:5.1;--spectrum-global-color-opacity-100:1;--spectrum-global-color-opacity-90:.9;--spectrum-global-color-opacity-80:.8;--spectrum-global-color-opacity-70:.7;--spectrum-global-color-opacity-60:.6;--spectrum-global-color-opacity-55:.55;--spectrum-global-color-opacity-50:.5;--spectrum-global-color-opacity-42:.42;--spectrum-global-color-opacity-40:.4;--spectrum-global-color-opacity-30:.3;--spectrum-global-color-opacity-25:.25;--spectrum-global-color-opacity-20:.2;--spectrum-global-color-opacity-15:.15;--spectrum-global-color-opacity-10:.1;--spectrum-global-color-opacity-8:.08;--spectrum-global-color-opacity-7:.07;--spectrum-global-color-opacity-6:.06;--spectrum-global-color-opacity-5:.05;--spectrum-global-color-opacity-4:.04;--spectrum-global-color-opacity-0:0;--spectrum-global-color-celery-400-rgb:39,187,54;--spectrum-global-color-celery-400:rgb(var(--spectrum-global-color-celery-400-rgb));--spectrum-global-color-celery-500-rgb:7,167,33;--spectrum-global-color-celery-500:rgb(var(--spectrum-global-color-celery-500-rgb));--spectrum-global-color-celery-600-rgb:0,145,18;--spectrum-global-color-celery-600:rgb(var(--spectrum-global-color-celery-600-rgb));--spectrum-global-color-celery-700-rgb:0,124,15;--spectrum-global-color-celery-700:rgb(var(--spectrum-global-color-celery-700-rgb));--spectrum-global-color-chartreuse-400-rgb:152,197,10;--spectrum-global-color-chartreuse-400:rgb(var(--spectrum-global-color-chartreuse-400-rgb));--spectrum-global-color-chartreuse-500-rgb:135,177,3;--spectrum-global-color-chartreuse-500:rgb(var(--spectrum-global-color-chartreuse-500-rgb));--spectrum-global-color-chartreuse-600-rgb:118,156,0;--spectrum-global-color-chartreuse-600:rgb(var(--spectrum-global-color-chartreuse-600-rgb));--spectrum-global-color-chartreuse-700-rgb:103,136,0;--spectrum-global-color-chartreuse-700:rgb(var(--spectrum-global-color-chartreuse-700-rgb));--spectrum-global-color-yellow-400-rgb:232,198,0;--spectrum-global-color-yellow-400:rgb(var(--spectrum-global-color-yellow-400-rgb));--spectrum-global-color-yellow-500-rgb:215,179,0;--spectrum-global-color-yellow-500:rgb(var(--spectrum-global-color-yellow-500-rgb));--spectrum-global-color-yellow-600-rgb:196,159,0;--spectrum-global-color-yellow-600:rgb(var(--spectrum-global-color-yellow-600-rgb));--spectrum-global-color-yellow-700-rgb:176,140,0;--spectrum-global-color-yellow-700:rgb(var(--spectrum-global-color-yellow-700-rgb));--spectrum-global-color-magenta-400-rgb:222,61,130;--spectrum-global-color-magenta-400:rgb(var(--spectrum-global-color-magenta-400-rgb));--spectrum-global-color-magenta-500-rgb:200,34,105;--spectrum-global-color-magenta-500:rgb(var(--spectrum-global-color-magenta-500-rgb));--spectrum-global-color-magenta-600-rgb:173,9,85;--spectrum-global-color-magenta-600:rgb(var(--spectrum-global-color-magenta-600-rgb));--spectrum-global-color-magenta-700-rgb:142,0,69;--spectrum-global-color-magenta-700:rgb(var(--spectrum-global-color-magenta-700-rgb));--spectrum-global-color-fuchsia-400-rgb:205,58,206;--spectrum-global-color-fuchsia-400:rgb(var(--spectrum-global-color-fuchsia-400-rgb));--spectrum-global-color-fuchsia-500-rgb:182,34,183;--spectrum-global-color-fuchsia-500:rgb(var(--spectrum-global-color-fuchsia-500-rgb));--spectrum-global-color-fuchsia-600-rgb:157,3,158;--spectrum-global-color-fuchsia-600:rgb(var(--spectrum-global-color-fuchsia-600-rgb));--spectrum-global-color-fuchsia-700-rgb:128,0,129;--spectrum-global-color-fuchsia-700:rgb(var(--spectrum-global-color-fuchsia-700-rgb));--spectrum-global-color-purple-400-rgb:157,87,244;--spectrum-global-color-purple-400:rgb(var(--spectrum-global-color-purple-400-rgb));--spectrum-global-color-purple-500-rgb:137,61,231;--spectrum-global-color-purple-500:rgb(var(--spectrum-global-color-purple-500-rgb));--spectrum-global-color-purple-600-rgb:115,38,211;--spectrum-global-color-purple-600:rgb(var(--spectrum-global-color-purple-600-rgb));--spectrum-global-color-purple-700-rgb:93,19,183;--spectrum-global-color-purple-700:rgb(var(--spectrum-global-color-purple-700-rgb));--spectrum-global-color-indigo-400-rgb:104,109,244;--spectrum-global-color-indigo-400:rgb(var(--spectrum-global-color-indigo-400-rgb));--spectrum-global-color-indigo-500-rgb:82,88,228;--spectrum-global-color-indigo-500:rgb(var(--spectrum-global-color-indigo-500-rgb));--spectrum-global-color-indigo-600-rgb:64,70,202;--spectrum-global-color-indigo-600:rgb(var(--spectrum-global-color-indigo-600-rgb));--spectrum-global-color-indigo-700-rgb:50,54,168;--spectrum-global-color-indigo-700:rgb(var(--spectrum-global-color-indigo-700-rgb));--spectrum-global-color-seafoam-400-rgb:0,161,154;--spectrum-global-color-seafoam-400:rgb(var(--spectrum-global-color-seafoam-400-rgb));--spectrum-global-color-seafoam-500-rgb:0,140,135;--spectrum-global-color-seafoam-500:rgb(var(--spectrum-global-color-seafoam-500-rgb));--spectrum-global-color-seafoam-600-rgb:0,119,114;--spectrum-global-color-seafoam-600:rgb(var(--spectrum-global-color-seafoam-600-rgb));--spectrum-global-color-seafoam-700-rgb:0,99,95;--spectrum-global-color-seafoam-700:rgb(var(--spectrum-global-color-seafoam-700-rgb));--spectrum-global-color-red-400-rgb:234,56,41;--spectrum-global-color-red-400:rgb(var(--spectrum-global-color-red-400-rgb));--spectrum-global-color-red-500-rgb:211,21,16;--spectrum-global-color-red-500:rgb(var(--spectrum-global-color-red-500-rgb));--spectrum-global-color-red-600-rgb:180,0,0;--spectrum-global-color-red-600:rgb(var(--spectrum-global-color-red-600-rgb));--spectrum-global-color-red-700-rgb:147,0,0;--spectrum-global-color-red-700:rgb(var(--spectrum-global-color-red-700-rgb));--spectrum-global-color-orange-400-rgb:246,133,17;--spectrum-global-color-orange-400:rgb(var(--spectrum-global-color-orange-400-rgb));--spectrum-global-color-orange-500-rgb:228,111,0;--spectrum-global-color-orange-500:rgb(var(--spectrum-global-color-orange-500-rgb));--spectrum-global-color-orange-600-rgb:203,93,0;--spectrum-global-color-orange-600:rgb(var(--spectrum-global-color-orange-600-rgb));--spectrum-global-color-orange-700-rgb:177,76,0;--spectrum-global-color-orange-700:rgb(var(--spectrum-global-color-orange-700-rgb));--spectrum-global-color-green-400-rgb:0,143,93;--spectrum-global-color-green-400:rgb(var(--spectrum-global-color-green-400-rgb));--spectrum-global-color-green-500-rgb:0,122,77;--spectrum-global-color-green-500:rgb(var(--spectrum-global-color-green-500-rgb));--spectrum-global-color-green-600-rgb:0,101,62;--spectrum-global-color-green-600:rgb(var(--spectrum-global-color-green-600-rgb));--spectrum-global-color-green-700-rgb:0,81,50;--spectrum-global-color-green-700:rgb(var(--spectrum-global-color-green-700-rgb));--spectrum-global-color-blue-400-rgb:20,122,243;--spectrum-global-color-blue-400:rgb(var(--spectrum-global-color-blue-400-rgb));--spectrum-global-color-blue-500-rgb:2,101,220;--spectrum-global-color-blue-500:rgb(var(--spectrum-global-color-blue-500-rgb));--spectrum-global-color-blue-600-rgb:0,84,182;--spectrum-global-color-blue-600:rgb(var(--spectrum-global-color-blue-600-rgb));--spectrum-global-color-blue-700-rgb:0,68,145;--spectrum-global-color-blue-700:rgb(var(--spectrum-global-color-blue-700-rgb));--spectrum-global-color-gray-50-rgb:255,255,255;--spectrum-global-color-gray-50:rgb(var(--spectrum-global-color-gray-50-rgb));--spectrum-global-color-gray-75-rgb:253,253,253;--spectrum-global-color-gray-75:rgb(var(--spectrum-global-color-gray-75-rgb));--spectrum-global-color-gray-100-rgb:248,248,248;--spectrum-global-color-gray-100:rgb(var(--spectrum-global-color-gray-100-rgb));--spectrum-global-color-gray-200-rgb:230,230,230;--spectrum-global-color-gray-200:rgb(var(--spectrum-global-color-gray-200-rgb));--spectrum-global-color-gray-300-rgb:213,213,213;--spectrum-global-color-gray-300:rgb(var(--spectrum-global-color-gray-300-rgb));--spectrum-global-color-gray-400-rgb:177,177,177;--spectrum-global-color-gray-400:rgb(var(--spectrum-global-color-gray-400-rgb));--spectrum-global-color-gray-500-rgb:144,144,144;--spectrum-global-color-gray-500:rgb(var(--spectrum-global-color-gray-500-rgb));--spectrum-global-color-gray-600-rgb:109,109,109;--spectrum-global-color-gray-600:rgb(var(--spectrum-global-color-gray-600-rgb));--spectrum-global-color-gray-700-rgb:70,70,70;--spectrum-global-color-gray-700:rgb(var(--spectrum-global-color-gray-700-rgb));--spectrum-global-color-gray-800-rgb:34,34,34;--spectrum-global-color-gray-800:rgb(var(--spectrum-global-color-gray-800-rgb));--spectrum-global-color-gray-900-rgb:0,0,0;--spectrum-global-color-gray-900:rgb(var(--spectrum-global-color-gray-900-rgb));--spectrum-alias-background-color-primary:var(--spectrum-global-color-gray-50);--spectrum-alias-background-color-secondary:var(--spectrum-global-color-gray-100);--spectrum-alias-background-color-tertiary:var(--spectrum-global-color-gray-300);--spectrum-alias-background-color-modal-overlay:#0006;--spectrum-alias-dropshadow-color:#00000026;--spectrum-alias-background-color-hover-overlay:#0000000a;--spectrum-alias-highlight-hover:#0000000f;--spectrum-alias-highlight-down:#0000001a;--spectrum-alias-highlight-selected:#0265dc1a;--spectrum-alias-highlight-selected-hover:#0265dc33;--spectrum-alias-text-highlight-color:#0265dc33;--spectrum-alias-background-color-quickactions:#f8f8f8e6;--spectrum-alias-border-color-selected:var(--spectrum-global-color-blue-500);--spectrum-alias-border-color-translucent:#0000001a;--spectrum-alias-radial-reaction-color-default:#2229;--spectrum-alias-pasteboard-background-color:var(--spectrum-global-color-gray-300);--spectrum-alias-appframe-border-color:var(--spectrum-global-color-gray-300);--spectrum-alias-appframe-separator-color:var(--spectrum-global-color-gray-300)}:host,:root{color-scheme:light;--spectrum-overlay-opacity:.4;--spectrum-drop-shadow-color-rgb:0,0,0;--spectrum-drop-shadow-color-opacity:.15;--spectrum-drop-shadow-color:rgba(var(--spectrum-drop-shadow-color-rgb),var(--spectrum-drop-shadow-color-opacity));--spectrum-background-base-color:var(--spectrum-gray-200);--spectrum-background-layer-1-color:var(--spectrum-gray-100);--spectrum-background-layer-2-color:var(--spectrum-gray-50);--spectrum-neutral-background-color-default:var(--spectrum-gray-800);--spectrum-neutral-background-color-hover:var(--spectrum-gray-900);--spectrum-neutral-background-color-down:var(--spectrum-gray-900);--spectrum-neutral-background-color-key-focus:var(--spectrum-gray-900);--spectrum-neutral-subdued-background-color-default:var(--spectrum-gray-600);--spectrum-neutral-subdued-background-color-hover:var(--spectrum-gray-700);--spectrum-neutral-subdued-background-color-down:var(--spectrum-gray-800);--spectrum-neutral-subdued-background-color-key-focus:var(--spectrum-gray-700);--spectrum-accent-background-color-default:var(--spectrum-accent-color-900);--spectrum-accent-background-color-hover:var(--spectrum-accent-color-1000);--spectrum-accent-background-color-down:var(--spectrum-accent-color-1100);--spectrum-accent-background-color-key-focus:var(--spectrum-accent-color-1000);--spectrum-informative-background-color-default:var(--spectrum-informative-color-900);--spectrum-informative-background-color-hover:var(--spectrum-informative-color-1000);--spectrum-informative-background-color-down:var(--spectrum-informative-color-1100);--spectrum-informative-background-color-key-focus:var(--spectrum-informative-color-1000);--spectrum-negative-background-color-default:var(--spectrum-negative-color-900);--spectrum-negative-background-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-background-color-down:var(--spectrum-negative-color-1100);--spectrum-negative-background-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-positive-background-color-default:var(--spectrum-positive-color-900);--spectrum-positive-background-color-hover:var(--spectrum-positive-color-1000);--spectrum-positive-background-color-down:var(--spectrum-positive-color-1100);--spectrum-positive-background-color-key-focus:var(--spectrum-positive-color-1000);--spectrum-notice-background-color-default:var(--spectrum-notice-color-600);--spectrum-gray-background-color-default:var(--spectrum-gray-700);--spectrum-red-background-color-default:var(--spectrum-red-900);--spectrum-orange-background-color-default:var(--spectrum-orange-600);--spectrum-yellow-background-color-default:var(--spectrum-yellow-400);--spectrum-chartreuse-background-color-default:var(--spectrum-chartreuse-500);--spectrum-celery-background-color-default:var(--spectrum-celery-600);--spectrum-green-background-color-default:var(--spectrum-green-900);--spectrum-seafoam-background-color-default:var(--spectrum-seafoam-900);--spectrum-cyan-background-color-default:var(--spectrum-cyan-900);--spectrum-blue-background-color-default:var(--spectrum-blue-900);--spectrum-indigo-background-color-default:var(--spectrum-indigo-900);--spectrum-purple-background-color-default:var(--spectrum-purple-900);--spectrum-fuchsia-background-color-default:var(--spectrum-fuchsia-900);--spectrum-magenta-background-color-default:var(--spectrum-magenta-900);--spectrum-neutral-visual-color:var(--spectrum-gray-500);--spectrum-accent-visual-color:var(--spectrum-accent-color-800);--spectrum-informative-visual-color:var(--spectrum-informative-color-800);--spectrum-negative-visual-color:var(--spectrum-negative-color-800);--spectrum-notice-visual-color:var(--spectrum-notice-color-700);--spectrum-positive-visual-color:var(--spectrum-positive-color-700);--spectrum-gray-visual-color:var(--spectrum-gray-500);--spectrum-red-visual-color:var(--spectrum-red-800);--spectrum-orange-visual-color:var(--spectrum-orange-700);--spectrum-yellow-visual-color:var(--spectrum-yellow-600);--spectrum-chartreuse-visual-color:var(--spectrum-chartreuse-600);--spectrum-celery-visual-color:var(--spectrum-celery-700);--spectrum-green-visual-color:var(--spectrum-green-700);--spectrum-seafoam-visual-color:var(--spectrum-seafoam-700);--spectrum-cyan-visual-color:var(--spectrum-cyan-600);--spectrum-blue-visual-color:var(--spectrum-blue-800);--spectrum-indigo-visual-color:var(--spectrum-indigo-800);--spectrum-purple-visual-color:var(--spectrum-purple-800);--spectrum-fuchsia-visual-color:var(--spectrum-fuchsia-800);--spectrum-magenta-visual-color:var(--spectrum-magenta-800);--spectrum-opacity-checkerboard-square-dark:var(--spectrum-gray-200);--spectrum-gray-50-rgb:255,255,255;--spectrum-gray-50:rgba(var(--spectrum-gray-50-rgb));--spectrum-gray-75-rgb:253,253,253;--spectrum-gray-75:rgba(var(--spectrum-gray-75-rgb));--spectrum-gray-100-rgb:248,248,248;--spectrum-gray-100:rgba(var(--spectrum-gray-100-rgb));--spectrum-gray-200-rgb:230,230,230;--spectrum-gray-200:rgba(var(--spectrum-gray-200-rgb));--spectrum-gray-300-rgb:213,213,213;--spectrum-gray-300:rgba(var(--spectrum-gray-300-rgb));--spectrum-gray-400-rgb:177,177,177;--spectrum-gray-400:rgba(var(--spectrum-gray-400-rgb));--spectrum-gray-500-rgb:144,144,144;--spectrum-gray-500:rgba(var(--spectrum-gray-500-rgb));--spectrum-gray-600-rgb:109,109,109;--spectrum-gray-600:rgba(var(--spectrum-gray-600-rgb));--spectrum-gray-700-rgb:70,70,70;--spectrum-gray-700:rgba(var(--spectrum-gray-700-rgb));--spectrum-gray-800-rgb:34,34,34;--spectrum-gray-800:rgba(var(--spectrum-gray-800-rgb));--spectrum-gray-900-rgb:0,0,0;--spectrum-gray-900:rgba(var(--spectrum-gray-900-rgb));--spectrum-blue-100-rgb:224,242,255;--spectrum-blue-100:rgba(var(--spectrum-blue-100-rgb));--spectrum-blue-200-rgb:202,232,255;--spectrum-blue-200:rgba(var(--spectrum-blue-200-rgb));--spectrum-blue-300-rgb:181,222,255;--spectrum-blue-300:rgba(var(--spectrum-blue-300-rgb));--spectrum-blue-400-rgb:150,206,253;--spectrum-blue-400:rgba(var(--spectrum-blue-400-rgb));--spectrum-blue-500-rgb:120,187,250;--spectrum-blue-500:rgba(var(--spectrum-blue-500-rgb));--spectrum-blue-600-rgb:89,167,246;--spectrum-blue-600:rgba(var(--spectrum-blue-600-rgb));--spectrum-blue-700-rgb:56,146,243;--spectrum-blue-700:rgba(var(--spectrum-blue-700-rgb));--spectrum-blue-800-rgb:20,122,243;--spectrum-blue-800:rgba(var(--spectrum-blue-800-rgb));--spectrum-blue-900-rgb:2,101,220;--spectrum-blue-900:rgba(var(--spectrum-blue-900-rgb));--spectrum-blue-1000-rgb:0,84,182;--spectrum-blue-1000:rgba(var(--spectrum-blue-1000-rgb));--spectrum-blue-1100-rgb:0,68,145;--spectrum-blue-1100:rgba(var(--spectrum-blue-1100-rgb));--spectrum-blue-1200-rgb:0,53,113;--spectrum-blue-1200:rgba(var(--spectrum-blue-1200-rgb));--spectrum-blue-1300-rgb:0,39,84;--spectrum-blue-1300:rgba(var(--spectrum-blue-1300-rgb));--spectrum-blue-1400-rgb:0,28,60;--spectrum-blue-1400:rgba(var(--spectrum-blue-1400-rgb));--spectrum-red-100-rgb:255,235,231;--spectrum-red-100:rgba(var(--spectrum-red-100-rgb));--spectrum-red-200-rgb:255,221,214;--spectrum-red-200:rgba(var(--spectrum-red-200-rgb));--spectrum-red-300-rgb:255,205,195;--spectrum-red-300:rgba(var(--spectrum-red-300-rgb));--spectrum-red-400-rgb:255,183,169;--spectrum-red-400:rgba(var(--spectrum-red-400-rgb));--spectrum-red-500-rgb:255,155,136;--spectrum-red-500:rgba(var(--spectrum-red-500-rgb));--spectrum-red-600-rgb:255,124,101;--spectrum-red-600:rgba(var(--spectrum-red-600-rgb));--spectrum-red-700-rgb:247,92,70;--spectrum-red-700:rgba(var(--spectrum-red-700-rgb));--spectrum-red-800-rgb:234,56,41;--spectrum-red-800:rgba(var(--spectrum-red-800-rgb));--spectrum-red-900-rgb:211,21,16;--spectrum-red-900:rgba(var(--spectrum-red-900-rgb));--spectrum-red-1000-rgb:180,0,0;--spectrum-red-1000:rgba(var(--spectrum-red-1000-rgb));--spectrum-red-1100-rgb:147,0,0;--spectrum-red-1100:rgba(var(--spectrum-red-1100-rgb));--spectrum-red-1200-rgb:116,0,0;--spectrum-red-1200:rgba(var(--spectrum-red-1200-rgb));--spectrum-red-1300-rgb:89,0,0;--spectrum-red-1300:rgba(var(--spectrum-red-1300-rgb));--spectrum-red-1400-rgb:67,0,0;--spectrum-red-1400:rgba(var(--spectrum-red-1400-rgb));--spectrum-orange-100-rgb:255,236,204;--spectrum-orange-100:rgba(var(--spectrum-orange-100-rgb));--spectrum-orange-200-rgb:255,223,173;--spectrum-orange-200:rgba(var(--spectrum-orange-200-rgb));--spectrum-orange-300-rgb:253,210,145;--spectrum-orange-300:rgba(var(--spectrum-orange-300-rgb));--spectrum-orange-400-rgb:255,187,99;--spectrum-orange-400:rgba(var(--spectrum-orange-400-rgb));--spectrum-orange-500-rgb:255,160,55;--spectrum-orange-500:rgba(var(--spectrum-orange-500-rgb));--spectrum-orange-600-rgb:246,133,17;--spectrum-orange-600:rgba(var(--spectrum-orange-600-rgb));--spectrum-orange-700-rgb:228,111,0;--spectrum-orange-700:rgba(var(--spectrum-orange-700-rgb));--spectrum-orange-800-rgb:203,93,0;--spectrum-orange-800:rgba(var(--spectrum-orange-800-rgb));--spectrum-orange-900-rgb:177,76,0;--spectrum-orange-900:rgba(var(--spectrum-orange-900-rgb));--spectrum-orange-1000-rgb:149,61,0;--spectrum-orange-1000:rgba(var(--spectrum-orange-1000-rgb));--spectrum-orange-1100-rgb:122,47,0;--spectrum-orange-1100:rgba(var(--spectrum-orange-1100-rgb));--spectrum-orange-1200-rgb:97,35,0;--spectrum-orange-1200:rgba(var(--spectrum-orange-1200-rgb));--spectrum-orange-1300-rgb:73,25,1;--spectrum-orange-1300:rgba(var(--spectrum-orange-1300-rgb));--spectrum-orange-1400-rgb:53,18,1;--spectrum-orange-1400:rgba(var(--spectrum-orange-1400-rgb));--spectrum-yellow-100-rgb:251,241,152;--spectrum-yellow-100:rgba(var(--spectrum-yellow-100-rgb));--spectrum-yellow-200-rgb:248,231,80;--spectrum-yellow-200:rgba(var(--spectrum-yellow-200-rgb));--spectrum-yellow-300-rgb:248,217,4;--spectrum-yellow-300:rgba(var(--spectrum-yellow-300-rgb));--spectrum-yellow-400-rgb:232,198,0;--spectrum-yellow-400:rgba(var(--spectrum-yellow-400-rgb));--spectrum-yellow-500-rgb:215,179,0;--spectrum-yellow-500:rgba(var(--spectrum-yellow-500-rgb));--spectrum-yellow-600-rgb:196,159,0;--spectrum-yellow-600:rgba(var(--spectrum-yellow-600-rgb));--spectrum-yellow-700-rgb:176,140,0;--spectrum-yellow-700:rgba(var(--spectrum-yellow-700-rgb));--spectrum-yellow-800-rgb:155,120,0;--spectrum-yellow-800:rgba(var(--spectrum-yellow-800-rgb));--spectrum-yellow-900-rgb:133,102,0;--spectrum-yellow-900:rgba(var(--spectrum-yellow-900-rgb));--spectrum-yellow-1000-rgb:112,83,0;--spectrum-yellow-1000:rgba(var(--spectrum-yellow-1000-rgb));--spectrum-yellow-1100-rgb:91,67,0;--spectrum-yellow-1100:rgba(var(--spectrum-yellow-1100-rgb));--spectrum-yellow-1200-rgb:72,51,0;--spectrum-yellow-1200:rgba(var(--spectrum-yellow-1200-rgb));--spectrum-yellow-1300-rgb:54,37,0;--spectrum-yellow-1300:rgba(var(--spectrum-yellow-1300-rgb));--spectrum-yellow-1400-rgb:40,26,0;--spectrum-yellow-1400:rgba(var(--spectrum-yellow-1400-rgb));--spectrum-chartreuse-100-rgb:219,252,110;--spectrum-chartreuse-100:rgba(var(--spectrum-chartreuse-100-rgb));--spectrum-chartreuse-200-rgb:203,244,67;--spectrum-chartreuse-200:rgba(var(--spectrum-chartreuse-200-rgb));--spectrum-chartreuse-300-rgb:188,233,42;--spectrum-chartreuse-300:rgba(var(--spectrum-chartreuse-300-rgb));--spectrum-chartreuse-400-rgb:170,216,22;--spectrum-chartreuse-400:rgba(var(--spectrum-chartreuse-400-rgb));--spectrum-chartreuse-500-rgb:152,197,10;--spectrum-chartreuse-500:rgba(var(--spectrum-chartreuse-500-rgb));--spectrum-chartreuse-600-rgb:135,177,3;--spectrum-chartreuse-600:rgba(var(--spectrum-chartreuse-600-rgb));--spectrum-chartreuse-700-rgb:118,156,0;--spectrum-chartreuse-700:rgba(var(--spectrum-chartreuse-700-rgb));--spectrum-chartreuse-800-rgb:103,136,0;--spectrum-chartreuse-800:rgba(var(--spectrum-chartreuse-800-rgb));--spectrum-chartreuse-900-rgb:87,116,0;--spectrum-chartreuse-900:rgba(var(--spectrum-chartreuse-900-rgb));--spectrum-chartreuse-1000-rgb:72,96,0;--spectrum-chartreuse-1000:rgba(var(--spectrum-chartreuse-1000-rgb));--spectrum-chartreuse-1100-rgb:58,77,0;--spectrum-chartreuse-1100:rgba(var(--spectrum-chartreuse-1100-rgb));--spectrum-chartreuse-1200-rgb:44,59,0;--spectrum-chartreuse-1200:rgba(var(--spectrum-chartreuse-1200-rgb));--spectrum-chartreuse-1300-rgb:33,44,0;--spectrum-chartreuse-1300:rgba(var(--spectrum-chartreuse-1300-rgb));--spectrum-chartreuse-1400-rgb:24,31,0;--spectrum-chartreuse-1400:rgba(var(--spectrum-chartreuse-1400-rgb));--spectrum-celery-100-rgb:205,252,191;--spectrum-celery-100:rgba(var(--spectrum-celery-100-rgb));--spectrum-celery-200-rgb:174,246,157;--spectrum-celery-200:rgba(var(--spectrum-celery-200-rgb));--spectrum-celery-300-rgb:150,238,133;--spectrum-celery-300:rgba(var(--spectrum-celery-300-rgb));--spectrum-celery-400-rgb:114,224,106;--spectrum-celery-400:rgba(var(--spectrum-celery-400-rgb));--spectrum-celery-500-rgb:78,207,80;--spectrum-celery-500:rgba(var(--spectrum-celery-500-rgb));--spectrum-celery-600-rgb:39,187,54;--spectrum-celery-600:rgba(var(--spectrum-celery-600-rgb));--spectrum-celery-700-rgb:7,167,33;--spectrum-celery-700:rgba(var(--spectrum-celery-700-rgb));--spectrum-celery-800-rgb:0,145,18;--spectrum-celery-800:rgba(var(--spectrum-celery-800-rgb));--spectrum-celery-900-rgb:0,124,15;--spectrum-celery-900:rgba(var(--spectrum-celery-900-rgb));--spectrum-celery-1000-rgb:0,103,15;--spectrum-celery-1000:rgba(var(--spectrum-celery-1000-rgb));--spectrum-celery-1100-rgb:0,83,13;--spectrum-celery-1100:rgba(var(--spectrum-celery-1100-rgb));--spectrum-celery-1200-rgb:0,64,10;--spectrum-celery-1200:rgba(var(--spectrum-celery-1200-rgb));--spectrum-celery-1300-rgb:0,48,7;--spectrum-celery-1300:rgba(var(--spectrum-celery-1300-rgb));--spectrum-celery-1400-rgb:0,34,5;--spectrum-celery-1400:rgba(var(--spectrum-celery-1400-rgb));--spectrum-green-100-rgb:206,248,224;--spectrum-green-100:rgba(var(--spectrum-green-100-rgb));--spectrum-green-200-rgb:173,244,206;--spectrum-green-200:rgba(var(--spectrum-green-200-rgb));--spectrum-green-300-rgb:137,236,188;--spectrum-green-300:rgba(var(--spectrum-green-300-rgb));--spectrum-green-400-rgb:103,222,168;--spectrum-green-400:rgba(var(--spectrum-green-400-rgb));--spectrum-green-500-rgb:73,204,147;--spectrum-green-500:rgba(var(--spectrum-green-500-rgb));--spectrum-green-600-rgb:47,184,128;--spectrum-green-600:rgba(var(--spectrum-green-600-rgb));--spectrum-green-700-rgb:21,164,110;--spectrum-green-700:rgba(var(--spectrum-green-700-rgb));--spectrum-green-800-rgb:0,143,93;--spectrum-green-800:rgba(var(--spectrum-green-800-rgb));--spectrum-green-900-rgb:0,122,77;--spectrum-green-900:rgba(var(--spectrum-green-900-rgb));--spectrum-green-1000-rgb:0,101,62;--spectrum-green-1000:rgba(var(--spectrum-green-1000-rgb));--spectrum-green-1100-rgb:0,81,50;--spectrum-green-1100:rgba(var(--spectrum-green-1100-rgb));--spectrum-green-1200-rgb:5,63,39;--spectrum-green-1200:rgba(var(--spectrum-green-1200-rgb));--spectrum-green-1300-rgb:10,46,29;--spectrum-green-1300:rgba(var(--spectrum-green-1300-rgb));--spectrum-green-1400-rgb:10,32,21;--spectrum-green-1400:rgba(var(--spectrum-green-1400-rgb));--spectrum-seafoam-100-rgb:206,247,243;--spectrum-seafoam-100:rgba(var(--spectrum-seafoam-100-rgb));--spectrum-seafoam-200-rgb:170,241,234;--spectrum-seafoam-200:rgba(var(--spectrum-seafoam-200-rgb));--spectrum-seafoam-300-rgb:140,233,226;--spectrum-seafoam-300:rgba(var(--spectrum-seafoam-300-rgb));--spectrum-seafoam-400-rgb:101,218,210;--spectrum-seafoam-400:rgba(var(--spectrum-seafoam-400-rgb));--spectrum-seafoam-500-rgb:63,201,193;--spectrum-seafoam-500:rgba(var(--spectrum-seafoam-500-rgb));--spectrum-seafoam-600-rgb:15,181,174;--spectrum-seafoam-600:rgba(var(--spectrum-seafoam-600-rgb));--spectrum-seafoam-700-rgb:0,161,154;--spectrum-seafoam-700:rgba(var(--spectrum-seafoam-700-rgb));--spectrum-seafoam-800-rgb:0,140,135;--spectrum-seafoam-800:rgba(var(--spectrum-seafoam-800-rgb));--spectrum-seafoam-900-rgb:0,119,114;--spectrum-seafoam-900:rgba(var(--spectrum-seafoam-900-rgb));--spectrum-seafoam-1000-rgb:0,99,95;--spectrum-seafoam-1000:rgba(var(--spectrum-seafoam-1000-rgb));--spectrum-seafoam-1100-rgb:12,79,76;--spectrum-seafoam-1100:rgba(var(--spectrum-seafoam-1100-rgb));--spectrum-seafoam-1200-rgb:18,60,58;--spectrum-seafoam-1200:rgba(var(--spectrum-seafoam-1200-rgb));--spectrum-seafoam-1300-rgb:18,44,43;--spectrum-seafoam-1300:rgba(var(--spectrum-seafoam-1300-rgb));--spectrum-seafoam-1400-rgb:15,31,30;--spectrum-seafoam-1400:rgba(var(--spectrum-seafoam-1400-rgb));--spectrum-cyan-100-rgb:197,248,255;--spectrum-cyan-100:rgba(var(--spectrum-cyan-100-rgb));--spectrum-cyan-200-rgb:164,240,255;--spectrum-cyan-200:rgba(var(--spectrum-cyan-200-rgb));--spectrum-cyan-300-rgb:136,231,250;--spectrum-cyan-300:rgba(var(--spectrum-cyan-300-rgb));--spectrum-cyan-400-rgb:96,216,243;--spectrum-cyan-400:rgba(var(--spectrum-cyan-400-rgb));--spectrum-cyan-500-rgb:51,197,232;--spectrum-cyan-500:rgba(var(--spectrum-cyan-500-rgb));--spectrum-cyan-600-rgb:18,176,218;--spectrum-cyan-600:rgba(var(--spectrum-cyan-600-rgb));--spectrum-cyan-700-rgb:1,156,200;--spectrum-cyan-700:rgba(var(--spectrum-cyan-700-rgb));--spectrum-cyan-800-rgb:0,134,180;--spectrum-cyan-800:rgba(var(--spectrum-cyan-800-rgb));--spectrum-cyan-900-rgb:0,113,159;--spectrum-cyan-900:rgba(var(--spectrum-cyan-900-rgb));--spectrum-cyan-1000-rgb:0,93,137;--spectrum-cyan-1000:rgba(var(--spectrum-cyan-1000-rgb));--spectrum-cyan-1100-rgb:0,74,115;--spectrum-cyan-1100:rgba(var(--spectrum-cyan-1100-rgb));--spectrum-cyan-1200-rgb:0,57,93;--spectrum-cyan-1200:rgba(var(--spectrum-cyan-1200-rgb));--spectrum-cyan-1300-rgb:0,42,70;--spectrum-cyan-1300:rgba(var(--spectrum-cyan-1300-rgb));--spectrum-cyan-1400-rgb:0,30,51;--spectrum-cyan-1400:rgba(var(--spectrum-cyan-1400-rgb));--spectrum-indigo-100-rgb:237,238,255;--spectrum-indigo-100:rgba(var(--spectrum-indigo-100-rgb));--spectrum-indigo-200-rgb:224,226,255;--spectrum-indigo-200:rgba(var(--spectrum-indigo-200-rgb));--spectrum-indigo-300-rgb:211,213,255;--spectrum-indigo-300:rgba(var(--spectrum-indigo-300-rgb));--spectrum-indigo-400-rgb:193,196,255;--spectrum-indigo-400:rgba(var(--spectrum-indigo-400-rgb));--spectrum-indigo-500-rgb:172,175,255;--spectrum-indigo-500:rgba(var(--spectrum-indigo-500-rgb));--spectrum-indigo-600-rgb:149,153,255;--spectrum-indigo-600:rgba(var(--spectrum-indigo-600-rgb));--spectrum-indigo-700-rgb:126,132,252;--spectrum-indigo-700:rgba(var(--spectrum-indigo-700-rgb));--spectrum-indigo-800-rgb:104,109,244;--spectrum-indigo-800:rgba(var(--spectrum-indigo-800-rgb));--spectrum-indigo-900-rgb:82,88,228;--spectrum-indigo-900:rgba(var(--spectrum-indigo-900-rgb));--spectrum-indigo-1000-rgb:64,70,202;--spectrum-indigo-1000:rgba(var(--spectrum-indigo-1000-rgb));--spectrum-indigo-1100-rgb:50,54,168;--spectrum-indigo-1100:rgba(var(--spectrum-indigo-1100-rgb));--spectrum-indigo-1200-rgb:38,41,134;--spectrum-indigo-1200:rgba(var(--spectrum-indigo-1200-rgb));--spectrum-indigo-1300-rgb:27,30,100;--spectrum-indigo-1300:rgba(var(--spectrum-indigo-1300-rgb));--spectrum-indigo-1400-rgb:20,22,72;--spectrum-indigo-1400:rgba(var(--spectrum-indigo-1400-rgb));--spectrum-purple-100-rgb:246,235,255;--spectrum-purple-100:rgba(var(--spectrum-purple-100-rgb));--spectrum-purple-200-rgb:238,221,255;--spectrum-purple-200:rgba(var(--spectrum-purple-200-rgb));--spectrum-purple-300-rgb:230,208,255;--spectrum-purple-300:rgba(var(--spectrum-purple-300-rgb));--spectrum-purple-400-rgb:219,187,254;--spectrum-purple-400:rgba(var(--spectrum-purple-400-rgb));--spectrum-purple-500-rgb:204,164,253;--spectrum-purple-500:rgba(var(--spectrum-purple-500-rgb));--spectrum-purple-600-rgb:189,139,252;--spectrum-purple-600:rgba(var(--spectrum-purple-600-rgb));--spectrum-purple-700-rgb:174,114,249;--spectrum-purple-700:rgba(var(--spectrum-purple-700-rgb));--spectrum-purple-800-rgb:157,87,244;--spectrum-purple-800:rgba(var(--spectrum-purple-800-rgb));--spectrum-purple-900-rgb:137,61,231;--spectrum-purple-900:rgba(var(--spectrum-purple-900-rgb));--spectrum-purple-1000-rgb:115,38,211;--spectrum-purple-1000:rgba(var(--spectrum-purple-1000-rgb));--spectrum-purple-1100-rgb:93,19,183;--spectrum-purple-1100:rgba(var(--spectrum-purple-1100-rgb));--spectrum-purple-1200-rgb:71,12,148;--spectrum-purple-1200:rgba(var(--spectrum-purple-1200-rgb));--spectrum-purple-1300-rgb:51,16,106;--spectrum-purple-1300:rgba(var(--spectrum-purple-1300-rgb));--spectrum-purple-1400-rgb:35,15,73;--spectrum-purple-1400:rgba(var(--spectrum-purple-1400-rgb));--spectrum-fuchsia-100-rgb:255,233,252;--spectrum-fuchsia-100:rgba(var(--spectrum-fuchsia-100-rgb));--spectrum-fuchsia-200-rgb:255,218,250;--spectrum-fuchsia-200:rgba(var(--spectrum-fuchsia-200-rgb));--spectrum-fuchsia-300-rgb:254,199,248;--spectrum-fuchsia-300:rgba(var(--spectrum-fuchsia-300-rgb));--spectrum-fuchsia-400-rgb:251,174,246;--spectrum-fuchsia-400:rgba(var(--spectrum-fuchsia-400-rgb));--spectrum-fuchsia-500-rgb:245,146,243;--spectrum-fuchsia-500:rgba(var(--spectrum-fuchsia-500-rgb));--spectrum-fuchsia-600-rgb:237,116,237;--spectrum-fuchsia-600:rgba(var(--spectrum-fuchsia-600-rgb));--spectrum-fuchsia-700-rgb:224,85,226;--spectrum-fuchsia-700:rgba(var(--spectrum-fuchsia-700-rgb));--spectrum-fuchsia-800-rgb:205,58,206;--spectrum-fuchsia-800:rgba(var(--spectrum-fuchsia-800-rgb));--spectrum-fuchsia-900-rgb:182,34,183;--spectrum-fuchsia-900:rgba(var(--spectrum-fuchsia-900-rgb));--spectrum-fuchsia-1000-rgb:157,3,158;--spectrum-fuchsia-1000:rgba(var(--spectrum-fuchsia-1000-rgb));--spectrum-fuchsia-1100-rgb:128,0,129;--spectrum-fuchsia-1100:rgba(var(--spectrum-fuchsia-1100-rgb));--spectrum-fuchsia-1200-rgb:100,6,100;--spectrum-fuchsia-1200:rgba(var(--spectrum-fuchsia-1200-rgb));--spectrum-fuchsia-1300-rgb:71,14,70;--spectrum-fuchsia-1300:rgba(var(--spectrum-fuchsia-1300-rgb));--spectrum-fuchsia-1400-rgb:50,13,49;--spectrum-fuchsia-1400:rgba(var(--spectrum-fuchsia-1400-rgb));--spectrum-magenta-100-rgb:255,234,241;--spectrum-magenta-100:rgba(var(--spectrum-magenta-100-rgb));--spectrum-magenta-200-rgb:255,220,232;--spectrum-magenta-200:rgba(var(--spectrum-magenta-200-rgb));--spectrum-magenta-300-rgb:255,202,221;--spectrum-magenta-300:rgba(var(--spectrum-magenta-300-rgb));--spectrum-magenta-400-rgb:255,178,206;--spectrum-magenta-400:rgba(var(--spectrum-magenta-400-rgb));--spectrum-magenta-500-rgb:255,149,189;--spectrum-magenta-500:rgba(var(--spectrum-magenta-500-rgb));--spectrum-magenta-600-rgb:250,119,170;--spectrum-magenta-600:rgba(var(--spectrum-magenta-600-rgb));--spectrum-magenta-700-rgb:239,90,152;--spectrum-magenta-700:rgba(var(--spectrum-magenta-700-rgb));--spectrum-magenta-800-rgb:222,61,130;--spectrum-magenta-800:rgba(var(--spectrum-magenta-800-rgb));--spectrum-magenta-900-rgb:200,34,105;--spectrum-magenta-900:rgba(var(--spectrum-magenta-900-rgb));--spectrum-magenta-1000-rgb:173,9,85;--spectrum-magenta-1000:rgba(var(--spectrum-magenta-1000-rgb));--spectrum-magenta-1100-rgb:142,0,69;--spectrum-magenta-1100:rgba(var(--spectrum-magenta-1100-rgb));--spectrum-magenta-1200-rgb:112,0,55;--spectrum-magenta-1200:rgba(var(--spectrum-magenta-1200-rgb));--spectrum-magenta-1300-rgb:84,3,42;--spectrum-magenta-1300:rgba(var(--spectrum-magenta-1300-rgb));--spectrum-magenta-1400-rgb:60,6,29;--spectrum-magenta-1400:rgba(var(--spectrum-magenta-1400-rgb));--spectrum-icon-color-blue-primary-default:var(--spectrum-blue-900);--spectrum-icon-color-green-primary-default:var(--spectrum-green-900);--spectrum-icon-color-red-primary-default:var(--spectrum-red-900);--spectrum-icon-color-yellow-primary-default:var(--spectrum-yellow-400);--spectrum-menu-item-background-color-default-rgb:0,0,0;--spectrum-menu-item-background-color-default-opacity:0;--spectrum-menu-item-background-color-default:rgba(var(--spectrum-menu-item-background-color-default-rgb),var(--spectrum-menu-item-background-color-default-opacity));--spectrum-menu-item-background-color-hover:var(--spectrum-transparent-black-200);--spectrum-menu-item-background-color-down:var(--spectrum-transparent-black-200);--spectrum-menu-item-background-color-key-focus:var(--spectrum-transparent-black-200);--spectrum-drop-zone-background-color-rgb:var(--spectrum-blue-800-rgb);--spectrum-dropindicator-color:var(--spectrum-blue-800);--spectrum-calendar-day-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-calendar-day-background-color-hover:rgba(var(--spectrum-black-rgb),.06);--spectrum-calendar-day-today-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-down:var(--spectrum-transparent-black-200);--spectrum-calendar-day-background-color-cap-selected:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-calendar-day-background-color-key-focus:rgba(var(--spectrum-black-rgb),.06);--spectrum-calendar-day-border-color-key-focus:var(--spectrum-blue-800);--spectrum-badge-label-icon-color-primary:var(--spectrum-white);--spectrum-coach-indicator-ring-default-color:var(--spectrum-blue-800);--spectrum-coach-indicator-ring-dark-color:var(--spectrum-gray-900);--spectrum-coach-indicator-ring-light-color:var(--spectrum-gray-50);--spectrum-well-border-color:var(--spectrum-black-rgb);--spectrum-steplist-current-marker-color-key-focus:var(--spectrum-blue-800);--spectrum-treeview-item-background-color-quiet-selected:rgba(var(--spectrum-gray-900-rgb),.06);--spectrum-treeview-item-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-logic-button-and-background-color:var(--spectrum-blue-900);--spectrum-logic-button-and-border-color:var(--spectrum-blue-900);--spectrum-logic-button-and-background-color-hover:var(--spectrum-blue-1100);--spectrum-logic-button-and-border-color-hover:var(--spectrum-blue-1100);--spectrum-logic-button-or-background-color:var(--spectrum-magenta-900);--spectrum-logic-button-or-border-color:var(--spectrum-magenta-900);--spectrum-logic-button-or-background-color-hover:var(--spectrum-magenta-1100);--spectrum-logic-button-or-border-color-hover:var(--spectrum-magenta-1100);--spectrum-assetcard-border-color-selected:var(--spectrum-blue-900);--spectrum-assetcard-border-color-selected-hover:var(--spectrum-blue-900);--spectrum-assetcard-border-color-selected-down:var(--spectrum-blue-1000);--spectrum-assetcard-selectionindicator-background-color-ordered:var(--spectrum-blue-900);--spectrum-assestcard-focus-indicator-color:var(--spectrum-blue-800);--spectrum-assetlist-item-background-color-selected-hover:rgba(var(--spectrum-blue-900-rgb),.2);--spectrum-assetlist-item-background-color-selected:rgba(var(--spectrum-blue-900-rgb),.1);--spectrum-assetlist-border-color-key-focus:var(--spectrum-blue-800)}
`;
var theme_light_css_default = e;

// ../node_modules/@spectrum-web-components/theme/src/Theme.js
init_src();
init_version();
var d = ["spectrum", "express", "spectrum-two"];
var c2 = ["medium", "large", "medium-express", "large-express", "medium-spectrum-two", "large-spectrum-two"];
var p2 = ["light", "lightest", "dark", "darkest", "light-express", "lightest-express", "dark-express", "darkest-express", "light-spectrum-two", "dark-spectrum-two"];
var r2 = class r3 extends HTMLElement {
  constructor() {
    super();
    this._dir = "";
    this._system = "spectrum";
    this._color = "";
    this._scale = "";
    this.trackedChildren = /* @__PURE__ */ new Set();
    this._updateRequested = false;
    this._contextConsumers = /* @__PURE__ */ new Map();
    this.attachShadow({ mode: "open" });
    const e16 = document.importNode(r3.template.content, true);
    this.shadowRoot.appendChild(e16), this.shouldAdoptStyles(), this.addEventListener("sp-query-theme", this.onQueryTheme), this.addEventListener("sp-language-context", this._handleContextPresence), this.updateComplete = this.__createDeferredPromise();
  }
  static get observedAttributes() {
    return ["color", "scale", "lang", "dir", "system", "theme"];
  }
  set dir(e16) {
    if (e16 === this.dir)
      return;
    this.setAttribute("dir", e16), this._dir = e16;
    const t13 = e16 === "rtl" ? e16 : "ltr";
    this.trackedChildren.forEach((s10) => {
      s10.setAttribute("dir", t13);
    });
  }
  get dir() {
    return this._dir;
  }
  attributeChangedCallback(e16, t13, s10) {
    t13 !== s10 && (e16 === "color" ? this.color = s10 : e16 === "scale" ? this.scale = s10 : e16 === "lang" && s10 ? (this.lang = s10, this._provideContext()) : e16 === "theme" ? this.theme = s10 : e16 === "system" ? this.system = s10 : e16 === "dir" && (this.dir = s10));
  }
  requestUpdate() {
    window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow ? window.ShadyCSS.styleElement(this) : this.shouldAdoptStyles();
  }
  get system() {
    const e16 = r3.themeFragmentsByKind.get("system"), { name: t13 } = e16 && e16.get("default") || {};
    return this._system || t13 || "";
  }
  set system(e16) {
    if (e16 === this._system)
      return;
    const t13 = e16 && d.includes(e16) ? e16 : this.system;
    t13 !== this._system && (this._system = t13, this.requestUpdate()), t13 ? this.setAttribute("system", t13) : this.removeAttribute("system");
  }
  get theme() {
    return this.system || this.removeAttribute("system"), this.system;
  }
  set theme(e16) {
    this.system = e16, this.requestUpdate();
  }
  get color() {
    const e16 = r3.themeFragmentsByKind.get("color"), { name: t13 } = e16 && e16.get("default") || {};
    return this._color || t13 || "";
  }
  set color(e16) {
    if (e16 === this._color)
      return;
    const t13 = e16 && p2.includes(e16) ? e16 : this.color;
    t13 !== this._color && (this._color = t13, this.requestUpdate()), t13 ? this.setAttribute("color", t13) : this.removeAttribute("color");
  }
  get scale() {
    const e16 = r3.themeFragmentsByKind.get("scale"), { name: t13 } = e16 && e16.get("default") || {};
    return this._scale || t13 || "";
  }
  set scale(e16) {
    if (e16 === this._scale)
      return;
    const t13 = e16 && c2.includes(e16) ? e16 : this.scale;
    t13 !== this._scale && (this._scale = t13, this.requestUpdate()), t13 ? this.setAttribute("scale", t13) : this.removeAttribute("scale");
  }
  get styles() {
    const e16 = [...r3.themeFragmentsByKind.keys()], t13 = (a10, i12, n6) => {
      const o13 = n6 && n6 !== "theme" && n6 !== "system" && this.theme !== "spectrum" && this.system !== "spectrum" ? a10.get(`${i12}-${this.system}`) : a10.get(i12), l7 = i12 === "spectrum" || !n6 || this.hasAttribute(n6);
      if (o13 && l7)
        return o13.styles;
    };
    return [...e16.reduce((a10, i12) => {
      const n6 = r3.themeFragmentsByKind.get(i12);
      let o13;
      if (i12 === "app" || i12 === "core")
        o13 = t13(n6, i12);
      else {
        const { [i12]: l7 } = this;
        o13 = t13(n6, l7, i12);
      }
      return o13 && a10.push(o13), a10;
    }, [])];
  }
  static get template() {
    return this.templateElement || (this.templateElement = document.createElement("template"), this.templateElement.innerHTML = "<slot></slot>"), this.templateElement;
  }
  __createDeferredPromise() {
    return new Promise((e16) => {
      this.__resolve = e16;
    });
  }
  onQueryTheme(e16) {
    if (e16.defaultPrevented)
      return;
    e16.preventDefault();
    const { detail: t13 } = e16;
    t13.color = this.color || void 0, t13.scale = this.scale || void 0, t13.lang = this.lang || document.documentElement.lang || navigator.language, t13.theme = this.system || void 0, t13.system = this.system || void 0;
  }
  connectedCallback() {
    if (this.shouldAdoptStyles(), window.ShadyCSS !== void 0 && window.ShadyCSS.styleElement(this), r3.instances.add(this), !this.hasAttribute("dir")) {
      let e16 = this.assignedSlot || this.parentNode;
      for (; e16 !== document.documentElement && !(e16 instanceof r3); )
        e16 = e16.assignedSlot || e16.parentNode || e16.host;
      this.dir = e16.dir === "rtl" ? e16.dir : "ltr";
    }
  }
  disconnectedCallback() {
    r3.instances.delete(this);
  }
  startManagingContentDirection(e16) {
    this.trackedChildren.add(e16);
  }
  stopManagingContentDirection(e16) {
    this.trackedChildren.delete(e16);
  }
  async shouldAdoptStyles() {
    this._updateRequested || (this.updateComplete = this.__createDeferredPromise(), this._updateRequested = true, this._updateRequested = await false, this.adoptStyles(), this.__resolve(true));
  }
  adoptStyles() {
    const e16 = this.styles;
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow && window.ShadyCSS.ScopingShim) {
      const t13 = [];
      for (const [s10, a10] of r3.themeFragmentsByKind)
        for (const [i12, { styles: n6 }] of a10) {
          if (i12 === "default")
            continue;
          let o13 = n6.cssText;
          r3.defaultFragments.has(i12) || (o13 = o13.replace(":host", `:host([${s10}='${i12}'])`)), t13.push(o13);
        }
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t13, this.localName), window.ShadyCSS.prepareTemplate(r3.template, this.localName);
    } else if (src_exports.supportsAdoptingStyleSheets) {
      const t13 = [];
      for (const s10 of e16)
        t13.push(s10.styleSheet);
      this.shadowRoot.adoptedStyleSheets = t13;
    } else
      this.shadowRoot.querySelectorAll("style").forEach((s10) => s10.remove()), e16.forEach((s10) => {
        const a10 = document.createElement("style");
        a10.textContent = s10.cssText, this.shadowRoot.appendChild(a10);
      });
  }
  static registerThemeFragment(e16, t13, s10) {
    const a10 = r3.themeFragmentsByKind.get(t13) || /* @__PURE__ */ new Map();
    a10.size === 0 && (r3.themeFragmentsByKind.set(t13, a10), a10.set("default", { name: e16, styles: s10 }), r3.defaultFragments.add(e16)), a10.set(e16, { name: e16, styles: s10 }), r3.instances.forEach((i12) => i12.shouldAdoptStyles());
  }
  _provideContext() {
    this._contextConsumers.forEach(([e16, t13]) => e16(this.lang, t13));
  }
  _handleContextPresence(e16) {
    e16.stopPropagation();
    const t13 = e16.composedPath()[0];
    if (this._contextConsumers.has(t13))
      return;
    this._contextConsumers.set(t13, [e16.detail.callback, () => this._contextConsumers.delete(t13)]);
    const [s10, a10] = this._contextConsumers.get(t13) || [];
    s10 && a10 && s10(this.lang || document.documentElement.lang || navigator.language, a10);
  }
};
r2.themeFragmentsByKind = /* @__PURE__ */ new Map(), r2.defaultFragments = /* @__PURE__ */ new Set(["spectrum"]), r2.instances = /* @__PURE__ */ new Set(), r2.VERSION = version;
var Theme = r2;

// ../node_modules/@spectrum-web-components/theme/src/theme.css.js
init_src();
var e2 = src_exports.css`
            /*!
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
:root,:host{--spectrum-global-animation-linear:cubic-bezier(0,0,1,1);--spectrum-global-animation-duration-0:0s;--spectrum-global-animation-duration-100:.13s;--spectrum-global-animation-duration-200:.16s;--spectrum-global-animation-duration-300:.19s;--spectrum-global-animation-duration-400:.22s;--spectrum-global-animation-duration-500:.25s;--spectrum-global-animation-duration-600:.3s;--spectrum-global-animation-duration-700:.35s;--spectrum-global-animation-duration-800:.4s;--spectrum-global-animation-duration-900:.45s;--spectrum-global-animation-duration-1000:.5s;--spectrum-global-animation-duration-2000:1s;--spectrum-global-animation-duration-4000:2s;--spectrum-global-animation-ease-in-out:cubic-bezier(.45,0,.4,1);--spectrum-global-animation-ease-in:cubic-bezier(.5,0,1,1);--spectrum-global-animation-ease-out:cubic-bezier(0,0,.4,1);--spectrum-global-animation-ease-linear:cubic-bezier(0,0,1,1);--spectrum-global-color-status:Verified;--spectrum-global-color-version:5.1;--spectrum-global-color-static-black-rgb:0,0,0;--spectrum-global-color-static-black:rgb(var(--spectrum-global-color-static-black-rgb));--spectrum-global-color-static-white-rgb:255,255,255;--spectrum-global-color-static-white:rgb(var(--spectrum-global-color-static-white-rgb));--spectrum-global-color-static-blue-rgb:0,87,191;--spectrum-global-color-static-blue:rgb(var(--spectrum-global-color-static-blue-rgb));--spectrum-global-color-static-gray-50-rgb:255,255,255;--spectrum-global-color-static-gray-50:rgb(var(--spectrum-global-color-static-gray-50-rgb));--spectrum-global-color-static-gray-75-rgb:255,255,255;--spectrum-global-color-static-gray-75:rgb(var(--spectrum-global-color-static-gray-75-rgb));--spectrum-global-color-static-gray-100-rgb:255,255,255;--spectrum-global-color-static-gray-100:rgb(var(--spectrum-global-color-static-gray-100-rgb));--spectrum-global-color-static-gray-200-rgb:235,235,235;--spectrum-global-color-static-gray-200:rgb(var(--spectrum-global-color-static-gray-200-rgb));--spectrum-global-color-static-gray-300-rgb:217,217,217;--spectrum-global-color-static-gray-300:rgb(var(--spectrum-global-color-static-gray-300-rgb));--spectrum-global-color-static-gray-400-rgb:179,179,179;--spectrum-global-color-static-gray-400:rgb(var(--spectrum-global-color-static-gray-400-rgb));--spectrum-global-color-static-gray-500-rgb:146,146,146;--spectrum-global-color-static-gray-500:rgb(var(--spectrum-global-color-static-gray-500-rgb));--spectrum-global-color-static-gray-600-rgb:110,110,110;--spectrum-global-color-static-gray-600:rgb(var(--spectrum-global-color-static-gray-600-rgb));--spectrum-global-color-static-gray-700-rgb:71,71,71;--spectrum-global-color-static-gray-700:rgb(var(--spectrum-global-color-static-gray-700-rgb));--spectrum-global-color-static-gray-800-rgb:34,34,34;--spectrum-global-color-static-gray-800:rgb(var(--spectrum-global-color-static-gray-800-rgb));--spectrum-global-color-static-gray-900-rgb:0,0,0;--spectrum-global-color-static-gray-900:rgb(var(--spectrum-global-color-static-gray-900-rgb));--spectrum-global-color-static-red-400-rgb:237,64,48;--spectrum-global-color-static-red-400:rgb(var(--spectrum-global-color-static-red-400-rgb));--spectrum-global-color-static-red-500-rgb:217,28,21;--spectrum-global-color-static-red-500:rgb(var(--spectrum-global-color-static-red-500-rgb));--spectrum-global-color-static-red-600-rgb:187,2,2;--spectrum-global-color-static-red-600:rgb(var(--spectrum-global-color-static-red-600-rgb));--spectrum-global-color-static-red-700-rgb:154,0,0;--spectrum-global-color-static-red-700:rgb(var(--spectrum-global-color-static-red-700-rgb));--spectrum-global-color-static-red-800-rgb:124,0,0;--spectrum-global-color-static-red-800:rgb(var(--spectrum-global-color-static-red-800-rgb));--spectrum-global-color-static-orange-400-rgb:250,139,26;--spectrum-global-color-static-orange-400:rgb(var(--spectrum-global-color-static-orange-400-rgb));--spectrum-global-color-static-orange-500-rgb:233,117,0;--spectrum-global-color-static-orange-500:rgb(var(--spectrum-global-color-static-orange-500-rgb));--spectrum-global-color-static-orange-600-rgb:209,97,0;--spectrum-global-color-static-orange-600:rgb(var(--spectrum-global-color-static-orange-600-rgb));--spectrum-global-color-static-orange-700-rgb:182,80,0;--spectrum-global-color-static-orange-700:rgb(var(--spectrum-global-color-static-orange-700-rgb));--spectrum-global-color-static-orange-800-rgb:155,64,0;--spectrum-global-color-static-orange-800:rgb(var(--spectrum-global-color-static-orange-800-rgb));--spectrum-global-color-static-yellow-200-rgb:250,237,123;--spectrum-global-color-static-yellow-200:rgb(var(--spectrum-global-color-static-yellow-200-rgb));--spectrum-global-color-static-yellow-300-rgb:250,224,23;--spectrum-global-color-static-yellow-300:rgb(var(--spectrum-global-color-static-yellow-300-rgb));--spectrum-global-color-static-yellow-400-rgb:238,205,0;--spectrum-global-color-static-yellow-400:rgb(var(--spectrum-global-color-static-yellow-400-rgb));--spectrum-global-color-static-yellow-500-rgb:221,185,0;--spectrum-global-color-static-yellow-500:rgb(var(--spectrum-global-color-static-yellow-500-rgb));--spectrum-global-color-static-yellow-600-rgb:201,164,0;--spectrum-global-color-static-yellow-600:rgb(var(--spectrum-global-color-static-yellow-600-rgb));--spectrum-global-color-static-yellow-700-rgb:181,144,0;--spectrum-global-color-static-yellow-700:rgb(var(--spectrum-global-color-static-yellow-700-rgb));--spectrum-global-color-static-yellow-800-rgb:160,125,0;--spectrum-global-color-static-yellow-800:rgb(var(--spectrum-global-color-static-yellow-800-rgb));--spectrum-global-color-static-chartreuse-300-rgb:176,222,27;--spectrum-global-color-static-chartreuse-300:rgb(var(--spectrum-global-color-static-chartreuse-300-rgb));--spectrum-global-color-static-chartreuse-400-rgb:157,203,13;--spectrum-global-color-static-chartreuse-400:rgb(var(--spectrum-global-color-static-chartreuse-400-rgb));--spectrum-global-color-static-chartreuse-500-rgb:139,182,4;--spectrum-global-color-static-chartreuse-500:rgb(var(--spectrum-global-color-static-chartreuse-500-rgb));--spectrum-global-color-static-chartreuse-600-rgb:122,162,0;--spectrum-global-color-static-chartreuse-600:rgb(var(--spectrum-global-color-static-chartreuse-600-rgb));--spectrum-global-color-static-chartreuse-700-rgb:106,141,0;--spectrum-global-color-static-chartreuse-700:rgb(var(--spectrum-global-color-static-chartreuse-700-rgb));--spectrum-global-color-static-chartreuse-800-rgb:90,120,0;--spectrum-global-color-static-chartreuse-800:rgb(var(--spectrum-global-color-static-chartreuse-800-rgb));--spectrum-global-color-static-celery-200-rgb:126,229,114;--spectrum-global-color-static-celery-200:rgb(var(--spectrum-global-color-static-celery-200-rgb));--spectrum-global-color-static-celery-300-rgb:87,212,86;--spectrum-global-color-static-celery-300:rgb(var(--spectrum-global-color-static-celery-300-rgb));--spectrum-global-color-static-celery-400-rgb:48,193,61;--spectrum-global-color-static-celery-400:rgb(var(--spectrum-global-color-static-celery-400-rgb));--spectrum-global-color-static-celery-500-rgb:15,172,38;--spectrum-global-color-static-celery-500:rgb(var(--spectrum-global-color-static-celery-500-rgb));--spectrum-global-color-static-celery-600-rgb:0,150,20;--spectrum-global-color-static-celery-600:rgb(var(--spectrum-global-color-static-celery-600-rgb));--spectrum-global-color-static-celery-700-rgb:0,128,15;--spectrum-global-color-static-celery-700:rgb(var(--spectrum-global-color-static-celery-700-rgb));--spectrum-global-color-static-celery-800-rgb:0,107,15;--spectrum-global-color-static-celery-800:rgb(var(--spectrum-global-color-static-celery-800-rgb));--spectrum-global-color-static-green-400-rgb:29,169,115;--spectrum-global-color-static-green-400:rgb(var(--spectrum-global-color-static-green-400-rgb));--spectrum-global-color-static-green-500-rgb:0,148,97;--spectrum-global-color-static-green-500:rgb(var(--spectrum-global-color-static-green-500-rgb));--spectrum-global-color-static-green-600-rgb:0,126,80;--spectrum-global-color-static-green-600:rgb(var(--spectrum-global-color-static-green-600-rgb));--spectrum-global-color-static-green-700-rgb:0,105,65;--spectrum-global-color-static-green-700:rgb(var(--spectrum-global-color-static-green-700-rgb));--spectrum-global-color-static-green-800-rgb:0,86,53;--spectrum-global-color-static-green-800:rgb(var(--spectrum-global-color-static-green-800-rgb));--spectrum-global-color-static-seafoam-200-rgb:75,206,199;--spectrum-global-color-static-seafoam-200:rgb(var(--spectrum-global-color-static-seafoam-200-rgb));--spectrum-global-color-static-seafoam-300-rgb:32,187,180;--spectrum-global-color-static-seafoam-300:rgb(var(--spectrum-global-color-static-seafoam-300-rgb));--spectrum-global-color-static-seafoam-400-rgb:0,166,160;--spectrum-global-color-static-seafoam-400:rgb(var(--spectrum-global-color-static-seafoam-400-rgb));--spectrum-global-color-static-seafoam-500-rgb:0,145,139;--spectrum-global-color-static-seafoam-500:rgb(var(--spectrum-global-color-static-seafoam-500-rgb));--spectrum-global-color-static-seafoam-600-rgb:0,124,118;--spectrum-global-color-static-seafoam-600:rgb(var(--spectrum-global-color-static-seafoam-600-rgb));--spectrum-global-color-static-seafoam-700-rgb:0,103,99;--spectrum-global-color-static-seafoam-700:rgb(var(--spectrum-global-color-static-seafoam-700-rgb));--spectrum-global-color-static-seafoam-800-rgb:10,83,80;--spectrum-global-color-static-seafoam-800:rgb(var(--spectrum-global-color-static-seafoam-800-rgb));--spectrum-global-color-static-blue-200-rgb:130,193,251;--spectrum-global-color-static-blue-200:rgb(var(--spectrum-global-color-static-blue-200-rgb));--spectrum-global-color-static-blue-300-rgb:98,173,247;--spectrum-global-color-static-blue-300:rgb(var(--spectrum-global-color-static-blue-300-rgb));--spectrum-global-color-static-blue-400-rgb:66,151,244;--spectrum-global-color-static-blue-400:rgb(var(--spectrum-global-color-static-blue-400-rgb));--spectrum-global-color-static-blue-500-rgb:27,127,245;--spectrum-global-color-static-blue-500:rgb(var(--spectrum-global-color-static-blue-500-rgb));--spectrum-global-color-static-blue-600-rgb:4,105,227;--spectrum-global-color-static-blue-600:rgb(var(--spectrum-global-color-static-blue-600-rgb));--spectrum-global-color-static-blue-700-rgb:0,87,190;--spectrum-global-color-static-blue-700:rgb(var(--spectrum-global-color-static-blue-700-rgb));--spectrum-global-color-static-blue-800-rgb:0,72,153;--spectrum-global-color-static-blue-800:rgb(var(--spectrum-global-color-static-blue-800-rgb));--spectrum-global-color-static-indigo-200-rgb:178,181,255;--spectrum-global-color-static-indigo-200:rgb(var(--spectrum-global-color-static-indigo-200-rgb));--spectrum-global-color-static-indigo-300-rgb:155,159,255;--spectrum-global-color-static-indigo-300:rgb(var(--spectrum-global-color-static-indigo-300-rgb));--spectrum-global-color-static-indigo-400-rgb:132,137,253;--spectrum-global-color-static-indigo-400:rgb(var(--spectrum-global-color-static-indigo-400-rgb));--spectrum-global-color-static-indigo-500-rgb:109,115,246;--spectrum-global-color-static-indigo-500:rgb(var(--spectrum-global-color-static-indigo-500-rgb));--spectrum-global-color-static-indigo-600-rgb:87,93,232;--spectrum-global-color-static-indigo-600:rgb(var(--spectrum-global-color-static-indigo-600-rgb));--spectrum-global-color-static-indigo-700-rgb:68,74,208;--spectrum-global-color-static-indigo-700:rgb(var(--spectrum-global-color-static-indigo-700-rgb));--spectrum-global-color-static-indigo-800-rgb:68,74,208;--spectrum-global-color-static-indigo-800:rgb(var(--spectrum-global-color-static-indigo-800-rgb));--spectrum-global-color-static-purple-400-rgb:178,121,250;--spectrum-global-color-static-purple-400:rgb(var(--spectrum-global-color-static-purple-400-rgb));--spectrum-global-color-static-purple-500-rgb:161,93,246;--spectrum-global-color-static-purple-500:rgb(var(--spectrum-global-color-static-purple-500-rgb));--spectrum-global-color-static-purple-600-rgb:142,67,234;--spectrum-global-color-static-purple-600:rgb(var(--spectrum-global-color-static-purple-600-rgb));--spectrum-global-color-static-purple-700-rgb:120,43,216;--spectrum-global-color-static-purple-700:rgb(var(--spectrum-global-color-static-purple-700-rgb));--spectrum-global-color-static-purple-800-rgb:98,23,190;--spectrum-global-color-static-purple-800:rgb(var(--spectrum-global-color-static-purple-800-rgb));--spectrum-global-color-static-fuchsia-400-rgb:228,93,230;--spectrum-global-color-static-fuchsia-400:rgb(var(--spectrum-global-color-static-fuchsia-400-rgb));--spectrum-global-color-static-fuchsia-500-rgb:211,63,212;--spectrum-global-color-static-fuchsia-500:rgb(var(--spectrum-global-color-static-fuchsia-500-rgb));--spectrum-global-color-static-fuchsia-600-rgb:188,39,187;--spectrum-global-color-static-fuchsia-600:rgb(var(--spectrum-global-color-static-fuchsia-600-rgb));--spectrum-global-color-static-fuchsia-700-rgb:163,10,163;--spectrum-global-color-static-fuchsia-700:rgb(var(--spectrum-global-color-static-fuchsia-700-rgb));--spectrum-global-color-static-fuchsia-800-rgb:135,0,136;--spectrum-global-color-static-fuchsia-800:rgb(var(--spectrum-global-color-static-fuchsia-800-rgb));--spectrum-global-color-static-magenta-200-rgb:253,127,175;--spectrum-global-color-static-magenta-200:rgb(var(--spectrum-global-color-static-magenta-200-rgb));--spectrum-global-color-static-magenta-300-rgb:242,98,157;--spectrum-global-color-static-magenta-300:rgb(var(--spectrum-global-color-static-magenta-300-rgb));--spectrum-global-color-static-magenta-400-rgb:226,68,135;--spectrum-global-color-static-magenta-400:rgb(var(--spectrum-global-color-static-magenta-400-rgb));--spectrum-global-color-static-magenta-500-rgb:205,40,111;--spectrum-global-color-static-magenta-500:rgb(var(--spectrum-global-color-static-magenta-500-rgb));--spectrum-global-color-static-magenta-600-rgb:179,15,89;--spectrum-global-color-static-magenta-600:rgb(var(--spectrum-global-color-static-magenta-600-rgb));--spectrum-global-color-static-magenta-700-rgb:149,0,72;--spectrum-global-color-static-magenta-700:rgb(var(--spectrum-global-color-static-magenta-700-rgb));--spectrum-global-color-static-magenta-800-rgb:119,0,58;--spectrum-global-color-static-magenta-800:rgb(var(--spectrum-global-color-static-magenta-800-rgb));--spectrum-global-color-static-transparent-white-200:#ffffff1a;--spectrum-global-color-static-transparent-white-300:#ffffff40;--spectrum-global-color-static-transparent-white-400:#fff6;--spectrum-global-color-static-transparent-white-500:#ffffff8c;--spectrum-global-color-static-transparent-white-600:#ffffffb3;--spectrum-global-color-static-transparent-white-700:#fffc;--spectrum-global-color-static-transparent-white-800:#ffffffe6;--spectrum-global-color-static-transparent-white-900-rgb:255,255,255;--spectrum-global-color-static-transparent-white-900:rgb(var(--spectrum-global-color-static-transparent-white-900-rgb));--spectrum-global-color-static-transparent-black-200:#0000001a;--spectrum-global-color-static-transparent-black-300:#00000040;--spectrum-global-color-static-transparent-black-400:#0006;--spectrum-global-color-static-transparent-black-500:#0000008c;--spectrum-global-color-static-transparent-black-600:#000000b3;--spectrum-global-color-static-transparent-black-700:#000c;--spectrum-global-color-static-transparent-black-800:#000000e6;--spectrum-global-color-static-transparent-black-900-rgb:0,0,0;--spectrum-global-color-static-transparent-black-900:rgb(var(--spectrum-global-color-static-transparent-black-900-rgb));--spectrum-global-color-sequential-cerulean:#e9fff1,#c8f1e4,#a5e3d7,#82d5ca,#68c5c1,#54b4ba,#3fa2b2,#2991ac,#2280a2,#1f6d98,#1d5c8d,#1a4b83,#1a3979,#1a266f,#191264,#180057;--spectrum-global-color-sequential-forest:#ffffdf,#e2f6ba,#c4eb95,#a4e16d,#8dd366,#77c460,#5fb65a,#48a754,#36984f,#2c894d,#237a4a,#196b47,#105c45,#094d41,#033f3e,#00313a;--spectrum-global-color-sequential-rose:#fff4dd,#ffddd7,#ffc5d2,#feaecb,#fa96c4,#f57ebd,#ef64b5,#e846ad,#d238a1,#bb2e96,#a3248c,#8a1b83,#71167c,#560f74,#370b6e,#000968;--spectrum-global-color-diverging-orange-yellow-seafoam:#580000,#79260b,#9c4511,#bd651a,#dd8629,#f5ad52,#fed693,#ffffe0,#bbe4d1,#76c7be,#3ea8a6,#208288,#076769,#00494b,#002c2d;--spectrum-global-color-diverging-red-yellow-blue:#4a001e,#751232,#a52747,#c65154,#e47961,#f0a882,#fad4ac,#ffffe0,#bce2cf,#89c0c4,#579eb9,#397aa8,#1c5796,#163771,#10194d;--spectrum-global-color-diverging-red-blue:#4a001e,#731331,#9f2945,#cc415a,#e06e85,#ed9ab0,#f8c3d9,#faf0ff,#c6d0f2,#92b2de,#5d94cb,#2f74b3,#265191,#163670,#0b194c;--spectrum-semantic-negative-background-color:var(--spectrum-global-color-static-red-600);--spectrum-semantic-negative-color-default:var(--spectrum-global-color-red-500);--spectrum-semantic-negative-color-hover:var(--spectrum-global-color-red-600);--spectrum-semantic-negative-color-dark:var(--spectrum-global-color-red-600);--spectrum-semantic-negative-border-color:var(--spectrum-global-color-red-400);--spectrum-semantic-negative-icon-color:var(--spectrum-global-color-red-600);--spectrum-semantic-negative-status-color:var(--spectrum-global-color-red-400);--spectrum-semantic-negative-text-color-large:var(--spectrum-global-color-red-500);--spectrum-semantic-negative-text-color-small:var(--spectrum-global-color-red-600);--spectrum-semantic-negative-text-color-small-hover:var(--spectrum-global-color-red-700);--spectrum-semantic-negative-text-color-small-down:var(--spectrum-global-color-red-700);--spectrum-semantic-negative-text-color-small-key-focus:var(--spectrum-global-color-red-600);--spectrum-semantic-negative-color-down:var(--spectrum-global-color-red-700);--spectrum-semantic-negative-color-key-focus:var(--spectrum-global-color-red-400);--spectrum-semantic-negative-background-color-default:var(--spectrum-global-color-static-red-600);--spectrum-semantic-negative-background-color-hover:var(--spectrum-global-color-static-red-700);--spectrum-semantic-negative-background-color-down:var(--spectrum-global-color-static-red-800);--spectrum-semantic-negative-background-color-key-focus:var(--spectrum-global-color-static-red-700);--spectrum-semantic-notice-background-color:var(--spectrum-global-color-static-orange-600);--spectrum-semantic-notice-color-default:var(--spectrum-global-color-orange-500);--spectrum-semantic-notice-color-dark:var(--spectrum-global-color-orange-600);--spectrum-semantic-notice-border-color:var(--spectrum-global-color-orange-400);--spectrum-semantic-notice-icon-color:var(--spectrum-global-color-orange-600);--spectrum-semantic-notice-status-color:var(--spectrum-global-color-orange-400);--spectrum-semantic-notice-text-color-large:var(--spectrum-global-color-orange-500);--spectrum-semantic-notice-text-color-small:var(--spectrum-global-color-orange-600);--spectrum-semantic-notice-color-down:var(--spectrum-global-color-orange-700);--spectrum-semantic-notice-color-key-focus:var(--spectrum-global-color-orange-400);--spectrum-semantic-notice-background-color-default:var(--spectrum-global-color-static-orange-600);--spectrum-semantic-notice-background-color-hover:var(--spectrum-global-color-static-orange-700);--spectrum-semantic-notice-background-color-down:var(--spectrum-global-color-static-orange-800);--spectrum-semantic-notice-background-color-key-focus:var(--spectrum-global-color-static-orange-700);--spectrum-semantic-positive-background-color:var(--spectrum-global-color-static-green-600);--spectrum-semantic-positive-color-default:var(--spectrum-global-color-green-500);--spectrum-semantic-positive-color-dark:var(--spectrum-global-color-green-600);--spectrum-semantic-positive-border-color:var(--spectrum-global-color-green-400);--spectrum-semantic-positive-icon-color:var(--spectrum-global-color-green-600);--spectrum-semantic-positive-status-color:var(--spectrum-global-color-green-400);--spectrum-semantic-positive-text-color-large:var(--spectrum-global-color-green-500);--spectrum-semantic-positive-text-color-small:var(--spectrum-global-color-green-600);--spectrum-semantic-positive-color-down:var(--spectrum-global-color-green-700);--spectrum-semantic-positive-color-key-focus:var(--spectrum-global-color-green-400);--spectrum-semantic-positive-background-color-default:var(--spectrum-global-color-static-green-600);--spectrum-semantic-positive-background-color-hover:var(--spectrum-global-color-static-green-700);--spectrum-semantic-positive-background-color-down:var(--spectrum-global-color-static-green-800);--spectrum-semantic-positive-background-color-key-focus:var(--spectrum-global-color-static-green-700);--spectrum-semantic-informative-background-color:var(--spectrum-global-color-static-blue-600);--spectrum-semantic-informative-color-default:var(--spectrum-global-color-blue-500);--spectrum-semantic-informative-color-dark:var(--spectrum-global-color-blue-600);--spectrum-semantic-informative-border-color:var(--spectrum-global-color-blue-400);--spectrum-semantic-informative-icon-color:var(--spectrum-global-color-blue-600);--spectrum-semantic-informative-status-color:var(--spectrum-global-color-blue-400);--spectrum-semantic-informative-text-color-large:var(--spectrum-global-color-blue-500);--spectrum-semantic-informative-text-color-small:var(--spectrum-global-color-blue-600);--spectrum-semantic-informative-color-down:var(--spectrum-global-color-blue-700);--spectrum-semantic-informative-color-key-focus:var(--spectrum-global-color-blue-400);--spectrum-semantic-informative-background-color-default:var(--spectrum-global-color-static-blue-600);--spectrum-semantic-informative-background-color-hover:var(--spectrum-global-color-static-blue-700);--spectrum-semantic-informative-background-color-down:var(--spectrum-global-color-static-blue-800);--spectrum-semantic-informative-background-color-key-focus:var(--spectrum-global-color-static-blue-700);--spectrum-semantic-cta-background-color-default:var(--spectrum-global-color-static-blue-600);--spectrum-semantic-cta-background-color-hover:var(--spectrum-global-color-static-blue-700);--spectrum-semantic-cta-background-color-down:var(--spectrum-global-color-static-blue-800);--spectrum-semantic-cta-background-color-key-focus:var(--spectrum-global-color-static-blue-700);--spectrum-semantic-emphasized-border-color-default:var(--spectrum-global-color-blue-500);--spectrum-semantic-emphasized-border-color-hover:var(--spectrum-global-color-blue-600);--spectrum-semantic-emphasized-border-color-down:var(--spectrum-global-color-blue-700);--spectrum-semantic-emphasized-border-color-key-focus:var(--spectrum-global-color-blue-600);--spectrum-semantic-neutral-background-color-default:var(--spectrum-global-color-static-gray-700);--spectrum-semantic-neutral-background-color-hover:var(--spectrum-global-color-static-gray-800);--spectrum-semantic-neutral-background-color-down:var(--spectrum-global-color-static-gray-900);--spectrum-semantic-neutral-background-color-key-focus:var(--spectrum-global-color-static-gray-800);--spectrum-semantic-presence-color-1:var(--spectrum-global-color-static-red-500);--spectrum-semantic-presence-color-2:var(--spectrum-global-color-static-orange-400);--spectrum-semantic-presence-color-3:var(--spectrum-global-color-static-yellow-400);--spectrum-semantic-presence-color-4-rgb:75,204,162;--spectrum-semantic-presence-color-4:rgb(var(--spectrum-semantic-presence-color-4-rgb));--spectrum-semantic-presence-color-5-rgb:0,199,255;--spectrum-semantic-presence-color-5:rgb(var(--spectrum-semantic-presence-color-5-rgb));--spectrum-semantic-presence-color-6-rgb:0,140,184;--spectrum-semantic-presence-color-6:rgb(var(--spectrum-semantic-presence-color-6-rgb));--spectrum-semantic-presence-color-7-rgb:126,75,243;--spectrum-semantic-presence-color-7:rgb(var(--spectrum-semantic-presence-color-7-rgb));--spectrum-semantic-presence-color-8:var(--spectrum-global-color-static-fuchsia-600);--spectrum-global-dimension-static-percent-50:50%;--spectrum-global-dimension-static-percent-70:70%;--spectrum-global-dimension-static-percent-100:100%;--spectrum-global-dimension-static-breakpoint-xsmall:304px;--spectrum-global-dimension-static-breakpoint-small:768px;--spectrum-global-dimension-static-breakpoint-medium:1280px;--spectrum-global-dimension-static-breakpoint-large:1768px;--spectrum-global-dimension-static-breakpoint-xlarge:2160px;--spectrum-global-dimension-static-grid-columns:12;--spectrum-global-dimension-static-grid-fluid-width:100%;--spectrum-global-dimension-static-grid-fixed-max-width:1280px;--spectrum-global-dimension-static-size-0:0px;--spectrum-global-dimension-static-size-10:1px;--spectrum-global-dimension-static-size-25:2px;--spectrum-global-dimension-static-size-40:3px;--spectrum-global-dimension-static-size-50:4px;--spectrum-global-dimension-static-size-65:5px;--spectrum-global-dimension-static-size-75:6px;--spectrum-global-dimension-static-size-85:7px;--spectrum-global-dimension-static-size-100:8px;--spectrum-global-dimension-static-size-115:9px;--spectrum-global-dimension-static-size-125:10px;--spectrum-global-dimension-static-size-130:11px;--spectrum-global-dimension-static-size-150:12px;--spectrum-global-dimension-static-size-160:13px;--spectrum-global-dimension-static-size-175:14px;--spectrum-global-dimension-static-size-185:15px;--spectrum-global-dimension-static-size-200:16px;--spectrum-global-dimension-static-size-225:18px;--spectrum-global-dimension-static-size-250:20px;--spectrum-global-dimension-static-size-275:22px;--spectrum-global-dimension-static-size-300:24px;--spectrum-global-dimension-static-size-325:26px;--spectrum-global-dimension-static-size-350:28px;--spectrum-global-dimension-static-size-400:32px;--spectrum-global-dimension-static-size-450:36px;--spectrum-global-dimension-static-size-500:40px;--spectrum-global-dimension-static-size-550:44px;--spectrum-global-dimension-static-size-600:48px;--spectrum-global-dimension-static-size-700:56px;--spectrum-global-dimension-static-size-800:64px;--spectrum-global-dimension-static-size-900:72px;--spectrum-global-dimension-static-size-1000:80px;--spectrum-global-dimension-static-size-1200:96px;--spectrum-global-dimension-static-size-1700:136px;--spectrum-global-dimension-static-size-2400:192px;--spectrum-global-dimension-static-size-2500:200px;--spectrum-global-dimension-static-size-2600:208px;--spectrum-global-dimension-static-size-2800:224px;--spectrum-global-dimension-static-size-3200:256px;--spectrum-global-dimension-static-size-3400:272px;--spectrum-global-dimension-static-size-3500:280px;--spectrum-global-dimension-static-size-3600:288px;--spectrum-global-dimension-static-size-3800:304px;--spectrum-global-dimension-static-size-4600:368px;--spectrum-global-dimension-static-size-5000:400px;--spectrum-global-dimension-static-size-6000:480px;--spectrum-global-dimension-static-size-16000:1280px;--spectrum-global-dimension-static-font-size-50:11px;--spectrum-global-dimension-static-font-size-75:12px;--spectrum-global-dimension-static-font-size-100:14px;--spectrum-global-dimension-static-font-size-150:15px;--spectrum-global-dimension-static-font-size-200:16px;--spectrum-global-dimension-static-font-size-300:18px;--spectrum-global-dimension-static-font-size-400:20px;--spectrum-global-dimension-static-font-size-500:22px;--spectrum-global-dimension-static-font-size-600:25px;--spectrum-global-dimension-static-font-size-700:28px;--spectrum-global-dimension-static-font-size-800:32px;--spectrum-global-dimension-static-font-size-900:36px;--spectrum-global-dimension-static-font-size-1000:40px;--spectrum-global-font-family-base:adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-global-font-family-serif:adobe-clean-serif,"Source Serif Pro",Georgia,serif;--spectrum-global-font-family-code:"Source Code Pro",Monaco,monospace;--spectrum-global-font-weight-thin:100;--spectrum-global-font-weight-ultra-light:200;--spectrum-global-font-weight-light:300;--spectrum-global-font-weight-regular:400;--spectrum-global-font-weight-medium:500;--spectrum-global-font-weight-semi-bold:600;--spectrum-global-font-weight-bold:700;--spectrum-global-font-weight-extra-bold:800;--spectrum-global-font-weight-black:900;--spectrum-global-font-style-regular:normal;--spectrum-global-font-style-italic:italic;--spectrum-global-font-letter-spacing-none:0;--spectrum-global-font-letter-spacing-small:.0125em;--spectrum-global-font-letter-spacing-han:.05em;--spectrum-global-font-letter-spacing-medium:.06em;--spectrum-global-font-line-height-large:1.7;--spectrum-global-font-line-height-medium:1.5;--spectrum-global-font-line-height-small:1.3;--spectrum-global-font-multiplier-0:0em;--spectrum-global-font-multiplier-25:.25em;--spectrum-global-font-multiplier-75:.75em;--spectrum-global-font-font-family-ar:myriad-arabic,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-global-font-font-family-he:myriad-hebrew,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-global-font-font-family-zh:adobe-clean-han-traditional,source-han-traditional,"MingLiu","Heiti TC Light","sans-serif";--spectrum-global-font-font-family-zhhans:adobe-clean-han-simplified-c,source-han-simplified-c,"SimSun","Heiti SC Light","sans-serif";--spectrum-global-font-font-family-ko:adobe-clean-han-korean,source-han-korean,"Malgun Gothic","Apple Gothic","sans-serif";--spectrum-global-font-font-family-ja:adobe-clean-han-japanese,"Hiragino Kaku Gothic ProN","ヒラギノ角ゴ ProN W3","Osaka",YuGothic,"Yu Gothic","メイリオ",Meiryo,"ＭＳ Ｐゴシック","MS PGothic","sans-serif";--spectrum-global-font-font-family-condensed:adobe-clean-han-traditional,source-han-traditional,"MingLiu","Heiti TC Light",adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-alias-border-size-thin:var(--spectrum-global-dimension-static-size-10);--spectrum-alias-border-size-thick:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-border-size-thicker:var(--spectrum-global-dimension-static-size-50);--spectrum-alias-border-size-thickest:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-border-offset-thin:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-border-offset-thick:var(--spectrum-global-dimension-static-size-50);--spectrum-alias-border-offset-thicker:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-border-offset-thickest:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-grid-baseline:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-grid-gutter-xsmall:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-grid-gutter-small:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-grid-gutter-medium:var(--spectrum-global-dimension-static-size-400);--spectrum-alias-grid-gutter-large:var(--spectrum-global-dimension-static-size-500);--spectrum-alias-grid-gutter-xlarge:var(--spectrum-global-dimension-static-size-600);--spectrum-alias-grid-margin-xsmall:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-grid-margin-small:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-grid-margin-medium:var(--spectrum-global-dimension-static-size-400);--spectrum-alias-grid-margin-large:var(--spectrum-global-dimension-static-size-500);--spectrum-alias-grid-margin-xlarge:var(--spectrum-global-dimension-static-size-600);--spectrum-alias-grid-layout-region-margin-bottom-xsmall:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-grid-layout-region-margin-bottom-small:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-grid-layout-region-margin-bottom-medium:var(--spectrum-global-dimension-static-size-400);--spectrum-alias-grid-layout-region-margin-bottom-large:var(--spectrum-global-dimension-static-size-500);--spectrum-alias-grid-layout-region-margin-bottom-xlarge:var(--spectrum-global-dimension-static-size-600);--spectrum-alias-radial-reaction-size-default:var(--spectrum-global-dimension-static-size-550);--spectrum-alias-focus-ring-gap:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-focus-ring-size:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-loupe-entry-animation-duration:var(--spectrum-global-animation-duration-300);--spectrum-alias-loupe-exit-animation-duration:var(--spectrum-global-animation-duration-300);--spectrum-alias-heading-text-line-height:var(--spectrum-global-font-line-height-small);--spectrum-alias-heading-text-font-weight-regular:var(--spectrum-global-font-weight-bold);--spectrum-alias-heading-text-font-weight-regular-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-heading-text-font-weight-light:var(--spectrum-global-font-weight-light);--spectrum-alias-heading-text-font-weight-light-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-heading-text-font-weight-heavy:var(--spectrum-global-font-weight-black);--spectrum-alias-heading-text-font-weight-heavy-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-heading-text-font-weight-quiet:var(--spectrum-global-font-weight-light);--spectrum-alias-heading-text-font-weight-quiet-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-heading-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-heading-text-font-weight-strong-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-heading-margin-bottom:var(--spectrum-global-font-multiplier-25);--spectrum-alias-subheading-text-font-weight:var(--spectrum-global-font-weight-bold);--spectrum-alias-subheading-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-body-text-font-family:var(--spectrum-global-font-family-base);--spectrum-alias-body-text-line-height:var(--spectrum-global-font-line-height-medium);--spectrum-alias-body-text-font-weight:var(--spectrum-global-font-weight-regular);--spectrum-alias-body-text-font-weight-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-body-margin-bottom:var(--spectrum-global-font-multiplier-75);--spectrum-alias-detail-text-font-weight:var(--spectrum-global-font-weight-bold);--spectrum-alias-detail-text-font-weight-regular:var(--spectrum-global-font-weight-bold);--spectrum-alias-detail-text-font-weight-light:var(--spectrum-global-font-weight-regular);--spectrum-alias-detail-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-article-heading-text-font-weight:var(--spectrum-global-font-weight-bold);--spectrum-alias-article-heading-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-article-heading-text-font-weight-quiet:var(--spectrum-global-font-weight-regular);--spectrum-alias-article-heading-text-font-weight-quiet-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-article-body-text-font-weight:var(--spectrum-global-font-weight-regular);--spectrum-alias-article-body-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-article-subheading-text-font-weight:var(--spectrum-global-font-weight-bold);--spectrum-alias-article-subheading-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-article-detail-text-font-weight:var(--spectrum-global-font-weight-regular);--spectrum-alias-article-detail-text-font-weight-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-code-text-font-family:var(--spectrum-global-font-family-code);--spectrum-alias-code-text-font-weight-regular:var(--spectrum-global-font-weight-regular);--spectrum-alias-code-text-font-weight-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-code-text-line-height:var(--spectrum-global-font-line-height-medium);--spectrum-alias-code-margin-bottom:var(--spectrum-global-font-multiplier-0);--spectrum-alias-font-family-ar:var(--spectrum-global-font-font-family-ar);--spectrum-alias-font-family-he:var(--spectrum-global-font-font-family-he);--spectrum-alias-font-family-zh:var(--spectrum-global-font-font-family-zh);--spectrum-alias-font-family-zhhans:var(--spectrum-global-font-font-family-zhhans);--spectrum-alias-font-family-ko:var(--spectrum-global-font-font-family-ko);--spectrum-alias-font-family-ja:var(--spectrum-global-font-font-family-ja);--spectrum-alias-font-family-condensed:var(--spectrum-global-font-font-family-condensed);--spectrum-alias-component-text-line-height:var(--spectrum-global-font-line-height-small);--spectrum-alias-han-component-text-line-height:var(--spectrum-global-font-line-height-medium);--spectrum-alias-serif-text-font-family:var(--spectrum-global-font-family-serif);--spectrum-alias-han-heading-text-line-height:var(--spectrum-global-font-line-height-medium);--spectrum-alias-han-heading-text-font-weight-regular:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-heading-text-font-weight-regular-emphasis:var(--spectrum-global-font-weight-extra-bold);--spectrum-alias-han-heading-text-font-weight-regular-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-han-heading-text-font-weight-quiet-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-heading-text-font-weight-light:var(--spectrum-global-font-weight-light);--spectrum-alias-han-heading-text-font-weight-light-emphasis:var(--spectrum-global-font-weight-regular);--spectrum-alias-han-heading-text-font-weight-light-strong:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-heading-text-font-weight-heavy:var(--spectrum-global-font-weight-black);--spectrum-alias-han-heading-text-font-weight-heavy-emphasis:var(--spectrum-global-font-weight-black);--spectrum-alias-han-heading-text-font-weight-heavy-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-han-body-text-line-height:var(--spectrum-global-font-line-height-large);--spectrum-alias-han-body-text-font-weight-regular:var(--spectrum-global-font-weight-regular);--spectrum-alias-han-body-text-font-weight-emphasis:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-body-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-han-subheading-text-font-weight-regular:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-subheading-text-font-weight-emphasis:var(--spectrum-global-font-weight-extra-bold);--spectrum-alias-han-subheading-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-han-detail-text-font-weight:var(--spectrum-global-font-weight-regular);--spectrum-alias-han-detail-text-font-weight-emphasis:var(--spectrum-global-font-weight-bold);--spectrum-alias-han-detail-text-font-weight-strong:var(--spectrum-global-font-weight-black);--spectrum-alias-item-height-s:var(--spectrum-global-dimension-size-300);--spectrum-alias-item-height-m:var(--spectrum-global-dimension-size-400);--spectrum-alias-item-height-l:var(--spectrum-global-dimension-size-500);--spectrum-alias-item-height-xl:var(--spectrum-global-dimension-size-600);--spectrum-alias-item-rounded-border-radius-s:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-rounded-border-radius-m:var(--spectrum-global-dimension-size-200);--spectrum-alias-item-rounded-border-radius-l:var(--spectrum-global-dimension-size-250);--spectrum-alias-item-rounded-border-radius-xl:var(--spectrum-global-dimension-size-300);--spectrum-alias-item-text-size-s:var(--spectrum-global-dimension-font-size-75);--spectrum-alias-item-text-size-m:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-item-text-size-l:var(--spectrum-global-dimension-font-size-200);--spectrum-alias-item-text-size-xl:var(--spectrum-global-dimension-font-size-300);--spectrum-alias-item-text-padding-top-s:var(--spectrum-global-dimension-static-size-50);--spectrum-alias-item-text-padding-top-m:var(--spectrum-global-dimension-size-75);--spectrum-alias-item-text-padding-top-xl:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-text-padding-bottom-m:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-text-padding-bottom-l:var(--spectrum-global-dimension-size-130);--spectrum-alias-item-text-padding-bottom-xl:var(--spectrum-global-dimension-size-175);--spectrum-alias-item-icon-padding-top-s:var(--spectrum-global-dimension-size-50);--spectrum-alias-item-icon-padding-top-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-icon-padding-top-l:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-icon-padding-top-xl:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-icon-padding-bottom-s:var(--spectrum-global-dimension-size-50);--spectrum-alias-item-icon-padding-bottom-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-icon-padding-bottom-l:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-icon-padding-bottom-xl:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-padding-s:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-padding-m:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-padding-l:var(--spectrum-global-dimension-size-185);--spectrum-alias-item-padding-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-item-rounded-padding-s:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-rounded-padding-m:var(--spectrum-global-dimension-size-200);--spectrum-alias-item-rounded-padding-l:var(--spectrum-global-dimension-size-250);--spectrum-alias-item-rounded-padding-xl:var(--spectrum-global-dimension-size-300);--spectrum-alias-item-icononly-padding-s:var(--spectrum-global-dimension-size-50);--spectrum-alias-item-icononly-padding-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-icononly-padding-l:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-icononly-padding-xl:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-control-gap-s:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-control-gap-m:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-control-gap-l:var(--spectrum-global-dimension-size-130);--spectrum-alias-item-control-gap-xl:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-workflow-icon-gap-s:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-workflow-icon-gap-m:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-workflow-icon-gap-l:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-workflow-icon-gap-xl:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-mark-gap-s:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-mark-gap-m:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-mark-gap-l:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-mark-gap-xl:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-ui-icon-gap-s:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-ui-icon-gap-m:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-ui-icon-gap-l:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-ui-icon-gap-xl:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-clearbutton-gap-s:var(--spectrum-global-dimension-size-50);--spectrum-alias-item-clearbutton-gap-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-clearbutton-gap-l:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-clearbutton-gap-xl:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-workflow-padding-left-s:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-workflow-padding-left-l:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-workflow-padding-left-xl:var(--spectrum-global-dimension-size-185);--spectrum-alias-item-rounded-workflow-padding-left-s:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-rounded-workflow-padding-left-l:var(--spectrum-global-dimension-size-225);--spectrum-alias-item-mark-padding-top-s:var(--spectrum-global-dimension-size-40);--spectrum-alias-item-mark-padding-top-l:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-mark-padding-top-xl:var(--spectrum-global-dimension-size-130);--spectrum-alias-item-mark-padding-bottom-s:var(--spectrum-global-dimension-size-40);--spectrum-alias-item-mark-padding-bottom-l:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-mark-padding-bottom-xl:var(--spectrum-global-dimension-size-130);--spectrum-alias-item-mark-padding-left-s:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-mark-padding-left-l:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-mark-padding-left-xl:var(--spectrum-global-dimension-size-185);--spectrum-alias-item-control-1-size-s:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-item-control-1-size-m:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-control-2-size-m:var(--spectrum-global-dimension-size-175);--spectrum-alias-item-control-2-size-l:var(--spectrum-global-dimension-size-200);--spectrum-alias-item-control-2-size-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-item-control-2-size-xxl:var(--spectrum-global-dimension-size-250);--spectrum-alias-item-control-2-border-radius-s:var(--spectrum-global-dimension-size-75);--spectrum-alias-item-control-2-border-radius-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-control-2-border-radius-l:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-control-2-border-radius-xl:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-control-2-border-radius-xxl:var(--spectrum-global-dimension-size-125);--spectrum-alias-item-control-2-padding-s:var(--spectrum-global-dimension-size-75);--spectrum-alias-item-control-2-padding-m:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-control-2-padding-l:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-control-2-padding-xl:var(--spectrum-global-dimension-size-185);--spectrum-alias-item-control-3-height-m:var(--spectrum-global-dimension-size-175);--spectrum-alias-item-control-3-height-l:var(--spectrum-global-dimension-size-200);--spectrum-alias-item-control-3-height-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-item-control-3-border-radius-s:var(--spectrum-global-dimension-size-75);--spectrum-alias-item-control-3-border-radius-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-item-control-3-border-radius-l:var(--spectrum-global-dimension-size-100);--spectrum-alias-item-control-3-border-radius-xl:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-control-3-padding-s:var(--spectrum-global-dimension-size-75);--spectrum-alias-item-control-3-padding-m:var(--spectrum-global-dimension-size-115);--spectrum-alias-item-control-3-padding-l:var(--spectrum-global-dimension-size-150);--spectrum-alias-item-control-3-padding-xl:var(--spectrum-global-dimension-size-185);--spectrum-alias-item-mark-size-s:var(--spectrum-global-dimension-size-225);--spectrum-alias-item-mark-size-l:var(--spectrum-global-dimension-size-275);--spectrum-alias-item-mark-size-xl:var(--spectrum-global-dimension-size-325);--spectrum-alias-heading-xxxl-text-size:var(--spectrum-global-dimension-font-size-1300);--spectrum-alias-heading-xxl-text-size:var(--spectrum-global-dimension-font-size-1100);--spectrum-alias-heading-xl-text-size:var(--spectrum-global-dimension-font-size-900);--spectrum-alias-heading-l-text-size:var(--spectrum-global-dimension-font-size-700);--spectrum-alias-heading-m-text-size:var(--spectrum-global-dimension-font-size-500);--spectrum-alias-heading-s-text-size:var(--spectrum-global-dimension-font-size-300);--spectrum-alias-heading-xs-text-size:var(--spectrum-global-dimension-font-size-200);--spectrum-alias-heading-xxs-text-size:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-heading-xxxl-margin-top:var(--spectrum-global-dimension-font-size-1200);--spectrum-alias-heading-xxl-margin-top:var(--spectrum-global-dimension-font-size-900);--spectrum-alias-heading-xl-margin-top:var(--spectrum-global-dimension-font-size-800);--spectrum-alias-heading-l-margin-top:var(--spectrum-global-dimension-font-size-600);--spectrum-alias-heading-m-margin-top:var(--spectrum-global-dimension-font-size-400);--spectrum-alias-heading-s-margin-top:var(--spectrum-global-dimension-font-size-200);--spectrum-alias-heading-xs-margin-top:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-heading-xxs-margin-top:var(--spectrum-global-dimension-font-size-75);--spectrum-alias-heading-han-xxxl-text-size:var(--spectrum-global-dimension-font-size-1300);--spectrum-alias-heading-han-xxl-text-size:var(--spectrum-global-dimension-font-size-900);--spectrum-alias-heading-han-xl-text-size:var(--spectrum-global-dimension-font-size-800);--spectrum-alias-heading-han-l-text-size:var(--spectrum-global-dimension-font-size-600);--spectrum-alias-heading-han-m-text-size:var(--spectrum-global-dimension-font-size-400);--spectrum-alias-heading-han-s-text-size:var(--spectrum-global-dimension-font-size-300);--spectrum-alias-heading-han-xs-text-size:var(--spectrum-global-dimension-font-size-200);--spectrum-alias-heading-han-xxs-text-size:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-heading-han-xxxl-margin-top:var(--spectrum-global-dimension-font-size-1200);--spectrum-alias-heading-han-xxl-margin-top:var(--spectrum-global-dimension-font-size-800);--spectrum-alias-heading-han-xl-margin-top:var(--spectrum-global-dimension-font-size-700);--spectrum-alias-heading-han-l-margin-top:var(--spectrum-global-dimension-font-size-500);--spectrum-alias-heading-han-m-margin-top:var(--spectrum-global-dimension-font-size-300);--spectrum-alias-heading-han-s-margin-top:var(--spectrum-global-dimension-font-size-200);--spectrum-alias-heading-han-xs-margin-top:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-heading-han-xxs-margin-top:var(--spectrum-global-dimension-font-size-75);--spectrum-alias-component-border-radius:var(--spectrum-global-dimension-size-50);--spectrum-alias-component-border-radius-quiet:var(--spectrum-global-dimension-static-size-0);--spectrum-alias-component-focusring-gap:var(--spectrum-global-dimension-static-size-0);--spectrum-alias-component-focusring-gap-emphasized:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-component-focusring-size:var(--spectrum-global-dimension-static-size-10);--spectrum-alias-component-focusring-size-emphasized:var(--spectrum-global-dimension-static-size-25);--spectrum-alias-input-border-size:var(--spectrum-global-dimension-static-size-10);--spectrum-alias-input-focusring-gap:var(--spectrum-global-dimension-static-size-0);--spectrum-alias-input-quiet-focusline-gap:var(--spectrum-global-dimension-static-size-10);--spectrum-alias-control-two-size-m:var(--spectrum-global-dimension-size-175);--spectrum-alias-control-two-size-l:var(--spectrum-global-dimension-size-200);--spectrum-alias-control-two-size-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-control-two-size-xxl:var(--spectrum-global-dimension-size-250);--spectrum-alias-control-two-border-radius-s:var(--spectrum-global-dimension-size-75);--spectrum-alias-control-two-border-radius-m:var(--spectrum-global-dimension-size-85);--spectrum-alias-control-two-border-radius-l:var(--spectrum-global-dimension-size-100);--spectrum-alias-control-two-border-radius-xl:var(--spectrum-global-dimension-size-115);--spectrum-alias-control-two-border-radius-xxl:var(--spectrum-global-dimension-size-125);--spectrum-alias-control-two-focus-ring-border-radius-s:var(--spectrum-global-dimension-size-125);--spectrum-alias-control-two-focus-ring-border-radius-m:var(--spectrum-global-dimension-size-130);--spectrum-alias-control-two-focus-ring-border-radius-l:var(--spectrum-global-dimension-size-150);--spectrum-alias-control-two-focus-ring-border-radius-xl:var(--spectrum-global-dimension-size-160);--spectrum-alias-control-two-focus-ring-border-radius-xxl:var(--spectrum-global-dimension-size-175);--spectrum-alias-control-three-height-m:var(--spectrum-global-dimension-size-175);--spectrum-alias-control-three-height-l:var(--spectrum-global-dimension-size-200);--spectrum-alias-control-three-height-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-clearbutton-icon-margin-s:var(--spectrum-global-dimension-size-100);--spectrum-alias-clearbutton-icon-margin-m:var(--spectrum-global-dimension-size-150);--spectrum-alias-clearbutton-icon-margin-l:var(--spectrum-global-dimension-size-185);--spectrum-alias-clearbutton-icon-margin-xl:var(--spectrum-global-dimension-size-225);--spectrum-alias-clearbutton-border-radius:var(--spectrum-global-dimension-size-50);--spectrum-alias-percent-50:50%;--spectrum-alias-percent-70:70%;--spectrum-alias-percent-100:100%;--spectrum-alias-breakpoint-xsmall:304px;--spectrum-alias-breakpoint-small:768px;--spectrum-alias-breakpoint-medium:1280px;--spectrum-alias-breakpoint-large:1768px;--spectrum-alias-breakpoint-xlarge:2160px;--spectrum-alias-grid-columns:12;--spectrum-alias-grid-fluid-width:100%;--spectrum-alias-grid-fixed-max-width:1280px;--spectrum-alias-focus-ring-gap-small:var(--spectrum-global-dimension-static-size-0);--spectrum-alias-focus-ring-size-small:var(--spectrum-global-dimension-static-size-10);--spectrum-alias-dropshadow-blur:var(--spectrum-global-dimension-size-50);--spectrum-alias-dropshadow-offset-y:var(--spectrum-global-dimension-size-10);--spectrum-alias-font-size-default:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-layout-label-gap-size:var(--spectrum-global-dimension-size-100);--spectrum-alias-pill-button-text-size:var(--spectrum-global-dimension-font-size-100);--spectrum-alias-pill-button-text-baseline:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-border-radius-xsmall:var(--spectrum-global-dimension-size-10);--spectrum-alias-border-radius-small:var(--spectrum-global-dimension-size-25);--spectrum-alias-border-radius-regular:var(--spectrum-global-dimension-size-50);--spectrum-alias-border-radius-medium:var(--spectrum-global-dimension-size-100);--spectrum-alias-border-radius-large:var(--spectrum-global-dimension-size-200);--spectrum-alias-border-radius-xlarge:var(--spectrum-global-dimension-size-300);--spectrum-alias-focus-ring-border-radius-xsmall:var(--spectrum-global-dimension-size-50);--spectrum-alias-focus-ring-border-radius-small:var(--spectrum-global-dimension-static-size-65);--spectrum-alias-focus-ring-border-radius-medium:var(--spectrum-global-dimension-size-150);--spectrum-alias-focus-ring-border-radius-large:var(--spectrum-global-dimension-size-250);--spectrum-alias-focus-ring-border-radius-xlarge:var(--spectrum-global-dimension-size-350);--spectrum-alias-single-line-height:var(--spectrum-global-dimension-size-400);--spectrum-alias-single-line-width:var(--spectrum-global-dimension-size-2400);--spectrum-alias-workflow-icon-size-s:var(--spectrum-global-dimension-size-200);--spectrum-alias-workflow-icon-size-m:var(--spectrum-global-dimension-size-225);--spectrum-alias-workflow-icon-size-xl:var(--spectrum-global-dimension-size-275);--spectrum-alias-ui-icon-alert-size-75:var(--spectrum-global-dimension-size-200);--spectrum-alias-ui-icon-alert-size-100:var(--spectrum-global-dimension-size-225);--spectrum-alias-ui-icon-alert-size-200:var(--spectrum-global-dimension-size-250);--spectrum-alias-ui-icon-alert-size-300:var(--spectrum-global-dimension-size-275);--spectrum-alias-ui-icon-triplegripper-size-100-height:var(--spectrum-global-dimension-size-100);--spectrum-alias-ui-icon-doublegripper-size-100-width:var(--spectrum-global-dimension-size-200);--spectrum-alias-ui-icon-singlegripper-size-100-width:var(--spectrum-global-dimension-size-300);--spectrum-alias-ui-icon-cornertriangle-size-75:var(--spectrum-global-dimension-size-65);--spectrum-alias-ui-icon-cornertriangle-size-200:var(--spectrum-global-dimension-size-75);--spectrum-alias-ui-icon-asterisk-size-75:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-ui-icon-asterisk-size-100:var(--spectrum-global-dimension-size-100);--spectrum-alias-transparent-blue-background-color-hover:#0057be26;--spectrum-alias-transparent-blue-background-color-down:#0048994d;--spectrum-alias-transparent-blue-background-color-key-focus:var(--spectrum-alias-transparent-blue-background-color-hover);--spectrum-alias-transparent-blue-background-color-mouse-focus:var(--spectrum-alias-transparent-blue-background-color-hover);--spectrum-alias-transparent-blue-background-color:var(--spectrum-alias-component-text-color-default);--spectrum-alias-transparent-red-background-color-hover:#9a000026;--spectrum-alias-transparent-red-background-color-down:#7c00004d;--spectrum-alias-transparent-red-background-color-key-focus:var(--spectrum-alias-transparent-red-background-color-hover);--spectrum-alias-transparent-red-background-color-mouse-focus:var(--spectrum-alias-transparent-red-background-color-hover);--spectrum-alias-transparent-red-background-color:var(--spectrum-alias-component-text-color-default);--spectrum-alias-component-text-color-disabled:var(--spectrum-global-color-gray-500);--spectrum-alias-component-text-color-default:var(--spectrum-global-color-gray-800);--spectrum-alias-component-text-color-hover:var(--spectrum-global-color-gray-900);--spectrum-alias-component-text-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-component-text-color-key-focus:var(--spectrum-alias-component-text-color-hover);--spectrum-alias-component-text-color-mouse-focus:var(--spectrum-alias-component-text-color-hover);--spectrum-alias-component-text-color:var(--spectrum-alias-component-text-color-default);--spectrum-alias-component-text-color-selected-default:var(--spectrum-alias-component-text-color-default);--spectrum-alias-component-text-color-selected-hover:var(--spectrum-alias-component-text-color-hover);--spectrum-alias-component-text-color-selected-down:var(--spectrum-alias-component-text-color-down);--spectrum-alias-component-text-color-selected-key-focus:var(--spectrum-alias-component-text-color-key-focus);--spectrum-alias-component-text-color-selected-mouse-focus:var(--spectrum-alias-component-text-color-mouse-focus);--spectrum-alias-component-text-color-selected:var(--spectrum-alias-component-text-color-selected-default);--spectrum-alias-component-text-color-emphasized-selected-default:var(--spectrum-global-color-static-white);--spectrum-alias-component-text-color-emphasized-selected-hover:var(--spectrum-alias-component-text-color-emphasized-selected-default);--spectrum-alias-component-text-color-emphasized-selected-down:var(--spectrum-alias-component-text-color-emphasized-selected-default);--spectrum-alias-component-text-color-emphasized-selected-key-focus:var(--spectrum-alias-component-text-color-emphasized-selected-default);--spectrum-alias-component-text-color-emphasized-selected-mouse-focus:var(--spectrum-alias-component-text-color-emphasized-selected-default);--spectrum-alias-component-text-color-emphasized-selected:var(--spectrum-alias-component-text-color-emphasized-selected-default);--spectrum-alias-component-text-color-error-default:var(--spectrum-semantic-negative-text-color-small);--spectrum-alias-component-text-color-error-hover:var(--spectrum-semantic-negative-text-color-small-hover);--spectrum-alias-component-text-color-error-down:var(--spectrum-semantic-negative-text-color-small-down);--spectrum-alias-component-text-color-error-key-focus:var(--spectrum-semantic-negative-text-color-small-key-focus);--spectrum-alias-component-text-color-error-mouse-focus:var(--spectrum-semantic-negative-text-color-small-key-focus);--spectrum-alias-component-text-color-error:var(--spectrum-alias-component-text-color-error-default);--spectrum-alias-component-icon-color-disabled:var(--spectrum-alias-icon-color-disabled);--spectrum-alias-component-icon-color-default:var(--spectrum-alias-icon-color);--spectrum-alias-component-icon-color-hover:var(--spectrum-alias-icon-color-hover);--spectrum-alias-component-icon-color-down:var(--spectrum-alias-icon-color-down);--spectrum-alias-component-icon-color-key-focus:var(--spectrum-alias-icon-color-hover);--spectrum-alias-component-icon-color-mouse-focus:var(--spectrum-alias-icon-color-down);--spectrum-alias-component-icon-color:var(--spectrum-alias-component-icon-color-default);--spectrum-alias-component-icon-color-selected:var(--spectrum-alias-icon-color-selected-neutral-subdued);--spectrum-alias-component-icon-color-emphasized-selected-default:var(--spectrum-global-color-static-white);--spectrum-alias-component-icon-color-emphasized-selected-hover:var(--spectrum-alias-component-icon-color-emphasized-selected-default);--spectrum-alias-component-icon-color-emphasized-selected-down:var(--spectrum-alias-component-icon-color-emphasized-selected-default);--spectrum-alias-component-icon-color-emphasized-selected-key-focus:var(--spectrum-alias-component-icon-color-emphasized-selected-default);--spectrum-alias-component-icon-color-emphasized-selected:var(--spectrum-alias-component-icon-color-emphasized-selected-default);--spectrum-alias-component-background-color-disabled:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-quiet-disabled:var(--spectrum-alias-background-color-transparent);--spectrum-alias-component-background-color-quiet-selected-disabled:var(--spectrum-alias-component-background-color-disabled);--spectrum-alias-component-background-color-default:var(--spectrum-global-color-gray-75);--spectrum-alias-component-background-color-hover:var(--spectrum-global-color-gray-50);--spectrum-alias-component-background-color-down:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-key-focus:var(--spectrum-global-color-gray-50);--spectrum-alias-component-background-color:var(--spectrum-alias-component-background-color-default);--spectrum-alias-component-background-color-selected-default:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-selected-hover:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-selected-down:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-selected-key-focus:var(--spectrum-global-color-gray-200);--spectrum-alias-component-background-color-selected:var(--spectrum-alias-component-background-color-selected-default);--spectrum-alias-component-background-color-quiet-default:var(--spectrum-alias-background-color-transparent);--spectrum-alias-component-background-color-quiet-hover:var(--spectrum-alias-background-color-transparent);--spectrum-alias-component-background-color-quiet-down:var(--spectrum-global-color-gray-300);--spectrum-alias-component-background-color-quiet-key-focus:var(--spectrum-alias-background-color-transparent);--spectrum-alias-component-background-color-quiet:var(--spectrum-alias-component-background-color-quiet-default);--spectrum-alias-component-background-color-quiet-selected-default:var(--spectrum-alias-component-background-color-selected-default);--spectrum-alias-component-background-color-quiet-selected-hover:var(--spectrum-alias-component-background-color-selected-hover);--spectrum-alias-component-background-color-quiet-selected-down:var(--spectrum-alias-component-background-color-selected-down);--spectrum-alias-component-background-color-quiet-selected-key-focus:var(--spectrum-alias-component-background-color-selected-key-focus);--spectrum-alias-component-background-color-quiet-selected:var(--spectrum-alias-component-background-color-selected-default);--spectrum-alias-component-background-color-emphasized-selected-default:var(--spectrum-semantic-cta-background-color-default);--spectrum-alias-component-background-color-emphasized-selected-hover:var(--spectrum-semantic-cta-background-color-hover);--spectrum-alias-component-background-color-emphasized-selected-down:var(--spectrum-semantic-cta-background-color-down);--spectrum-alias-component-background-color-emphasized-selected-key-focus:var(--spectrum-semantic-cta-background-color-key-focus);--spectrum-alias-component-background-color-emphasized-selected:var(--spectrum-alias-component-background-color-emphasized-selected-default);--spectrum-alias-component-border-color-disabled:var(--spectrum-alias-border-color-disabled);--spectrum-alias-component-border-color-quiet-disabled:var(--spectrum-alias-border-color-transparent);--spectrum-alias-component-border-color-default:var(--spectrum-alias-border-color);--spectrum-alias-component-border-color-hover:var(--spectrum-alias-border-color-hover);--spectrum-alias-component-border-color-down:var(--spectrum-alias-border-color-down);--spectrum-alias-component-border-color-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-component-border-color:var(--spectrum-alias-component-border-color-default);--spectrum-alias-component-border-color-selected-default:var(--spectrum-alias-border-color);--spectrum-alias-component-border-color-selected-hover:var(--spectrum-alias-border-color-hover);--spectrum-alias-component-border-color-selected-down:var(--spectrum-alias-border-color-down);--spectrum-alias-component-border-color-selected-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-component-border-color-selected:var(--spectrum-alias-component-border-color-selected-default);--spectrum-alias-component-border-color-quiet-default:var(--spectrum-alias-border-color-transparent);--spectrum-alias-component-border-color-quiet-hover:var(--spectrum-alias-border-color-transparent);--spectrum-alias-component-border-color-quiet-down:var(--spectrum-alias-border-color-transparent);--spectrum-alias-component-border-color-quiet-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-component-border-color-quiet:var(--spectrum-alias-component-border-color-quiet-default);--spectrum-alias-component-border-color-quiet-selected-default:var(--spectrum-global-color-gray-200);--spectrum-alias-component-border-color-quiet-selected-hover:var(--spectrum-global-color-gray-200);--spectrum-alias-component-border-color-quiet-selected-down:var(--spectrum-global-color-gray-200);--spectrum-alias-component-border-color-quiet-selected-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-component-border-color-quiet-selected:var(--spectrum-alias-component-border-color-quiet-selected-default);--spectrum-alias-component-border-color-emphasized-selected-default:var(--spectrum-semantic-cta-background-color-default);--spectrum-alias-component-border-color-emphasized-selected-hover:var(--spectrum-semantic-cta-background-color-hover);--spectrum-alias-component-border-color-emphasized-selected-down:var(--spectrum-semantic-cta-background-color-down);--spectrum-alias-component-border-color-emphasized-selected-key-focus:var(--spectrum-semantic-cta-background-color-key-focus);--spectrum-alias-component-border-color-emphasized-selected:var(--spectrum-alias-component-border-color-emphasized-selected-default);--spectrum-alias-toggle-background-color-default:var(--spectrum-global-color-gray-700);--spectrum-alias-toggle-background-color-hover:var(--spectrum-global-color-gray-800);--spectrum-alias-toggle-background-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-toggle-background-color-key-focus:var(--spectrum-global-color-gray-800);--spectrum-alias-toggle-background-color:var(--spectrum-alias-toggle-background-color-default);--spectrum-alias-toggle-background-color-emphasized-selected-default:var(--spectrum-global-color-blue-500);--spectrum-alias-toggle-background-color-emphasized-selected-hover:var(--spectrum-global-color-blue-600);--spectrum-alias-toggle-background-color-emphasized-selected-down:var(--spectrum-global-color-blue-700);--spectrum-alias-toggle-background-color-emphasized-selected-key-focus:var(--spectrum-global-color-blue-600);--spectrum-alias-toggle-background-color-emphasized-selected:var(--spectrum-alias-toggle-background-color-emphasized-selected-default);--spectrum-alias-toggle-border-color-default:var(--spectrum-global-color-gray-700);--spectrum-alias-toggle-border-color-hover:var(--spectrum-global-color-gray-800);--spectrum-alias-toggle-border-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-toggle-border-color-key-focus:var(--spectrum-global-color-gray-800);--spectrum-alias-toggle-border-color:var(--spectrum-alias-toggle-border-color-default);--spectrum-alias-toggle-icon-color-selected:var(--spectrum-global-color-gray-75);--spectrum-alias-toggle-icon-color-emphasized-selected:var(--spectrum-global-color-gray-75);--spectrum-alias-input-border-color-disabled:var(--spectrum-alias-border-color-transparent);--spectrum-alias-input-border-color-quiet-disabled:var(--spectrum-alias-border-color-mid);--spectrum-alias-input-border-color-default:var(--spectrum-alias-border-color);--spectrum-alias-input-border-color-hover:var(--spectrum-alias-border-color-hover);--spectrum-alias-input-border-color-down:var(--spectrum-alias-border-color-mouse-focus);--spectrum-alias-input-border-color-mouse-focus:var(--spectrum-alias-border-color-mouse-focus);--spectrum-alias-input-border-color-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-input-border-color:var(--spectrum-alias-input-border-color-default);--spectrum-alias-input-border-color-invalid-default:var(--spectrum-semantic-negative-color-default);--spectrum-alias-input-border-color-invalid-hover:var(--spectrum-semantic-negative-color-hover);--spectrum-alias-input-border-color-invalid-down:var(--spectrum-semantic-negative-color-down);--spectrum-alias-input-border-color-invalid-mouse-focus:var(--spectrum-semantic-negative-color-hover);--spectrum-alias-input-border-color-invalid-key-focus:var(--spectrum-alias-border-color-key-focus);--spectrum-alias-input-border-color-invalid:var(--spectrum-alias-input-border-color-invalid-default);--spectrum-alias-background-color-yellow-default:var(--spectrum-global-color-static-yellow-300);--spectrum-alias-background-color-yellow-hover:var(--spectrum-global-color-static-yellow-400);--spectrum-alias-background-color-yellow-key-focus:var(--spectrum-global-color-static-yellow-400);--spectrum-alias-background-color-yellow-down:var(--spectrum-global-color-static-yellow-500);--spectrum-alias-background-color-yellow:var(--spectrum-alias-background-color-yellow-default);--spectrum-alias-tabitem-text-color-default:var(--spectrum-alias-label-text-color);--spectrum-alias-tabitem-text-color-hover:var(--spectrum-alias-text-color-hover);--spectrum-alias-tabitem-text-color-down:var(--spectrum-alias-text-color-down);--spectrum-alias-tabitem-text-color-key-focus:var(--spectrum-alias-text-color-hover);--spectrum-alias-tabitem-text-color-mouse-focus:var(--spectrum-alias-text-color-hover);--spectrum-alias-tabitem-text-color:var(--spectrum-alias-tabitem-text-color-default);--spectrum-alias-tabitem-text-color-selected-default:var(--spectrum-global-color-gray-900);--spectrum-alias-tabitem-text-color-selected-hover:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-text-color-selected-down:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-text-color-selected-key-focus:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-text-color-selected-mouse-focus:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-text-color-selected:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-text-color-emphasized:var(--spectrum-alias-tabitem-text-color-default);--spectrum-alias-tabitem-text-color-emphasized-selected-default:var(--spectrum-global-color-static-blue-500);--spectrum-alias-tabitem-text-color-emphasized-selected-hover:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-text-color-emphasized-selected-down:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-text-color-emphasized-selected-key-focus:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-text-color-emphasized-selected-mouse-focus:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-text-color-emphasized-selected:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-selection-indicator-color-default:var(--spectrum-alias-tabitem-text-color-selected-default);--spectrum-alias-tabitem-selection-indicator-color-emphasized:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-tabitem-icon-color-disabled:var(--spectrum-alias-text-color-disabled);--spectrum-alias-tabitem-icon-color-default:var(--spectrum-alias-icon-color);--spectrum-alias-tabitem-icon-color-hover:var(--spectrum-alias-icon-color-hover);--spectrum-alias-tabitem-icon-color-down:var(--spectrum-alias-icon-color-down);--spectrum-alias-tabitem-icon-color-key-focus:var(--spectrum-alias-icon-color-hover);--spectrum-alias-tabitem-icon-color-mouse-focus:var(--spectrum-alias-icon-color-down);--spectrum-alias-tabitem-icon-color:var(--spectrum-alias-tabitem-icon-color-default);--spectrum-alias-tabitem-icon-color-selected:var(--spectrum-alias-icon-color-selected-neutral);--spectrum-alias-tabitem-icon-color-emphasized:var(--spectrum-alias-tabitem-text-color-default);--spectrum-alias-tabitem-icon-color-emphasized-selected:var(--spectrum-alias-tabitem-text-color-emphasized-selected-default);--spectrum-alias-assetcard-selectionindicator-background-color-ordered:var(--spectrum-global-color-blue-500);--spectrum-alias-assetcard-overlay-background-color:#1b7ff51a;--spectrum-alias-assetcard-border-color-selected:var(--spectrum-global-color-blue-500);--spectrum-alias-assetcard-border-color-selected-hover:var(--spectrum-global-color-blue-500);--spectrum-alias-assetcard-border-color-selected-down:var(--spectrum-global-color-blue-600);--spectrum-alias-background-color-default:var(--spectrum-global-color-gray-100);--spectrum-alias-background-color-disabled:var(--spectrum-global-color-gray-200);--spectrum-alias-background-color-transparent:transparent;--spectrum-alias-background-color-overbackground-down:#fff3;--spectrum-alias-background-color-quiet-overbackground-hover:#ffffff1a;--spectrum-alias-background-color-quiet-overbackground-down:#fff3;--spectrum-alias-background-color-overbackground-disabled:#ffffff1a;--spectrum-alias-background-color-quickactions-overlay:#0003;--spectrum-alias-placeholder-text-color:var(--spectrum-global-color-gray-800);--spectrum-alias-placeholder-text-color-hover:var(--spectrum-global-color-gray-900);--spectrum-alias-placeholder-text-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-placeholder-text-color-selected:var(--spectrum-global-color-gray-800);--spectrum-alias-label-text-color:var(--spectrum-global-color-gray-700);--spectrum-alias-text-color:var(--spectrum-global-color-gray-800);--spectrum-alias-text-color-hover:var(--spectrum-global-color-gray-900);--spectrum-alias-text-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-text-color-key-focus:var(--spectrum-global-color-blue-600);--spectrum-alias-text-color-mouse-focus:var(--spectrum-global-color-blue-600);--spectrum-alias-text-color-disabled:var(--spectrum-global-color-gray-500);--spectrum-alias-text-color-invalid:var(--spectrum-global-color-red-500);--spectrum-alias-text-color-selected:var(--spectrum-global-color-blue-600);--spectrum-alias-text-color-selected-neutral:var(--spectrum-global-color-gray-900);--spectrum-alias-text-color-overbackground:var(--spectrum-global-color-static-white);--spectrum-alias-text-color-overbackground-disabled:#fff3;--spectrum-alias-text-color-quiet-overbackground-disabled:#fff3;--spectrum-alias-heading-text-color:var(--spectrum-global-color-gray-900);--spectrum-alias-border-color:var(--spectrum-global-color-gray-400);--spectrum-alias-border-color-hover:var(--spectrum-global-color-gray-500);--spectrum-alias-border-color-down:var(--spectrum-global-color-gray-500);--spectrum-alias-border-color-key-focus:var(--spectrum-global-color-blue-400);--spectrum-alias-border-color-mouse-focus:var(--spectrum-global-color-blue-500);--spectrum-alias-border-color-disabled:var(--spectrum-global-color-gray-200);--spectrum-alias-border-color-extralight:var(--spectrum-global-color-gray-100);--spectrum-alias-border-color-light:var(--spectrum-global-color-gray-200);--spectrum-alias-border-color-mid:var(--spectrum-global-color-gray-300);--spectrum-alias-border-color-dark:var(--spectrum-global-color-gray-400);--spectrum-alias-border-color-darker-default:var(--spectrum-global-color-gray-600);--spectrum-alias-border-color-darker-hover:var(--spectrum-global-color-gray-900);--spectrum-alias-border-color-darker-down:var(--spectrum-global-color-gray-900);--spectrum-alias-border-color-transparent:transparent;--spectrum-alias-border-color-translucent-dark:#0000000d;--spectrum-alias-border-color-translucent-darker:#0000001a;--spectrum-alias-focus-color:var(--spectrum-global-color-blue-400);--spectrum-alias-focus-ring-color:var(--spectrum-alias-focus-color);--spectrum-alias-track-color-default:var(--spectrum-global-color-gray-300);--spectrum-alias-track-fill-color-overbackground:var(--spectrum-global-color-static-white);--spectrum-alias-track-color-disabled:var(--spectrum-global-color-gray-300);--spectrum-alias-track-color-overbackground:#fff3;--spectrum-alias-icon-color:var(--spectrum-global-color-gray-700);--spectrum-alias-icon-color-overbackground:var(--spectrum-global-color-static-white);--spectrum-alias-icon-color-hover:var(--spectrum-global-color-gray-900);--spectrum-alias-icon-color-down:var(--spectrum-global-color-gray-900);--spectrum-alias-icon-color-key-focus:var(--spectrum-global-color-gray-900);--spectrum-alias-icon-color-disabled:var(--spectrum-global-color-gray-400);--spectrum-alias-icon-color-overbackground-disabled:#fff3;--spectrum-alias-icon-color-quiet-overbackground-disabled:#ffffff26;--spectrum-alias-icon-color-selected-neutral:var(--spectrum-global-color-gray-900);--spectrum-alias-icon-color-selected-neutral-subdued:var(--spectrum-global-color-gray-800);--spectrum-alias-icon-color-selected:var(--spectrum-global-color-blue-500);--spectrum-alias-icon-color-selected-hover:var(--spectrum-global-color-blue-600);--spectrum-alias-icon-color-selected-down:var(--spectrum-global-color-blue-700);--spectrum-alias-icon-color-selected-focus:var(--spectrum-global-color-blue-600);--spectrum-alias-image-opacity-disabled:var(--spectrum-global-color-opacity-30);--spectrum-alias-toolbar-background-color:var(--spectrum-global-color-gray-100);--spectrum-alias-code-highlight-color-default:var(--spectrum-global-color-gray-800);--spectrum-alias-code-highlight-background-color:var(--spectrum-global-color-gray-75);--spectrum-alias-code-highlight-color-keyword:var(--spectrum-global-color-fuchsia-600);--spectrum-alias-code-highlight-color-section:var(--spectrum-global-color-red-600);--spectrum-alias-code-highlight-color-literal:var(--spectrum-global-color-blue-600);--spectrum-alias-code-highlight-color-attribute:var(--spectrum-global-color-seafoam-600);--spectrum-alias-code-highlight-color-class:var(--spectrum-global-color-magenta-600);--spectrum-alias-code-highlight-color-variable:var(--spectrum-global-color-purple-600);--spectrum-alias-code-highlight-color-title:var(--spectrum-global-color-indigo-600);--spectrum-alias-code-highlight-color-string:var(--spectrum-global-color-fuchsia-600);--spectrum-alias-code-highlight-color-function:var(--spectrum-global-color-blue-600);--spectrum-alias-code-highlight-color-comment:var(--spectrum-global-color-gray-700);--spectrum-alias-categorical-color-1:var(--spectrum-global-color-static-seafoam-200);--spectrum-alias-categorical-color-2:var(--spectrum-global-color-static-indigo-700);--spectrum-alias-categorical-color-3:var(--spectrum-global-color-static-orange-500);--spectrum-alias-categorical-color-4:var(--spectrum-global-color-static-magenta-500);--spectrum-alias-categorical-color-5:var(--spectrum-global-color-static-indigo-200);--spectrum-alias-categorical-color-6:var(--spectrum-global-color-static-celery-200);--spectrum-alias-categorical-color-7:var(--spectrum-global-color-static-blue-500);--spectrum-alias-categorical-color-8:var(--spectrum-global-color-static-purple-800);--spectrum-alias-categorical-color-9:var(--spectrum-global-color-static-yellow-500);--spectrum-alias-categorical-color-10:var(--spectrum-global-color-static-orange-700);--spectrum-alias-categorical-color-11:var(--spectrum-global-color-static-green-600);--spectrum-alias-categorical-color-12:var(--spectrum-global-color-static-chartreuse-300);--spectrum-alias-categorical-color-13:var(--spectrum-global-color-static-blue-200);--spectrum-alias-categorical-color-14:var(--spectrum-global-color-static-fuchsia-500);--spectrum-alias-categorical-color-15:var(--spectrum-global-color-static-magenta-200);--spectrum-alias-categorical-color-16:var(--spectrum-global-color-static-yellow-200)}:host,:root{-webkit-tap-highlight-color:#0000;--spectrum-focus-indicator-color:var(--spectrum-blue-800);--spectrum-static-white-focus-indicator-color:var(--spectrum-white);--spectrum-static-black-focus-indicator-color:var(--spectrum-black);--spectrum-overlay-color:var(--spectrum-black);--spectrum-opacity-disabled:.3;--spectrum-neutral-subdued-content-color-selected:var(--spectrum-neutral-subdued-content-color-down);--spectrum-accent-content-color-selected:var(--spectrum-accent-content-color-down);--spectrum-disabled-background-color:var(--spectrum-gray-200);--spectrum-disabled-static-white-background-color:var(--spectrum-transparent-white-200);--spectrum-disabled-static-black-background-color:var(--spectrum-transparent-black-200);--spectrum-background-opacity-default:0;--spectrum-background-opacity-hover:.1;--spectrum-background-opacity-down:.1;--spectrum-background-opacity-key-focus:.1;--spectrum-neutral-content-color-default:var(--spectrum-gray-800);--spectrum-neutral-content-color-hover:var(--spectrum-gray-900);--spectrum-neutral-content-color-down:var(--spectrum-gray-900);--spectrum-neutral-content-color-focus-hover:var(--spectrum-neutral-content-color-down);--spectrum-neutral-content-color-focus:var(--spectrum-neutral-content-color-down);--spectrum-neutral-content-color-key-focus:var(--spectrum-gray-900);--spectrum-neutral-subdued-content-color-default:var(--spectrum-gray-700);--spectrum-neutral-subdued-content-color-hover:var(--spectrum-gray-800);--spectrum-neutral-subdued-content-color-down:var(--spectrum-gray-900);--spectrum-neutral-subdued-content-color-key-focus:var(--spectrum-gray-800);--spectrum-accent-content-color-default:var(--spectrum-accent-color-900);--spectrum-accent-content-color-hover:var(--spectrum-accent-color-1000);--spectrum-accent-content-color-down:var(--spectrum-accent-color-1100);--spectrum-accent-content-color-key-focus:var(--spectrum-accent-color-1000);--spectrum-negative-content-color-default:var(--spectrum-negative-color-900);--spectrum-negative-content-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-content-color-down:var(--spectrum-negative-color-1100);--spectrum-negative-content-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-disabled-content-color:var(--spectrum-gray-400);--spectrum-disabled-static-white-content-color:var(--spectrum-transparent-white-500);--spectrum-disabled-static-black-content-color:var(--spectrum-transparent-black-500);--spectrum-disabled-border-color:var(--spectrum-gray-300);--spectrum-disabled-static-white-border-color:var(--spectrum-transparent-white-300);--spectrum-disabled-static-black-border-color:var(--spectrum-transparent-black-300);--spectrum-negative-border-color-default:var(--spectrum-negative-color-900);--spectrum-negative-border-color-hover:var(--spectrum-negative-color-1000);--spectrum-negative-border-color-down:var(--spectrum-negative-color-1100);--spectrum-negative-border-color-focus-hover:var(--spectrum-negative-border-color-down);--spectrum-negative-border-color-focus:var(--spectrum-negative-color-1000);--spectrum-negative-border-color-key-focus:var(--spectrum-negative-color-1000);--spectrum-swatch-border-color:var(--spectrum-gray-900);--spectrum-swatch-border-opacity:.51;--spectrum-swatch-disabled-icon-border-color:var(--spectrum-black);--spectrum-swatch-disabled-icon-border-opacity:.51;--spectrum-thumbnail-border-color:var(--spectrum-gray-800);--spectrum-thumbnail-border-opacity:.1;--spectrum-thumbnail-opacity-disabled:var(--spectrum-opacity-disabled);--spectrum-opacity-checkerboard-square-light:var(--spectrum-white);--spectrum-avatar-opacity-disabled:var(--spectrum-opacity-disabled);--spectrum-color-area-border-color:var(--spectrum-gray-900);--spectrum-color-area-border-opacity:.1;--spectrum-color-slider-border-color:var(--spectrum-gray-900);--spectrum-color-slider-border-opacity:.1;--spectrum-color-loupe-drop-shadow-color:var(--spectrum-transparent-black-300);--spectrum-color-loupe-inner-border:var(--spectrum-transparent-black-200);--spectrum-color-loupe-outer-border:var(--spectrum-white);--spectrum-card-selection-background-color:var(--spectrum-gray-100);--spectrum-card-selection-background-color-opacity:.95;--spectrum-drop-zone-background-color:var(--spectrum-accent-visual-color);--spectrum-drop-zone-background-color-opacity:.1;--spectrum-drop-zone-background-color-opacity-filled:.3;--spectrum-coach-mark-pagination-color:var(--spectrum-gray-600);--spectrum-color-handle-inner-border-color:var(--spectrum-black);--spectrum-color-handle-inner-border-opacity:.42;--spectrum-color-handle-outer-border-color:var(--spectrum-black);--spectrum-color-handle-outer-border-opacity:var(--spectrum-color-handle-inner-border-opacity);--spectrum-color-handle-drop-shadow-color:var(--spectrum-drop-shadow-color);--spectrum-floating-action-button-drop-shadow-color:var(--spectrum-transparent-black-300);--spectrum-floating-action-button-shadow-color:var(--spectrum-floating-action-button-drop-shadow-color);--spectrum-table-row-hover-color:var(--spectrum-gray-900);--spectrum-table-row-hover-opacity:.07;--spectrum-table-selected-row-background-color:var(--spectrum-informative-background-color-default);--spectrum-table-selected-row-background-opacity:.1;--spectrum-table-selected-row-background-color-non-emphasized:var(--spectrum-neutral-background-color-selected-default);--spectrum-table-selected-row-background-opacity-non-emphasized:.1;--spectrum-table-row-down-opacity:.1;--spectrum-table-selected-row-background-opacity-hover:.15;--spectrum-table-selected-row-background-opacity-non-emphasized-hover:.15;--spectrum-white-rgb:255,255,255;--spectrum-white:rgba(var(--spectrum-white-rgb));--spectrum-transparent-white-100-rgb:255,255,255;--spectrum-transparent-white-100-opacity:0;--spectrum-transparent-white-100:rgba(var(--spectrum-transparent-white-100-rgb),var(--spectrum-transparent-white-100-opacity));--spectrum-transparent-white-200-rgb:255,255,255;--spectrum-transparent-white-200-opacity:.1;--spectrum-transparent-white-200:rgba(var(--spectrum-transparent-white-200-rgb),var(--spectrum-transparent-white-200-opacity));--spectrum-transparent-white-300-rgb:255,255,255;--spectrum-transparent-white-300-opacity:.25;--spectrum-transparent-white-300:rgba(var(--spectrum-transparent-white-300-rgb),var(--spectrum-transparent-white-300-opacity));--spectrum-transparent-white-400-rgb:255,255,255;--spectrum-transparent-white-400-opacity:.4;--spectrum-transparent-white-400:rgba(var(--spectrum-transparent-white-400-rgb),var(--spectrum-transparent-white-400-opacity));--spectrum-transparent-white-500-rgb:255,255,255;--spectrum-transparent-white-500-opacity:.55;--spectrum-transparent-white-500:rgba(var(--spectrum-transparent-white-500-rgb),var(--spectrum-transparent-white-500-opacity));--spectrum-transparent-white-600-rgb:255,255,255;--spectrum-transparent-white-600-opacity:.7;--spectrum-transparent-white-600:rgba(var(--spectrum-transparent-white-600-rgb),var(--spectrum-transparent-white-600-opacity));--spectrum-transparent-white-700-rgb:255,255,255;--spectrum-transparent-white-700-opacity:.8;--spectrum-transparent-white-700:rgba(var(--spectrum-transparent-white-700-rgb),var(--spectrum-transparent-white-700-opacity));--spectrum-transparent-white-800-rgb:255,255,255;--spectrum-transparent-white-800-opacity:.9;--spectrum-transparent-white-800:rgba(var(--spectrum-transparent-white-800-rgb),var(--spectrum-transparent-white-800-opacity));--spectrum-transparent-white-900-rgb:255,255,255;--spectrum-transparent-white-900:rgba(var(--spectrum-transparent-white-900-rgb));--spectrum-black-rgb:0,0,0;--spectrum-black:rgba(var(--spectrum-black-rgb));--spectrum-transparent-black-100-rgb:0,0,0;--spectrum-transparent-black-100-opacity:0;--spectrum-transparent-black-100:rgba(var(--spectrum-transparent-black-100-rgb),var(--spectrum-transparent-black-100-opacity));--spectrum-transparent-black-200-rgb:0,0,0;--spectrum-transparent-black-200-opacity:.1;--spectrum-transparent-black-200:rgba(var(--spectrum-transparent-black-200-rgb),var(--spectrum-transparent-black-200-opacity));--spectrum-transparent-black-300-rgb:0,0,0;--spectrum-transparent-black-300-opacity:.25;--spectrum-transparent-black-300:rgba(var(--spectrum-transparent-black-300-rgb),var(--spectrum-transparent-black-300-opacity));--spectrum-transparent-black-400-rgb:0,0,0;--spectrum-transparent-black-400-opacity:.4;--spectrum-transparent-black-400:rgba(var(--spectrum-transparent-black-400-rgb),var(--spectrum-transparent-black-400-opacity));--spectrum-transparent-black-500-rgb:0,0,0;--spectrum-transparent-black-500-opacity:.55;--spectrum-transparent-black-500:rgba(var(--spectrum-transparent-black-500-rgb),var(--spectrum-transparent-black-500-opacity));--spectrum-transparent-black-600-rgb:0,0,0;--spectrum-transparent-black-600-opacity:.7;--spectrum-transparent-black-600:rgba(var(--spectrum-transparent-black-600-rgb),var(--spectrum-transparent-black-600-opacity));--spectrum-transparent-black-700-rgb:0,0,0;--spectrum-transparent-black-700-opacity:.8;--spectrum-transparent-black-700:rgba(var(--spectrum-transparent-black-700-rgb),var(--spectrum-transparent-black-700-opacity));--spectrum-transparent-black-800-rgb:0,0,0;--spectrum-transparent-black-800-opacity:.9;--spectrum-transparent-black-800:rgba(var(--spectrum-transparent-black-800-rgb),var(--spectrum-transparent-black-800-opacity));--spectrum-transparent-black-900-rgb:0,0,0;--spectrum-transparent-black-900:rgba(var(--spectrum-transparent-black-900-rgb));--spectrum-icon-color-inverse:var(--spectrum-gray-50);--spectrum-icon-color-primary-default:var(--spectrum-neutral-content-color-default);--spectrum-asterisk-icon-size-75:8px;--spectrum-radio-button-selection-indicator:4px;--spectrum-field-label-top-margin-small:0px;--spectrum-field-label-to-component:0px;--spectrum-help-text-to-component:0px;--spectrum-status-light-dot-size-small:8px;--spectrum-action-button-edge-to-hold-icon-extra-small:3px;--spectrum-action-button-edge-to-hold-icon-small:3px;--spectrum-button-minimum-width-multiplier:2.25;--spectrum-divider-thickness-small:1px;--spectrum-divider-thickness-medium:2px;--spectrum-divider-thickness-large:4px;--spectrum-swatch-rectangle-width-multiplier:2;--spectrum-swatch-slash-thickness-extra-small:2px;--spectrum-swatch-slash-thickness-small:3px;--spectrum-swatch-slash-thickness-medium:4px;--spectrum-swatch-slash-thickness-large:5px;--spectrum-progress-bar-minimum-width:48px;--spectrum-progress-bar-maximum-width:768px;--spectrum-meter-minimum-width:48px;--spectrum-meter-maximum-width:768px;--spectrum-meter-default-width:var(--spectrum-meter-width);--spectrum-in-line-alert-minimum-width:240px;--spectrum-popover-tip-width:16px;--spectrum-popover-tip-height:8px;--spectrum-menu-item-label-to-description:1px;--spectrum-menu-item-section-divider-height:8px;--spectrum-picker-minimum-width-multiplier:2;--spectrum-picker-end-edge-to-disclousure-icon-quiet:var(--spectrum-picker-end-edge-to-disclosure-icon-quiet);--spectrum-picker-end-edge-to-disclosure-icon-quiet:0px;--spectrum-text-field-minimum-width-multiplier:1.5;--spectrum-combo-box-minimum-width-multiplier:2.5;--spectrum-combo-box-quiet-minimum-width-multiplier:2;--spectrum-combo-box-visual-to-field-button-quiet:0px;--spectrum-alert-dialog-minimum-width:288px;--spectrum-alert-dialog-maximum-width:480px;--spectrum-contextual-help-minimum-width:268px;--spectrum-breadcrumbs-height:var(--spectrum-component-height-300);--spectrum-breadcrumbs-height-compact:var(--spectrum-component-height-200);--spectrum-breadcrumbs-end-edge-to-text:0px;--spectrum-breadcrumbs-truncated-menu-to-separator-icon:0px;--spectrum-breadcrumbs-start-edge-to-truncated-menu:0px;--spectrum-breadcrumbs-truncated-menu-to-bottom-text:0px;--spectrum-alert-banner-to-top-workflow-icon:var(--spectrum-alert-banner-top-to-workflow-icon);--spectrum-alert-banner-to-top-text:var(--spectrum-alert-banner-top-to-text);--spectrum-alert-banner-to-bottom-text:var(--spectrum-alert-banner-bottom-to-text);--spectrum-color-area-border-width:var(--spectrum-border-width-100);--spectrum-color-area-border-rounding:var(--spectrum-corner-radius-100);--spectrum-color-wheel-color-area-margin:12px;--spectrum-color-slider-border-width:1px;--spectrum-color-slider-border-rounding:4px;--spectrum-floating-action-button-drop-shadow-blur:12px;--spectrum-floating-action-button-drop-shadow-y:4px;--spectrum-illustrated-message-maximum-width:380px;--spectrum-search-field-minimum-width-multiplier:3;--spectrum-color-loupe-height:64px;--spectrum-color-loupe-width:48px;--spectrum-color-loupe-bottom-to-color-handle:12px;--spectrum-color-loupe-outer-border-width:var(--spectrum-border-width-200);--spectrum-color-loupe-inner-border-width:1px;--spectrum-color-loupe-drop-shadow-y:2px;--spectrum-color-loupe-drop-shadow-blur:8px;--spectrum-card-minimum-width:100px;--spectrum-card-preview-minimum-height:130px;--spectrum-card-selection-background-size:40px;--spectrum-drop-zone-width:428px;--spectrum-drop-zone-content-maximum-width:var(--spectrum-illustrated-message-maximum-width);--spectrum-drop-zone-border-dash-length:8px;--spectrum-drop-zone-border-dash-gap:4px;--spectrum-drop-zone-title-size:var(--spectrum-illustrated-message-title-size);--spectrum-drop-zone-cjk-title-size:var(--spectrum-illustrated-message-cjk-title-size);--spectrum-drop-zone-body-size:var(--spectrum-illustrated-message-body-size);--spectrum-accordion-top-to-text-compact-small:2px;--spectrum-accordion-top-to-text-compact-medium:4px;--spectrum-accordion-disclosure-indicator-to-text:0px;--spectrum-accordion-edge-to-disclosure-indicator:0px;--spectrum-accordion-edge-to-text:0px;--spectrum-accordion-focus-indicator-gap:0px;--spectrum-color-handle-border-width:var(--spectrum-border-width-200);--spectrum-color-handle-inner-border-width:1px;--spectrum-color-handle-outer-border-width:1px;--spectrum-color-handle-drop-shadow-x:0;--spectrum-color-handle-drop-shadow-y:0;--spectrum-color-handle-drop-shadow-blur:0;--spectrum-table-row-height-small-compact:var(--spectrum-component-height-75);--spectrum-table-row-height-medium-compact:var(--spectrum-component-height-100);--spectrum-table-row-height-large-compact:var(--spectrum-component-height-200);--spectrum-table-row-height-extra-large-compact:var(--spectrum-component-height-300);--spectrum-table-row-top-to-text-small-compact:var(--spectrum-component-top-to-text-75);--spectrum-table-row-top-to-text-medium-compact:var(--spectrum-component-top-to-text-100);--spectrum-table-row-top-to-text-large-compact:var(--spectrum-component-top-to-text-200);--spectrum-table-row-top-to-text-extra-large-compact:var(--spectrum-component-top-to-text-300);--spectrum-table-row-bottom-to-text-small-compact:var(--spectrum-component-bottom-to-text-75);--spectrum-table-row-bottom-to-text-medium-compact:var(--spectrum-component-bottom-to-text-100);--spectrum-table-row-bottom-to-text-large-compact:var(--spectrum-component-bottom-to-text-200);--spectrum-table-row-bottom-to-text-extra-large-compact:var(--spectrum-component-bottom-to-text-300);--spectrum-table-edge-to-content:16px;--spectrum-table-border-divider-width:1px;--spectrum-tab-item-height-small:var(--spectrum-component-height-200);--spectrum-tab-item-height-medium:var(--spectrum-component-height-300);--spectrum-tab-item-height-large:var(--spectrum-component-height-400);--spectrum-tab-item-height-extra-large:var(--spectrum-component-height-500);--spectrum-tab-item-compact-height-small:var(--spectrum-component-height-75);--spectrum-tab-item-compact-height-medium:var(--spectrum-component-height-100);--spectrum-tab-item-compact-height-large:var(--spectrum-component-height-200);--spectrum-tab-item-compact-height-extra-large:var(--spectrum-component-height-300);--spectrum-tab-item-start-to-edge-quiet:0px;--spectrum-in-field-button-width-stacked-small:20px;--spectrum-in-field-button-width-stacked-medium:28px;--spectrum-in-field-button-width-stacked-large:36px;--spectrum-in-field-button-width-stacked-extra-large:44px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-small:7px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-medium:9px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-large:13px;--spectrum-in-field-button-edge-to-disclosure-icon-stacked-extra-large:16px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small:3px;--spectrum-android-elevation:2dp;--spectrum-spacing-50:2px;--spectrum-spacing-75:4px;--spectrum-spacing-100:8px;--spectrum-spacing-200:12px;--spectrum-spacing-300:16px;--spectrum-spacing-400:24px;--spectrum-spacing-500:32px;--spectrum-spacing-600:40px;--spectrum-spacing-700:48px;--spectrum-spacing-800:64px;--spectrum-spacing-900:80px;--spectrum-spacing-1000:96px;--spectrum-focus-indicator-thickness:2px;--spectrum-focus-indicator-gap:2px;--spectrum-border-width-200:2px;--spectrum-border-width-400:4px;--spectrum-field-edge-to-text-quiet:0px;--spectrum-field-edge-to-visual-quiet:0px;--spectrum-field-edge-to-border-quiet:0px;--spectrum-field-edge-to-alert-icon-quiet:0px;--spectrum-field-edge-to-validation-icon-quiet:0px;--spectrum-text-underline-thickness:1px;--spectrum-text-underline-gap:1px;--spectrum-informative-color-100:var(--spectrum-blue-100);--spectrum-informative-color-200:var(--spectrum-blue-200);--spectrum-informative-color-300:var(--spectrum-blue-300);--spectrum-informative-color-400:var(--spectrum-blue-400);--spectrum-informative-color-500:var(--spectrum-blue-500);--spectrum-informative-color-600:var(--spectrum-blue-600);--spectrum-informative-color-700:var(--spectrum-blue-700);--spectrum-informative-color-800:var(--spectrum-blue-800);--spectrum-informative-color-900:var(--spectrum-blue-900);--spectrum-informative-color-1000:var(--spectrum-blue-1000);--spectrum-informative-color-1100:var(--spectrum-blue-1100);--spectrum-informative-color-1200:var(--spectrum-blue-1200);--spectrum-informative-color-1300:var(--spectrum-blue-1300);--spectrum-informative-color-1400:var(--spectrum-blue-1400);--spectrum-negative-color-100:var(--spectrum-red-100);--spectrum-negative-color-200:var(--spectrum-red-200);--spectrum-negative-color-300:var(--spectrum-red-300);--spectrum-negative-color-400:var(--spectrum-red-400);--spectrum-negative-color-500:var(--spectrum-red-500);--spectrum-negative-color-600:var(--spectrum-red-600);--spectrum-negative-color-700:var(--spectrum-red-700);--spectrum-negative-color-800:var(--spectrum-red-800);--spectrum-negative-color-900:var(--spectrum-red-900);--spectrum-negative-color-1000:var(--spectrum-red-1000);--spectrum-negative-color-1100:var(--spectrum-red-1100);--spectrum-negative-color-1200:var(--spectrum-red-1200);--spectrum-negative-color-1300:var(--spectrum-red-1300);--spectrum-negative-color-1400:var(--spectrum-red-1400);--spectrum-notice-color-100:var(--spectrum-orange-100);--spectrum-notice-color-200:var(--spectrum-orange-200);--spectrum-notice-color-300:var(--spectrum-orange-300);--spectrum-notice-color-400:var(--spectrum-orange-400);--spectrum-notice-color-500:var(--spectrum-orange-500);--spectrum-notice-color-600:var(--spectrum-orange-600);--spectrum-notice-color-700:var(--spectrum-orange-700);--spectrum-notice-color-800:var(--spectrum-orange-800);--spectrum-notice-color-900:var(--spectrum-orange-900);--spectrum-notice-color-1000:var(--spectrum-orange-1000);--spectrum-notice-color-1100:var(--spectrum-orange-1100);--spectrum-notice-color-1200:var(--spectrum-orange-1200);--spectrum-notice-color-1300:var(--spectrum-orange-1300);--spectrum-notice-color-1400:var(--spectrum-orange-1400);--spectrum-positive-color-100:var(--spectrum-green-100);--spectrum-positive-color-200:var(--spectrum-green-200);--spectrum-positive-color-300:var(--spectrum-green-300);--spectrum-positive-color-400:var(--spectrum-green-400);--spectrum-positive-color-500:var(--spectrum-green-500);--spectrum-positive-color-600:var(--spectrum-green-600);--spectrum-positive-color-700:var(--spectrum-green-700);--spectrum-positive-color-800:var(--spectrum-green-800);--spectrum-positive-color-900:var(--spectrum-green-900);--spectrum-positive-color-1000:var(--spectrum-green-1000);--spectrum-positive-color-1100:var(--spectrum-green-1100);--spectrum-positive-color-1200:var(--spectrum-green-1200);--spectrum-positive-color-1300:var(--spectrum-green-1300);--spectrum-positive-color-1400:var(--spectrum-green-1400);--spectrum-default-font-family:var(--spectrum-sans-serif-font-family);--spectrum-sans-serif-font-family:Adobe Clean;--spectrum-serif-font-family:Adobe Clean Serif;--spectrum-cjk-font-family:Adobe Clean Han;--spectrum-light-font-weight:300;--spectrum-regular-font-weight:400;--spectrum-medium-font-weight:500;--spectrum-bold-font-weight:700;--spectrum-extra-bold-font-weight:800;--spectrum-black-font-weight:900;--spectrum-italic-font-style:italic;--spectrum-default-font-style:normal;--spectrum-line-height-100:1.3;--spectrum-line-height-200:1.5;--spectrum-cjk-line-height-100:1.5;--spectrum-cjk-line-height-200:1.7;--spectrum-cjk-letter-spacing:.05em;--spectrum-heading-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-heading-serif-font-family:var(--spectrum-serif-font-family);--spectrum-heading-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-heading-sans-serif-light-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-sans-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-light-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-cjk-light-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-heavy-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-light-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-light-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-cjk-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-serif-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-cjk-heavy-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-strong-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-emphasized-font-weight:var(--spectrum-light-font-weight);--spectrum-heading-sans-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-heading-cjk-light-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-heavy-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-light-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-sans-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-light-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-light-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-cjk-light-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-sans-serif-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-sans-serif-heavy-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-serif-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-serif-heavy-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-heading-cjk-heavy-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-heading-cjk-heavy-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-heading-size-xxxl:var(--spectrum-font-size-1300);--spectrum-heading-size-xxl:var(--spectrum-font-size-1100);--spectrum-heading-size-xl:var(--spectrum-font-size-900);--spectrum-heading-size-l:var(--spectrum-font-size-700);--spectrum-heading-size-m:var(--spectrum-font-size-500);--spectrum-heading-size-s:var(--spectrum-font-size-300);--spectrum-heading-size-xs:var(--spectrum-font-size-200);--spectrum-heading-size-xxs:var(--spectrum-font-size-100);--spectrum-heading-cjk-size-xxxl:var(--spectrum-font-size-1300);--spectrum-heading-cjk-size-xxl:var(--spectrum-font-size-900);--spectrum-heading-cjk-size-xl:var(--spectrum-font-size-800);--spectrum-heading-cjk-size-l:var(--spectrum-font-size-600);--spectrum-heading-cjk-size-m:var(--spectrum-font-size-400);--spectrum-heading-cjk-size-s:var(--spectrum-font-size-300);--spectrum-heading-cjk-size-xs:var(--spectrum-font-size-200);--spectrum-heading-cjk-size-xxs:var(--spectrum-font-size-100);--spectrum-heading-line-height:var(--spectrum-line-height-100);--spectrum-heading-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-heading-margin-top-multiplier:.888889;--spectrum-heading-margin-bottom-multiplier:.25;--spectrum-heading-color:var(--spectrum-gray-900);--spectrum-body-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-body-serif-font-family:var(--spectrum-serif-font-family);--spectrum-body-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-body-sans-serif-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-body-serif-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-serif-font-style:var(--spectrum-default-font-style);--spectrum-body-cjk-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-cjk-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-body-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-serif-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-body-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-cjk-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-body-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-body-sans-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-body-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-body-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-body-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-body-size-xxxl:var(--spectrum-font-size-600);--spectrum-body-size-xxl:var(--spectrum-font-size-500);--spectrum-body-size-xl:var(--spectrum-font-size-400);--spectrum-body-size-l:var(--spectrum-font-size-300);--spectrum-body-size-m:var(--spectrum-font-size-200);--spectrum-body-size-s:var(--spectrum-font-size-100);--spectrum-body-size-xs:var(--spectrum-font-size-75);--spectrum-body-line-height:var(--spectrum-line-height-200);--spectrum-body-cjk-line-height:var(--spectrum-cjk-line-height-200);--spectrum-body-margin-multiplier:.75;--spectrum-body-color:var(--spectrum-gray-800);--spectrum-detail-sans-serif-font-family:var(--spectrum-sans-serif-font-family);--spectrum-detail-serif-font-family:var(--spectrum-serif-font-family);--spectrum-detail-cjk-font-family:var(--spectrum-cjk-font-family);--spectrum-detail-sans-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-light-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-light-font-weight:var(--spectrum-light-font-weight);--spectrum-detail-cjk-light-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-strong-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-serif-light-strong-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-cjk-light-strong-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-light-strong-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-light-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-cjk-light-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-sans-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-detail-serif-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-detail-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-sans-serif-light-strong-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-sans-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-serif-light-strong-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-detail-serif-light-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-detail-cjk-light-strong-emphasized-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-detail-cjk-light-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-detail-size-xl:var(--spectrum-font-size-200);--spectrum-detail-size-l:var(--spectrum-font-size-100);--spectrum-detail-size-m:var(--spectrum-font-size-75);--spectrum-detail-size-s:var(--spectrum-font-size-50);--spectrum-detail-line-height:var(--spectrum-line-height-100);--spectrum-detail-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-detail-margin-top-multiplier:.888889;--spectrum-detail-margin-bottom-multiplier:.25;--spectrum-detail-letter-spacing:.06em;--spectrum-detail-sans-serif-text-transform:uppercase;--spectrum-detail-serif-text-transform:uppercase;--spectrum-detail-color:var(--spectrum-gray-900);--spectrum-code-font-family:Source Code Pro;--spectrum-code-cjk-font-family:var(--spectrum-code-font-family);--spectrum-code-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-font-style:var(--spectrum-default-font-style);--spectrum-code-cjk-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-cjk-font-style:var(--spectrum-default-font-style);--spectrum-code-strong-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-strong-font-style:var(--spectrum-default-font-style);--spectrum-code-cjk-strong-font-weight:var(--spectrum-black-font-weight);--spectrum-code-cjk-strong-font-style:var(--spectrum-default-font-style);--spectrum-code-emphasized-font-weight:var(--spectrum-regular-font-weight);--spectrum-code-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-code-cjk-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-cjk-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-code-strong-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-code-strong-emphasized-font-style:var(--spectrum-italic-font-style);--spectrum-code-cjk-strong-emphasized-font-weight:var(--spectrum-black-font-weight);--spectrum-code-cjk-strong-emphasized-font-style:var(--spectrum-default-font-style);--spectrum-code-size-xl:var(--spectrum-font-size-400);--spectrum-code-size-l:var(--spectrum-font-size-300);--spectrum-code-size-m:var(--spectrum-font-size-200);--spectrum-code-size-s:var(--spectrum-font-size-100);--spectrum-code-size-xs:var(--spectrum-font-size-75);--spectrum-code-line-height:var(--spectrum-line-height-200);--spectrum-code-cjk-line-height:var(--spectrum-cjk-line-height-200);--spectrum-code-color:var(--spectrum-gray-800);--spectrum-neutral-background-color-selected-default:var(--spectrum-gray-700);--spectrum-neutral-background-color-selected-hover:var(--spectrum-gray-800);--spectrum-neutral-background-color-selected-down:var(--spectrum-gray-900);--spectrum-neutral-background-color-selected-key-focus:var(--spectrum-gray-800);--spectrum-slider-track-thickness:2px;--spectrum-slider-handle-gap:4px;--spectrum-picker-border-width:var(--spectrum-border-width-100);--spectrum-in-field-button-fill-stacked-inner-border-rounding:0px;--spectrum-in-field-button-edge-to-fill:0px;--spectrum-in-field-button-stacked-inner-edge-to-fill:0px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium:3px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large:4px;--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large:5px;--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-small:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-medium:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-large:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large);--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-extra-large:var(--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large);--spectrum-corner-radius-75:2px;--spectrum-drop-shadow-x:0px;--spectrum-border-width-100:1px;--spectrum-accent-color-100:var(--spectrum-blue-100);--spectrum-accent-color-200:var(--spectrum-blue-200);--spectrum-accent-color-300:var(--spectrum-blue-300);--spectrum-accent-color-400:var(--spectrum-blue-400);--spectrum-accent-color-500:var(--spectrum-blue-500);--spectrum-accent-color-600:var(--spectrum-blue-600);--spectrum-accent-color-700:var(--spectrum-blue-700);--spectrum-accent-color-800:var(--spectrum-blue-800);--spectrum-accent-color-900:var(--spectrum-blue-900);--spectrum-accent-color-1000:var(--spectrum-blue-1000);--spectrum-accent-color-1100:var(--spectrum-blue-1100);--spectrum-accent-color-1200:var(--spectrum-blue-1200);--spectrum-accent-color-1300:var(--spectrum-blue-1300);--spectrum-accent-color-1400:var(--spectrum-blue-1400);--spectrum-heading-sans-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-cjk-font-weight:var(--spectrum-extra-bold-font-weight);--spectrum-heading-sans-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--spectrum-heading-serif-emphasized-font-weight:var(--spectrum-bold-font-weight);--system-spectrum-actionbutton-background-color-default:var(--spectrum-gray-75);--system-spectrum-actionbutton-background-color-hover:var(--spectrum-gray-200);--system-spectrum-actionbutton-background-color-down:var(--spectrum-gray-300);--system-spectrum-actionbutton-background-color-focus:var(--spectrum-gray-200);--system-spectrum-actionbutton-border-color-default:var(--spectrum-gray-400);--system-spectrum-actionbutton-border-color-hover:var(--spectrum-gray-500);--system-spectrum-actionbutton-border-color-down:var(--spectrum-gray-600);--system-spectrum-actionbutton-border-color-focus:var(--spectrum-gray-500);--system-spectrum-actionbutton-background-color-disabled:transparent;--system-spectrum-actionbutton-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-actionbutton-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-actionbutton-quiet-background-color-default:transparent;--system-spectrum-actionbutton-quiet-background-color-hover:var(--spectrum-gray-200);--system-spectrum-actionbutton-quiet-background-color-down:var(--spectrum-gray-300);--system-spectrum-actionbutton-quiet-background-color-focus:var(--spectrum-gray-200);--system-spectrum-actionbutton-quiet-border-color-default:transparent;--system-spectrum-actionbutton-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-quiet-border-color-down:transparent;--system-spectrum-actionbutton-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-quiet-background-color-disabled:transparent;--system-spectrum-actionbutton-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-selected-border-color-default:transparent;--system-spectrum-actionbutton-selected-border-color-hover:transparent;--system-spectrum-actionbutton-selected-border-color-down:transparent;--system-spectrum-actionbutton-selected-border-color-focus:transparent;--system-spectrum-actionbutton-selected-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-actionbutton-selected-border-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-default:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-default:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-hover:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-down:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-down:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-focus:transparent;--system-spectrum-actionbutton-staticblack-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-quiet-border-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-background-color-default:transparent;--system-spectrum-actionbutton-staticblack-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-actionbutton-staticblack-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-actionbutton-staticblack-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-actionbutton-staticblack-border-color-default:var(--spectrum-transparent-black-400);--system-spectrum-actionbutton-staticblack-border-color-hover:var(--spectrum-transparent-black-500);--system-spectrum-actionbutton-staticblack-border-color-down:var(--spectrum-transparent-black-600);--system-spectrum-actionbutton-staticblack-border-color-focus:var(--spectrum-transparent-black-500);--system-spectrum-actionbutton-staticblack-content-color-default:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-hover:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-down:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-content-color-focus:var(--spectrum-black);--system-spectrum-actionbutton-staticblack-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-actionbutton-staticblack-background-color-disabled:transparent;--system-spectrum-actionbutton-staticblack-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-actionbutton-staticblack-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-default:var(--spectrum-transparent-black-800);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-hover:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-down:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-focus:var(--spectrum-transparent-black-900);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-default:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-hover:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-down:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-content-color-focus:var(--spectrum-white);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-actionbutton-staticblack-selected-mod-actionbutton-border-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-background-color-default:transparent;--system-spectrum-actionbutton-staticwhite-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-actionbutton-staticwhite-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-actionbutton-staticwhite-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-actionbutton-staticwhite-border-color-default:var(--spectrum-transparent-white-400);--system-spectrum-actionbutton-staticwhite-border-color-hover:var(--spectrum-transparent-white-500);--system-spectrum-actionbutton-staticwhite-border-color-down:var(--spectrum-transparent-white-600);--system-spectrum-actionbutton-staticwhite-border-color-focus:var(--spectrum-transparent-white-500);--system-spectrum-actionbutton-staticwhite-content-color-default:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-hover:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-down:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-content-color-focus:var(--spectrum-white);--system-spectrum-actionbutton-staticwhite-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-actionbutton-staticwhite-background-color-disabled:transparent;--system-spectrum-actionbutton-staticwhite-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-actionbutton-staticwhite-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-default:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-hover:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-down:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-content-color-focus:var(--spectrum-black);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-actionbutton-staticwhite-selected-mod-actionbutton-border-color-disabled:transparent;--system-spectrum-actiongroup-gap-size-compact:0;--system-spectrum-actiongroup-horizontal-spacing-compact:-1px;--system-spectrum-actiongroup-vertical-spacing-compact:-1px;--system-spectrum-button-background-color-default:var(--spectrum-gray-75);--system-spectrum-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-button-background-color-focus:var(--spectrum-gray-200);--system-spectrum-button-border-color-default:var(--spectrum-gray-400);--system-spectrum-button-border-color-hover:var(--spectrum-gray-500);--system-spectrum-button-border-color-down:var(--spectrum-gray-600);--system-spectrum-button-border-color-focus:var(--spectrum-gray-500);--system-spectrum-button-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-background-color-disabled:transparent;--system-spectrum-button-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-accent-background-color-default:var(--spectrum-accent-background-color-default);--system-spectrum-button-accent-background-color-hover:var(--spectrum-accent-background-color-hover);--system-spectrum-button-accent-background-color-down:var(--spectrum-accent-background-color-down);--system-spectrum-button-accent-background-color-focus:var(--spectrum-accent-background-color-key-focus);--system-spectrum-button-accent-border-color-default:transparent;--system-spectrum-button-accent-border-color-hover:transparent;--system-spectrum-button-accent-border-color-down:transparent;--system-spectrum-button-accent-border-color-focus:transparent;--system-spectrum-button-accent-content-color-default:var(--spectrum-white);--system-spectrum-button-accent-content-color-hover:var(--spectrum-white);--system-spectrum-button-accent-content-color-down:var(--spectrum-white);--system-spectrum-button-accent-content-color-focus:var(--spectrum-white);--system-spectrum-button-accent-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-accent-border-color-disabled:transparent;--system-spectrum-button-accent-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-accent-outline-background-color-default:transparent;--system-spectrum-button-accent-outline-background-color-hover:var(--spectrum-accent-color-200);--system-spectrum-button-accent-outline-background-color-down:var(--spectrum-accent-color-300);--system-spectrum-button-accent-outline-background-color-focus:var(--spectrum-accent-color-200);--system-spectrum-button-accent-outline-border-color-default:var(--spectrum-accent-color-900);--system-spectrum-button-accent-outline-border-color-hover:var(--spectrum-accent-color-1000);--system-spectrum-button-accent-outline-border-color-down:var(--spectrum-accent-color-1100);--system-spectrum-button-accent-outline-border-color-focus:var(--spectrum-accent-color-1000);--system-spectrum-button-accent-outline-content-color-default:var(--spectrum-accent-content-color-default);--system-spectrum-button-accent-outline-content-color-hover:var(--spectrum-accent-content-color-hover);--system-spectrum-button-accent-outline-content-color-down:var(--spectrum-accent-content-color-down);--system-spectrum-button-accent-outline-content-color-focus:var(--spectrum-accent-content-color-key-focus);--system-spectrum-button-accent-outline-background-color-disabled:transparent;--system-spectrum-button-accent-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-accent-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-negative-background-color-default:var(--spectrum-negative-background-color-default);--system-spectrum-button-negative-background-color-hover:var(--spectrum-negative-background-color-hover);--system-spectrum-button-negative-background-color-down:var(--spectrum-negative-background-color-down);--system-spectrum-button-negative-background-color-focus:var(--spectrum-negative-background-color-key-focus);--system-spectrum-button-negative-border-color-default:transparent;--system-spectrum-button-negative-border-color-hover:transparent;--system-spectrum-button-negative-border-color-down:transparent;--system-spectrum-button-negative-border-color-focus:transparent;--system-spectrum-button-negative-content-color-default:var(--spectrum-white);--system-spectrum-button-negative-content-color-hover:var(--spectrum-white);--system-spectrum-button-negative-content-color-down:var(--spectrum-white);--system-spectrum-button-negative-content-color-focus:var(--spectrum-white);--system-spectrum-button-negative-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-negative-border-color-disabled:transparent;--system-spectrum-button-negative-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-negative-outline-background-color-default:transparent;--system-spectrum-button-negative-outline-background-color-hover:var(--spectrum-negative-color-200);--system-spectrum-button-negative-outline-background-color-down:var(--spectrum-negative-color-300);--system-spectrum-button-negative-outline-background-color-focus:var(--spectrum-negative-color-200);--system-spectrum-button-negative-outline-border-color-default:var(--spectrum-negative-color-900);--system-spectrum-button-negative-outline-border-color-hover:var(--spectrum-negative-color-1000);--system-spectrum-button-negative-outline-border-color-down:var(--spectrum-negative-color-1100);--system-spectrum-button-negative-outline-border-color-focus:var(--spectrum-negative-color-1000);--system-spectrum-button-negative-outline-content-color-default:var(--spectrum-negative-content-color-default);--system-spectrum-button-negative-outline-content-color-hover:var(--spectrum-negative-content-color-hover);--system-spectrum-button-negative-outline-content-color-down:var(--spectrum-negative-content-color-down);--system-spectrum-button-negative-outline-content-color-focus:var(--spectrum-negative-content-color-key-focus);--system-spectrum-button-negative-outline-background-color-disabled:transparent;--system-spectrum-button-negative-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-negative-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-primary-background-color-default:var(--spectrum-neutral-background-color-default);--system-spectrum-button-primary-background-color-hover:var(--spectrum-neutral-background-color-hover);--system-spectrum-button-primary-background-color-down:var(--spectrum-neutral-background-color-down);--system-spectrum-button-primary-background-color-focus:var(--spectrum-neutral-background-color-key-focus);--system-spectrum-button-primary-border-color-default:transparent;--system-spectrum-button-primary-border-color-hover:transparent;--system-spectrum-button-primary-border-color-down:transparent;--system-spectrum-button-primary-border-color-focus:transparent;--system-spectrum-button-primary-content-color-default:var(--spectrum-white);--system-spectrum-button-primary-content-color-hover:var(--spectrum-white);--system-spectrum-button-primary-content-color-down:var(--spectrum-white);--system-spectrum-button-primary-content-color-focus:var(--spectrum-white);--system-spectrum-button-primary-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-primary-border-color-disabled:transparent;--system-spectrum-button-primary-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-primary-outline-background-color-default:transparent;--system-spectrum-button-primary-outline-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-primary-outline-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-primary-outline-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-primary-outline-border-color-default:var(--spectrum-gray-800);--system-spectrum-button-primary-outline-border-color-hover:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-border-color-down:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-border-color-focus:var(--spectrum-gray-900);--system-spectrum-button-primary-outline-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-primary-outline-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-primary-outline-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-primary-outline-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-primary-outline-background-color-disabled:transparent;--system-spectrum-button-primary-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-primary-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-secondary-background-color-default:var(--spectrum-gray-200);--system-spectrum-button-secondary-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-secondary-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-secondary-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-secondary-border-color-default:transparent;--system-spectrum-button-secondary-border-color-hover:transparent;--system-spectrum-button-secondary-border-color-down:transparent;--system-spectrum-button-secondary-border-color-focus:transparent;--system-spectrum-button-secondary-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-secondary-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-secondary-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-secondary-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-secondary-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-secondary-border-color-disabled:transparent;--system-spectrum-button-secondary-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-secondary-outline-background-color-default:transparent;--system-spectrum-button-secondary-outline-background-color-hover:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-background-color-down:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-background-color-focus:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-border-color-default:var(--spectrum-gray-300);--system-spectrum-button-secondary-outline-border-color-hover:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-border-color-down:var(--spectrum-gray-500);--system-spectrum-button-secondary-outline-border-color-focus:var(--spectrum-gray-400);--system-spectrum-button-secondary-outline-content-color-default:var(--spectrum-neutral-content-color-default);--system-spectrum-button-secondary-outline-content-color-hover:var(--spectrum-neutral-content-color-hover);--system-spectrum-button-secondary-outline-content-color-down:var(--spectrum-neutral-content-color-down);--system-spectrum-button-secondary-outline-content-color-focus:var(--spectrum-neutral-content-color-key-focus);--system-spectrum-button-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-secondary-outline-border-color-disabled:var(--spectrum-disabled-border-color);--system-spectrum-button-secondary-outline-content-color-disabled:var(--spectrum-disabled-content-color);--system-spectrum-button-quiet-background-color-default:transparent;--system-spectrum-button-quiet-background-color-hover:var(--spectrum-gray-200);--system-spectrum-button-quiet-background-color-down:var(--spectrum-gray-300);--system-spectrum-button-quiet-background-color-focus:var(--spectrum-gray-200);--system-spectrum-button-quiet-border-color-default:transparent;--system-spectrum-button-quiet-border-color-hover:transparent;--system-spectrum-button-quiet-border-color-down:transparent;--system-spectrum-button-quiet-border-color-focus:transparent;--system-spectrum-button-quiet-background-color-disabled:transparent;--system-spectrum-button-quiet-border-color-disabled:transparent;--system-spectrum-button-selected-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-button-selected-background-color-hover:var(--spectrum-neutral-subdued-background-color-hover);--system-spectrum-button-selected-background-color-down:var(--spectrum-neutral-subdued-background-color-down);--system-spectrum-button-selected-background-color-focus:var(--spectrum-neutral-subdued-background-color-key-focus);--system-spectrum-button-selected-border-color-default:transparent;--system-spectrum-button-selected-border-color-hover:transparent;--system-spectrum-button-selected-border-color-down:transparent;--system-spectrum-button-selected-border-color-focus:transparent;--system-spectrum-button-selected-content-color-default:var(--spectrum-white);--system-spectrum-button-selected-content-color-hover:var(--spectrum-white);--system-spectrum-button-selected-content-color-down:var(--spectrum-white);--system-spectrum-button-selected-content-color-focus:var(--spectrum-white);--system-spectrum-button-selected-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-button-selected-border-color-disabled:transparent;--system-spectrum-button-selected-emphasized-background-color-default:var(--spectrum-accent-background-color-default);--system-spectrum-button-selected-emphasized-background-color-hover:var(--spectrum-accent-background-color-hover);--system-spectrum-button-selected-emphasized-background-color-down:var(--spectrum-accent-background-color-down);--system-spectrum-button-selected-emphasized-background-color-focus:var(--spectrum-accent-background-color-key-focus);--system-spectrum-button-staticblack-quiet-border-color-default:transparent;--system-spectrum-button-staticwhite-quiet-border-color-default:transparent;--system-spectrum-button-staticblack-quiet-border-color-hover:transparent;--system-spectrum-button-staticwhite-quiet-border-color-hover:transparent;--system-spectrum-button-staticblack-quiet-border-color-down:transparent;--system-spectrum-button-staticwhite-quiet-border-color-down:transparent;--system-spectrum-button-staticblack-quiet-border-color-focus:transparent;--system-spectrum-button-staticwhite-quiet-border-color-focus:transparent;--system-spectrum-button-staticblack-quiet-border-color-disabled:transparent;--system-spectrum-button-staticwhite-quiet-border-color-disabled:transparent;--system-spectrum-button-staticwhite-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-border-color-default:transparent;--system-spectrum-button-staticwhite-border-color-hover:transparent;--system-spectrum-button-staticwhite-border-color-down:transparent;--system-spectrum-button-staticwhite-border-color-focus:transparent;--system-spectrum-button-staticwhite-content-color-default:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-down:var(--spectrum-black);--system-spectrum-button-staticwhite-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticwhite-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-border-color-disabled:transparent;--system-spectrum-button-staticwhite-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-outline-background-color-default:transparent;--system-spectrum-button-staticwhite-outline-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-outline-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-outline-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-outline-border-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-outline-border-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-border-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-border-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-outline-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-outline-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-outline-background-color-disabled:transparent;--system-spectrum-button-staticwhite-outline-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-button-staticwhite-outline-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-selected-background-color-default:var(--spectrum-transparent-white-800);--system-spectrum-button-staticwhite-selected-background-color-hover:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-background-color-down:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-background-color-focus:var(--spectrum-transparent-white-900);--system-spectrum-button-staticwhite-selected-content-color-default:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-down:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticwhite-selected-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-selected-border-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-background-color-default:var(--spectrum-transparent-white-200);--system-spectrum-button-staticwhite-secondary-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-border-color-default:transparent;--system-spectrum-button-staticwhite-secondary-border-color-hover:transparent;--system-spectrum-button-staticwhite-secondary-border-color-down:transparent;--system-spectrum-button-staticwhite-secondary-border-color-focus:transparent;--system-spectrum-button-staticwhite-secondary-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-secondary-background-color-disabled:var(--spectrum-disabled-static-white-background-color);--system-spectrum-button-staticwhite-secondary-border-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticwhite-secondary-outline-background-color-default:transparent;--system-spectrum-button-staticwhite-secondary-outline-background-color-hover:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-background-color-down:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-background-color-focus:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-border-color-default:var(--spectrum-transparent-white-300);--system-spectrum-button-staticwhite-secondary-outline-border-color-hover:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-border-color-down:var(--spectrum-transparent-white-500);--system-spectrum-button-staticwhite-secondary-outline-border-color-focus:var(--spectrum-transparent-white-400);--system-spectrum-button-staticwhite-secondary-outline-content-color-default:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-down:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticwhite-secondary-outline-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color);--system-spectrum-button-staticwhite-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-staticwhite-secondary-outline-border-color-disabled:var(--spectrum-disabled-static-white-border-color);--system-spectrum-button-staticwhite-secondary-outline-content-color-disabled:var(--spectrum-disabled-static-white-content-color);--system-spectrum-button-staticblack-background-color-default:var(--spectrum-transparent-black-800);--system-spectrum-button-staticblack-background-color-hover:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-background-color-down:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-background-color-focus:var(--spectrum-transparent-black-900);--system-spectrum-button-staticblack-border-color-default:transparent;--system-spectrum-button-staticblack-border-color-hover:transparent;--system-spectrum-button-staticblack-border-color-down:transparent;--system-spectrum-button-staticblack-border-color-focus:transparent;--system-spectrum-button-staticblack-content-color-default:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-hover:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-down:var(--spectrum-white);--system-spectrum-button-staticblack-content-color-focus:var(--spectrum-white);--system-spectrum-button-staticblack-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-button-staticblack-border-color-disabled:transparent;--system-spectrum-button-staticblack-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-outline-background-color-default:transparent;--system-spectrum-button-staticblack-outline-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-outline-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-outline-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-outline-border-color-default:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-outline-border-color-hover:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-outline-border-color-down:var(--spectrum-transparent-black-600);--system-spectrum-button-staticblack-outline-border-color-focus:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-outline-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-outline-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-outline-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-outline-background-color-disabled:transparent;--system-spectrum-button-staticblack-outline-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-button-staticblack-outline-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-secondary-background-color-default:var(--spectrum-transparent-black-200);--system-spectrum-button-staticblack-secondary-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-border-color-default:transparent;--system-spectrum-button-staticblack-secondary-border-color-hover:transparent;--system-spectrum-button-staticblack-secondary-border-color-down:transparent;--system-spectrum-button-staticblack-secondary-border-color-focus:transparent;--system-spectrum-button-staticblack-secondary-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-secondary-background-color-disabled:var(--spectrum-disabled-static-black-background-color);--system-spectrum-button-staticblack-secondary-border-color-disabled:transparent;--system-spectrum-button-staticblack-secondary-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-button-staticblack-secondary-outline-background-color-default:transparent;--system-spectrum-button-staticblack-secondary-outline-background-color-hover:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-background-color-down:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-background-color-focus:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-border-color-default:var(--spectrum-transparent-black-300);--system-spectrum-button-staticblack-secondary-outline-border-color-hover:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-border-color-down:var(--spectrum-transparent-black-500);--system-spectrum-button-staticblack-secondary-outline-border-color-focus:var(--spectrum-transparent-black-400);--system-spectrum-button-staticblack-secondary-outline-content-color-default:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-hover:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-down:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-content-color-focus:var(--spectrum-black);--system-spectrum-button-staticblack-secondary-outline-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color);--system-spectrum-button-staticblack-secondary-outline-background-color-disabled:transparent;--system-spectrum-button-staticblack-secondary-outline-border-color-disabled:var(--spectrum-disabled-static-black-border-color);--system-spectrum-button-staticblack-secondary-outline-content-color-disabled:var(--spectrum-disabled-static-black-content-color);--system-spectrum-checkbox-control-color-default:var(--spectrum-gray-600);--system-spectrum-checkbox-control-color-hover:var(--spectrum-gray-700);--system-spectrum-checkbox-control-color-down:var(--spectrum-gray-800);--system-spectrum-checkbox-control-color-focus:var(--spectrum-gray-700);--system-spectrum-closebutton-background-color-default:transparent;--system-spectrum-closebutton-background-color-hover:var(--spectrum-gray-200);--system-spectrum-closebutton-background-color-down:var(--spectrum-gray-300);--system-spectrum-closebutton-background-color-focus:var(--spectrum-gray-200);--system-spectrum-combobox-border-color-default:var(--spectrum-gray-500);--system-spectrum-combobox-border-color-hover:var(--spectrum-gray-600);--system-spectrum-combobox-border-color-focus:var(--spectrum-gray-500);--system-spectrum-combobox-border-color-focus-hover:var(--spectrum-gray-600);--system-spectrum-combobox-border-color-key-focus:var(--spectrum-gray-600);--system-spectrum-infieldbutton-spectrum-infield-button-border-width:var(--spectrum-border-width-100);--system-spectrum-infieldbutton-spectrum-infield-button-border-color:inherit;--system-spectrum-infieldbutton-spectrum-infield-button-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-infieldbutton-spectrum-infield-button-border-radius-reset:0;--system-spectrum-infieldbutton-spectrum-infield-button-stacked-top-border-radius-start-start:var(--spectrum-infield-button-border-radius-reset);--system-spectrum-infieldbutton-spectrum-infield-button-stacked-bottom-border-radius-end-start:var(--spectrum-infield-button-border-radius-reset);--system-spectrum-infieldbutton-spectrum-infield-button-background-color:var(--spectrum-gray-75);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-infieldbutton-spectrum-infield-button-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-picker-background-color-default:var(--spectrum-gray-75);--system-spectrum-picker-background-color-default-open:var(--spectrum-gray-200);--system-spectrum-picker-background-color-active:var(--spectrum-gray-300);--system-spectrum-picker-background-color-hover:var(--spectrum-gray-200);--system-spectrum-picker-background-color-hover-open:var(--spectrum-gray-200);--system-spectrum-picker-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-picker-border-color-default:var(--spectrum-gray-500);--system-spectrum-picker-border-color-default-open:var(--spectrum-gray-500);--system-spectrum-picker-border-color-hover:var(--spectrum-gray-600);--system-spectrum-picker-border-color-hover-open:var(--spectrum-gray-600);--system-spectrum-picker-border-color-active:var(--spectrum-gray-700);--system-spectrum-picker-border-color-key-focus:var(--spectrum-gray-600);--system-spectrum-picker-border-width:var(--spectrum-border-width-100);--system-spectrum-pickerbutton-spectrum-picker-button-background-color:var(--spectrum-gray-75);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-hover:var(--spectrum-gray-200);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-down:var(--spectrum-gray-300);--system-spectrum-pickerbutton-spectrum-picker-button-background-color-key-focus:var(--spectrum-gray-200);--system-spectrum-pickerbutton-spectrum-picker-button-border-color:inherit;--system-spectrum-pickerbutton-spectrum-picker-button-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-rounded-sided:0;--system-spectrum-pickerbutton-spectrum-picker-button-border-radius-sided:0;--system-spectrum-pickerbutton-spectrum-picker-button-border-width:var(--spectrum-border-width-100);--system-spectrum-popover-border-width:var(--spectrum-border-width-100);--system-spectrum-radio-button-border-color-default:var(--spectrum-gray-600);--system-spectrum-radio-button-border-color-hover:var(--spectrum-gray-700);--system-spectrum-radio-button-border-color-down:var(--spectrum-gray-800);--system-spectrum-radio-button-border-color-focus:var(--spectrum-gray-700);--system-spectrum-radio-emphasized-button-checked-border-color-default:var(--spectrum-accent-color-900);--system-spectrum-radio-emphasized-button-checked-border-color-hover:var(--spectrum-accent-color-1000);--system-spectrum-radio-emphasized-button-checked-border-color-down:var(--spectrum-accent-color-1100);--system-spectrum-radio-emphasized-button-checked-border-color-focus:var(--spectrum-accent-color-1000);--system-spectrum-search-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-edge-to-visual:var(--spectrum-component-edge-to-visual-100);--system-spectrum-search-border-color-default:var(--spectrum-gray-500);--system-spectrum-search-border-color-hover:var(--spectrum-gray-600);--system-spectrum-search-border-color-focus:var(--spectrum-gray-800);--system-spectrum-search-border-color-focus-hover:var(--spectrum-gray-900);--system-spectrum-search-border-color-key-focus:var(--spectrum-gray-900);--system-spectrum-search-sizes-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizes-edge-to-visual:var(--spectrum-component-edge-to-visual-75);--system-spectrum-search-sizem-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizem-edge-to-visual:var(--spectrum-component-edge-to-visual-100);--system-spectrum-search-sizel-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizel-edge-to-visual:var(--spectrum-component-edge-to-visual-200);--system-spectrum-search-sizexl-border-radius:var(--spectrum-corner-radius-100);--system-spectrum-search-sizexl-edge-to-visual:var(--spectrum-component-edge-to-visual-300);--system-spectrum-slider-track-color:var(--spectrum-gray-300);--system-spectrum-slider-track-fill-color:var(--spectrum-gray-700);--system-spectrum-slider-ramp-track-color:var(--spectrum-gray-400);--system-spectrum-slider-ramp-track-color-disabled:var(--spectrum-gray-200);--system-spectrum-slider-handle-background-color:transparent;--system-spectrum-slider-handle-background-color-disabled:transparent;--system-spectrum-slider-ramp-handle-background-color:var(--spectrum-gray-100);--system-spectrum-slider-ticks-handle-background-color:var(--spectrum-gray-100);--system-spectrum-slider-handle-border-color:var(--spectrum-gray-700);--system-spectrum-slider-handle-disabled-background-color:var(--spectrum-gray-100);--system-spectrum-slider-tick-mark-color:var(--spectrum-gray-300);--system-spectrum-slider-handle-border-color-hover:var(--spectrum-gray-800);--system-spectrum-slider-handle-border-color-down:var(--spectrum-gray-800);--system-spectrum-slider-handle-border-color-key-focus:var(--spectrum-gray-800);--system-spectrum-slider-handle-focus-ring-color-key-focus:var(--spectrum-focus-indicator-color);--system-spectrum-stepper-border-width:var(--spectrum-border-width-100);--system-spectrum-stepper-buttons-border-style:none;--system-spectrum-stepper-buttons-border-width:0;--system-spectrum-stepper-buttons-border-color:var(--spectrum-gray-500);--system-spectrum-stepper-buttons-background-color:var(--spectrum-gray-50);--system-spectrum-stepper-buttons-border-color-hover:var(--spectrum-gray-600);--system-spectrum-stepper-buttons-border-color-focus:var(--spectrum-gray-800);--system-spectrum-stepper-buttons-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-stepper-button-border-radius-reset:0px;--system-spectrum-stepper-button-border-width:var(--spectrum-border-width-100);--system-spectrum-stepper-border-color:var(--spectrum-gray-500);--system-spectrum-stepper-border-color-hover:var(--spectrum-gray-600);--system-spectrum-stepper-border-color-focus:var(--spectrum-gray-800);--system-spectrum-stepper-border-color-focus-hover:var(--spectrum-gray-800);--system-spectrum-stepper-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-stepper-border-color-invalid:var(--spectrum-negative-border-color-default);--system-spectrum-stepper-border-color-focus-invalid:var(--spectrum-negative-border-color-focus);--system-spectrum-stepper-border-color-focus-hover-invalid:var(--spectrum-negative-border-color-focus-hover);--system-spectrum-stepper-border-color-keyboard-focus-invalid:var(--spectrum-negative-border-color-key-focus);--system-spectrum-stepper-button-background-color-focus:var(--spectrum-gray-300);--system-spectrum-stepper-button-background-color-keyboard-focus:var(--spectrum-gray-200);--system-spectrum-switch-handle-border-color-default:var(--spectrum-gray-600);--system-spectrum-switch-handle-border-color-hover:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-down:var(--spectrum-gray-800);--system-spectrum-switch-handle-border-color-focus:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-selected-default:var(--spectrum-gray-700);--system-spectrum-switch-handle-border-color-selected-hover:var(--spectrum-gray-800);--system-spectrum-switch-handle-border-color-selected-down:var(--spectrum-gray-900);--system-spectrum-switch-handle-border-color-selected-focus:var(--spectrum-gray-800);--system-spectrum-tabs-font-weight:var(--spectrum-default-font-weight);--system-spectrum-tag-border-color:var(--spectrum-gray-700);--system-spectrum-tag-border-color-hover:var(--spectrum-gray-800);--system-spectrum-tag-border-color-active:var(--spectrum-gray-900);--system-spectrum-tag-border-color-focus:var(--spectrum-gray-800);--system-spectrum-tag-size-small-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-size-medium-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-size-large-corner-radius:var(--spectrum-corner-radius-100);--system-spectrum-tag-background-color:var(--spectrum-gray-75);--system-spectrum-tag-background-color-hover:var(--spectrum-gray-75);--system-spectrum-tag-background-color-active:var(--spectrum-gray-200);--system-spectrum-tag-background-color-focus:var(--spectrum-gray-75);--system-spectrum-tag-content-color:var(--spectrum-neutral-subdued-content-color-default);--system-spectrum-tag-content-color-hover:var(--spectrum-neutral-subdued-content-color-hover);--system-spectrum-tag-content-color-active:var(--spectrum-neutral-subdued-content-color-down);--system-spectrum-tag-content-color-focus:var(--spectrum-neutral-subdued-content-color-key-focus);--system-spectrum-tag-border-color-selected:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-tag-border-color-selected-hover:var(--spectrum-neutral-subdued-background-color-hover);--system-spectrum-tag-border-color-selected-active:var(--spectrum-neutral-subdued-background-color-down);--system-spectrum-tag-border-color-selected-focus:var(--spectrum-neutral-subdued-background-color-key-focus);--system-spectrum-tag-border-color-disabled:transparent;--system-spectrum-tag-background-color-disabled:var(--spectrum-disabled-background-color);--system-spectrum-tag-size-small-spacing-inline-start:var(--spectrum-component-edge-to-visual-75);--system-spectrum-tag-size-small-label-spacing-inline-end:var(--spectrum-component-edge-to-text-75);--system-spectrum-tag-size-small-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-75);--system-spectrum-tag-size-medium-spacing-inline-start:var(--spectrum-component-edge-to-visual-100);--system-spectrum-tag-size-medium-label-spacing-inline-end:var(--spectrum-component-edge-to-text-100);--system-spectrum-tag-size-medium-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-100);--system-spectrum-tag-size-large-spacing-inline-start:var(--spectrum-component-edge-to-visual-200);--system-spectrum-tag-size-large-label-spacing-inline-end:var(--spectrum-component-edge-to-text-200);--system-spectrum-tag-size-large-clear-button-spacing-inline-end:var(--spectrum-component-edge-to-visual-200);--system-spectrum-textfield-border-color:var(--spectrum-gray-500);--system-spectrum-textfield-border-color-hover:var(--spectrum-gray-600);--system-spectrum-textfield-border-color-focus:var(--spectrum-gray-800);--system-spectrum-textfield-border-color-focus-hover:var(--spectrum-gray-900);--system-spectrum-textfield-border-color-keyboard-focus:var(--spectrum-gray-900);--system-spectrum-textfield-border-width:var(--spectrum-border-width-100);--system-spectrum-toast-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--system-spectrum-tooltip-backgound-color-default-neutral:var(--spectrum-neutral-subdued-background-color-default);--system:spectrum;--spectrum-animation-linear:cubic-bezier(0,0,1,1);--spectrum-animation-duration-0:0s;--spectrum-animation-duration-100:.13s;--spectrum-animation-duration-200:.16s;--spectrum-animation-duration-300:.19s;--spectrum-animation-duration-400:.22s;--spectrum-animation-duration-500:.25s;--spectrum-animation-duration-600:.3s;--spectrum-animation-duration-700:.35s;--spectrum-animation-duration-800:.4s;--spectrum-animation-duration-900:.45s;--spectrum-animation-duration-1000:.5s;--spectrum-animation-duration-2000:1s;--spectrum-animation-duration-4000:2s;--spectrum-animation-duration-6000:3s;--spectrum-animation-ease-in-out:cubic-bezier(.45,0,.4,1);--spectrum-animation-ease-in:cubic-bezier(.5,0,1,1);--spectrum-animation-ease-out:cubic-bezier(0,0,.4,1);--spectrum-animation-ease-linear:cubic-bezier(0,0,1,1);--spectrum-sans-font-family-stack:adobe-clean,var(--spectrum-sans-serif-font-family),"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-sans-serif-font:var(--spectrum-sans-font-family-stack);--spectrum-serif-font-family-stack:adobe-clean-serif,var(--spectrum-serif-font-family),"Source Serif Pro",Georgia,serif;--spectrum-serif-font:var(--spectrum-serif-font-family-stack);--spectrum-code-font-family-stack:"Source Code Pro",Monaco,monospace;--spectrum-cjk-font-family-stack:adobe-clean-han-japanese,var(--spectrum-cjk-font-family),sans-serif;--spectrum-cjk-font:var(--spectrum-code-font-family-stack);--spectrum-docs-static-white-background-color-rgb:15,121,125;--spectrum-docs-static-white-background-color:rgba(var(--spectrum-docs-static-white-background-color-rgb));--spectrum-docs-static-black-background-color-rgb:206,247,243;--spectrum-docs-static-black-background-color:rgba(var(--spectrum-docs-static-black-background-color-rgb))}:root,:host{--spectrum-font-family-ar:myriad-arabic,adobe-clean,"Source Sans Pro",-apple-system,blinkmacsystemfont,"Segoe UI",roboto,ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-font-family-he:myriad-hebrew,adobe-clean,"Source Sans Pro",-apple-system,blinkmacsystemfont,"Segoe UI",roboto,ubuntu,"Trebuchet MS","Lucida Grande",sans-serif;--spectrum-font-family:var(--spectrum-sans-font-family-stack);--spectrum-font-style:var(--spectrum-default-font-style);--spectrum-font-size:var(--spectrum-font-size-100);font-family:var(--spectrum-font-family);font-style:var(--spectrum-font-style);font-size:var(--spectrum-font-size)}.spectrum:lang(ar){font-family:var(--spectrum-font-family-ar)}.spectrum:lang(he){font-family:var(--spectrum-font-family-he)}.spectrum-Heading{--spectrum-heading-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-heading-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-heading-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-heading-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-heading-font-color:var(--spectrum-heading-color);--spectrum-heading-margin-start:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-top-multiplier));--spectrum-heading-margin-end:calc(var(--mod-heading-font-size,var(--spectrum-heading-font-size))*var(--spectrum-heading-margin-bottom-multiplier))}.spectrum-Heading--sizeXXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xxs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxs)}.spectrum-Heading--sizeXS{--spectrum-heading-font-size:var(--spectrum-heading-size-xs);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xs)}.spectrum-Heading--sizeS{--spectrum-heading-font-size:var(--spectrum-heading-size-s);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-s)}.spectrum-Heading--sizeM{--spectrum-heading-font-size:var(--spectrum-heading-size-m);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-m)}.spectrum-Heading--sizeL{--spectrum-heading-font-size:var(--spectrum-heading-size-l);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-l)}.spectrum-Heading--sizeXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xl)}.spectrum-Heading--sizeXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxl)}.spectrum-Heading--sizeXXXL{--spectrum-heading-font-size:var(--spectrum-heading-size-xxxl);--spectrum-heading-cjk-font-size:var(--spectrum-heading-cjk-size-xxxl)}.spectrum-Heading{font-family:var(--mod-heading-sans-serif-font-family,var(--spectrum-heading-sans-serif-font-family));font-style:var(--mod-heading-sans-serif-font-style,var(--spectrum-heading-sans-serif-font-style));font-weight:var(--mod-heading-sans-serif-font-weight,var(--spectrum-heading-sans-serif-font-weight));font-size:var(--mod-heading-font-size,var(--spectrum-heading-font-size));color:var(--highcontrast-heading-font-color,var(--mod-heading-font-color,var(--spectrum-heading-font-color)));line-height:var(--mod-heading-line-height,var(--spectrum-heading-line-height));margin-block:0}.spectrum-Heading .spectrum-Heading-strong,.spectrum-Heading strong{font-style:var(--mod-heading-sans-serif-strong-font-style,var(--spectrum-heading-sans-serif-strong-font-style));font-weight:var(--mod-heading-sans-serif-strong-font-weight,var(--spectrum-heading-sans-serif-strong-font-weight))}.spectrum-Heading .spectrum-Heading-emphasized,.spectrum-Heading em{font-style:var(--mod-heading-sans-serif-emphasized-font-style,var(--spectrum-heading-sans-serif-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-emphasized-font-weight,var(--spectrum-heading-sans-serif-emphasized-font-weight))}.spectrum-Heading .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading em strong,.spectrum-Heading strong em{font-style:var(--mod-heading-sans-serif-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-strong-emphasized-font-weight))}.spectrum-Heading:lang(ja),.spectrum-Heading:lang(ko),.spectrum-Heading:lang(zh){font-family:var(--mod-heading-cjk-font-family,var(--spectrum-heading-cjk-font-family));font-style:var(--mod-heading-cjk-font-style,var(--spectrum-heading-cjk-font-style));font-weight:var(--mod-heading-cjk-font-weight,var(--spectrum-heading-cjk-font-weight));font-size:var(--mod-heading-cjk-font-size,var(--spectrum-heading-cjk-font-size));line-height:var(--mod-heading-cjk-line-height,var(--spectrum-heading-cjk-line-height));letter-spacing:var(--mod-heading-cjk-letter-spacing,var(--spectrum-heading-cjk-letter-spacing))}.spectrum-Heading:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em,.spectrum-Heading:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em,.spectrum-Heading:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em{font-style:var(--mod-heading-cjk-emphasized-font-style,var(--spectrum-heading-cjk-emphasized-font-style));font-weight:var(--mod-heading-cjk-emphasized-font-weight,var(--spectrum-heading-cjk-emphasized-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong,.spectrum-Heading:lang(ja) strong,.spectrum-Heading:lang(ko) .spectrum-Heading-strong,.spectrum-Heading:lang(ko) strong,.spectrum-Heading:lang(zh) .spectrum-Heading-strong,.spectrum-Heading:lang(zh) strong{font-style:var(--mod-heading-cjk-strong-font-style,var(--spectrum-heading-cjk-strong-font-style));font-weight:var(--mod-heading-cjk-strong-font-weight,var(--spectrum-heading-cjk-strong-font-weight))}.spectrum-Heading:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ja) em strong,.spectrum-Heading:lang(ja) strong em,.spectrum-Heading:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(ko) em strong,.spectrum-Heading:lang(ko) strong em,.spectrum-Heading:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading:lang(zh) em strong,.spectrum-Heading:lang(zh) strong em{font-style:var(--mod-heading-cjk-strong-emphasized-font-style,var(--spectrum-heading-cjk-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-strong-emphasized-font-weight,var(--spectrum-heading-cjk-strong-emphasized-font-weight))}.spectrum-Heading--heavy{font-style:var(--mod-heading-sans-serif-heavy-font-style,var(--spectrum-heading-sans-serif-heavy-font-style));font-weight:var(--mod-heading-sans-serif-heavy-font-weight,var(--spectrum-heading-sans-serif-heavy-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--heavy strong{font-style:var(--mod-heading-sans-serif-heavy-strong-font-style,var(--spectrum-heading-sans-serif-heavy-strong-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--heavy em{font-style:var(--mod-heading-sans-serif-heavy-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-emphasized-font-weight))}.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy em strong,.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja),.spectrum-Heading--heavy:lang(ko),.spectrum-Heading--heavy:lang(zh){font-style:var(--mod-heading-cjk-heavy-font-style,var(--spectrum-heading-cjk-heavy-font-style));font-weight:var(--mod-heading-cjk-heavy-font-weight,var(--spectrum-heading-cjk-heavy-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em{font-style:var(--mod-heading-cjk-heavy-emphasized-font-style,var(--spectrum-heading-cjk-heavy-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-emphasized-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ja) strong,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(ko) strong,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--heavy:lang(zh) strong{font-style:var(--mod-heading-cjk-heavy-strong-font-style,var(--spectrum-heading-cjk-heavy-strong-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-font-weight,var(--spectrum-heading-cjk-heavy-strong-font-weight))}.spectrum-Heading--heavy:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ja) em strong,.spectrum-Heading--heavy:lang(ja) strong em,.spectrum-Heading--heavy:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(ko) em strong,.spectrum-Heading--heavy:lang(ko) strong em,.spectrum-Heading--heavy:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--heavy:lang(zh) em strong,.spectrum-Heading--heavy:lang(zh) strong em{font-style:var(--mod-heading-cjk-heavy-strong-emphasized-font-style,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-heavy-strong-emphasized-font-weight,var(--spectrum-heading-cjk-heavy-strong-emphasized-font-weight))}.spectrum-Heading--light{font-style:var(--mod-heading-sans-serif-light-font-style,var(--spectrum-heading-sans-serif-light-font-style));font-weight:var(--mod-heading-sans-serif-light-font-weight,var(--spectrum-heading-sans-serif-light-font-weight))}.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--light em{font-style:var(--mod-heading-sans-serif-light-emphasized-font-style,var(--spectrum-heading-sans-serif-light-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-emphasized-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--light strong{font-style:var(--mod-heading-sans-serif-light-strong-font-style,var(--spectrum-heading-sans-serif-light-strong-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-font-weight,var(--spectrum-heading-sans-serif-light-strong-font-weight))}.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light em strong,.spectrum-Heading--light strong em{font-style:var(--mod-heading-sans-serif-light-strong-emphasized-font-style,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Heading--light:lang(ja),.spectrum-Heading--light:lang(ko),.spectrum-Heading--light:lang(zh){font-style:var(--mod-heading-cjk-light-font-style,var(--spectrum-heading-cjk-light-font-style));font-weight:var(--mod-heading-cjk-light-font-weight,var(--spectrum-heading-cjk-light-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ja) strong,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong,.spectrum-Heading--light:lang(ko) strong,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong,.spectrum-Heading--light:lang(zh) strong{font-style:var(--mod-heading-cjk-light-strong-font-style,var(--spectrum-heading-cjk-light-strong-font-style));font-weight:var(--mod-heading-cjk-light-strong-font-weight,var(--spectrum-heading-cjk-light-strong-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em{font-style:var(--mod-heading-cjk-light-emphasized-font-style,var(--spectrum-heading-cjk-light-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-emphasized-font-weight,var(--spectrum-heading-cjk-light-emphasized-font-weight))}.spectrum-Heading--light:lang(ja) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ja) em strong,.spectrum-Heading--light:lang(ja) strong em,.spectrum-Heading--light:lang(ko) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(ko) em strong,.spectrum-Heading--light:lang(ko) strong em,.spectrum-Heading--light:lang(zh) .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--light:lang(zh) em strong,.spectrum-Heading--light:lang(zh) strong em{font-style:var(--mod-heading-cjk-light-strong-emphasized-font-style,var(--spectrum-heading-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-heading-cjk-light-strong-emphasized-font-weight,var(--spectrum-heading-cjk-light-strong-emphasized-font-weight))}.spectrum-Heading--serif{font-family:var(--mod-heading-serif-font-family,var(--spectrum-heading-serif-font-family));font-style:var(--mod-heading-serif-font-style,var(--spectrum-heading-serif-font-style));font-weight:var(--mod-heading-serif-font-weight,var(--spectrum-heading-serif-font-weight))}.spectrum-Heading--serif .spectrum-Heading-emphasized,.spectrum-Heading--serif em{font-style:var(--mod-heading-serif-emphasized-font-style,var(--spectrum-heading-serif-emphasized-font-style));font-weight:var(--mod-heading-serif-emphasized-font-weight,var(--spectrum-heading-serif-emphasized-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong,.spectrum-Heading--serif strong{font-style:var(--mod-heading-serif-strong-font-style,var(--spectrum-heading-serif-strong-font-style));font-weight:var(--mod-heading-serif-strong-font-weight,var(--spectrum-heading-serif-strong-font-weight))}.spectrum-Heading--serif .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif em strong,.spectrum-Heading--serif strong em{font-style:var(--mod-heading-serif-strong-emphasized-font-style,var(--spectrum-heading-serif-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-strong-emphasized-font-weight,var(--spectrum-heading-serif-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy{font-style:var(--mod-heading-serif-heavy-font-style,var(--spectrum-heading-serif-heavy-font-style));font-weight:var(--mod-heading-serif-heavy-font-weight,var(--spectrum-heading-serif-heavy-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong{font-style:var(--mod-heading-serif-heavy-strong-font-style,var(--spectrum-heading-serif-heavy-strong-font-style));font-weight:var(--mod-heading-serif-heavy-strong-font-weight,var(--spectrum-heading-serif-heavy-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em{font-style:var(--mod-heading-serif-heavy-emphasized-font-style,var(--spectrum-heading-serif-heavy-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-emphasized-font-weight,var(--spectrum-heading-serif-heavy-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--heavy .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--heavy em strong,.spectrum-Heading--serif.spectrum-Heading--heavy strong em{font-style:var(--mod-heading-serif-heavy-strong-emphasized-font-style,var(--spectrum-heading-serif-heavy-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-heavy-strong-emphasized-font-weight,var(--spectrum-heading-serif-heavy-strong-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light{font-style:var(--mod-heading-serif-light-font-style,var(--spectrum-heading-serif-light-font-style));font-weight:var(--mod-heading-serif-light-font-weight,var(--spectrum-heading-serif-light-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em{font-style:var(--mod-heading-serif-light-emphasized-font-style,var(--spectrum-heading-serif-light-emphasized-font-style));font-weight:var(--mod-heading-serif-light-emphasized-font-weight,var(--spectrum-heading-serif-light-emphasized-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--serif.spectrum-Heading--light strong{font-style:var(--mod-heading-serif-light-strong-font-style,var(--spectrum-heading-serif-light-strong-font-style));font-weight:var(--mod-heading-serif-light-strong-font-weight,var(--spectrum-heading-serif-light-strong-font-weight))}.spectrum-Heading--serif.spectrum-Heading--light .spectrum-Heading-strong.spectrum-Heading-emphasized,.spectrum-Heading--serif.spectrum-Heading--light em strong,.spectrum-Heading--serif.spectrum-Heading--light strong em{font-style:var(--mod-heading-serif-light-strong-emphasized-font-style,var(--spectrum-heading-serif-light-strong-emphasized-font-style));font-weight:var(--mod-heading-serif-light-strong-emphasized-font-weight,var(--spectrum-heading-serif-light-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Heading{margin-block-start:var(--mod-heading-margin-start,var(--spectrum-heading-margin-start));margin-block-end:var(--mod-heading-margin-end,var(--spectrum-heading-margin-end))}.spectrum-Body{--spectrum-body-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-body-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-body-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-body-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-body-margin:calc(var(--mod-body-font-size,var(--spectrum-body-font-size))*var(--spectrum-body-margin-multiplier));--spectrum-body-font-color:var(--spectrum-body-color)}.spectrum-Body--sizeXS{--spectrum-body-font-size:var(--spectrum-body-size-xs)}.spectrum-Body--sizeS{--spectrum-body-font-size:var(--spectrum-body-size-s)}.spectrum-Body--sizeM{--spectrum-body-font-size:var(--spectrum-body-size-m)}.spectrum-Body--sizeL{--spectrum-body-font-size:var(--spectrum-body-size-l)}.spectrum-Body--sizeXL{--spectrum-body-font-size:var(--spectrum-body-size-xl)}.spectrum-Body--sizeXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxl)}.spectrum-Body--sizeXXXL{--spectrum-body-font-size:var(--spectrum-body-size-xxxl)}.spectrum-Body{font-family:var(--mod-body-sans-serif-font-family,var(--spectrum-body-sans-serif-font-family));font-style:var(--mod-body-sans-serif-font-style,var(--spectrum-body-sans-serif-font-style));font-weight:var(--mod-body-sans-serif-font-weight,var(--spectrum-body-sans-serif-font-weight));font-size:var(--mod-body-font-size,var(--spectrum-body-font-size));color:var(--highcontrast-body-font-color,var(--mod-body-font-color,var(--spectrum-body-font-color)));line-height:var(--mod-body-line-height,var(--spectrum-body-line-height));margin-block:0}.spectrum-Body .spectrum-Body-strong,.spectrum-Body strong{font-style:var(--mod-body-sans-serif-strong-font-style,var(--spectrum-body-sans-serif-strong-font-style));font-weight:var(--mod-body-sans-serif-strong-font-weight,var(--spectrum-body-sans-serif-strong-font-weight))}.spectrum-Body .spectrum-Body-emphasized,.spectrum-Body em{font-style:var(--mod-body-sans-serif-emphasized-font-style,var(--spectrum-body-sans-serif-emphasized-font-style));font-weight:var(--mod-body-sans-serif-emphasized-font-weight,var(--spectrum-body-sans-serif-emphasized-font-weight))}.spectrum-Body .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body em strong,.spectrum-Body strong em{font-style:var(--mod-body-sans-serif-strong-emphasized-font-style,var(--spectrum-body-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-body-sans-serif-strong-emphasized-font-weight,var(--spectrum-body-sans-serif-strong-emphasized-font-weight))}.spectrum-Body:lang(ja),.spectrum-Body:lang(ko),.spectrum-Body:lang(zh){font-family:var(--mod-body-cjk-font-family,var(--spectrum-body-cjk-font-family));font-style:var(--mod-body-cjk-font-style,var(--spectrum-body-cjk-font-style));font-weight:var(--mod-body-cjk-font-weight,var(--spectrum-body-cjk-font-weight));line-height:var(--mod-body-cjk-line-height,var(--spectrum-body-cjk-line-height));letter-spacing:var(--mod-body-cjk-letter-spacing,var(--spectrum-body-cjk-letter-spacing))}.spectrum-Body:lang(ja) .spectrum-Body-strong,.spectrum-Body:lang(ja) strong,.spectrum-Body:lang(ko) .spectrum-Body-strong,.spectrum-Body:lang(ko) strong,.spectrum-Body:lang(zh) .spectrum-Body-strong,.spectrum-Body:lang(zh) strong{font-style:var(--mod-body-cjk-strong-font-style,var(--spectrum-body-cjk-strong-font-style));font-weight:var(--mod-body-cjk-strong-font-weight,var(--spectrum-body-cjk-strong-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-emphasized,.spectrum-Body:lang(ja) em,.spectrum-Body:lang(ko) .spectrum-Body-emphasized,.spectrum-Body:lang(ko) em,.spectrum-Body:lang(zh) .spectrum-Body-emphasized,.spectrum-Body:lang(zh) em{font-style:var(--mod-body-cjk-emphasized-font-style,var(--spectrum-body-cjk-emphasized-font-style));font-weight:var(--mod-body-cjk-emphasized-font-weight,var(--spectrum-body-cjk-emphasized-font-weight))}.spectrum-Body:lang(ja) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ja) em strong,.spectrum-Body:lang(ja) strong em,.spectrum-Body:lang(ko) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(ko) em strong,.spectrum-Body:lang(ko) strong em,.spectrum-Body:lang(zh) .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body:lang(zh) em strong,.spectrum-Body:lang(zh) strong em{font-style:var(--mod-body-cjk-strong-emphasized-font-style,var(--spectrum-body-cjk-strong-emphasized-font-style));font-weight:var(--mod-body-cjk-strong-emphasized-font-weight,var(--spectrum-body-cjk-strong-emphasized-font-weight))}.spectrum-Body--serif{font-family:var(--mod-body-serif-font-family,var(--spectrum-body-serif-font-family));font-weight:var(--mod-body-serif-font-weight,var(--spectrum-body-serif-font-weight));font-style:var(--mod-body-serif-font-style,var(--spectrum-body-serif-font-style))}.spectrum-Body--serif .spectrum-Body-strong,.spectrum-Body--serif strong{font-style:var(--mod-body-serif-strong-font-style,var(--spectrum-body-serif-strong-font-style));font-weight:var(--mod-body-serif-strong-font-weight,var(--spectrum-body-serif-strong-font-weight))}.spectrum-Body--serif .spectrum-Body-emphasized,.spectrum-Body--serif em{font-style:var(--mod-body-serif-emphasized-font-style,var(--spectrum-body-serif-emphasized-font-style));font-weight:var(--mod-body-serif-emphasized-font-weight,var(--spectrum-body-serif-emphasized-font-weight))}.spectrum-Body--serif .spectrum-Body-strong.spectrum-Body-emphasized,.spectrum-Body--serif em strong,.spectrum-Body--serif strong em{font-style:var(--mod-body-serif-strong-emphasized-font-style,var(--spectrum-body-serif-strong-emphasized-font-style));font-weight:var(--mod-body-serif-strong-emphasized-font-weight,var(--spectrum-body-serif-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Body{margin-block-end:var(--mod-body-margin,var(--spectrum-body-margin))}.spectrum-Detail{--spectrum-detail-sans-serif-font-family:var(--spectrum-sans-font-family-stack);--spectrum-detail-serif-font-family:var(--spectrum-serif-font-family-stack);--spectrum-detail-cjk-font-family:var(--spectrum-cjk-font-family-stack);--spectrum-detail-margin-start:calc(var(--mod-detail-font-size,var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-top-multiplier));--spectrum-detail-margin-end:calc(var(--mod-detail-font-size,var(--spectrum-detail-font-size))*var(--spectrum-detail-margin-bottom-multiplier));--spectrum-detail-font-color:var(--spectrum-detail-color)}.spectrum-Detail--sizeS{--spectrum-detail-font-size:var(--spectrum-detail-size-s)}.spectrum-Detail--sizeM{--spectrum-detail-font-size:var(--spectrum-detail-size-m)}.spectrum-Detail--sizeL{--spectrum-detail-font-size:var(--spectrum-detail-size-l)}.spectrum-Detail--sizeXL{--spectrum-detail-font-size:var(--spectrum-detail-size-xl)}.spectrum-Detail{font-family:var(--mod-detail-sans-serif-font-family,var(--spectrum-detail-sans-serif-font-family));font-style:var(--mod-detail-sans-serif-font-style,var(--spectrum-detail-sans-serif-font-style));font-weight:var(--mod-detail-sans-serif-font-weight,var(--spectrum-detail-sans-serif-font-weight));font-size:var(--mod-detail-font-size,var(--spectrum-detail-font-size));color:var(--highcontrast-detail-font-color,var(--mod-detail-font-color,var(--spectrum-detail-font-color)));line-height:var(--mod-detail-line-height,var(--spectrum-detail-line-height));letter-spacing:var(--mod-detail-letter-spacing,var(--spectrum-detail-letter-spacing));text-transform:uppercase;margin-block:0}.spectrum-Detail .spectrum-Detail-strong,.spectrum-Detail strong{font-style:var(--mod-detail-sans-serif-strong-font-style,var(--spectrum-detail-sans-serif-strong-font-style));font-weight:var(--mod-detail-sans-serif-strong-font-weight,var(--spectrum-detail-sans-serif-strong-font-weight))}.spectrum-Detail .spectrum-Detail-emphasized,.spectrum-Detail em{font-style:var(--mod-detail-sans-serif-emphasized-font-style,var(--spectrum-detail-sans-serif-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-emphasized-font-weight,var(--spectrum-detail-sans-serif-emphasized-font-weight))}.spectrum-Detail .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail em strong,.spectrum-Detail strong em{font-style:var(--mod-detail-sans-serif-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-strong-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-strong-emphasized-font-weight))}.spectrum-Detail:lang(ja),.spectrum-Detail:lang(ko),.spectrum-Detail:lang(zh){font-family:var(--mod-detail-cjk-font-family,var(--spectrum-detail-cjk-font-family));font-style:var(--mod-detail-cjk-font-style,var(--spectrum-detail-cjk-font-style));font-weight:var(--mod-detail-cjk-font-weight,var(--spectrum-detail-cjk-font-weight));line-height:var(--mod-detail-cjk-line-height,var(--spectrum-detail-cjk-line-height))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong,.spectrum-Detail:lang(ja) strong,.spectrum-Detail:lang(ko) .spectrum-Detail-strong,.spectrum-Detail:lang(ko) strong,.spectrum-Detail:lang(zh) .spectrum-Detail-strong,.spectrum-Detail:lang(zh) strong{font-style:var(--mod-detail-cjk-strong-font-style,var(--spectrum-detail-cjk-strong-font-style));font-weight:var(--mod-detail-cjk-strong-font-weight,var(--spectrum-detail-cjk-strong-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em,.spectrum-Detail:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em,.spectrum-Detail:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em{font-style:var(--mod-detail-cjk-emphasized-font-style,var(--spectrum-detail-cjk-emphasized-font-style));font-weight:var(--mod-detail-cjk-emphasized-font-weight,var(--spectrum-detail-cjk-emphasized-font-weight))}.spectrum-Detail:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ja) em strong,.spectrum-Detail:lang(ja) strong em,.spectrum-Detail:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(ko) em strong,.spectrum-Detail:lang(ko) strong em,.spectrum-Detail:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail:lang(zh) em strong,.spectrum-Detail:lang(zh) strong em{font-style:var(--mod-detail-cjk-strong-emphasized-font-style,var(--spectrum-detail-cjk-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-strong-emphasized-font-weight,var(--spectrum-detail-cjk-strong-emphasized-font-weight))}.spectrum-Detail--serif{font-family:var(--mod-detail-serif-font-family,var(--spectrum-detail-serif-font-family));font-style:var(--mod-detail-serif-font-style,var(--spectrum-detail-serif-font-style));font-weight:var(--mod-detail-serif-font-weight,var(--spectrum-detail-serif-font-weight))}.spectrum-Detail--serif .spectrum-Detail-strong,.spectrum-Detail--serif strong{font-style:var(--mod-detail-serif-strong-font-style,var(--spectrum-detail-serif-strong-font-style));font-weight:var(--mod-detail-serif-strong-font-weight,var(--spectrum-detail-serif-strong-font-weight))}.spectrum-Detail--serif .spectrum-Detail-emphasized,.spectrum-Detail--serif em{font-style:var(--mod-detail-serif-emphasized-font-style,var(--spectrum-detail-serif-emphasized-font-style));font-weight:var(--mod-detail-serif-emphasized-font-weight,var(--spectrum-detail-serif-emphasized-font-weight))}.spectrum-Detail--serif .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--serif em strong,.spectrum-Detail--serif strong em{font-style:var(--mod-detail-serif-strong-emphasized-font-style,var(--spectrum-detail-serif-strong-emphasized-font-style));font-weight:var(--mod-detail-serif-strong-emphasized-font-weight,var(--spectrum-detail-serif-strong-emphasized-font-weight))}.spectrum-Detail--light{font-style:var(--mod-detail-sans-serif-light-font-style,var(--spectrum-detail-sans-serif-light-font-style));font-weight:var(--spectrum-detail-sans-serif-light-font-weight,var(--spectrum-detail-sans-serif-light-font-weight))}.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--light strong{font-style:var(--mod-detail-sans-serif-light-strong-font-style,var(--spectrum-detail-sans-serif-light-strong-font-style));font-weight:var(--mod-detail-sans-serif-light-strong-font-weight,var(--spectrum-detail-sans-serif-light-strong-font-weight))}.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--light em{font-style:var(--mod-detail-sans-serif-light-emphasized-font-style,var(--spectrum-detail-sans-serif-light-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-light-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-emphasized-font-weight))}.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--light em strong,.spectrum-Detail--light strong em{font-style:var(--mod-detail-sans-serif-light-strong-emphasized-font-style,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-sans-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-sans-serif-light-strong-emphasized-font-weight))}.spectrum-Detail--light:lang(ja),.spectrum-Detail--light:lang(ko),.spectrum-Detail--light:lang(zh){font-style:var(--mod-detail-cjk-light-font-style,var(--spectrum-detail-cjk-light-font-style));font-weight:var(--mod-detail-cjk-light-font-weight,var(--spectrum-detail-cjk-light-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ja) strong,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong,.spectrum-Detail--light:lang(ko) strong,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong,.spectrum-Detail--light:lang(zh) strong{font-style:var(--mod-detail-cjk-light-strong-font-style,var(--spectrum-detail-cjk-light-strong-font-style));font-weight:var(--mod-detail-cjk-light-strong-font-weight,var(--spectrum-detail-cjk-light-strong-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ja) em,.spectrum-Detail--light:lang(ko) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) em,.spectrum-Detail--light:lang(zh) .spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) em{font-style:var(--mod-detail-cjk-light-emphasized-font-style,var(--spectrum-detail-cjk-light-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-emphasized-font-weight,var(--spectrum-detail-cjk-light-emphasized-font-weight))}.spectrum-Detail--light:lang(ja) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(ko) .spectrum-Detail-strong.spectrum-Detail-emphasized,.spectrum-Detail--light:lang(zh) .spectrum-Detail-strong.spectrum-Detail-emphasized{font-style:var(--mod-detail-cjk-light-strong-emphasized-font-style,var(--spectrum-detail-cjk-light-strong-emphasized-font-style));font-weight:var(--mod-detail-cjk-light-strong-emphasized-font-weight,var(--spectrum-detail-cjk-light-strong-emphasized-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light{font-style:var(--mod-detail-serif-light-font-style,var(--spectrum-detail-serif-light-font-style));font-weight:var(--mod-detail-serif-light-font-weight,var(--spectrum-detail-serif-light-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong,.spectrum-Detail--serif.spectrum-Detail--light strong{font-style:var(--mod-detail-serif-light-strong-font-style,var(--spectrum-detail-serif-light-strong-font-style));font-weight:var(--mod-detail-serif-light-strong-font-weight,var(--spectrum-detail-serif-light-strong-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em{font-style:var(--mod-detail-serif-light-emphasized-font-style,var(--spectrum-detail-serif-light-emphasized-font-style));font-weight:var(--mod-detail-serif-light-emphasized-font-weight,var(--spectrum-detail-serif-light-emphasized-font-weight))}.spectrum-Detail--serif.spectrum-Detail--light .spectrum-Detail-strong.spectrum-Body-emphasized,.spectrum-Detail--serif.spectrum-Detail--light em strong,.spectrum-Detail--serif.spectrum-Detail--light strong em{font-style:var(--mod-detail-serif-light-strong-emphasized-font-style,var(--spectrum-detail-serif-light-strong-emphasized-font-style));font-weight:var(--mod-detail-serif-light-strong-emphasized-font-weight,var(--spectrum-detail-serif-light-strong-emphasized-font-weight))}.spectrum-Typography .spectrum-Detail{margin-block-start:var(--mod-detail-margin-start,var(--spectrum-detail-margin-start));margin-block-end:var(--mod-detail-margin-end,var(--spectrum-detail-margin-end))}.spectrum-Code{--spectrum-code-font-family:var(--spectrum-code-font-family-stack);--spectrum-code-cjk-letter-spacing:var(--spectrum-cjk-letter-spacing);--spectrum-code-font-color:var(--spectrum-code-color)}.spectrum-Code--sizeXS{--spectrum-code-font-size:var(--spectrum-code-size-xs)}.spectrum-Code--sizeS{--spectrum-code-font-size:var(--spectrum-code-size-s)}.spectrum-Code--sizeM{--spectrum-code-font-size:var(--spectrum-code-size-m)}.spectrum-Code--sizeL{--spectrum-code-font-size:var(--spectrum-code-size-l)}.spectrum-Code--sizeXL{--spectrum-code-font-size:var(--spectrum-code-size-xl)}.spectrum-Code{font-family:var(--mod-code-font-family,var(--spectrum-code-font-family));font-style:var(--mod-code-font-style,var(--spectrum-code-font-style));font-weight:var(--mod-code-font-weight,var(--spectrum-code-font-weight));font-size:var(--mod-code-font-size,var(--spectrum-code-font-size));line-height:var(--mod-code-line-height,var(--spectrum-code-line-height));color:var(--highcontrast-code-font-color,var(--mod-code-font-color,var(--spectrum-code-font-color)));margin-block:0}.spectrum-Code .spectrum-Code-strong,.spectrum-Code strong{font-style:var(--mod-code-strong-font-style,var(--spectrum-code-strong-font-style));font-weight:var(--mod-code-strong-font-weight,var(--spectrum-code-strong-font-weight))}.spectrum-Code .spectrum-Code-emphasized,.spectrum-Code em{font-style:var(--mod-code-emphasized-font-style,var(--spectrum-code-emphasized-font-style));font-weight:var(--mod-code-emphasized-font-weight,var(--spectrum-code-emphasized-font-weight))}.spectrum-Code .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code em strong,.spectrum-Code strong em{font-style:var(--mod-code-strong-emphasized-font-style,var(--spectrum-code-strong-emphasized-font-style));font-weight:var(--mod-code-strong-emphasized-font-weight,var(--spectrum-code-strong-emphasized-font-weight))}.spectrum-Code:lang(ja),.spectrum-Code:lang(ko),.spectrum-Code:lang(zh){font-family:var(--mod-code-cjk-font-family,var(--spectrum-code-cjk-font-family));font-style:var(--mod-code-cjk-font-style,var(--spectrum-code-cjk-font-style));font-weight:var(--mod-code-cjk-font-weight,var(--spectrum-code-cjk-font-weight));line-height:var(--mod-code-cjk-line-height,var(--spectrum-code-cjk-line-height));letter-spacing:var(--mod-code-cjk-letter-spacing,var(--spectrum-code-cjk-letter-spacing))}.spectrum-Code:lang(ja) .spectrum-Code-strong,.spectrum-Code:lang(ja) strong,.spectrum-Code:lang(ko) .spectrum-Code-strong,.spectrum-Code:lang(ko) strong,.spectrum-Code:lang(zh) .spectrum-Code-strong,.spectrum-Code:lang(zh) strong{font-style:var(--mod-code-cjk-strong-font-style,var(--spectrum-code-cjk-strong-font-style));font-weight:var(--mod-code-cjk-strong-font-weight,var(--spectrum-code-cjk-strong-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-emphasized,.spectrum-Code:lang(ja) em,.spectrum-Code:lang(ko) .spectrum-Code-emphasized,.spectrum-Code:lang(ko) em,.spectrum-Code:lang(zh) .spectrum-Code-emphasized,.spectrum-Code:lang(zh) em{font-style:var(--mod-code-cjk-emphasized-font-style,var(--spectrum-code-cjk-emphasized-font-style));font-weight:var(--mod-code-cjk-emphasized-font-weight,var(--spectrum-code-cjk-emphasized-font-weight))}.spectrum-Code:lang(ja) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ja) em strong,.spectrum-Code:lang(ja) strong em,.spectrum-Code:lang(ko) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(ko) em strong,.spectrum-Code:lang(ko) strong em,.spectrum-Code:lang(zh) .spectrum-Code-strong.spectrum-Code-emphasized,.spectrum-Code:lang(zh) em strong,.spectrum-Code:lang(zh) strong em{font-style:var(--mod-code-cjk-strong-emphasized-font-style,var(--spectrum-code-cjk-strong-emphasized-font-style));font-weight:var(--mod-code-cjk-strong-emphasized-font-weight,var(--spectrum-code-cjk-strong-emphasized-font-weight))}:host{display:block}#scale,#theme{width:100%;height:100%}
        `;
var theme_css_default = e2;

// ../node_modules/@spectrum-web-components/theme/core.js
Theme.registerThemeFragment("spectrum", "system", theme_css_default);

// ../node_modules/@spectrum-web-components/theme/theme-light.js
Theme.registerThemeFragment("light", "color", theme_light_css_default);

// ../node_modules/@spectrum-web-components/theme/src/scale-large.css.js
init_src();
var e3 = src_exports.css`
    :root,:host{--spectrum-global-dimension-scale-factor:1.25;--spectrum-global-dimension-size-0:0px;--spectrum-global-dimension-size-10:1px;--spectrum-global-dimension-size-25:2px;--spectrum-global-dimension-size-30:3px;--spectrum-global-dimension-size-40:4px;--spectrum-global-dimension-size-50:5px;--spectrum-global-dimension-size-65:6px;--spectrum-global-dimension-size-75:8px;--spectrum-global-dimension-size-85:9px;--spectrum-global-dimension-size-100:10px;--spectrum-global-dimension-size-115:11px;--spectrum-global-dimension-size-125:13px;--spectrum-global-dimension-size-130:14px;--spectrum-global-dimension-size-150:15px;--spectrum-global-dimension-size-160:16px;--spectrum-global-dimension-size-175:18px;--spectrum-global-dimension-size-185:19px;--spectrum-global-dimension-size-200:20px;--spectrum-global-dimension-size-225:22px;--spectrum-global-dimension-size-250:25px;--spectrum-global-dimension-size-275:28px;--spectrum-global-dimension-size-300:30px;--spectrum-global-dimension-size-325:32px;--spectrum-global-dimension-size-350:35px;--spectrum-global-dimension-size-400:40px;--spectrum-global-dimension-size-450:45px;--spectrum-global-dimension-size-500:50px;--spectrum-global-dimension-size-550:56px;--spectrum-global-dimension-size-600:60px;--spectrum-global-dimension-size-650:65px;--spectrum-global-dimension-size-675:68px;--spectrum-global-dimension-size-700:70px;--spectrum-global-dimension-size-750:75px;--spectrum-global-dimension-size-800:80px;--spectrum-global-dimension-size-900:90px;--spectrum-global-dimension-size-1000:100px;--spectrum-global-dimension-size-1125:112px;--spectrum-global-dimension-size-1200:120px;--spectrum-global-dimension-size-1250:125px;--spectrum-global-dimension-size-1600:160px;--spectrum-global-dimension-size-1700:170px;--spectrum-global-dimension-size-1800:180px;--spectrum-global-dimension-size-2000:200px;--spectrum-global-dimension-size-2400:240px;--spectrum-global-dimension-size-2500:250px;--spectrum-global-dimension-size-3000:300px;--spectrum-global-dimension-size-3400:340px;--spectrum-global-dimension-size-3600:360px;--spectrum-global-dimension-size-4600:460px;--spectrum-global-dimension-size-5000:500px;--spectrum-global-dimension-size-6000:600px;--spectrum-global-dimension-font-size-25:12px;--spectrum-global-dimension-font-size-50:13px;--spectrum-global-dimension-font-size-75:15px;--spectrum-global-dimension-font-size-100:17px;--spectrum-global-dimension-font-size-150:18px;--spectrum-global-dimension-font-size-200:19px;--spectrum-global-dimension-font-size-300:22px;--spectrum-global-dimension-font-size-400:24px;--spectrum-global-dimension-font-size-500:27px;--spectrum-global-dimension-font-size-600:31px;--spectrum-global-dimension-font-size-700:34px;--spectrum-global-dimension-font-size-800:39px;--spectrum-global-dimension-font-size-900:44px;--spectrum-global-dimension-font-size-1000:49px;--spectrum-global-dimension-font-size-1100:55px;--spectrum-global-dimension-font-size-1200:62px;--spectrum-global-dimension-font-size-1300:70px;--spectrum-alias-item-text-padding-top-l:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-item-text-padding-bottom-s:var(--spectrum-global-dimension-static-size-85);--spectrum-alias-item-workflow-padding-left-m:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-item-rounded-workflow-padding-left-m:17px;--spectrum-alias-item-rounded-workflow-padding-left-xl:27px;--spectrum-alias-item-mark-padding-top-m:var(--spectrum-global-dimension-static-size-85);--spectrum-alias-item-mark-padding-bottom-m:var(--spectrum-global-dimension-static-size-85);--spectrum-alias-item-mark-padding-left-m:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-item-control-1-size-l:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-item-control-1-size-xl:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-item-control-2-size-s:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-control-3-height-s:var(--spectrum-global-dimension-size-160);--spectrum-alias-item-control-3-width-s:var(--spectrum-global-dimension-size-325);--spectrum-alias-item-control-3-width-m:var(--spectrum-global-dimension-static-size-450);--spectrum-alias-item-control-3-width-l:41px;--spectrum-alias-item-control-3-width-xl:46px;--spectrum-alias-item-mark-size-m:var(--spectrum-global-dimension-static-size-325);--spectrum-alias-component-focusring-border-radius:var(--spectrum-global-dimension-static-size-75);--spectrum-alias-control-two-size-s:var(--spectrum-global-dimension-size-160);--spectrum-alias-control-three-height-s:var(--spectrum-global-dimension-size-160);--spectrum-alias-control-three-width-s:var(--spectrum-global-dimension-size-325);--spectrum-alias-control-three-width-m:var(--spectrum-global-dimension-static-size-450);--spectrum-alias-control-three-width-l:41px;--spectrum-alias-control-three-width-xl:46px;--spectrum-alias-focus-ring-border-radius-regular:var(--spectrum-global-dimension-static-size-115);--spectrum-alias-focus-ring-radius-default:var(--spectrum-global-dimension-static-size-115);--spectrum-alias-workflow-icon-size-l:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-ui-icon-chevron-size-75:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-chevron-size-100:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-chevron-size-200:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-chevron-size-300:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-chevron-size-400:var(--spectrum-global-dimension-static-size-225);--spectrum-alias-ui-icon-chevron-size-500:var(--spectrum-global-dimension-static-size-250);--spectrum-alias-ui-icon-checkmark-size-50:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-checkmark-size-75:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-checkmark-size-100:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-checkmark-size-200:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-checkmark-size-300:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-checkmark-size-400:var(--spectrum-global-dimension-static-size-225);--spectrum-alias-ui-icon-checkmark-size-500:var(--spectrum-global-dimension-static-size-250);--spectrum-alias-ui-icon-checkmark-size-600:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-ui-icon-dash-size-50:var(--spectrum-global-dimension-static-size-125);--spectrum-alias-ui-icon-dash-size-75:var(--spectrum-global-dimension-static-size-125);--spectrum-alias-ui-icon-dash-size-100:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-dash-size-200:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-dash-size-300:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-dash-size-400:var(--spectrum-global-dimension-static-size-225);--spectrum-alias-ui-icon-dash-size-500:var(--spectrum-global-dimension-static-size-250);--spectrum-alias-ui-icon-dash-size-600:var(--spectrum-global-dimension-static-size-275);--spectrum-alias-ui-icon-cross-size-75:var(--spectrum-global-dimension-static-size-125);--spectrum-alias-ui-icon-cross-size-100:var(--spectrum-global-dimension-static-size-125);--spectrum-alias-ui-icon-cross-size-200:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-cross-size-300:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-cross-size-400:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-cross-size-500:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-cross-size-600:var(--spectrum-global-dimension-static-size-225);--spectrum-alias-ui-icon-arrow-size-75:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-arrow-size-100:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-arrow-size-200:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-arrow-size-300:var(--spectrum-global-dimension-static-size-200);--spectrum-alias-ui-icon-arrow-size-400:var(--spectrum-global-dimension-static-size-225);--spectrum-alias-ui-icon-arrow-size-500:var(--spectrum-global-dimension-static-size-275);--spectrum-alias-ui-icon-arrow-size-600:var(--spectrum-global-dimension-static-size-300);--spectrum-alias-ui-icon-triplegripper-size-100-width:var(--spectrum-global-dimension-static-size-175);--spectrum-alias-ui-icon-doublegripper-size-100-height:var(--spectrum-global-dimension-static-size-75);--spectrum-alias-ui-icon-singlegripper-size-100-height:var(--spectrum-global-dimension-static-size-50);--spectrum-alias-ui-icon-cornertriangle-size-100:var(--spectrum-global-dimension-static-size-85);--spectrum-alias-ui-icon-cornertriangle-size-300:var(--spectrum-global-dimension-static-size-100);--spectrum-alias-ui-icon-asterisk-size-200:var(--spectrum-global-dimension-static-size-150);--spectrum-alias-ui-icon-asterisk-size-300:var(--spectrum-global-dimension-static-size-150);--spectrum-dialog-confirm-title-text-size:var(--spectrum-alias-heading-xs-text-size);--spectrum-dialog-confirm-description-text-size:var(--spectrum-global-dimension-font-size-75)}:host,:root{--spectrum-global-alias-appframe-border-size:1px;--swc-scale-factor:1.25;--spectrum-workflow-icon-size-50:18px;--spectrum-workflow-icon-size-75:20px;--spectrum-workflow-icon-size-100:22px;--spectrum-workflow-icon-size-200:24px;--spectrum-workflow-icon-size-300:28px;--spectrum-arrow-icon-size-75:12px;--spectrum-arrow-icon-size-100:14px;--spectrum-arrow-icon-size-200:16px;--spectrum-arrow-icon-size-300:16px;--spectrum-arrow-icon-size-400:18px;--spectrum-arrow-icon-size-500:22px;--spectrum-arrow-icon-size-600:24px;--spectrum-asterisk-icon-size-100:10px;--spectrum-asterisk-icon-size-200:12px;--spectrum-asterisk-icon-size-300:12px;--spectrum-checkmark-icon-size-50:12px;--spectrum-checkmark-icon-size-75:12px;--spectrum-checkmark-icon-size-100:14px;--spectrum-checkmark-icon-size-200:14px;--spectrum-checkmark-icon-size-300:16px;--spectrum-checkmark-icon-size-400:18px;--spectrum-checkmark-icon-size-500:20px;--spectrum-checkmark-icon-size-600:24px;--spectrum-chevron-icon-size-50:8px;--spectrum-chevron-icon-size-75:12px;--spectrum-chevron-icon-size-100:14px;--spectrum-chevron-icon-size-200:14px;--spectrum-chevron-icon-size-300:16px;--spectrum-chevron-icon-size-400:18px;--spectrum-chevron-icon-size-500:20px;--spectrum-chevron-icon-size-600:24px;--spectrum-corner-triangle-icon-size-75:6px;--spectrum-corner-triangle-icon-size-100:7px;--spectrum-corner-triangle-icon-size-200:8px;--spectrum-corner-triangle-icon-size-300:8px;--spectrum-cross-icon-size-75:10px;--spectrum-cross-icon-size-100:10px;--spectrum-cross-icon-size-200:12px;--spectrum-cross-icon-size-300:14px;--spectrum-cross-icon-size-400:16px;--spectrum-cross-icon-size-500:16px;--spectrum-cross-icon-size-600:18px;--spectrum-dash-icon-size-50:10px;--spectrum-dash-icon-size-75:10px;--spectrum-dash-icon-size-100:12px;--spectrum-dash-icon-size-200:14px;--spectrum-dash-icon-size-300:16px;--spectrum-dash-icon-size-400:18px;--spectrum-dash-icon-size-500:20px;--spectrum-dash-icon-size-600:22px;--spectrum-field-label-text-to-asterisk-small:5px;--spectrum-field-label-text-to-asterisk-medium:5px;--spectrum-field-label-text-to-asterisk-large:6px;--spectrum-field-label-text-to-asterisk-extra-large:6px;--spectrum-field-label-top-to-asterisk-small:11px;--spectrum-field-label-top-to-asterisk-medium:15px;--spectrum-field-label-top-to-asterisk-large:19px;--spectrum-field-label-top-to-asterisk-extra-large:24px;--spectrum-field-label-top-margin-medium:5px;--spectrum-field-label-top-margin-large:6px;--spectrum-field-label-top-margin-extra-large:6px;--spectrum-field-label-to-component-quiet-small:-10px;--spectrum-field-label-to-component-quiet-medium:-10px;--spectrum-field-label-to-component-quiet-large:-15px;--spectrum-field-label-to-component-quiet-extra-large:-19px;--spectrum-help-text-top-to-workflow-icon-small:5px;--spectrum-help-text-top-to-workflow-icon-medium:4px;--spectrum-help-text-top-to-workflow-icon-large:8px;--spectrum-help-text-top-to-workflow-icon-extra-large:11px;--spectrum-status-light-dot-size-medium:10px;--spectrum-status-light-dot-size-large:12px;--spectrum-status-light-dot-size-extra-large:12px;--spectrum-status-light-top-to-dot-small:11px;--spectrum-status-light-top-to-dot-medium:15px;--spectrum-status-light-top-to-dot-large:19px;--spectrum-status-light-top-to-dot-extra-large:24px;--spectrum-action-button-edge-to-hold-icon-medium:5px;--spectrum-action-button-edge-to-hold-icon-large:6px;--spectrum-action-button-edge-to-hold-icon-extra-large:7px;--spectrum-tooltip-tip-width:10px;--spectrum-tooltip-tip-height:5px;--spectrum-tooltip-maximum-width:200px;--spectrum-progress-circle-size-small:20px;--spectrum-progress-circle-size-medium:40px;--spectrum-progress-circle-size-large:80px;--spectrum-progress-circle-thickness-small:3px;--spectrum-progress-circle-thickness-medium:4px;--spectrum-progress-circle-thickness-large:5px;--spectrum-toast-height:56px;--spectrum-toast-maximum-width:420px;--spectrum-toast-top-to-workflow-icon:17px;--spectrum-toast-top-to-text:16px;--spectrum-toast-bottom-to-text:19px;--spectrum-action-bar-height:56px;--spectrum-action-bar-top-to-item-counter:16px;--spectrum-swatch-size-extra-small:20px;--spectrum-swatch-size-small:30px;--spectrum-swatch-size-medium:40px;--spectrum-swatch-size-large:50px;--spectrum-progress-bar-thickness-small:5px;--spectrum-progress-bar-thickness-medium:8px;--spectrum-progress-bar-thickness-large:10px;--spectrum-progress-bar-thickness-extra-large:13px;--spectrum-meter-width:240px;--spectrum-meter-thickness-small:5px;--spectrum-meter-thickness-large:8px;--spectrum-tag-top-to-avatar-small:5px;--spectrum-tag-top-to-avatar-medium:7px;--spectrum-tag-top-to-avatar-large:11px;--spectrum-tag-top-to-cross-icon-small:10px;--spectrum-tag-top-to-cross-icon-medium:15px;--spectrum-tag-top-to-cross-icon-large:19px;--spectrum-popover-top-to-content-area:5px;--spectrum-menu-item-edge-to-content-not-selected-small:24px;--spectrum-menu-item-edge-to-content-not-selected-medium:42px;--spectrum-menu-item-edge-to-content-not-selected-large:47px;--spectrum-menu-item-edge-to-content-not-selected-extra-large:54px;--spectrum-menu-item-top-to-disclosure-icon-small:9px;--spectrum-menu-item-top-to-disclosure-icon-medium:13px;--spectrum-menu-item-top-to-disclosure-icon-large:17px;--spectrum-menu-item-top-to-disclosure-icon-extra-large:22px;--spectrum-menu-item-top-to-selected-icon-small:9px;--spectrum-menu-item-top-to-selected-icon-medium:13px;--spectrum-menu-item-top-to-selected-icon-large:17px;--spectrum-menu-item-top-to-selected-icon-extra-large:22px;--spectrum-slider-control-to-field-label-small:6px;--spectrum-slider-control-to-field-label-medium:10px;--spectrum-slider-control-to-field-label-large:14px;--spectrum-slider-control-to-field-label-extra-large:17px;--spectrum-picker-visual-to-disclosure-icon-small:9px;--spectrum-picker-visual-to-disclosure-icon-medium:10px;--spectrum-picker-visual-to-disclosure-icon-large:11px;--spectrum-picker-visual-to-disclosure-icon-extra-large:13px;--spectrum-text-area-minimum-width:140px;--spectrum-text-area-minimum-height:70px;--spectrum-combo-box-visual-to-field-button-small:9px;--spectrum-combo-box-visual-to-field-button-medium:10px;--spectrum-combo-box-visual-to-field-button-large:11px;--spectrum-combo-box-visual-to-field-button-extra-large:13px;--spectrum-thumbnail-size-50:20px;--spectrum-thumbnail-size-75:22px;--spectrum-thumbnail-size-100:26px;--spectrum-thumbnail-size-200:28px;--spectrum-thumbnail-size-300:32px;--spectrum-thumbnail-size-400:36px;--spectrum-thumbnail-size-500:40px;--spectrum-thumbnail-size-600:46px;--spectrum-thumbnail-size-700:50px;--spectrum-thumbnail-size-800:55px;--spectrum-thumbnail-size-900:62px;--spectrum-thumbnail-size-1000:70px;--spectrum-alert-dialog-title-size:var(--spectrum-heading-size-xs);--spectrum-alert-dialog-description-size:var(--spectrum-body-size-xs);--spectrum-opacity-checkerboard-square-size:10px;--spectrum-contextual-help-title-size:var(--spectrum-heading-size-xxs);--spectrum-contextual-help-body-size:var(--spectrum-body-size-xs);--spectrum-breadcrumbs-height-multiline:84px;--spectrum-breadcrumbs-top-to-text:17px;--spectrum-breadcrumbs-top-to-text-compact:16px;--spectrum-breadcrumbs-top-to-text-multiline:15px;--spectrum-breadcrumbs-bottom-to-text:19px;--spectrum-breadcrumbs-bottom-to-text-compact:19px;--spectrum-breadcrumbs-bottom-to-text-multiline:10px;--spectrum-breadcrumbs-start-edge-to-text:9px;--spectrum-breadcrumbs-top-text-to-bottom-text:11px;--spectrum-breadcrumbs-top-to-separator-icon:25px;--spectrum-breadcrumbs-top-to-separator-icon-compact:23px;--spectrum-breadcrumbs-top-to-separator-icon-multiline:20px;--spectrum-breadcrumbs-separator-icon-to-bottom-text-multiline:15px;--spectrum-breadcrumbs-top-to-truncated-menu:10px;--spectrum-breadcrumbs-top-to-truncated-menu-compact:5px;--spectrum-avatar-size-50:20px;--spectrum-avatar-size-75:22px;--spectrum-avatar-size-100:26px;--spectrum-avatar-size-200:28px;--spectrum-avatar-size-300:32px;--spectrum-avatar-size-400:36px;--spectrum-avatar-size-500:40px;--spectrum-avatar-size-600:46px;--spectrum-avatar-size-700:50px;--spectrum-alert-banner-minimum-height:64px;--spectrum-alert-banner-width:680px;--spectrum-alert-banner-top-to-workflow-icon:21px;--spectrum-alert-banner-top-to-text:21px;--spectrum-alert-banner-bottom-to-text:22px;--spectrum-rating-indicator-width:22px;--spectrum-rating-indicator-to-icon:5px;--spectrum-color-area-width:240px;--spectrum-color-area-minimum-width:80px;--spectrum-color-area-height:240px;--spectrum-color-area-minimum-height:80px;--spectrum-color-wheel-width:240px;--spectrum-color-wheel-minimum-width:219px;--spectrum-color-slider-length:240px;--spectrum-color-slider-minimum-length:100px;--spectrum-illustrated-message-title-size:var(--spectrum-heading-size-s);--spectrum-illustrated-message-cjk-title-size:var(--spectrum-heading-cjk-size-s);--spectrum-illustrated-message-body-size:var(--spectrum-body-size-xs);--spectrum-coach-mark-width:216px;--spectrum-coach-mark-minimum-width:216px;--spectrum-coach-mark-maximum-width:248px;--spectrum-coach-mark-edge-to-content:var(--spectrum-spacing-300);--spectrum-coach-mark-pagination-text-to-bottom-edge:22px;--spectrum-coach-mark-media-height:162px;--spectrum-coach-mark-media-minimum-height:121px;--spectrum-coach-mark-title-size:var(--spectrum-heading-size-xxs);--spectrum-coach-mark-body-size:var(--spectrum-body-size-xs);--spectrum-coach-mark-pagination-body-size:var(--spectrum-body-size-xs);--spectrum-accordion-top-to-text-regular-small:7px;--spectrum-accordion-small-top-to-text-spacious:12px;--spectrum-accordion-top-to-text-regular-medium:9px;--spectrum-accordion-top-to-text-spacious-medium:14px;--spectrum-accordion-top-to-text-compact-large:7px;--spectrum-accordion-top-to-text-regular-large:12px;--spectrum-accordion-top-to-text-spacious-large:14px;--spectrum-accordion-top-to-text-compact-extra-large:7px;--spectrum-accordion-top-to-text-regular-extra-large:12px;--spectrum-accordion-top-to-text-spacious-extra-large:14px;--spectrum-accordion-bottom-to-text-compact-small:4px;--spectrum-accordion-bottom-to-text-regular-small:9px;--spectrum-accordion-bottom-to-text-spacious-small:14px;--spectrum-accordion-bottom-to-text-compact-medium:8px;--spectrum-accordion-bottom-to-text-regular-medium:13px;--spectrum-accordion-bottom-to-text-spacious-medium:18px;--spectrum-accordion-bottom-to-text-compact-large:9px;--spectrum-accordion-bottom-to-text-regular-large:14px;--spectrum-accordion-bottom-to-text-spacious-large:19px;--spectrum-accordion-bottom-to-text-compact-extra-large:10px;--spectrum-accordion-bottom-to-text-regular-extra-large:15px;--spectrum-accordion-bottom-to-text-spacious-extra-large:21px;--spectrum-accordion-minimum-width:250px;--spectrum-accordion-content-area-top-to-content:10px;--spectrum-accordion-content-area-bottom-to-content:20px;--spectrum-color-handle-size:20px;--spectrum-color-handle-size-key-focus:40px;--spectrum-table-column-header-row-top-to-text-small:10px;--spectrum-table-column-header-row-top-to-text-medium:9px;--spectrum-table-column-header-row-top-to-text-large:13px;--spectrum-table-column-header-row-top-to-text-extra-large:16px;--spectrum-table-column-header-row-bottom-to-text-small:11px;--spectrum-table-column-header-row-bottom-to-text-medium:10px;--spectrum-table-column-header-row-bottom-to-text-large:13px;--spectrum-table-column-header-row-bottom-to-text-extra-large:17px;--spectrum-table-row-height-small-regular:40px;--spectrum-table-row-height-medium-regular:50px;--spectrum-table-row-height-large-regular:60px;--spectrum-table-row-height-extra-large-regular:70px;--spectrum-table-row-height-small-spacious:50px;--spectrum-table-row-height-medium-spacious:60px;--spectrum-table-row-height-large-spacious:70px;--spectrum-table-row-height-extra-large-spacious:80px;--spectrum-table-row-top-to-text-small-regular:10px;--spectrum-table-row-top-to-text-medium-regular:14px;--spectrum-table-row-top-to-text-large-regular:18px;--spectrum-table-row-top-to-text-extra-large-regular:21px;--spectrum-table-row-bottom-to-text-small-regular:11px;--spectrum-table-row-bottom-to-text-medium-regular:15px;--spectrum-table-row-bottom-to-text-large-regular:18px;--spectrum-table-row-bottom-to-text-extra-large-regular:22px;--spectrum-table-row-top-to-text-small-spacious:15px;--spectrum-table-row-top-to-text-medium-spacious:18px;--spectrum-table-row-top-to-text-large-spacious:23px;--spectrum-table-row-top-to-text-extra-large-spacious:26px;--spectrum-table-row-bottom-to-text-small-spacious:16px;--spectrum-table-row-bottom-to-text-medium-spacious:18px;--spectrum-table-row-bottom-to-text-large-spacious:23px;--spectrum-table-row-bottom-to-text-extra-large-spacious:27px;--spectrum-table-checkbox-to-text:30px;--spectrum-table-header-row-checkbox-to-top-small:14px;--spectrum-table-header-row-checkbox-to-top-medium:13px;--spectrum-table-header-row-checkbox-to-top-large:17px;--spectrum-table-header-row-checkbox-to-top-extra-large:21px;--spectrum-table-row-checkbox-to-top-small-compact:9px;--spectrum-table-row-checkbox-to-top-small-regular:14px;--spectrum-table-row-checkbox-to-top-small-spacious:19px;--spectrum-table-row-checkbox-to-top-medium-compact:13px;--spectrum-table-row-checkbox-to-top-medium-regular:18px;--spectrum-table-row-checkbox-to-top-medium-spacious:23px;--spectrum-table-row-checkbox-to-top-large-compact:17px;--spectrum-table-row-checkbox-to-top-large-regular:22px;--spectrum-table-row-checkbox-to-top-large-spacious:27px;--spectrum-table-row-checkbox-to-top-extra-large-compact:21px;--spectrum-table-row-checkbox-to-top-extra-large-regular:26px;--spectrum-table-row-checkbox-to-top-extra-large-spacious:31px;--spectrum-table-section-header-row-height-small:30px;--spectrum-table-section-header-row-height-medium:40px;--spectrum-table-section-header-row-height-large:50px;--spectrum-table-section-header-row-height-extra-large:60px;--spectrum-table-thumbnail-to-top-minimum-small-compact:5px;--spectrum-table-thumbnail-to-top-minimum-medium-compact:6px;--spectrum-table-thumbnail-to-top-minimum-large-compact:9px;--spectrum-table-thumbnail-to-top-minimum-extra-large-compact:10px;--spectrum-table-thumbnail-to-top-minimum-small-regular:6px;--spectrum-table-thumbnail-to-top-minimum-medium-regular:9px;--spectrum-table-thumbnail-to-top-minimum-large-regular:10px;--spectrum-table-thumbnail-to-top-minimum-extra-large-regular:10px;--spectrum-table-thumbnail-to-top-minimum-small-spacious:9px;--spectrum-table-thumbnail-to-top-minimum-medium-spacious:10px;--spectrum-table-thumbnail-to-top-minimum-large-spacious:10px;--spectrum-table-thumbnail-to-top-minimum-extra-large-spacious:12px;--spectrum-tab-item-to-tab-item-horizontal-small:27px;--spectrum-tab-item-to-tab-item-horizontal-medium:30px;--spectrum-tab-item-to-tab-item-horizontal-large:33px;--spectrum-tab-item-to-tab-item-horizontal-extra-large:36px;--spectrum-tab-item-to-tab-item-vertical-small:5px;--spectrum-tab-item-to-tab-item-vertical-medium:5px;--spectrum-tab-item-to-tab-item-vertical-large:6px;--spectrum-tab-item-to-tab-item-vertical-extra-large:6px;--spectrum-tab-item-start-to-edge-small:13px;--spectrum-tab-item-start-to-edge-medium:15px;--spectrum-tab-item-start-to-edge-large:17px;--spectrum-tab-item-start-to-edge-extra-large:19px;--spectrum-tab-item-top-to-text-small:14px;--spectrum-tab-item-bottom-to-text-small:15px;--spectrum-tab-item-top-to-text-medium:18px;--spectrum-tab-item-bottom-to-text-medium:19px;--spectrum-tab-item-top-to-text-large:22px;--spectrum-tab-item-bottom-to-text-large:22px;--spectrum-tab-item-top-to-text-extra-large:25px;--spectrum-tab-item-bottom-to-text-extra-large:25px;--spectrum-tab-item-top-to-text-compact-small:5px;--spectrum-tab-item-bottom-to-text-compact-small:6px;--spectrum-tab-item-top-to-text-compact-medium:9px;--spectrum-tab-item-bottom-to-text-compact-medium:10px;--spectrum-tab-item-top-to-text-compact-large:12px;--spectrum-tab-item-bottom-to-text-compact-large:14px;--spectrum-tab-item-top-to-text-compact-extra-large:15px;--spectrum-tab-item-bottom-to-text-compact-extra-large:17px;--spectrum-tab-item-top-to-workflow-icon-small:15px;--spectrum-tab-item-top-to-workflow-icon-medium:19px;--spectrum-tab-item-top-to-workflow-icon-large:23px;--spectrum-tab-item-top-to-workflow-icon-extra-large:26px;--spectrum-tab-item-top-to-workflow-icon-compact-small:5px;--spectrum-tab-item-top-to-workflow-icon-compact-medium:9px;--spectrum-tab-item-top-to-workflow-icon-compact-large:13px;--spectrum-tab-item-top-to-workflow-icon-compact-extra-large:16px;--spectrum-tab-item-focus-indicator-gap-small:9px;--spectrum-tab-item-focus-indicator-gap-medium:10px;--spectrum-tab-item-focus-indicator-gap-large:11px;--spectrum-tab-item-focus-indicator-gap-extra-large:12px;--spectrum-side-navigation-width:240px;--spectrum-side-navigation-minimum-width:200px;--spectrum-side-navigation-maximum-width:300px;--spectrum-side-navigation-second-level-edge-to-text:30px;--spectrum-side-navigation-third-level-edge-to-text:45px;--spectrum-side-navigation-with-icon-second-level-edge-to-text:62px;--spectrum-side-navigation-with-icon-third-level-edge-to-text:77px;--spectrum-side-navigation-item-to-item:5px;--spectrum-side-navigation-item-to-header:30px;--spectrum-side-navigation-header-to-item:10px;--spectrum-side-navigation-bottom-to-text:10px;--spectrum-tray-top-to-content-area:5px;--spectrum-text-to-visual-50:8px;--spectrum-text-to-visual-75:9px;--spectrum-text-to-visual-100:10px;--spectrum-text-to-visual-200:11px;--spectrum-text-to-visual-300:13px;--spectrum-text-to-control-75:11px;--spectrum-text-to-control-100:13px;--spectrum-text-to-control-200:14px;--spectrum-text-to-control-300:16px;--spectrum-component-height-50:26px;--spectrum-component-height-75:30px;--spectrum-component-height-100:40px;--spectrum-component-height-200:50px;--spectrum-component-height-300:60px;--spectrum-component-height-400:70px;--spectrum-component-height-500:80px;--spectrum-component-pill-edge-to-visual-75:13px;--spectrum-component-pill-edge-to-visual-100:17px;--spectrum-component-pill-edge-to-visual-200:22px;--spectrum-component-pill-edge-to-visual-300:27px;--spectrum-component-pill-edge-to-visual-only-75:5px;--spectrum-component-pill-edge-to-visual-only-100:9px;--spectrum-component-pill-edge-to-visual-only-200:13px;--spectrum-component-pill-edge-to-visual-only-300:16px;--spectrum-component-pill-edge-to-text-75:15px;--spectrum-component-pill-edge-to-text-100:20px;--spectrum-component-pill-edge-to-text-200:25px;--spectrum-component-pill-edge-to-text-300:30px;--spectrum-component-edge-to-visual-50:7px;--spectrum-component-edge-to-visual-75:9px;--spectrum-component-edge-to-visual-100:12px;--spectrum-component-edge-to-visual-200:16px;--spectrum-component-edge-to-visual-300:19px;--spectrum-component-edge-to-visual-only-50:4px;--spectrum-component-edge-to-visual-only-75:5px;--spectrum-component-edge-to-visual-only-100:9px;--spectrum-component-edge-to-visual-only-200:13px;--spectrum-component-edge-to-visual-only-300:16px;--spectrum-component-edge-to-text-50:10px;--spectrum-component-edge-to-text-75:11px;--spectrum-component-edge-to-text-100:15px;--spectrum-component-edge-to-text-200:19px;--spectrum-component-edge-to-text-300:22px;--spectrum-component-top-to-workflow-icon-50:4px;--spectrum-component-top-to-workflow-icon-75:5px;--spectrum-component-top-to-workflow-icon-100:9px;--spectrum-component-top-to-workflow-icon-200:13px;--spectrum-component-top-to-workflow-icon-300:16px;--spectrum-component-top-to-text-50:4px;--spectrum-component-top-to-text-75:5px;--spectrum-component-top-to-text-100:8px;--spectrum-component-top-to-text-200:12px;--spectrum-component-top-to-text-300:15px;--spectrum-component-bottom-to-text-50:6px;--spectrum-component-bottom-to-text-75:6px;--spectrum-component-bottom-to-text-100:11px;--spectrum-component-bottom-to-text-200:14px;--spectrum-component-bottom-to-text-300:18px;--spectrum-component-to-menu-small:7px;--spectrum-component-to-menu-medium:8px;--spectrum-component-to-menu-large:9px;--spectrum-component-to-menu-extra-large:10px;--spectrum-field-edge-to-disclosure-icon-75:9px;--spectrum-field-edge-to-disclosure-icon-100:13px;--spectrum-field-edge-to-disclosure-icon-200:17px;--spectrum-field-edge-to-disclosure-icon-300:22px;--spectrum-field-end-edge-to-disclosure-icon-75:9px;--spectrum-field-end-edge-to-disclosure-icon-100:13px;--spectrum-field-end-edge-to-disclosure-icon-200:17px;--spectrum-field-end-edge-to-disclosure-icon-300:22px;--spectrum-field-top-to-disclosure-icon-75:9px;--spectrum-field-top-to-disclosure-icon-100:13px;--spectrum-field-top-to-disclosure-icon-200:17px;--spectrum-field-top-to-disclosure-icon-300:22px;--spectrum-field-top-to-alert-icon-small:5px;--spectrum-field-top-to-alert-icon-medium:9px;--spectrum-field-top-to-alert-icon-large:13px;--spectrum-field-top-to-alert-icon-extra-large:16px;--spectrum-field-top-to-validation-icon-small:9px;--spectrum-field-top-to-validation-icon-medium:13px;--spectrum-field-top-to-validation-icon-large:17px;--spectrum-field-top-to-validation-icon-extra-large:22px;--spectrum-field-top-to-progress-circle-small:7px;--spectrum-field-top-to-progress-circle-medium:12px;--spectrum-field-top-to-progress-circle-large:17px;--spectrum-field-top-to-progress-circle-extra-large:22px;--spectrum-field-edge-to-alert-icon-small:11px;--spectrum-field-edge-to-alert-icon-medium:15px;--spectrum-field-edge-to-alert-icon-large:19px;--spectrum-field-edge-to-alert-icon-extra-large:22px;--spectrum-field-edge-to-validation-icon-small:11px;--spectrum-field-edge-to-validation-icon-medium:15px;--spectrum-field-edge-to-validation-icon-large:19px;--spectrum-field-edge-to-validation-icon-extra-large:22px;--spectrum-field-text-to-alert-icon-small:10px;--spectrum-field-text-to-alert-icon-medium:15px;--spectrum-field-text-to-alert-icon-large:19px;--spectrum-field-text-to-alert-icon-extra-large:22px;--spectrum-field-text-to-validation-icon-small:10px;--spectrum-field-text-to-validation-icon-medium:15px;--spectrum-field-text-to-validation-icon-large:19px;--spectrum-field-text-to-validation-icon-extra-large:22px;--spectrum-field-width:240px;--spectrum-character-count-to-field-quiet-small:-4px;--spectrum-character-count-to-field-quiet-medium:-4px;--spectrum-character-count-to-field-quiet-large:-4px;--spectrum-character-count-to-field-quiet-extra-large:-5px;--spectrum-side-label-character-count-to-field:15px;--spectrum-side-label-character-count-top-margin-small:5px;--spectrum-side-label-character-count-top-margin-medium:10px;--spectrum-side-label-character-count-top-margin-large:14px;--spectrum-side-label-character-count-top-margin-extra-large:18px;--spectrum-disclosure-indicator-top-to-disclosure-icon-small:9px;--spectrum-disclosure-indicator-top-to-disclosure-icon-medium:13px;--spectrum-disclosure-indicator-top-to-disclosure-icon-large:17px;--spectrum-disclosure-indicator-top-to-disclosure-icon-extra-large:22px;--spectrum-navigational-indicator-top-to-back-icon-small:7px;--spectrum-navigational-indicator-top-to-back-icon-medium:12px;--spectrum-navigational-indicator-top-to-back-icon-large:16px;--spectrum-navigational-indicator-top-to-back-icon-extra-large:19px;--spectrum-color-control-track-width:30px;--spectrum-font-size-50:13px;--spectrum-font-size-75:15px;--spectrum-font-size-100:17px;--spectrum-font-size-200:19px;--spectrum-font-size-300:22px;--spectrum-font-size-400:24px;--spectrum-font-size-500:27px;--spectrum-font-size-600:31px;--spectrum-font-size-700:34px;--spectrum-font-size-800:39px;--spectrum-font-size-900:44px;--spectrum-font-size-1000:49px;--spectrum-font-size-1100:55px;--spectrum-font-size-1200:62px;--spectrum-font-size-1300:70px;--spectrum-slider-tick-mark-height:13px;--spectrum-slider-ramp-track-height:20px;--spectrum-colorwheel-path:"M 119 119 m -119 0 a 119 119 0 1 0 238 0 a 119 119 0 1 0 -238 0.2 M 119 119 m -91 0 a 91 91 0 1 0 182 0 a 91 91 0 1 0 -182 0";--spectrum-colorwheel-path-borders:"M 120 120 m -120 0 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0.2 M 120 120 m -90 0 a 90 90 0 1 0 180 0 a 90 90 0 1 0 -180 0";--spectrum-colorwheel-colorarea-container-size:182px;--spectrum-colorloupe-checkerboard-fill:url(#checkerboard-secondary);--spectrum-menu-item-selectable-edge-to-text-not-selected-small:34px;--spectrum-menu-item-selectable-edge-to-text-not-selected-medium:42px;--spectrum-menu-item-selectable-edge-to-text-not-selected-large:47px;--spectrum-menu-item-selectable-edge-to-text-not-selected-extra-large:54px;--spectrum-menu-item-checkmark-height-small:12px;--spectrum-menu-item-checkmark-height-medium:14px;--spectrum-menu-item-checkmark-height-large:16px;--spectrum-menu-item-checkmark-height-extra-large:16px;--spectrum-menu-item-checkmark-width-small:12px;--spectrum-menu-item-checkmark-width-medium:14px;--spectrum-menu-item-checkmark-width-large:16px;--spectrum-menu-item-checkmark-width-extra-large:16px;--spectrum-rating-icon-spacing:var(--spectrum-spacing-100);--spectrum-button-top-to-text-small:6px;--spectrum-button-bottom-to-text-small:5px;--spectrum-button-top-to-text-medium:9px;--spectrum-button-bottom-to-text-medium:10px;--spectrum-button-top-to-text-large:12px;--spectrum-button-bottom-to-text-large:13px;--spectrum-button-top-to-text-extra-large:16px;--spectrum-button-bottom-to-text-extra-large:17px;--spectrum-alert-banner-close-button-spacing:var(--spectrum-spacing-200);--spectrum-alert-banner-edge-to-divider:var(--spectrum-spacing-200);--spectrum-alert-banner-edge-to-button:var(--spectrum-spacing-200);--spectrum-alert-banner-text-to-button-vertical:var(--spectrum-spacing-200);--spectrum-alert-dialog-padding:var(--spectrum-spacing-400);--spectrum-alert-dialog-description-to-buttons:var(--spectrum-spacing-600);--spectrum-coach-indicator-gap:8px;--spectrum-coach-indicator-ring-diameter:20px;--spectrum-coach-indicator-quiet-ring-diameter:10px;--spectrum-coachmark-buttongroup-display:none;--spectrum-coachmark-buttongroup-mobile-display:flex;--spectrum-coachmark-menu-display:none;--spectrum-coachmark-menu-mobile-display:inline-flex;--spectrum-well-padding:20px;--spectrum-well-margin-top:5px;--spectrum-well-min-width:300px;--spectrum-well-border-radius:5px;--spectrum-workflow-icon-size-xxl:40px;--spectrum-workflow-icon-size-xxs:15px;--spectrum-treeview-item-indentation-medium:20px;--spectrum-treeview-item-indentation-small:15px;--spectrum-treeview-item-indentation-large:25px;--spectrum-treeview-item-indentation-extra-large:30px;--spectrum-treeview-indicator-inset-block-start:6px;--spectrum-treeview-item-min-block-size-thumbnail-offset-medium:2px;--spectrum-dialog-confirm-entry-animation-distance:25px;--spectrum-dialog-confirm-hero-height:160px;--spectrum-dialog-confirm-border-radius:5px;--spectrum-dialog-confirm-title-text-size:19px;--spectrum-dialog-confirm-description-text-size:15px;--spectrum-dialog-confirm-padding-grid:24px;--spectrum-datepicker-initial-width:160px;--spectrum-datepicker-generic-padding:15px;--spectrum-datepicker-dash-line-height:30px;--spectrum-datepicker-width-quiet-first:90px;--spectrum-datepicker-width-quiet-second:20px;--spectrum-datepicker-datetime-width-first:45px;--spectrum-datepicker-invalid-icon-to-button:10px;--spectrum-datepicker-invalid-icon-to-button-quiet:9px;--spectrum-datepicker-input-datetime-width:30px;--spectrum-pagination-textfield-width:60px;--spectrum-pagination-item-inline-spacing:6px;--spectrum-dial-border-radius:20px;--spectrum-dial-handle-position:10px;--spectrum-dial-handle-block-margin:20px;--spectrum-dial-handle-inline-margin:20px;--spectrum-dial-controls-margin:10px;--spectrum-dial-label-gap-y:6px;--spectrum-dial-label-container-top-to-text:5px;--spectrum-assetcard-focus-ring-border-radius:9px;--spectrum-assetcard-selectionindicator-margin:15px;--spectrum-assetcard-title-font-size:var(--spectrum-heading-size-xxs);--spectrum-assetcard-header-content-font-size:var(--spectrum-heading-size-xxs);--spectrum-assetcard-content-font-size:var(--spectrum-body-size-xs);--spectrum-tooltip-animation-distance:5px;--spectrum-ui-icon-medium-display:none;--spectrum-ui-icon-large-display:block;--spectrum-checkbox-control-size-small:16px;--spectrum-checkbox-control-size-medium:18px;--spectrum-checkbox-control-size-large:20px;--spectrum-checkbox-control-size-extra-large:22px;--spectrum-checkbox-top-to-control-small:7px;--spectrum-checkbox-top-to-control-medium:11px;--spectrum-checkbox-top-to-control-large:15px;--spectrum-checkbox-top-to-control-extra-large:19px;--spectrum-switch-control-width-small:32px;--spectrum-switch-control-width-medium:36px;--spectrum-switch-control-width-large:41px;--spectrum-switch-control-width-extra-large:46px;--spectrum-switch-control-height-small:16px;--spectrum-switch-control-height-medium:18px;--spectrum-switch-control-height-large:20px;--spectrum-switch-control-height-extra-large:22px;--spectrum-switch-top-to-control-small:7px;--spectrum-switch-top-to-control-medium:11px;--spectrum-switch-top-to-control-large:15px;--spectrum-switch-top-to-control-extra-large:19px;--spectrum-radio-button-control-size-small:16px;--spectrum-radio-button-control-size-medium:18px;--spectrum-radio-button-control-size-large:20px;--spectrum-radio-button-control-size-extra-large:22px;--spectrum-radio-button-top-to-control-small:7px;--spectrum-radio-button-top-to-control-medium:11px;--spectrum-radio-button-top-to-control-large:15px;--spectrum-radio-button-top-to-control-extra-large:19px;--spectrum-slider-control-height-small:18px;--spectrum-slider-control-height-medium:20px;--spectrum-slider-control-height-large:22px;--spectrum-slider-control-height-extra-large:26px;--spectrum-slider-handle-size-small:18px;--spectrum-slider-handle-size-medium:20px;--spectrum-slider-handle-size-large:22px;--spectrum-slider-handle-size-extra-large:26px;--spectrum-slider-handle-border-width-down-small:7px;--spectrum-slider-handle-border-width-down-medium:8px;--spectrum-slider-handle-border-width-down-large:9px;--spectrum-slider-handle-border-width-down-extra-large:11px;--spectrum-slider-bottom-to-handle-small:6px;--spectrum-slider-bottom-to-handle-medium:10px;--spectrum-slider-bottom-to-handle-large:14px;--spectrum-slider-bottom-to-handle-extra-large:17px;--spectrum-corner-radius-100:5px;--spectrum-corner-radius-200:10px;--spectrum-drop-shadow-y:2px;--spectrum-drop-shadow-blur:6px}:root,:host{--spectrum-global-alias-appframe-border-size:1px;--swc-scale-factor:1.25}
`;
var scale_large_css_default = e3;

// ../node_modules/@spectrum-web-components/theme/scale-large.js
Theme.registerThemeFragment("large", "scale", scale_large_css_default);

// ../node_modules/@spectrum-web-components/theme/sp-theme.js
customElements.define("sp-theme", Theme);

// ../node_modules/@spectrum-web-components/dialog/src/DialogWrapper.js
init_src();
init_decorators();
init_directives();

// ../node_modules/@spectrum-web-components/underlay/src/Underlay.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/underlay/src/underlay.css.js
init_src();
var n = src_exports.css`
    :host{pointer-events:none;visibility:hidden;opacity:0;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]){pointer-events:auto;visibility:visible;opacity:1;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-underlay-background-entry-animation-delay:var(--spectrum-animation-duration-0);--spectrum-underlay-background-exit-animation-ease:var(--spectrum-animation-ease-in);--spectrum-underlay-background-entry-animation-ease:var(--spectrum-animation-ease-out);--spectrum-underlay-background-exit-animation-duration:var(--spectrum-animation-duration-300);--spectrum-underlay-background-entry-animation-duration:var(--spectrum-animation-duration-600);--spectrum-underlay-background-exit-animation-delay:var(--spectrum-animation-duration-200);--spectrum-underlay-background-color:rgba(var(--spectrum-black-rgb),var(--spectrum-overlay-opacity));background-color:var(--mod-underlay-background-color,var(--spectrum-underlay-background-color));z-index:1;transition:opacity var(--mod-underlay-background-exit-animation-duration,var(--spectrum-underlay-background-exit-animation-duration))var(--mod-underlay-background-exit-animation-ease,var(--spectrum-underlay-background-exit-animation-ease))var(--mod-underlay-background-exit-animation-delay,var(--spectrum-underlay-background-exit-animation-delay)),visibility 0s linear calc(var(--mod-underlay-background-exit-animation-delay,var(--spectrum-underlay-background-exit-animation-delay)) + var(--mod-underlay-background-exit-animation-duration,var(--spectrum-underlay-background-exit-animation-duration)));position:fixed;inset-block:0;inset-inline:0;overflow:hidden}:host([open]){transition:opacity var(--mod-underlay-background-entry-animation-duration,var(--spectrum-underlay-background-entry-animation-duration))var(--mod-underlay-background-entry-animation-ease,var(--spectrum-underlay-background-entry-animation-ease))var(--mod-underlay-background-entry-animation-delay,var(--spectrum-underlay-background-entry-animation-delay))}
`;
var underlay_css_default = n;

// ../node_modules/@spectrum-web-components/underlay/src/Underlay.js
var d2 = Object.defineProperty;
var p3 = Object.getOwnPropertyDescriptor;
var s = (i12, t13, o13, r9) => {
  for (var e16 = r9 > 1 ? void 0 : r9 ? p3(t13, o13) : t13, n6 = i12.length - 1, l7; n6 >= 0; n6--)
    (l7 = i12[n6]) && (e16 = (r9 ? l7(t13, o13, e16) : l7(e16)) || e16);
  return r9 && e16 && d2(t13, o13, e16), e16;
};
var Underlay = class extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.canClick = false;
    this.open = false;
  }
  static get styles() {
    return [underlay_css_default];
  }
  click() {
    this.dispatchEvent(new Event("close"));
  }
  handlePointerdown() {
    this.canClick = true;
  }
  handlePointerup() {
    this.canClick && this.click(), this.canClick = false;
  }
  render() {
    return src_exports.html``;
  }
  firstUpdated() {
    this.addEventListener("pointerdown", this.handlePointerdown), this.addEventListener("pointerup", this.handlePointerup);
  }
};
s([(0, decorators_exports.property)({ type: Boolean, reflect: true })], Underlay.prototype, "open", 2);

// ../node_modules/@spectrum-web-components/underlay/sp-underlay.js
init_define_element();
defineElement("sp-underlay", Underlay);

// ../node_modules/@spectrum-web-components/button/src/Button.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/button/src/ButtonBase.js
init_src();
init_decorators();
init_like_anchor();
init_focusable();
init_observe_slot_text();

// ../node_modules/@spectrum-web-components/button/src/button-base.css.js
init_src();
var e4 = src_exports.css`
    :host{vertical-align:top;--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-100);--spectrum-icon-size:var(--spectrum-workflow-icon-size-100);display:inline-flex}:host([dir]){-webkit-appearance:none}:host([disabled]){pointer-events:none;cursor:auto}#button{position:absolute;inset:0}::slotted(sp-overlay),::slotted(sp-tooltip){position:absolute}:host:after,::slotted(*){pointer-events:none}slot[name=icon]::slotted(svg),slot[name=icon]::slotted(img){fill:currentColor;stroke:currentColor;block-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-100));inline-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-100))}[icon-only]+#label{display:contents}:host([size=xs]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-50);--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-75);--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-200);--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-300);--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-progress-circle-size:var(--spectrum-workflow-icon-size-400);--spectrum-icon-size:var(--spectrum-workflow-icon-size-400)}
`;
var button_base_css_default = e4;

// ../node_modules/@spectrum-web-components/button/src/ButtonBase.js
var d4 = Object.defineProperty;
var c5 = Object.getOwnPropertyDescriptor;
var s3 = (n6, i12, e16, t13) => {
  for (var r9 = t13 > 1 ? void 0 : t13 ? c5(i12, e16) : i12, a10 = n6.length - 1, l7; a10 >= 0; a10--)
    (l7 = n6[a10]) && (r9 = (t13 ? l7(i12, e16, r9) : l7(r9)) || r9);
  return t13 && r9 && d4(i12, e16, r9), r9;
};
var ButtonBase = class extends ObserveSlotText(LikeAnchor(Focusable), "", ["sp-overlay,sp-tooltip"]) {
  constructor() {
    super();
    this.active = false;
    this.type = "button";
    this.proxyFocus = this.proxyFocus.bind(this), this.addEventListener("click", this.handleClickCapture, { capture: true });
  }
  static get styles() {
    return [button_base_css_default];
  }
  get focusElement() {
    return this;
  }
  get hasLabel() {
    return this.slotHasContent;
  }
  get buttonContent() {
    return [src_exports.html`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `, src_exports.html`
                <span id="label">
                    <slot @slotchange=${this.manageTextObservedSlot}></slot>
                </span>
            `];
  }
  click() {
    this.disabled || this.shouldProxyClick() || super.click();
  }
  handleClickCapture(e16) {
    if (this.disabled)
      return e16.preventDefault(), e16.stopImmediatePropagation(), e16.stopPropagation(), false;
  }
  proxyFocus() {
    this.focus();
  }
  shouldProxyClick() {
    let e16 = false;
    if (this.anchorElement)
      this.anchorElement.click(), e16 = true;
    else if (this.type !== "button") {
      const t13 = document.createElement("button");
      t13.type = this.type, this.insertAdjacentElement("afterend", t13), t13.click(), t13.remove(), e16 = true;
    }
    return e16;
  }
  renderAnchor() {
    return src_exports.html`
            ${this.buttonContent}
            ${super.renderAnchor({ id: "button", ariaHidden: true, className: "button anchor hidden" })}
        `;
  }
  renderButton() {
    return src_exports.html`
            ${this.buttonContent}
        `;
  }
  render() {
    return this.href && this.href.length > 0 ? this.renderAnchor() : this.renderButton();
  }
  handleKeydown(e16) {
    const { code: t13 } = e16;
    switch (t13) {
      case "Space":
        e16.preventDefault(), typeof this.href == "undefined" && (this.addEventListener("keyup", this.handleKeyup), this.active = true);
        break;
      default:
        break;
    }
  }
  handleKeypress(e16) {
    const { code: t13 } = e16;
    switch (t13) {
      case "Enter":
      case "NumpadEnter":
        this.click();
        break;
      default:
        break;
    }
  }
  handleKeyup(e16) {
    const { code: t13 } = e16;
    switch (t13) {
      case "Space":
        this.removeEventListener("keyup", this.handleKeyup), this.active = false, this.click();
        break;
      default:
        break;
    }
  }
  manageAnchor() {
    this.href && this.href.length > 0 ? ((!this.hasAttribute("role") || this.getAttribute("role") === "button") && this.setAttribute("role", "link"), this.removeEventListener("click", this.shouldProxyClick)) : ((!this.hasAttribute("role") || this.getAttribute("role") === "link") && this.setAttribute("role", "button"), this.addEventListener("click", this.shouldProxyClick));
  }
  firstUpdated(e16) {
    super.firstUpdated(e16), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0"), this.manageAnchor(), this.addEventListener("keydown", this.handleKeydown), this.addEventListener("keypress", this.handleKeypress);
  }
  updated(e16) {
    super.updated(e16), e16.has("href") && this.manageAnchor(), e16.has("label") && this.setAttribute("aria-label", this.label || ""), this.anchorElement && (this.anchorElement.addEventListener("focus", this.proxyFocus), this.anchorElement.tabIndex = -1);
  }
};
s3([(0, decorators_exports.property)({ type: Boolean, reflect: true })], ButtonBase.prototype, "active", 2), s3([(0, decorators_exports.property)({ type: String })], ButtonBase.prototype, "type", 2), s3([(0, decorators_exports.query)(".anchor")], ButtonBase.prototype, "anchorElement", 2);

// ../node_modules/@spectrum-web-components/button/src/button.css.js
init_src();
var o3 = src_exports.css`
    :host{cursor:pointer;-webkit-user-select:none;user-select:none;box-sizing:border-box;font-family:var(--mod-button-font-family,var(--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)));line-height:var(--mod-button-line-height,var(--mod-line-height-100,var(--spectrum-line-height-100)));text-transform:none;vertical-align:top;-webkit-appearance:button;transition:background var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,border-color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,box-shadow var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;justify-content:center;align-items:center;margin:0;-webkit-text-decoration:none;text-decoration:none;display:inline-flex;overflow:visible}:host(:focus){outline:none}:host .is-disabled,:host([disabled]){cursor:default}:host:after{margin:calc(var(--mod-button-focus-indicator-gap,var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap)))*-1);transition:opacity var(--mod-button-animation-duration,var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))))ease-out,margin var(--mod-button-animation-duration,var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100))))ease-out;display:block;inset-block:0;inset-inline:0}:host(:focus-visible):after{margin:calc(var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap))*-2)}#label{text-align:center;place-self:center}#label[hidden]{display:none}:host{--spectrum-button-animation-duration:var(--spectrum-animation-duration-100);--spectrum-button-border-radius:var(--spectrum-corner-radius-100);--spectrum-button-border-width:var(--spectrum-border-width-200);--spectrum-button-line-height:1.2;--spectrum-button-focus-ring-gap:var(--spectrum-focus-indicator-gap);--spectrum-button-focus-ring-border-radius:calc(var(--spectrum-button-border-radius) + var(--spectrum-button-focus-ring-gap));--spectrum-button-focus-ring-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-button-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-button-intended-icon-size:var(--spectrum-workflow-icon-size-50);--mod-progress-circle-position:absolute}:host([size=s]){--spectrum-button-min-width:calc(var(--spectrum-component-height-75)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(--spectrum-component-pill-edge-to-text-75);--spectrum-button-height:var(--spectrum-component-height-75);--spectrum-button-font-size:var(--spectrum-font-size-75);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-75) - var(--spectrum-button-border-width));--spectrum-button-edge-to-visual-only:var(--spectrum-component-pill-edge-to-visual-only-75);--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-75) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-75);--spectrum-button-top-to-text:var(--spectrum-button-top-to-text-small);--spectrum-button-bottom-to-text:var(--spectrum-button-bottom-to-text-small);--spectrum-button-top-to-icon:var(--spectrum-component-top-to-workflow-icon-75);--spectrum-button-intended-icon-size:var(--spectrum-workflow-icon-size-75)}:host{--spectrum-button-min-width:calc(var(--spectrum-component-height-100)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(--spectrum-component-pill-edge-to-text-100);--spectrum-button-height:var(--spectrum-component-height-100);--spectrum-button-font-size:var(--spectrum-font-size-100);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-100) - var(--spectrum-button-border-width));--spectrum-button-edge-to-visual-only:var(--spectrum-component-pill-edge-to-visual-only-100);--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-100) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-100);--spectrum-button-top-to-text:var(--spectrum-button-top-to-text-medium);--spectrum-button-bottom-to-text:var(--spectrum-button-bottom-to-text-medium);--spectrum-button-top-to-icon:var(--spectrum-component-top-to-workflow-icon-100);--spectrum-button-intended-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=l]){--spectrum-button-min-width:calc(var(--spectrum-component-height-200)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(--spectrum-component-pill-edge-to-text-200);--spectrum-button-height:var(--spectrum-component-height-200);--spectrum-button-font-size:var(--spectrum-font-size-200);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-200) - var(--spectrum-button-border-width));--spectrum-button-edge-to-visual-only:var(--spectrum-component-pill-edge-to-visual-only-200);--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-200) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-200);--spectrum-button-top-to-text:var(--spectrum-button-top-to-text-large);--spectrum-button-bottom-to-text:var(--spectrum-button-bottom-to-text-large);--spectrum-button-top-to-icon:var(--spectrum-component-top-to-workflow-icon-200);--spectrum-button-intended-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-button-min-width:calc(var(--spectrum-component-height-300)*var(--spectrum-button-minimum-width-multiplier));--spectrum-button-border-radius:var(--spectrum-component-pill-edge-to-text-300);--spectrum-button-height:var(--spectrum-component-height-300);--spectrum-button-font-size:var(--spectrum-font-size-300);--spectrum-button-edge-to-visual:calc(var(--spectrum-component-pill-edge-to-visual-300) - var(--spectrum-button-border-width));--spectrum-button-edge-to-visual-only:var(--spectrum-component-pill-edge-to-visual-only-300);--spectrum-button-edge-to-text:calc(var(--spectrum-component-pill-edge-to-text-300) - var(--spectrum-button-border-width));--spectrum-button-padding-label-to-icon:var(--spectrum-text-to-visual-300);--spectrum-button-top-to-text:var(--spectrum-button-top-to-text-extra-large);--spectrum-button-bottom-to-text:var(--spectrum-button-bottom-to-text-extra-large);--spectrum-button-top-to-icon:var(--spectrum-component-top-to-workflow-icon-300);--spectrum-button-intended-icon-size:var(--spectrum-workflow-icon-size-300)}:host{border-radius:var(--mod-button-border-radius,var(--spectrum-button-border-radius));border-width:var(--mod-button-border-width,var(--spectrum-button-border-width));font-size:var(--mod-button-font-size,var(--spectrum-button-font-size));font-weight:var(--mod-bold-font-weight,var(--spectrum-bold-font-weight));gap:var(--mod-button-padding-label-to-icon,var(--spectrum-button-padding-label-to-icon));min-inline-size:var(--mod-button-min-width,var(--spectrum-button-min-width));min-block-size:var(--mod-button-height,var(--spectrum-button-height));padding-block:0;padding-inline:var(--mod-button-edge-to-text,var(--spectrum-button-edge-to-text));color:inherit;margin-block:var(--mod-button-margin-block);border-style:solid;margin-inline-start:var(--mod-button-margin-left);margin-inline-end:var(--mod-button-margin-right);position:relative}:host(:is(:active,[active])){box-shadow:none}::slotted([slot=icon]){--_icon-size-difference:max(0px,var(--spectrum-button-intended-icon-size) - var(--spectrum-icon-block-size,var(--spectrum-button-intended-icon-size)));color:inherit;flex-shrink:0;align-self:flex-start;margin-block-start:var(--mod-button-icon-margin-block-start,max(0px,var(--mod-button-top-to-icon,var(--spectrum-button-top-to-icon)) - var(--mod-button-border-width,var(--spectrum-button-border-width)) + (var(--_icon-size-difference,0px)/2)));margin-inline-start:calc(var(--mod-button-edge-to-visual,var(--spectrum-button-edge-to-visual)) - var(--mod-button-edge-to-text,var(--spectrum-button-edge-to-text)))}:host:after{border-radius:calc(var(--mod-button-border-radius,var(--spectrum-button-border-radius)) + var(--mod-focus-indicator-gap,var(--spectrum-focus-indicator-gap)))}:host([icon-only]){min-inline-size:unset;padding:calc(var(--mod-button-edge-to-visual-only,var(--spectrum-button-edge-to-visual-only)) - var(--mod-button-border-width,var(--spectrum-button-border-width)));border-radius:50%}:host([icon-only]) ::slotted([slot=icon]){align-self:center;margin-block-start:0;margin-inline-start:0}:host([icon-only]):after{border-radius:50%}#label{line-height:var(--mod-button-line-height,var(--spectrum-button-line-height));text-align:var(--mod-button-text-align,center);align-self:start;padding-block-start:calc(var(--mod-button-top-to-text,var(--spectrum-button-top-to-text)) - var(--mod-button-border-width,var(--spectrum-button-border-width)));padding-block-end:calc(var(--mod-button-bottom-to-text,var(--spectrum-button-bottom-to-text)) - var(--mod-button-border-width,var(--spectrum-button-border-width)))}[name=icon]+#label{text-align:var(--mod-button-text-align-with-icon,start)}:host([focused]):after,:host(:focus-visible):after{box-shadow:0 0 0 var(--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness))var(--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color))}:host{transition:border-color var(--mod-button-animation-duration,var(--spectrum-button-animation-duration))ease-in-out}:host:after{margin:calc(( var(--mod-button-focus-ring-gap,var(--spectrum-button-focus-ring-gap)) + var(--mod-button-border-width,var(--spectrum-button-border-width)))*-1);border-radius:var(--mod-button-focus-ring-border-radius,var(--spectrum-button-focus-ring-border-radius));transition:box-shadow var(--mod-button-animation-duration,var(--spectrum-button-animation-duration))ease-in-out;pointer-events:none;content:"";position:absolute;inset:0}:host(:focus-visible){box-shadow:none;outline:none}:host(:focus-visible):after{box-shadow:0 0 0 var(--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness))var(--highcontrast-button-focus-ring-color,var(--mod-button-focus-ring-color,var(--mod-button-focus-ring-color,var(--spectrum-button-focus-indicator-color))))}:host{background-color:var(--highcontrast-button-background-color-default,var(--mod-button-background-color-default,var(--spectrum-button-background-color-default)));border-color:var(--highcontrast-button-border-color-default,var(--mod-button-border-color-default,var(--spectrum-button-border-color-default)));color:var(--highcontrast-button-content-color-default,var(--mod-button-content-color-default,var(--spectrum-button-content-color-default)));transition:border var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))linear,color var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))linear,background-color var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))linear}@media (hover:hover){:host(:hover){box-shadow:none;background-color:var(--highcontrast-button-background-color-hover,var(--mod-button-background-color-hover,var(--spectrum-button-background-color-hover)));border-color:var(--highcontrast-button-border-color-hover,var(--mod-button-border-color-hover,var(--spectrum-button-border-color-hover)));color:var(--highcontrast-button-content-color-hover,var(--mod-button-content-color-hover,var(--spectrum-button-content-color-hover)))}}:host(:focus-visible){background-color:var(--highcontrast-button-background-color-focus,var(--mod-button-background-color-focus,var(--spectrum-button-background-color-focus)));border-color:var(--highcontrast-button-border-color-focus,var(--mod-button-border-color-focus,var(--spectrum-button-border-color-focus)));color:var(--highcontrast-button-content-color-focus,var(--mod-button-content-color-focus,var(--spectrum-button-content-color-focus)))}:host(:is(:active,[active])){background-color:var(--highcontrast-button-background-color-down,var(--mod-button-background-color-down,var(--spectrum-button-background-color-down)));border-color:var(--highcontrast-button-border-color-down,var(--mod-button-border-color-down,var(--spectrum-button-border-color-down)));color:var(--highcontrast-button-content-color-down,var(--mod-button-content-color-down,var(--spectrum-button-content-color-down)))}:host .is-disabled,:host([pending]),:host([disabled]),:host([pending]){background-color:var(--highcontrast-button-background-color-disabled,var(--mod-button-background-color-disabled,var(--spectrum-button-background-color-disabled)));border-color:var(--highcontrast-button-border-color-disabled,var(--mod-button-border-color-disabled,var(--spectrum-button-border-color-disabled)));color:var(--highcontrast-button-content-color-disabled,var(--mod-button-content-color-disabled,var(--spectrum-button-content-color-disabled)))}#label,::slotted([slot=icon]){visibility:visible;opacity:1;transition:opacity var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))ease-in-out}.spectrum-ProgressCircle{visibility:hidden;opacity:0;transition:opacity var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))ease-in-out,visibility 0s linear var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))}:host([pending]),:host([pending]){cursor:default}:host([pending]) .spectrum-ProgressCircle,:host([pending]) .spectrum-ProgressCircle{visibility:visible;opacity:1;transition:opacity var(--mod-button-animation-duration,var(--spectrum-button-animation-duration,.13s))ease-in-out}:host([static=black]),:host([static=white]){--spectrum-button-focus-indicator-color:var(--mod-static-black-focus-indicator-color,var(--spectrum-static-black-focus-indicator-color))}@media (forced-colors:active){:host{--highcontrast-button-content-color-disabled:GrayText;--highcontrast-button-border-color-disabled:GrayText;--mod-progress-circle-track-border-color:ButtonText;--mod-progress-circle-track-border-color-over-background:ButtonText;--mod-progress-circle-thickness:var(--spectrum-progress-circle-thickness-medium)}:host(:focus-visible):after{forced-color-adjust:none;box-shadow:0 0 0 var(--mod-button-focus-ring-thickness,var(--spectrum-button-focus-ring-thickness))ButtonText}:host([variant=accent][treatment=fill]){--highcontrast-button-background-color-default:ButtonText;--highcontrast-button-content-color-default:ButtonFace;--highcontrast-button-background-color-disabled:ButtonFace;--highcontrast-button-background-color-hover:Highlight;--highcontrast-button-background-color-down:Highlight;--highcontrast-button-background-color-focus:Highlight;--highcontrast-button-content-color-hover:ButtonFace;--highcontrast-button-content-color-down:ButtonFace;--highcontrast-button-content-color-focus:ButtonFace}:host([variant=accent][treatment=fill]) #label{forced-color-adjust:none}}:host{--spectrum-button-background-color-default:var(--system-spectrum-button-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-content-color-disabled)}:host([variant=accent]){--spectrum-button-background-color-default:var(--system-spectrum-button-accent-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-accent-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-accent-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-accent-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-accent-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-accent-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-accent-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-accent-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-accent-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-accent-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-accent-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-accent-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-accent-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-accent-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-accent-content-color-disabled)}:host([variant=accent][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-accent-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-accent-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-accent-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-accent-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-accent-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-accent-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-accent-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-accent-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-accent-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-accent-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-accent-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-accent-outline-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-accent-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-accent-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-accent-outline-content-color-disabled)}:host([variant=negative]){--spectrum-button-background-color-default:var(--system-spectrum-button-negative-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-negative-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-negative-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-negative-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-negative-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-negative-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-negative-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-negative-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-negative-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-negative-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-negative-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-negative-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-negative-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-negative-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-negative-content-color-disabled)}:host([variant=negative][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-negative-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-negative-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-negative-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-negative-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-negative-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-negative-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-negative-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-negative-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-negative-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-negative-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-negative-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-negative-outline-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-negative-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-negative-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-negative-outline-content-color-disabled)}:host([variant=primary]){--spectrum-button-background-color-default:var(--system-spectrum-button-primary-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-primary-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-primary-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-primary-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-primary-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-primary-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-primary-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-primary-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-primary-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-primary-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-primary-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-primary-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-primary-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-primary-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-primary-content-color-disabled)}:host([variant=primary][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-primary-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-primary-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-primary-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-primary-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-primary-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-primary-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-primary-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-primary-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-primary-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-primary-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-primary-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-primary-outline-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-primary-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-primary-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-primary-outline-content-color-disabled)}:host([variant=secondary]){--spectrum-button-background-color-default:var(--system-spectrum-button-secondary-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-secondary-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-secondary-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-secondary-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-secondary-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-secondary-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-secondary-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-secondary-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-secondary-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-secondary-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-secondary-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-secondary-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-secondary-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-secondary-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-secondary-content-color-disabled)}:host([variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-secondary-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-secondary-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-secondary-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-secondary-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-secondary-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-secondary-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-secondary-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-secondary-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-secondary-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-secondary-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-secondary-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-secondary-outline-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-secondary-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-secondary-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-secondary-outline-content-color-disabled)}:host([quiet]){--spectrum-button-background-color-default:var(--system-spectrum-button-quiet-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-quiet-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-quiet-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-quiet-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-quiet-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-quiet-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-quiet-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-quiet-border-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-quiet-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-quiet-border-color-disabled)}:host([selected]){--spectrum-button-background-color-default:var(--system-spectrum-button-selected-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-selected-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-selected-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-selected-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-selected-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-selected-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-selected-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-selected-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-selected-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-selected-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-selected-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-selected-content-color-focus);--spectrum-button-background-color-disabled:var(--system-spectrum-button-selected-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-selected-border-color-disabled)}:host([selected][emphasized]){--spectrum-button-background-color-default:var(--system-spectrum-button-selected-emphasized-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-selected-emphasized-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-selected-emphasized-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-selected-emphasized-background-color-focus)}:host([static=black][quiet]){--spectrum-button-border-color-default:var(--system-spectrum-button-staticblack-quiet-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticblack-quiet-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticblack-quiet-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticblack-quiet-border-color-focus);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticblack-quiet-border-color-disabled)}:host([static=white][quiet]){--spectrum-button-border-color-default:var(--system-spectrum-button-staticwhite-quiet-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticwhite-quiet-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticwhite-quiet-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticwhite-quiet-border-color-focus);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-quiet-border-color-disabled)}:host([static=white]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticwhite-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticwhite-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticwhite-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticwhite-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticwhite-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticwhite-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticwhite-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticwhite-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticwhite-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticwhite-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticwhite-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticwhite-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticwhite-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticwhite-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticwhite-content-color-disabled)}:host([static=white][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticwhite-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticwhite-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticwhite-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticwhite-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticwhite-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticwhite-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticwhite-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticwhite-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticwhite-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticwhite-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticwhite-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticwhite-outline-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticwhite-outline-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticwhite-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticwhite-outline-content-color-disabled)}:host([static=white][selected]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticwhite-selected-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticwhite-selected-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticwhite-selected-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticwhite-selected-background-color-focus);--spectrum-button-content-color-default:var(--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-default));--spectrum-button-content-color-hover:var(--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-hover));--spectrum-button-content-color-down:var(--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-down));--spectrum-button-content-color-focus:var(--mod-button-static-content-color,var(--system-spectrum-button-staticwhite-selected-content-color-focus));--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticwhite-selected-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-selected-border-color-disabled)}:host([static=white][variant=secondary]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticwhite-secondary-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticwhite-secondary-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticwhite-secondary-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticwhite-secondary-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticwhite-secondary-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticwhite-secondary-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticwhite-secondary-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticwhite-secondary-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticwhite-secondary-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticwhite-secondary-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticwhite-secondary-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticwhite-secondary-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticwhite-secondary-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticwhite-secondary-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-secondary-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticwhite-secondary-content-color-disabled)}:host([static=white][variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticwhite-secondary-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticwhite-secondary-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticwhite-secondary-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticwhite-secondary-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticwhite-secondary-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticwhite-secondary-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticwhite-secondary-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticwhite-secondary-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticwhite-secondary-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticwhite-secondary-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticwhite-secondary-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticwhite-secondary-outline-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticwhite-secondary-outline-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticwhite-secondary-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticwhite-secondary-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticwhite-secondary-outline-content-color-disabled)}:host([static=black]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticblack-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticblack-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticblack-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticblack-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticblack-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticblack-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticblack-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticblack-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticblack-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticblack-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticblack-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticblack-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticblack-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticblack-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticblack-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticblack-content-color-disabled)}:host([static=black][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticblack-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticblack-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticblack-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticblack-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticblack-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticblack-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticblack-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticblack-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticblack-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticblack-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticblack-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticblack-outline-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticblack-outline-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticblack-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticblack-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticblack-outline-content-color-disabled)}:host([static=black][variant=secondary]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticblack-secondary-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticblack-secondary-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticblack-secondary-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticblack-secondary-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticblack-secondary-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticblack-secondary-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticblack-secondary-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticblack-secondary-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticblack-secondary-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticblack-secondary-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticblack-secondary-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticblack-secondary-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticblack-secondary-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticblack-secondary-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticblack-secondary-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticblack-secondary-content-color-disabled)}:host([static=black][variant=secondary][treatment=outline]){--spectrum-button-background-color-default:var(--system-spectrum-button-staticblack-secondary-outline-background-color-default);--spectrum-button-background-color-hover:var(--system-spectrum-button-staticblack-secondary-outline-background-color-hover);--spectrum-button-background-color-down:var(--system-spectrum-button-staticblack-secondary-outline-background-color-down);--spectrum-button-background-color-focus:var(--system-spectrum-button-staticblack-secondary-outline-background-color-focus);--spectrum-button-border-color-default:var(--system-spectrum-button-staticblack-secondary-outline-border-color-default);--spectrum-button-border-color-hover:var(--system-spectrum-button-staticblack-secondary-outline-border-color-hover);--spectrum-button-border-color-down:var(--system-spectrum-button-staticblack-secondary-outline-border-color-down);--spectrum-button-border-color-focus:var(--system-spectrum-button-staticblack-secondary-outline-border-color-focus);--spectrum-button-content-color-default:var(--system-spectrum-button-staticblack-secondary-outline-content-color-default);--spectrum-button-content-color-hover:var(--system-spectrum-button-staticblack-secondary-outline-content-color-hover);--spectrum-button-content-color-down:var(--system-spectrum-button-staticblack-secondary-outline-content-color-down);--spectrum-button-content-color-focus:var(--system-spectrum-button-staticblack-secondary-outline-content-color-focus);--spectrum-button-focus-indicator-color:var(--system-spectrum-button-staticblack-secondary-outline-focus-indicator-color);--spectrum-button-background-color-disabled:var(--system-spectrum-button-staticblack-secondary-outline-background-color-disabled);--spectrum-button-border-color-disabled:var(--system-spectrum-button-staticblack-secondary-outline-border-color-disabled);--spectrum-button-content-color-disabled:var(--system-spectrum-button-staticblack-secondary-outline-content-color-disabled)}@media (forced-colors:active){:host([treatment][disabled]){border-color:graytext}:host([treatment]:not([disabled]):hover){border-color:highlight}}@keyframes show-progress-circle{0%{visibility:hidden}to{visibility:visible}}@keyframes hide-icons-label{0%{visibility:visible}to{visibility:hidden}}@keyframes update-pending-button-styles{to{background-color:var(--highcontrast-button-background-color-disabled,var(--mod-button-background-color-disabled,var(--spectrum-button-background-color-disabled)));border-color:var(--highcontrast-button-border-color-disabled,var(--mod-button-border-color-disabled,var(--spectrum-button-border-color-disabled)));color:var(--highcontrast-button-content-color-disabled,var(--mod-button-content-color-disabled,var(--spectrum-button-content-color-disabled)))}}:host([pending]:not([disabled])){cursor:default;pointer-events:none;animation:update-pending-button-styles 0s var(--pending-delay,1s)forwards}::slotted([slot=icon]){visibility:revert-layer;--mod-progress-circle-position:relative}sp-progress-circle{visibility:hidden;display:block;position:absolute;left:50%;transform:translate(-50%)}:host([pending]:not([disabled])) sp-progress-circle{animation:show-progress-circle 0s var(--pending-delay,1s)forwards}:host([pending]:not([disabled])) slot[name=icon],:host([pending]:not([disabled])) #label{animation:hide-icons-label 0s var(--pending-delay,1s)forwards}
`;
var button_css_default = o3;

// ../node_modules/@spectrum-web-components/button/src/Button.js
init_directives();
var u6 = Object.defineProperty;
var h4 = Object.getOwnPropertyDescriptor;
var i3 = (n6, r9, t13, s10) => {
  for (var e16 = s10 > 1 ? void 0 : s10 ? h4(r9, t13) : r9, l7 = n6.length - 1, o13; l7 >= 0; l7--)
    (o13 = n6[l7]) && (e16 = (s10 ? o13(r9, t13, e16) : o13(e16)) || e16);
  return s10 && e16 && u6(r9, t13, e16), e16;
};
var VALID_VARIANTS = ["accent", "primary", "secondary", "negative", "white", "black"];
var Button = class extends SizedMixin(ButtonBase, { noDefaultSize: true }) {
  constructor() {
    super(...arguments);
    this.pendingLabel = "Pending";
    this.pending = false;
    this.cachedAriaLabel = null;
    this._variant = "accent";
    this.treatment = "fill";
  }
  static get styles() {
    return [...super.styles, button_css_default];
  }
  click() {
    this.pending || super.click();
  }
  get variant() {
    return this._variant;
  }
  set variant(t13) {
    if (t13 !== this.variant) {
      switch (this.requestUpdate("variant", this.variant), t13) {
        case "cta":
          this._variant = "accent";
          break;
        case "overBackground":
          this.removeAttribute("variant"), this.static = "white", this.treatment = "outline";
          return;
        case "white":
        case "black":
          this.static = t13, this.removeAttribute("variant");
          return;
        case null:
          return;
        default:
          VALID_VARIANTS.includes(t13) ? this._variant = t13 : this._variant = "accent";
          break;
      }
      this.setAttribute("variant", this.variant);
    }
  }
  set quiet(t13) {
    this.treatment = t13 ? "outline" : "fill";
  }
  get quiet() {
    return this.treatment === "outline";
  }
  firstUpdated(t13) {
    super.firstUpdated(t13), this.hasAttribute("variant") || this.setAttribute("variant", this.variant);
  }
  updated(t13) {
    super.updated(t13), t13.has("pending") && (this.pending && this.pendingLabel !== this.getAttribute("aria-label") ? this.disabled || (this.cachedAriaLabel = this.getAttribute("aria-label") || "", this.setAttribute("aria-label", this.pendingLabel)) : !this.pending && this.cachedAriaLabel ? this.setAttribute("aria-label", this.cachedAriaLabel) : !this.pending && this.cachedAriaLabel === "" && this.removeAttribute("aria-label")), t13.has("disabled") && (!this.disabled && this.pendingLabel !== this.getAttribute("aria-label") ? this.pending && (this.cachedAriaLabel = this.getAttribute("aria-label") || "", this.setAttribute("aria-label", this.pendingLabel)) : this.disabled && this.cachedAriaLabel ? this.setAttribute("aria-label", this.cachedAriaLabel) : this.disabled && this.cachedAriaLabel == "" && this.removeAttribute("aria-label"));
  }
  renderButton() {
    return src_exports.html`
            ${this.buttonContent}
            ${when(this.pending, () => (Promise.resolve().then(() => init_sp_progress_circle()), src_exports.html`
                    <sp-progress-circle
                        indeterminate
                        static="white"
                        aria-hidden="true"
                    ></sp-progress-circle>
                `))}
        `;
  }
};
i3([(0, decorators_exports.property)({ type: String, attribute: "pending-label" })], Button.prototype, "pendingLabel", 2), i3([(0, decorators_exports.property)({ type: Boolean, reflect: true, attribute: true })], Button.prototype, "pending", 2), i3([(0, decorators_exports.property)()], Button.prototype, "variant", 1), i3([(0, decorators_exports.property)({ type: String, reflect: true })], Button.prototype, "static", 2), i3([(0, decorators_exports.property)({ reflect: true })], Button.prototype, "treatment", 2), i3([(0, decorators_exports.property)({ type: Boolean })], Button.prototype, "quiet", 1);

// ../node_modules/@spectrum-web-components/button/sp-button.js
init_define_element();
defineElement("sp-button", Button);

// ../node_modules/@spectrum-web-components/dialog/src/Dialog.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/divider/src/Divider.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/divider/src/divider.css.js
init_src();
var i4 = src_exports.css`
    :host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium);--spectrum-divider-background-color:var(--spectrum-divider-background-color-medium);--spectrum-divider-background-color-small:var(--spectrum-gray-300);--spectrum-divider-background-color-medium:var(--spectrum-gray-300);--spectrum-divider-background-color-large:var(--spectrum-gray-800);--spectrum-divider-background-color-small-static-white:var(--spectrum-transparent-white-300);--spectrum-divider-background-color-medium-static-white:var(--spectrum-transparent-white-300);--spectrum-divider-background-color-large-static-white:var(--spectrum-transparent-white-800);--spectrum-divider-background-color-small-static-black:var(--spectrum-transparent-black-300);--spectrum-divider-background-color-medium-static-black:var(--spectrum-transparent-black-300);--spectrum-divider-background-color-large-static-black:var(--spectrum-transparent-black-800)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small);--spectrum-divider-background-color:var(--spectrum-divider-background-color-small)}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium);--spectrum-divider-background-color:var(--spectrum-divider-background-color-medium)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-divider-background-color-large)}@media (forced-colors:active){:host,:host([size=l]),:host,:host([size=s]){--spectrum-divider-background-color:CanvasText;--spectrum-divider-background-color-small-static-white:CanvasText;--spectrum-divider-background-color-medium-static-white:CanvasText;--spectrum-divider-background-color-large-static-white:CanvasText;--spectrum-divider-background-color-small-static-black:CanvasText;--spectrum-divider-background-color-medium-static-black:CanvasText;--spectrum-divider-background-color-large-static-black:CanvasText}}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--mod-divider-background-color,var(--spectrum-divider-background-color));inline-size:100%;overflow:visible}:host([static=white][size=s]){--spectrum-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-small-static-white))}:host([static=white]){--spectrum-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-medium-static-white))}:host([static=white][size=l]){--spectrum-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-divider-background-color-large-static-white))}:host([static=black][size=s]){--spectrum-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-small-static-black))}:host([static=black]){--spectrum-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-medium-static-black))}:host([static=black][size=l]){--spectrum-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-divider-background-color-large-static-black))}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));margin-block:var(--mod-divider-vertical-margin);block-size:var(--mod-divider-vertical-height,100%);align-self:var(--mod-divider-vertical-align)}:host{display:block}hr{border:none;margin:0}
`;
var divider_css_default = i4;

// ../node_modules/@spectrum-web-components/divider/src/Divider.js
var p6 = Object.defineProperty;
var u7 = Object.getOwnPropertyDescriptor;
var l2 = (s10, r9, e16, i12) => {
  for (var t13 = i12 > 1 ? void 0 : i12 ? u7(r9, e16) : r9, o13 = s10.length - 1, a10; o13 >= 0; o13--)
    (a10 = s10[o13]) && (t13 = (i12 ? a10(r9, e16, t13) : a10(t13)) || t13);
  return i12 && t13 && p6(r9, e16, t13), t13;
};
var Divider = class extends SizedMixin(SpectrumElement, { validSizes: ["s", "m", "l"], noDefaultSize: true }) {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  render() {
    return src_exports.html``;
  }
  firstUpdated(e16) {
    super.firstUpdated(e16), this.setAttribute("role", "separator");
  }
  updated(e16) {
    super.updated(e16), e16.has("vertical") && (this.vertical ? this.setAttribute("aria-orientation", "vertical") : this.removeAttribute("aria-orientation"));
  }
};
Divider.styles = [divider_css_default], l2([(0, decorators_exports.property)({ type: Boolean, reflect: true })], Divider.prototype, "vertical", 2);

// ../node_modules/@spectrum-web-components/divider/sp-divider.js
init_define_element();
defineElement("sp-divider", Divider);

// ../node_modules/@spectrum-web-components/button/src/CloseButton.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/button/src/StyledButton.js
var StyledButton = class extends ButtonBase {
};

// ../node_modules/@spectrum-web-components/close-button/src/close-button.css.js
init_src();
var t5 = src_exports.css`
    :host{cursor:pointer;-webkit-user-select:none;user-select:none;box-sizing:border-box;font-family:var(--mod-button-font-family,var(--mod-sans-font-family-stack,var(--spectrum-sans-font-family-stack)));line-height:var(--mod-button-line-height,var(--mod-line-height-100,var(--spectrum-line-height-100)));text-transform:none;vertical-align:top;-webkit-appearance:button;transition:background var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,border-color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,color var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out,box-shadow var(--mod-button-animation-duration,var(--mod-animation-duration-100,var(--spectrum-animation-duration-100)))ease-out;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;border-style:solid;margin:0;-webkit-text-decoration:none;text-decoration:none;overflow:visible}:host(:focus){outline:none}:host([disabled]),:host([disabled]){cursor:default}:host a{-webkit-user-select:none;user-select:none;-webkit-appearance:none}:host{--spectrum-closebutton-size-300:24px;--spectrum-closebutton-size-400:32px;--spectrum-closebutton-size-500:40px;--spectrum-closebutton-size-600:48px;--spectrum-closebutton-icon-color-default:var(--spectrum-neutral-content-color-default);--spectrum-closebutton-icon-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-closebutton-icon-color-down:var(--spectrum-neutral-content-color-down);--spectrum-closebutton-icon-color-focus:var(--spectrum-neutral-content-color-key-focus);--spectrum-closebutton-icon-color-disabled:var(--spectrum-disabled-content-color);--spectrum-closebutton-focus-indicator-thickness:var(--spectrum-focus-indicator-thickness);--spectrum-closebutton-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-closebutton-focus-indicator-color:var(--spectrum-focus-indicator-color);--spectrum-closebutton-height:var(--spectrum-component-height-100);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-400);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-400);--spectrum-closebutton-animation-duration:var(--spectrum-animation-duration-100)}:host([size=s]){--spectrum-closebutton-height:var(--spectrum-component-height-75);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-300);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-300)}:host{--spectrum-closebutton-height:var(--spectrum-component-height-100);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-400);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-400)}:host([size=l]){--spectrum-closebutton-height:var(--spectrum-component-height-200);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-500);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-500)}:host([size=xl]){--spectrum-closebutton-height:var(--spectrum-component-height-300);--spectrum-closebutton-width:var(--spectrum-closebutton-height);--spectrum-closebutton-size:var(--spectrum-closebutton-size-600);--spectrum-closebutton-border-radius:var(--spectrum-closebutton-size-600)}:host([static=white]){--spectrum-closebutton-static-background-color-default:transparent;--spectrum-closebutton-static-background-color-hover:var(--spectrum-transparent-white-300);--spectrum-closebutton-static-background-color-down:var(--spectrum-transparent-white-400);--spectrum-closebutton-static-background-color-focus:var(--spectrum-transparent-white-300);--spectrum-closebutton-icon-color-default:var(--spectrum-white);--spectrum-closebutton-icon-color-disabled:var(--spectrum-disabled-static-white-content-color);--spectrum-closebutton-focus-indicator-color:var(--spectrum-static-white-focus-indicator-color)}:host([static=black]){--spectrum-closebutton-static-background-color-default:transparent;--spectrum-closebutton-static-background-color-hover:var(--spectrum-transparent-black-300);--spectrum-closebutton-static-background-color-down:var(--spectrum-transparent-black-400);--spectrum-closebutton-static-background-color-focus:var(--spectrum-transparent-black-300);--spectrum-closebutton-icon-color-default:var(--spectrum-black);--spectrum-closebutton-icon-color-disabled:var(--spectrum-disabled-static-black-content-color);--spectrum-closebutton-focus-indicator-color:var(--spectrum-static-black-focus-indicator-color)}@media (forced-colors:active){:host{--highcontrast-closebutton-icon-color-disabled:GrayText;--highcontrast-closebutton-icon-color-down:Highlight;--highcontrast-closebutton-icon-color-hover:Highlight;--highcontrast-closebutton-icon-color-focus:Highlight;--highcontrast-closebutton-background-color-default:ButtonFace;--highcontrast-closebutton-focus-indicator-color:ButtonText}:host(:focus-visible):after{forced-color-adjust:none;margin:var(--mod-closebutton-focus-indicator-gap,var(--spectrum-closebutton-focus-indicator-gap));transition:opacity var(--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration))ease-out,margin var(--mod-closebutton-animation-duraction,var(--spectrum-closebutton-animation-duration))ease-out}:host([static=black]){--highcontrast-closebutton-static-background-color-default:ButtonFace;--highcontrast-closebutton-icon-color-default:Highlight;--highcontrast-closebutton-icon-color-disabled:GrayText}:host([static=white]){--highcontrast-closebutton-static-background-color-default:ButtonFace;--highcontrast-closebutton-icon-color-default:Highlight;--highcontrast-closebutton-icon-color-disabled:Highlight}}:host{block-size:var(--mod-closebutton-height,var(--spectrum-closebutton-height));inline-size:var(--mod-closebutton-width,var(--spectrum-closebutton-width));color:inherit;border-radius:var(--mod-closebutton-border-radius,var(--spectrum-closebutton-border-radius));transition:border-color var(--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration))ease-in-out;margin-inline:var(--mod-closebutton-margin-inline);justify-content:center;align-items:center;align-self:var(--mod-closebutton-align-self);border-width:0;border-color:#0000;flex-direction:row;margin-block-start:var(--mod-closebutton-margin-top);padding:0;display:inline-flex;position:relative}:host:after{pointer-events:none;content:"";margin:calc(var(--mod-closebutton-focus-indicator-gap,var(--spectrum-closebutton-focus-indicator-gap))*-1);border-radius:calc(var(--mod-closebutton-size,var(--spectrum-closebutton-size)) + var(--mod-closebutton-focus-indicator-gap,var(--spectrum-closebutton-focus-indicator-gap)));transition:box-shadow var(--mod-closebutton-animation-duration,var(--spectrum-closebutton-animation-duration))ease-in-out;position:absolute;inset-block:0;inset-inline:0}:host(:focus-visible){box-shadow:none;outline:none}:host(:focus-visible):after{box-shadow:0 0 0 var(--mod-closebutton-focus-indicator-thickness,var(--spectrum-closebutton-focus-indicator-thickness))var(--highcontrast-closebutton-focus-indicator-color,var(--mod-closebutton-focus-indicator-color,var(--spectrum-closebutton-focus-indicator-color)))}:host(:not([disabled])){background-color:var(--highcontrast-closebutton-background-color-default,var(--mod-closebutton-background-color-default,var(--spectrum-closebutton-background-color-default)))}:host(:not([disabled]):is(:active,[active])){background-color:var(--mod-closebutton-background-color-down,var(--spectrum-closebutton-background-color-down))}:host(:not([disabled]):is(:active,[active])) .icon{color:var(--highcontrast-closebutton-icon-color-down,var(--mod-closebutton-icon-color-down,var(--spectrum-closebutton-icon-color-down)))}:host([focused]:not([disabled])),:host(:not([disabled]):focus-visible){background-color:var(--mod-closebutton-background-color-focus,var(--spectrum-closebutton-background-color-focus))}:host([focused]:not([disabled])) .icon,:host(:not([disabled]):focus-visible) .icon{color:var(--highcontrast-closebutton-icon-color-focus,var(--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)))}:host(:not([disabled])) .icon{color:var(--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default))}:host([focused]:not([disabled])) .icon,:host(:not([disabled]):focus) .icon{color:var(--highcontrast-closebutton-icon-color-focus,var(--mod-closebutton-icon-color-focus,var(--spectrum-closebutton-icon-color-focus)))}:host([disabled]){background-color:var(--mod-closebutton-background-color-default,var(--spectrum-closebutton-background-color-default))}:host([disabled]) .icon{color:var(--highcontrast-closebutton-icon-color-disabled,var(--mod-closebutton-icon-color-disabled,var(--spectrum-closebutton-icon-color-disabled)))}:host([static=black]:not([disabled])),:host([static=white]:not([disabled])){background-color:var(--highcontrast-closebutton-static-background-color-default,var(--mod-closebutton-static-background-color-default,var(--spectrum-closebutton-static-background-color-default)))}@media (hover:hover){:host(:not([disabled]):hover){background-color:var(--mod-closebutton-background-color-hover,var(--spectrum-closebutton-background-color-hover))}:host(:not([disabled]):hover) .icon{color:var(--highcontrast-closebutton-icon-color-hover,var(--mod-closebutton-icon-color-hover,var(--spectrum-closebutton-icon-color-hover)))}:host([static=black]:not([disabled]):hover),:host([static=white]:not([disabled]):hover){background-color:var(--highcontrast-closebutton-static-background-color-hover,var(--mod-closebutton-static-background-color-hover,var(--spectrum-closebutton-static-background-color-hover)))}:host([static=black]:not([disabled]):hover) .icon,:host([static=white]:not([disabled]):hover) .icon{color:var(--highcontrast-closebutton-icon-color-default,var(--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)))}}:host([static=black]:not([disabled]):is(:active,[active])),:host([static=white]:not([disabled]):is(:active,[active])){background-color:var(--highcontrast-closebutton-static-background-color-down,var(--mod-closebutton-static-background-color-down,var(--spectrum-closebutton-static-background-color-down)))}:host([static=black]:not([disabled]):is(:active,[active])) .icon,:host([static=white]:not([disabled]):is(:active,[active])) .icon{color:var(--highcontrast-closebutton-icon-color-default,var(--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)))}:host([static=black][focused]:not([disabled])),:host([static=black]:not([disabled]):focus-visible),:host([static=white][focused]:not([disabled])),:host([static=white]:not([disabled]):focus-visible){background-color:var(--highcontrast-closebutton-static-background-color-focus,var(--mod-closebutton-static-background-color-focus,var(--spectrum-closebutton-static-background-color-focus)))}:host([static=black][focused]:not([disabled])) .icon,:host([static=black][focused]:not([disabled])) .icon,:host([static=black]:not([disabled]):focus) .icon,:host([static=black]:not([disabled]):focus-visible) .icon,:host([static=white][focused]:not([disabled])) .icon,:host([static=white][focused]:not([disabled])) .icon,:host([static=white]:not([disabled]):focus) .icon,:host([static=white]:not([disabled]):focus-visible) .icon{color:var(--highcontrast-closebutton-icon-color-default,var(--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default)))}:host([static=black]:not([disabled])) .icon,:host([static=white]:not([disabled])) .icon{color:var(--mod-closebutton-icon-color-default,var(--spectrum-closebutton-icon-color-default))}:host([static=black][disabled]) .icon,:host([static=white][disabled]) .icon{color:var(--highcontrast-closebutton-icon-disabled,var(--mod-closebutton-icon-color-disabled,var(--spectrum-closebutton-icon-color-disabled)))}.icon{margin:0}:host{--spectrum-closebutton-background-color-default:var(--system-spectrum-closebutton-background-color-default);--spectrum-closebutton-background-color-hover:var(--system-spectrum-closebutton-background-color-hover);--spectrum-closebutton-background-color-down:var(--system-spectrum-closebutton-background-color-down);--spectrum-closebutton-background-color-focus:var(--system-spectrum-closebutton-background-color-focus)}
`;
var close_button_css_default = t5;

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross200.js
init_src();

// ../node_modules/@spectrum-web-components/icon/src/IconBase.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/icon/src/icon.css.js
init_src();
var s4 = src_exports.css`
    :host{--spectrum-icon-inline-size:var(--mod-icon-inline-size,var(--mod-icon-size,var(--spectrum-icon-size)));--spectrum-icon-block-size:var(--mod-icon-block-size,var(--mod-icon-size,var(--spectrum-icon-size)));inline-size:var(--spectrum-icon-inline-size);block-size:var(--spectrum-icon-block-size);color:var(--mod-icon-color,inherit);fill:currentColor;pointer-events:none;display:inline-block}:host(:not(:root)){overflow:hidden}@media (forced-colors:active){:host{forced-color-adjust:auto}}:host{--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=xxs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxs)}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-xxl)}:host{--spectrum-icon-size:inherit;--spectrum-icon-inline-size:var(--mod-icon-inline-size,var(--mod-icon-size,var(--_spectrum-icon-size)));--spectrum-icon-block-size:var(--mod-icon-block-size,var(--mod-icon-size,var(--_spectrum-icon-size)));--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-100))}#container{height:100%}img,svg,::slotted(*){vertical-align:top;color:inherit;width:100%;height:100%}@media (forced-colors:active){img,svg,::slotted(*){forced-color-adjust:auto}}:host([size=xxs]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-xxs))}:host([size=xs]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-50))}:host([size=s]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-75))}:host([size=l]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-200))}:host([size=xl]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-300))}:host([size=xxl]){--_spectrum-icon-size:var(--spectrum-icon-size,var(--spectrum-workflow-icon-size-xxl))}
`;
var icon_css_default = s4;

// ../node_modules/@spectrum-web-components/icon/src/IconBase.js
var a5 = Object.defineProperty;
var d7 = Object.getOwnPropertyDescriptor;
var p7 = (i12, r9, t13, l7) => {
  for (var e16 = l7 > 1 ? void 0 : l7 ? d7(r9, t13) : r9, s10 = i12.length - 1, o13; s10 >= 0; s10--)
    (o13 = i12[s10]) && (e16 = (l7 ? o13(r9, t13, e16) : o13(e16)) || e16);
  return l7 && e16 && a5(r9, t13, e16), e16;
};
var IconBase = class extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  static get styles() {
    return [icon_css_default];
  }
  update(t13) {
    t13.has("label") && (this.label ? this.removeAttribute("aria-hidden") : this.setAttribute("aria-hidden", "true")), super.update(t13);
  }
  render() {
    return src_exports.html`
            <slot></slot>
        `;
  }
};
p7([(0, decorators_exports.property)()], IconBase.prototype, "label", 2), p7([(0, decorators_exports.property)({ reflect: true })], IconBase.prototype, "size", 2);

// ../node_modules/@spectrum-web-components/icons-ui/src/custom-tag.js
var t6;
var tag = function(e16, ...a10) {
  return t6 ? t6(e16, ...a10) : a10.reduce((r9, p13, l7) => r9 + p13 + e16[l7 + 1], e16[0]);
};
var setCustomTemplateLiteralTag = (e16) => {
  t6 = e16;
};

// ../node_modules/@spectrum-web-components/icons-ui/src/icons/Cross200.js
var Cross200Icon = ({ width: t13 = 24, height: e16 = 24, title: r9 = "Cross200" } = {}) => tag`<svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 10"
    fill="currentColor"
    aria-label=${r9}
    width=${t13}
    height=${e16}
  >
    <path
      d="m6.29 5 2.922-2.922a.911.911 0 0 0-1.29-1.29L5 3.712 2.078.789a.911.911 0 0 0-1.29 1.289L3.712 5 .79 7.922a.911.911 0 1 0 1.289 1.29L5 6.288 7.923 9.21a.911.911 0 0 0 1.289-1.289z"
    />
  </svg>`;

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross200.js
var IconCross200 = class extends IconBase {
  render() {
    return setCustomTemplateLiteralTag(src_exports.html), Cross200Icon();
  }
};

// ../node_modules/@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js
init_define_element();
defineElement("sp-icon-cross200", IconCross200);

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross300.js
init_src();

// ../node_modules/@spectrum-web-components/icons-ui/src/icons/Cross300.js
var Cross300Icon = ({ width: t13 = 24, height: e16 = 24, title: r9 = "Cross300" } = {}) => tag`<svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="currentColor"
    aria-label=${r9}
    width=${t13}
    height=${e16}
  >
    <path
      d="m7.344 6 3.395-3.396a.95.95 0 0 0-1.344-1.342L6 4.657 2.604 1.262a.95.95 0 0 0-1.342 1.342L4.657 6 1.262 9.396a.95.95 0 0 0 1.343 1.343L6 7.344l3.395 3.395a.95.95 0 0 0 1.344-1.344z"
    />
  </svg>`;

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross300.js
var IconCross300 = class extends IconBase {
  render() {
    return setCustomTemplateLiteralTag(src_exports.html), Cross300Icon();
  }
};

// ../node_modules/@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js
init_define_element();
defineElement("sp-icon-cross300", IconCross300);

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross400.js
init_src();

// ../node_modules/@spectrum-web-components/icons-ui/src/icons/Cross400.js
var Cross400Icon = ({ width: t13 = 24, height: e16 = 24, title: r9 = "Cross400" } = {}) => tag`<svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="currentColor"
    aria-label=${r9}
    width=${t13}
    height=${e16}
  >
    <path
      d="m7.398 6 3.932-3.932A.989.989 0 0 0 9.932.67L6 4.602 2.068.67A.989.989 0 0 0 .67 2.068L4.602 6 .67 9.932a.989.989 0 1 0 1.398 1.398L6 7.398l3.932 3.932a.989.989 0 0 0 1.398-1.398z"
    />
  </svg>`;

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross400.js
var IconCross400 = class extends IconBase {
  render() {
    return setCustomTemplateLiteralTag(src_exports.html), Cross400Icon();
  }
};

// ../node_modules/@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js
init_define_element();
defineElement("sp-icon-cross400", IconCross400);

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross500.js
init_src();

// ../node_modules/@spectrum-web-components/icons-ui/src/icons/Cross500.js
var Cross500Icon = ({ width: t13 = 24, height: e16 = 24, title: r9 = "Cross500" } = {}) => tag`<svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 14"
    fill="currentColor"
    aria-label=${r9}
    width=${t13}
    height=${e16}
  >
    <path
      d="m8.457 7 4.54-4.54a1.03 1.03 0 0 0-1.458-1.456L7 5.543l-4.54-4.54a1.03 1.03 0 0 0-1.457 1.458L5.543 7l-4.54 4.54a1.03 1.03 0 1 0 1.457 1.456L7 8.457l4.54 4.54a1.03 1.03 0 0 0 1.456-1.458z"
    />
  </svg>`;

// ../node_modules/@spectrum-web-components/icons-ui/src/elements/IconCross500.js
var IconCross500 = class extends IconBase {
  render() {
    return setCustomTemplateLiteralTag(src_exports.html), Cross500Icon();
  }
};

// ../node_modules/@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js
init_define_element();
defineElement("sp-icon-cross500", IconCross500);

// ../node_modules/@spectrum-web-components/icon/src/spectrum-icon-cross.css.js
init_src();
var c8 = src_exports.css`
    .spectrum-UIIcon-Cross75{--spectrum-icon-size:var(--spectrum-cross-icon-size-75)}.spectrum-UIIcon-Cross100{--spectrum-icon-size:var(--spectrum-cross-icon-size-100)}.spectrum-UIIcon-Cross200{--spectrum-icon-size:var(--spectrum-cross-icon-size-200)}.spectrum-UIIcon-Cross300{--spectrum-icon-size:var(--spectrum-cross-icon-size-300)}.spectrum-UIIcon-Cross400{--spectrum-icon-size:var(--spectrum-cross-icon-size-400)}.spectrum-UIIcon-Cross500{--spectrum-icon-size:var(--spectrum-cross-icon-size-500)}.spectrum-UIIcon-Cross600{--spectrum-icon-size:var(--spectrum-cross-icon-size-600)}
`;
var spectrum_icon_cross_css_default = c8;

// ../node_modules/@spectrum-web-components/button/src/CloseButton.js
var m5 = Object.defineProperty;
var u9 = Object.getOwnPropertyDescriptor;
var p8 = (c12, t13, e16, o13) => {
  for (var s10 = o13 > 1 ? void 0 : o13 ? u9(t13, e16) : t13, i12 = c12.length - 1, n6; i12 >= 0; i12--)
    (n6 = c12[i12]) && (s10 = (o13 ? n6(t13, e16, s10) : n6(s10)) || s10);
  return o13 && s10 && m5(t13, e16, s10), s10;
};
var y = { s: () => src_exports.html`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `, m: () => src_exports.html`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `, l: () => src_exports.html`
        <sp-icon-cross400
            slot="icon"
            class="icon spectrum-UIIcon-Cross400"
        ></sp-icon-cross400>
    `, xl: () => src_exports.html`
        <sp-icon-cross500
            slot="icon"
            class="icon spectrum-UIIcon-Cross500"
        ></sp-icon-cross500>
    ` };
var CloseButton = class extends SizedMixin(StyledButton, { noDefaultSize: true }) {
  constructor() {
    super(...arguments);
    this.variant = "";
  }
  static get styles() {
    return [...super.styles, close_button_css_default, spectrum_icon_cross_css_default];
  }
  get buttonContent() {
    return [y[this.size]()];
  }
};
p8([(0, decorators_exports.property)({ reflect: true })], CloseButton.prototype, "variant", 2), p8([(0, decorators_exports.property)({ type: String, reflect: true })], CloseButton.prototype, "static", 2);

// ../node_modules/@spectrum-web-components/button/sp-close-button.js
init_define_element();
defineElement("sp-close-button", CloseButton);

// ../node_modules/@spectrum-web-components/button-group/src/ButtonGroup.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/button-group/src/button-group.css.js
init_src();
var o5 = src_exports.css`
    :host{--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host([size=s]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-200);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-200)}:host([size=l]),:host,:host([size=xl]){--spectrum-buttongroup-spacing-horizontal:var(--spectrum-spacing-300);--spectrum-buttongroup-spacing-vertical:var(--spectrum-spacing-300)}:host{gap:var(--mod-buttongroup-spacing-horizontal,var(--spectrum-buttongroup-spacing-horizontal));justify-content:var(--mod-buttongroup-justify-content,normal);flex-wrap:wrap;display:flex}::slotted(*){flex-shrink:0}:host([vertical]){gap:var(--mod-buttongroup-spacing-vertical,var(--spectrum-buttongroup-spacing-vertical));flex-direction:column;display:inline-flex}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;
var button_group_css_default = o5;

// ../node_modules/@spectrum-web-components/button-group/src/ButtonGroup.js
var i6 = Object.defineProperty;
var m6 = Object.getOwnPropertyDescriptor;
var a6 = (o13, t13, r9, s10) => {
  for (var e16 = s10 > 1 ? void 0 : s10 ? m6(t13, r9) : t13, l7 = o13.length - 1, n6; l7 >= 0; l7--)
    (n6 = o13[l7]) && (e16 = (s10 ? n6(t13, r9, e16) : n6(e16)) || e16);
  return s10 && e16 && i6(t13, r9, e16), e16;
};
var ButtonGroup = class extends SizedMixin(SpectrumElement, { noDefaultSize: true }) {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  static get styles() {
    return [button_group_css_default];
  }
  handleSlotchange({ target: r9 }) {
    r9.assignedElements().forEach((e16) => {
      e16.size = this.size;
    });
  }
  render() {
    return src_exports.html`
            <slot @slotchange=${this.handleSlotchange}></slot>
        `;
  }
};
a6([(0, decorators_exports.property)({ type: Boolean, reflect: true })], ButtonGroup.prototype, "vertical", 2);

// ../node_modules/@spectrum-web-components/button-group/sp-button-group.js
init_define_element();
defineElement("sp-button-group", ButtonGroup);

// ../node_modules/@spectrum-web-components/icons-workflow/src/elements/IconAlert.js
init_src();

// ../node_modules/@spectrum-web-components/icons-workflow/src/custom-tag.js
var t8;
var tag2 = function(e16, ...a10) {
  return t8 ? t8(e16, ...a10) : a10.reduce((r9, p13, l7) => r9 + p13 + e16[l7 + 1], e16[0]);
};
var setCustomTemplateLiteralTag2 = (e16) => {
  t8 = e16;
};

// ../node_modules/@spectrum-web-components/icons-workflow/src/icons/Alert.js
var AlertIcon = ({ width: a10 = 24, height: t13 = 24, hidden: e16 = false, title: r9 = "Alert" } = {}) => tag2`<svg
    xmlns="http://www.w3.org/2000/svg"
    height=${t13}
    viewBox="0 0 36 36"
    width=${a10}
    aria-hidden=${e16 ? "true" : "false"}
    role="img"
    fill="currentColor"
    aria-label=${r9}
  >
    <path
      d="M17.127 2.579.4 32.512A1 1 0 0 0 1.272 34h33.456a1 1 0 0 0 .872-1.488L18.873 2.579a1 1 0 0 0-1.746 0ZM20 29.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Zm0-6a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5Z"
    />
  </svg>`;

// ../node_modules/@spectrum-web-components/icons-workflow/src/elements/IconAlert.js
var IconAlert = class extends IconBase {
  render() {
    return setCustomTemplateLiteralTag2(src_exports.html), AlertIcon({ hidden: !this.label, title: this.label });
  }
};

// ../node_modules/@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js
init_define_element();
defineElement("sp-icon-alert", IconAlert);

// ../node_modules/@spectrum-web-components/dialog/src/Dialog.js
init_src2();

// ../node_modules/@spectrum-web-components/dialog/src/dialog.css.js
init_src();
var o7 = src_exports.css`
    :host{--spectrum-dialog-fullscreen-header-text-size:28px;--spectrum-dialog-min-inline-size:288px;--spectrum-dialog-confirm-small-width:400px;--spectrum-dialog-confirm-medium-width:480px;--spectrum-dialog-confirm-large-width:640px;--spectrum-dialog-confirm-divider-block-spacing-start:var(--spectrum-spacing-300);--spectrum-dialog-confirm-divider-block-spacing-end:var(--spectrum-spacing-200);--spectrum-dialog-confirm-description-text-color:var(--spectrum-gray-800);--spectrum-dialog-confirm-title-text-color:var(--spectrum-gray-900);--spectrum-dialog-confirm-description-text-line-height:var(--spectrum-line-height-100);--spectrum-dialog-confirm-title-text-line-height:var(--spectrum-line-height-100);--spectrum-dialog-heading-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-dialog-confirm-description-padding:var(--spectrum-spacing-50);--spectrum-dialog-confirm-description-margin:calc(var(--spectrum-spacing-50)*-1);--spectrum-dialog-confirm-footer-padding-top:var(--spectrum-spacing-600);--spectrum-dialog-confirm-gap-size:var(--spectrum-component-pill-edge-to-text-100);--spectrum-dialog-confirm-buttongroup-padding-top:var(--spectrum-spacing-600);--spectrum-dialog-confirm-close-button-size:var(--spectrum-component-height-100);--spectrum-dialog-confirm-close-button-padding:calc(26px - var(--spectrum-component-bottom-to-text-300));--spectrum-dialog-confirm-divider-height:var(--spectrum-spacing-50);box-sizing:border-box;min-inline-size:var(--mod-dialog-min-inline-size,var(--spectrum-dialog-min-inline-size));max-block-size:inherit;outline:none;inline-size:fit-content;max-inline-size:100%;display:flex}:host([size=s]){inline-size:var(--mod-dialog-confirm-small-width,var(--spectrum-dialog-confirm-small-width))}:host([size=m]){inline-size:var(--mod-dialog-confirm-medium-width,var(--spectrum-dialog-confirm-medium-width))}:host([size=l]){inline-size:var(--mod-dialog-confirm-large-width,var(--spectrum-dialog-confirm-large-width))}::slotted([slot=hero]){block-size:var(--mod-dialog-confirm-hero-height,var(--spectrum-dialog-confirm-hero-height));background-position:50%;background-size:cover;border-start-start-radius:var(--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius));border-start-end-radius:var(--mod-dialog-confirm-border-radius,var(--spectrum-dialog-confirm-border-radius));grid-area:a;overflow:hidden}.grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"a a a a a a"". . . . . ."".b c c c."".d d d d."".e e e e."".f f g g."". . . . . .";inline-size:100%;display:grid}::slotted([slot=heading]){font-size:var(--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size));font-weight:var(--mod-dialog-heading-font-weight,var(--spectrum-dialog-heading-font-weight));line-height:var(--mod-dialog-confirm-title-text-line-height,var(--spectrum-dialog-confirm-title-text-line-height));color:var(--mod-dialog-confirm-title-text-color,var(--spectrum-dialog-confirm-title-text-color));outline:none;grid-area:b;margin:0;padding-inline-end:var(--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size))}.no-header::slotted([slot=heading]){grid-area:h/h/i/i;padding-inline-end:0}.header{box-sizing:border-box;outline:none;grid-area:c;justify-content:flex-end;align-items:center;display:flex}.divider{grid-area:d;inline-size:100%;margin-block-start:var(--mod-dialog-confirm-divider-block-spacing-end,var(--spectrum-dialog-confirm-divider-block-spacing-end));margin-block-end:var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start))}:host([mode=fullscreen]) [name=heading]+.divider{margin-block-end:calc(var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start)) - var(--mod-dialog-confirm-description-padding,var(--spectrum-dialog-confirm-description-padding))*2)}:host([no-divider]) .divider{display:none}:host([no-divider]) ::slotted([slot=heading]){padding-block-end:calc(var(--mod-dialog-confirm-divider-block-spacing-end,var(--spectrum-dialog-confirm-divider-block-spacing-end)) + var(--mod-dialog-confirm-divider-block-spacing-start,var(--spectrum-dialog-confirm-divider-block-spacing-start)) + var(--mod-dialog-confirm-divider-height,var(--spectrum-dialog-confirm-divider-height)))}.content{box-sizing:border-box;-webkit-overflow-scrolling:touch;font-size:var(--mod-dialog-confirm-description-text-size,var(--spectrum-dialog-confirm-description-text-size));font-weight:var(--mod-dialog-confirm-description-font-weight,var(--spectrum-regular-font-weight));line-height:var(--mod-dialog-confirm-description-text-line-height,var(--spectrum-dialog-confirm-description-text-line-height));color:var(--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color));padding:calc(var(--mod-dialog-confirm-description-padding,var(--spectrum-dialog-confirm-description-padding))*2);margin:0 var(--mod-dialog-confirm-description-margin,var(--spectrum-dialog-confirm-description-margin));outline:none;grid-area:e;overflow-y:auto}.footer{outline:none;flex-wrap:wrap;grid-area:f;padding-block-start:var(--mod-dialog-confirm-footer-padding-top,var(--spectrum-dialog-confirm-footer-padding-top));display:flex}.footer>*,.footer>.spectrum-Button+.spectrum-Button{margin-block-end:0}.button-group{grid-area:g;justify-content:flex-end;padding-block-start:var(--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top));padding-inline-start:var(--mod-dialog-confirm-gap-size,var(--spectrum-dialog-confirm-gap-size));display:flex}:host([dismissable]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)minmax(0,var(--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)))var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"a a a a a a a"". . . . .l l"".b c c m l l"".d d d d d."".e e e e e."".f f g g g."". . . . . . ."}:host([dismissable]) .grid .button-group{display:none}:host([dismissable]) .grid .footer{color:var(--mod-dialog-confirm-description-text-color,var(--spectrum-dialog-confirm-description-text-color));grid-area:f/f/g/g}.close-button{grid-area:l;place-self:start end;margin-block-start:var(--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding));margin-inline-end:var(--mod-dialog-confirm-close-button-padding,var(--spectrum-dialog-confirm-close-button-padding))}:host([mode=fullscreen]){block-size:100%;inline-size:100%}:host([mode=fullscreenTakeover]){border-radius:0;block-size:100%;inline-size:100%}:host([mode=fullscreen]),:host([mode=fullscreenTakeover]){max-block-size:none;max-inline-size:none}:host([mode=fullscreen]) .grid,:host([mode=fullscreenTakeover]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))1fr auto auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto 1fr var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:". . . . ."".b c g."".d d d."".e e e."". . . . .";display:grid}:host([mode=fullscreen]) ::slotted([slot=heading]),:host([mode=fullscreenTakeover]) ::slotted([slot=heading]){font-size:var(--mod-dialog-fullscreen-header-text-size,var(--spectrum-dialog-fullscreen-header-text-size))}:host([mode=fullscreen]) .content,:host([mode=fullscreenTakeover]) .content{max-block-size:none}:host([mode=fullscreen]) .button-group,:host([mode=fullscreen]) .footer,:host([mode=fullscreenTakeover]) .button-group,:host([mode=fullscreenTakeover]) .footer{padding-block-start:0}:host([mode=fullscreen]) .footer,:host([mode=fullscreenTakeover]) .footer{display:none}:host([mode=fullscreen]) .button-group,:host([mode=fullscreenTakeover]) .button-group{grid-area:g;align-self:start}@media screen and (width<=700px){.grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"a a a a a a"". . . . . ."".b b b b."".c c c c."".d d d d."".e e e e."".f f g g."". . . . . ."}.grid,:host([dismissable]) .grid{grid-template-rows:auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))}:host([dismissable]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto 1fr auto minmax(0,auto)minmax(0,var(--mod-dialog-confirm-close-button-size,var(--spectrum-dialog-confirm-close-button-size)))var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:"a a a a a a a"". . . . .l l"".b b b b l l"".c c c c c."".d d d d d."".e e e e e."".f f g g g."". . . . . . ."}.header{justify-content:flex-start}:host([mode=fullscreen]) .grid,:host([mode=fullscreenTakeover]) .grid{grid-template-columns:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))1fr var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-rows:var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid))auto auto auto 1fr auto var(--mod-dialog-confirm-padding-grid,var(--spectrum-dialog-confirm-padding-grid));grid-template-areas:". . ."".b."".c."".d."".e."".g."". . .";display:grid}:host([mode=fullscreen]) .button-group,:host([mode=fullscreenTakeover]) .button-group{padding-block-start:var(--mod-dialog-confirm-buttongroup-padding-top,var(--spectrum-dialog-confirm-buttongroup-padding-top))}:host([mode=fullscreen]) ::slotted([slot=heading]),:host([mode=fullscreenTakeover]) ::slotted([slot=heading]){font-size:var(--mod-dialog-confirm-title-text-size,var(--spectrum-dialog-confirm-title-text-size))}}@media (forced-colors:active){:host{border:solid}}:host{--swc-alert-dialog-error-icon-color:var(--spectrum-negative-visual-color)}.content{overflow:hidden}.footer{color:var(--spectrum-dialog-confirm-description-text-color,var(--spectrum-gray-800))}.type-icon{color:var(--mod-alert-dialog-error-icon-color,var(--swc-alert-dialog-error-icon-color));grid-area:i}.content[tabindex]{overflow:auto}::slotted(img[slot=hero]){width:100%;height:auto}.grid{grid-template-areas:"a a a a a a"". . . . . ."".b c c i."".d d d d."".e e e e."".f f g g."". . . . . ."}:host([dismissable]) .grid{grid-template-areas:"a a a a a a a"". . . . .l l"".b c c i l l"".d d d d d."".e e e e e."".f f g g g."". . . . . . ."}.button-group.button-group--noFooter{grid-area:f/f/g/g}
`;
var dialog_css_default = o7;

// ../node_modules/@spectrum-web-components/alert-dialog/src/AlertDialog.js
init_src();
init_decorators();
init_focus_visible();
init_random_id();
init_condition_attribute_with_id();

// ../node_modules/@lit-labs/observers/resize-controller.js
var s6 = class {
  constructor(s10, { target: t13, config: i12, callback: h9, skipInitial: e16 }) {
    this.t = /* @__PURE__ */ new Set(), this.o = false, this.i = false, this.h = s10, null !== t13 && this.t.add(t13 ?? s10), this.l = i12, this.o = e16 ?? this.o, this.callback = h9, window.ResizeObserver ? (this.u = new ResizeObserver((s11) => {
      this.handleChanges(s11), this.h.requestUpdate();
    }), s10.addController(this)) : console.warn("ResizeController error: browser does not support ResizeObserver.");
  }
  handleChanges(s10) {
    this.value = this.callback?.(s10, this.u);
  }
  hostConnected() {
    for (const s10 of this.t)
      this.observe(s10);
  }
  hostDisconnected() {
    this.disconnect();
  }
  async hostUpdated() {
    !this.o && this.i && this.handleChanges([]), this.i = false;
  }
  observe(s10) {
    this.t.add(s10), this.u.observe(s10, this.l), this.i = true, this.h.requestUpdate();
  }
  unobserve(s10) {
    this.t.delete(s10), this.u.unobserve(s10);
  }
  disconnect() {
    this.u.disconnect();
  }
};

// ../node_modules/@spectrum-web-components/alert-dialog/src/alert-dialog.css.js
init_src();
var e13 = src_exports.css`
    :host{--spectrum-alert-dialog-min-width:var(--spectrum-alert-dialog-minimum-width);--spectrum-alert-dialog-max-width:var(--spectrum-alert-dialog-maximum-width);--spectrum-alert-dialog-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-alert-dialog-warning-icon-color:var(--spectrum-notice-visual-color);--spectrum-alert-dialog-error-icon-color:var(--spectrum-negative-visual-color);--spectrum-alert-dialog-title-font-family:var(--spectrum-sans-font-family-stack);--spectrum-alert-dialog-title-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-alert-dialog-title-font-style:var(--spectrum-heading-sans-serif-font-style);--spectrum-alert-dialog-title-font-size:var(--spectrum-alert-dialog-title-size);--spectrum-alert-dialog-title-line-height:var(--spectrum-heading-line-height);--spectrum-alert-dialog-title-color:var(--spectrum-heading-color);--spectrum-alert-dialog-body-font-family:var(--spectrum-sans-font-family-stack);--spectrum-alert-dialog-body-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-alert-dialog-body-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-alert-dialog-body-font-size:var(--spectrum-alert-dialog-description-size);--spectrum-alert-dialog-body-line-height:var(--spectrum-line-height-100);--spectrum-alert-dialog-body-color:var(--spectrum-body-color);--spectrum-alert-dialog-title-to-divider:var(--spectrum-spacing-200);--spectrum-alert-dialog-divider-to-description:var(--spectrum-spacing-300);--spectrum-alert-dialog-title-to-icon:var(--spectrum-spacing-300);--mod-buttongroup-justify-content:flex-end;box-sizing:border-box;min-inline-size:var(--mod-alert-dialog-min-width,var(--spectrum-alert-dialog-min-width));max-inline-size:var(--mod-alert-dialog-max-width,var(--spectrum-alert-dialog-max-width));max-block-size:inherit;padding:var(--mod-alert-dialog-padding,var(--spectrum-alert-dialog-padding));outline:none;inline-size:fit-content;display:flex}.icon{inline-size:var(--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size));block-size:var(--mod-alert-dialog-icon-size,var(--spectrum-alert-dialog-icon-size));flex-shrink:0;margin-inline-start:var(--mod-alert-dialog-title-to-icon,var(--spectrum-alert-dialog-title-to-icon))}:host([variant=warning]){--mod-icon-color:var(--mod-alert-dialog-warning-icon-color,var(--spectrum-alert-dialog-warning-icon-color))}:host([variant=error]){--mod-icon-color:var(--mod-alert-dialog-error-icon-color,var(--spectrum-alert-dialog-error-icon-color))}.grid{display:grid}.header{justify-content:space-between;align-items:baseline;display:flex}::slotted([slot=heading]){font-family:var(--mod-alert-dialog-title-font-family,var(--spectrum-alert-dialog-title-font-family));font-weight:var(--mod-alert-dialog-title-font-weight,var(--spectrum-alert-dialog-title-font-weight));font-style:var(--mod-alert-dialog-title-font-style,var(--spectrum-alert-dialog-title-font-style));font-size:var(--mod-alert-dialog-title-font-size,var(--spectrum-alert-dialog-title-font-size));line-height:var(--mod-alert-dialog-title-line-height,var(--spectrum-alert-dialog-title-line-height));color:var(--mod-alert-dialog-title-color,var(--spectrum-alert-dialog-title-color));margin:0;margin-block-end:var(--mod-alert-dialog-title-to-divider,var(--spectrum-alert-dialog-title-to-divider))}.content{font-family:var(--mod-alert-dialog-body-font-family,var(--spectrum-alert-dialog-body-font-family));font-weight:var(--mod-alert-dialog-body-font-weight,var(--spectrum-alert-dialog-body-font-weight));font-style:var(--mod-alert-dialog-body-font-style,var(--spectrum-alert-dialog-body-font-style));font-size:var(--mod-alert-dialog-body-font-size,var(--spectrum-alert-dialog-body-font-size));line-height:var(--mod-alert-dialog-body-line-height,var(--spectrum-alert-dialog-body-line-height));color:var(--mod-alert-dialog-body-color,var(--spectrum-alert-dialog-body-color));-webkit-overflow-scrolling:touch;margin:0;margin-block-start:var(--mod-alert-dialog-divider-to-description,var(--spectrum-alert-dialog-divider-to-description));margin-block-end:var(--mod-alert-dialog-description-to-buttons,var(--spectrum-alert-dialog-description-to-buttons));overflow-y:auto}@media (forced-colors:active){:host{border:solid}}
`;
var alert_dialog_css_default = e13;

// ../node_modules/@spectrum-web-components/alert-dialog/src/AlertDialog.js
var b4 = Object.defineProperty;
var u10 = Object.getOwnPropertyDescriptor;
var l4 = (a10, r9, e16, t13) => {
  for (var i12 = t13 > 1 ? void 0 : t13 ? u10(r9, e16) : r9, n6 = a10.length - 1, d12; n6 >= 0; n6--)
    (d12 = a10[n6]) && (i12 = (t13 ? d12(r9, e16, i12) : d12(i12)) || i12);
  return t13 && i12 && b4(r9, e16, i12), i12;
};
var alertDialogVariants = ["confirmation", "information", "warning", "error", "destructive", "secondary"];
function h5(a10, r9) {
  const e16 = a10.assignedElements(), t13 = [];
  return e16.forEach((i12) => {
    if (i12.id)
      t13.push(i12.id);
    else {
      const n6 = r9 + `-${randomID()}`;
      i12.id = n6, t13.push(n6);
    }
  }), t13;
}
var o8 = class o9 extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.resizeController = new s6(this, { callback: () => {
      this.shouldManageTabOrderForScrolling();
    } });
    this._variant = "";
    this.labelledbyId = `sp-dialog-label-${o9.instanceCount++}`;
    this.shouldManageTabOrderForScrolling = () => {
      if (!this.contentElement)
        return;
      const { offsetHeight: e16, scrollHeight: t13 } = this.contentElement;
      e16 < t13 ? this.contentElement.tabIndex = 0 : this.contentElement.removeAttribute("tabindex");
    };
    this.describedbyId = `sp-dialog-description-${o9.instanceCount++}`;
  }
  static get styles() {
    return [alert_dialog_css_default];
  }
  set variant(e16) {
    if (e16 === this.variant)
      return;
    const t13 = this.variant;
    alertDialogVariants.includes(e16) ? (this.setAttribute("variant", e16), this._variant = e16) : (this.removeAttribute("variant"), this._variant = ""), this.requestUpdate("variant", t13);
  }
  get variant() {
    return this._variant;
  }
  renderIcon() {
    switch (this.variant) {
      case "warning":
      case "error":
        return src_exports.html`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;
      default:
        return src_exports.html``;
    }
  }
  renderHeading() {
    return src_exports.html`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `;
  }
  renderContent() {
    return src_exports.html`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `;
  }
  onHeadingSlotchange({ target: e16 }) {
    this.conditionLabelledby && (this.conditionLabelledby(), delete this.conditionLabelledby);
    const t13 = h5(e16, this.labelledbyId);
    t13.length && (this.conditionLabelledby = conditionAttributeWithId(this, "aria-labelledby", t13));
  }
  onContentSlotChange({ target: e16 }) {
    requestAnimationFrame(() => {
      this.resizeController.unobserve(this.contentElement), this.resizeController.observe(this.contentElement);
    }), this.conditionDescribedby && (this.conditionDescribedby(), delete this.conditionDescribedby);
    const t13 = h5(e16, this.describedbyId);
    if (t13.length && t13.length < 4)
      this.conditionDescribedby = conditionAttributeWithId(this, "aria-describedby", t13);
    else if (!t13.length) {
      const i12 = !!this.id;
      i12 || (this.id = this.describedbyId);
      const n6 = conditionAttributeWithId(this, "aria-describedby", this.id);
      this.conditionDescribedby = () => {
        n6(), i12 || this.removeAttribute("id");
      };
    }
  }
  renderButtons() {
    return src_exports.html`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `;
  }
  render() {
    return src_exports.html`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `;
  }
};
o8.instanceCount = 0, l4([(0, decorators_exports.query)(".content")], o8.prototype, "contentElement", 2), l4([(0, decorators_exports.property)({ type: String, reflect: true })], o8.prototype, "variant", 1);
var AlertDialog = o8;

// ../node_modules/@spectrum-web-components/dialog/src/Dialog.js
init_directives();
var a7 = Object.defineProperty;
var c9 = Object.getOwnPropertyDescriptor;
var t11 = (u13, i12, e16, n6) => {
  for (var r9 = n6 > 1 ? void 0 : n6 ? c9(i12, e16) : i12, p13 = u13.length - 1, d12; p13 >= 0; p13--)
    (d12 = u13[p13]) && (r9 = (n6 ? d12(i12, e16, r9) : d12(r9)) || r9);
  return n6 && r9 && a7(i12, e16, r9), r9;
};
var Dialog = class extends ObserveSlotPresence(AlertDialog, ['[slot="hero"]', '[slot="footer"]', '[slot="button"]']) {
  constructor() {
    super(...arguments);
    this.error = false;
    this.dismissable = false;
    this.dismissLabel = "Close";
    this.noDivider = false;
  }
  static get styles() {
    return [dialog_css_default];
  }
  get hasFooter() {
    return this.getSlotContentPresence('[slot="footer"]');
  }
  get hasButtons() {
    return this.getSlotContentPresence('[slot="button"]');
  }
  get hasHero() {
    return this.getSlotContentPresence('[slot="hero"]');
  }
  close() {
    this.dispatchEvent(new Event("close", { bubbles: true, composed: true, cancelable: true }));
  }
  renderHero() {
    return src_exports.html`
            <slot name="hero"></slot>
        `;
  }
  renderFooter() {
    return src_exports.html`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `;
  }
  renderButtons() {
    const e16 = { "button-group": true, "button-group--noFooter": !this.hasFooter };
    return src_exports.html`
            <sp-button-group class=${classMap(e16)}>
                <slot name="button"></slot>
            </sp-button-group>
        `;
  }
  renderDismiss() {
    return src_exports.html`
            <sp-close-button
                class="close-button"
                label=${this.dismissLabel}
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `;
  }
  render() {
    return src_exports.html`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error ? src_exports.html`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      ` : src_exports.nothing}
                ${this.noDivider ? src_exports.nothing : src_exports.html`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter ? this.renderFooter() : src_exports.nothing}
                ${this.hasButtons ? this.renderButtons() : src_exports.nothing}
                ${this.dismissable ? this.renderDismiss() : src_exports.nothing}
            </div>
        `;
  }
  shouldUpdate(e16) {
    return e16.has("mode") && this.mode && (this.dismissable = false), e16.has("dismissable") && this.dismissable && (this.dismissable = !this.mode), super.shouldUpdate(e16);
  }
  firstUpdated(e16) {
    super.firstUpdated(e16), this.setAttribute("role", "dialog");
  }
};
t11([(0, decorators_exports.query)(".close-button")], Dialog.prototype, "closeButton", 2), t11([(0, decorators_exports.property)({ type: Boolean, reflect: true })], Dialog.prototype, "error", 2), t11([(0, decorators_exports.property)({ type: Boolean, reflect: true })], Dialog.prototype, "dismissable", 2), t11([(0, decorators_exports.property)({ type: String, reflect: true, attribute: "dismiss-label" })], Dialog.prototype, "dismissLabel", 2), t11([(0, decorators_exports.property)({ type: Boolean, reflect: true, attribute: "no-divider" })], Dialog.prototype, "noDivider", 2), t11([(0, decorators_exports.property)({ type: String, reflect: true })], Dialog.prototype, "mode", 2), t11([(0, decorators_exports.property)({ type: String, reflect: true })], Dialog.prototype, "size", 2);

// ../node_modules/@spectrum-web-components/dialog/sp-dialog.js
init_define_element();
defineElement("sp-dialog", Dialog);

// ../node_modules/@spectrum-web-components/dialog/src/DialogBase.js
init_src();
init_decorators();

// ../node_modules/@spectrum-web-components/modal/src/modal-wrapper.css.js
init_src();
var e14 = src_exports.css`
    :host{box-sizing:border-box;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-modal-transition-animation-duration));justify-content:center;align-items:center;block-size:stretch;inline-size:100vw;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;margin-block-start:0}}
`;
var modal_wrapper_css_default = e14;

// ../node_modules/@spectrum-web-components/modal/src/modal.css.js
init_src();
var i9 = src_exports.css`
    .modal{pointer-events:none;visibility:hidden;opacity:0;transition:transform var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,opacity var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))ease-in-out,visibility 0s linear var(--mod-overlay-animation-duration,var(--spectrum-animation-duration-100,.13s))}:host([open]) .modal{pointer-events:auto;visibility:visible;opacity:1;transition-delay:var(--mod-overlay-animation-duration-opened,var(--spectrum-animation-duration-0,0s))}:host{--spectrum-modal-confirm-exit-animation-delay:var(--spectrum-animation-duration-0);--spectrum-modal-fullscreen-margin:32px;--spectrum-modal-max-height:90vh;--spectrum-modal-max-width:90%;--spectrum-modal-background-color:var(--spectrum-gray-100);--spectrum-modal-confirm-border-radius:var(--spectrum-corner-radius-100);--spectrum-modal-confirm-exit-animation-duration:var(--spectrum-animation-duration-100);--spectrum-modal-confirm-entry-animation-duration:var(--spectrum-animation-duration-500);--spectrum-modal-confirm-entry-animation-delay:var(--spectrum-animation-duration-200);--spectrum-modal-transition-animation-duration:var(--spectrum-animation-duration-100)}.modal{transform:translateY(var(--mod-modal-confirm-entry-animation-distance,var(--spectrum-modal-confirm-entry-animation-distance)));z-index:1;max-block-size:var(--mod-modal-max-height,var(--spectrum-modal-max-height));max-inline-size:var(--mod-modal-max-width,var(--spectrum-modal-max-width));background:var(--mod-modal-background-color,var(--spectrum-modal-background-color));border-radius:var(--mod-modal-confirm-border-radius,var(--spectrum-modal-confirm-border-radius));pointer-events:auto;transition:opacity var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-modal-confirm-exit-animation-duration))var(--spectrum-animation-ease-in)var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-modal-confirm-exit-animation-delay)),visibility 0s linear calc(var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-modal-confirm-exit-animation-delay)) + var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-modal-confirm-exit-animation-duration))),transform 0s linear calc(var(--mod-modal-confirm-exit-animation-delay,var(--spectrum-modal-confirm-exit-animation-delay)) + var(--mod-modal-confirm-exit-animation-duration,var(--spectrum-modal-confirm-exit-animation-duration)));outline:none;overflow:hidden}:host([open]) .modal{transition:transform var(--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration))var(--spectrum-animation-ease-out)var(--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay)),opacity var(--mod-modal-confirm-entry-animation-duration,var(--spectrum-modal-confirm-entry-animation-duration))var(--spectrum-animation-ease-out)var(--mod-modal-confirm-entry-animation-delay,var(--spectrum-modal-confirm-entry-animation-delay));transform:translateY(0)}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]) .modal{border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}}.fullscreen{max-block-size:none;max-inline-size:none;position:fixed;inset-block-start:var(--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin));inset-block-end:var(--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin));inset-inline-start:var(--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin));inset-inline-end:var(--mod-modal-fullscreen-margin,var(--spectrum-modal-fullscreen-margin))}.fullscreenTakeover{box-sizing:border-box;border:none;border-radius:0;max-block-size:none;max-inline-size:none;position:fixed;inset:0}.fullscreenTakeover,:host([open]) .fullscreenTakeover{transform:none}:host{--spectrum-dialog-confirm-exit-animation-duration:var(--swc-test-duration);--spectrum-dialog-confirm-entry-animation-duration:var(--swc-test-duration);--spectrum-modal-confirm-entry-animation-distance:var(--spectrum-dialog-confirm-entry-animation-distance);height:100dvh}.modal{overflow:visible}
`;
var modal_css_default = i9;

// ../node_modules/@spectrum-web-components/dialog/src/DialogBase.js
init_src2();
init_first_focusable_in();
var p10 = Object.defineProperty;
var h6 = Object.getOwnPropertyDescriptor;
var o11 = (n6, s10, e16, i12) => {
  for (var t13 = i12 > 1 ? void 0 : i12 ? h6(s10, e16) : s10, a10 = n6.length - 1, l7; a10 >= 0; a10--)
    (l7 = n6[a10]) && (t13 = (i12 ? l7(s10, e16, t13) : l7(t13)) || t13);
  return i12 && t13 && p10(s10, e16, t13), t13;
};
var DialogBase = class extends FocusVisiblePolyfillMixin(SpectrumElement) {
  constructor() {
    super(...arguments);
    this.dismissable = false;
    this.open = false;
    this.responsive = false;
    this.transitionPromise = Promise.resolve();
    this.resolveTransitionPromise = () => {
    };
    this.underlay = false;
    this.animating = false;
  }
  static get styles() {
    return [modal_wrapper_css_default, modal_css_default];
  }
  get dialog() {
    return this.shadowRoot.querySelector("slot").assignedElements()[0] || this;
  }
  async focus() {
    if (this.shadowRoot) {
      const e16 = firstFocusableIn(this.dialog);
      e16 ? (e16.updateComplete && await e16.updateComplete, e16.focus()) : this.dialog.focus();
    } else
      super.focus();
  }
  overlayWillCloseCallback() {
    return this.open ? (this.close(), true) : this.animating;
  }
  dismiss() {
    this.dismissable && this.close();
  }
  handleClose(e16) {
    e16.stopPropagation(), this.close();
  }
  close() {
    this.open = false;
  }
  dispatchClosed() {
    this.dispatchEvent(new Event("close", { bubbles: true }));
  }
  handleTransitionEvent(e16) {
    this.dispatchEvent(new TransitionEvent(e16.type, { bubbles: true, composed: true, propertyName: e16.propertyName }));
  }
  handleUnderlayTransitionend(e16) {
    !this.open && e16.propertyName === "visibility" && this.resolveTransitionPromise(), this.handleTransitionEvent(e16);
  }
  handleModalTransitionend(e16) {
    (this.open || !this.underlay) && this.resolveTransitionPromise(), this.handleTransitionEvent(e16);
  }
  update(e16) {
    e16.has("open") && e16.get("open") !== void 0 && (this.animating = true, this.transitionPromise = new Promise((i12) => {
      this.resolveTransitionPromise = () => {
        this.animating = false, i12();
      };
    }), this.open || this.dispatchClosed()), super.update(e16);
  }
  renderDialog() {
    return src_exports.html`
            <slot></slot>
        `;
  }
  render() {
    return src_exports.html`
            ${this.underlay ? src_exports.html`
                      <sp-underlay
                          ?open=${this.open}
                          @close=${this.dismiss}
                          @transitionrun=${this.handleTransitionEvent}
                          @transitionend=${this.handleUnderlayTransitionend}
                          @transitioncancel=${this.handleTransitionEvent}
                      ></sp-underlay>
                  ` : src_exports.nothing}
            <div
                class="modal ${this.mode}"
                @transitionrun=${this.handleTransitionEvent}
                @transitionend=${this.handleModalTransitionend}
                @transitioncancel=${this.handleTransitionEvent}
                @close=${this.handleClose}
            >
                ${this.renderDialog()}
            </div>
        `;
  }
  updated(e16) {
    e16.has("open") && this.open && "updateComplete" in this.dialog && "shouldManageTabOrderForScrolling" in this.dialog && this.dialog.updateComplete.then(() => {
      this.dialog.shouldManageTabOrderForScrolling();
    });
  }
  async getUpdateComplete() {
    const e16 = await super.getUpdateComplete();
    return await this.transitionPromise, e16;
  }
};
o11([(0, decorators_exports.property)({ type: Boolean, reflect: true })], DialogBase.prototype, "dismissable", 2), o11([(0, decorators_exports.property)({ type: Boolean, reflect: true })], DialogBase.prototype, "open", 2), o11([(0, decorators_exports.property)({ type: String, reflect: true })], DialogBase.prototype, "mode", 2), o11([(0, decorators_exports.property)({ type: Boolean })], DialogBase.prototype, "responsive", 2), o11([(0, decorators_exports.property)({ type: Boolean })], DialogBase.prototype, "underlay", 2);

// ../node_modules/@spectrum-web-components/dialog/src/DialogWrapper.js
var h7 = Object.defineProperty;
var u12 = Object.getOwnPropertyDescriptor;
var e15 = (c12, o13, r9, n6) => {
  for (var i12 = n6 > 1 ? void 0 : n6 ? u12(o13, r9) : o13, b6 = c12.length - 1, d12; b6 >= 0; b6--)
    (d12 = c12[b6]) && (i12 = (n6 ? d12(o13, r9, i12) : d12(i12)) || i12);
  return n6 && i12 && h7(o13, r9, i12), i12;
};
var DialogWrapper = class extends DialogBase {
  constructor() {
    super(...arguments);
    this.error = false;
    this.cancelLabel = "";
    this.confirmLabel = "";
    this.dismissLabel = "Close";
    this.footer = "";
    this.hero = "";
    this.heroLabel = "";
    this.noDivider = false;
    this.secondaryLabel = "";
    this.headline = "";
  }
  static get styles() {
    return [...super.styles];
  }
  get dialog() {
    return this.shadowRoot.querySelector("sp-dialog");
  }
  clickSecondary() {
    this.dispatchEvent(new Event("secondary", { bubbles: true }));
  }
  clickCancel() {
    this.dispatchEvent(new Event("cancel", { bubbles: true }));
  }
  clickConfirm() {
    this.dispatchEvent(new Event("confirm", { bubbles: true }));
  }
  renderDialog() {
    const r9 = this.noDivider || !this.headline || this.headlineVisibility === "none";
    return src_exports.html`
            <sp-dialog
                ?dismissable=${this.dismissable}
                dismiss-label=${this.dismissLabel}
                ?no-divider=${r9}
                ?error=${this.error}
                mode=${ifDefined(this.mode)}
                size=${ifDefined(this.size)}
            >
                ${this.hero ? src_exports.html`
                          <img
                              src="${this.hero}"
                              slot="hero"
                              aria-hidden=${ifDefined(this.heroLabel ? void 0 : "true")}
                              alt=${ifDefined(this.heroLabel ? this.heroLabel : void 0)}
                          />
                      ` : src_exports.nothing}
                ${this.headline ? src_exports.html`
                          <h2
                              slot="heading"
                              ?hidden=${this.headlineVisibility === "none"}
                          >
                              ${this.headline}
                          </h2>
                      ` : src_exports.nothing}
                <slot></slot>
                ${this.footer ? src_exports.html`
                          <div slot="footer">${this.footer}</div>
                      ` : src_exports.nothing}
                ${this.cancelLabel ? src_exports.html`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickCancel}
                          >
                              ${this.cancelLabel}
                          </sp-button>
                      ` : src_exports.nothing}
                ${this.secondaryLabel ? src_exports.html`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              slot="button"
                              @click=${this.clickSecondary}
                          >
                              ${this.secondaryLabel}
                          </sp-button>
                      ` : src_exports.nothing}
                ${this.confirmLabel ? src_exports.html`
                          <sp-button
                              variant="accent"
                              slot="button"
                              @click=${this.clickConfirm}
                          >
                              ${this.confirmLabel}
                          </sp-button>
                      ` : src_exports.nothing}
            </sp-dialog>
        `;
  }
};
e15([(0, decorators_exports.property)({ type: Boolean, reflect: true })], DialogWrapper.prototype, "error", 2), e15([(0, decorators_exports.property)({ attribute: "cancel-label" })], DialogWrapper.prototype, "cancelLabel", 2), e15([(0, decorators_exports.property)({ attribute: "confirm-label" })], DialogWrapper.prototype, "confirmLabel", 2), e15([(0, decorators_exports.property)({ attribute: "dismiss-label" })], DialogWrapper.prototype, "dismissLabel", 2), e15([(0, decorators_exports.property)()], DialogWrapper.prototype, "footer", 2), e15([(0, decorators_exports.property)()], DialogWrapper.prototype, "hero", 2), e15([(0, decorators_exports.property)({ attribute: "hero-label" })], DialogWrapper.prototype, "heroLabel", 2), e15([(0, decorators_exports.property)({ type: Boolean, reflect: true, attribute: "no-divider" })], DialogWrapper.prototype, "noDivider", 2), e15([(0, decorators_exports.property)({ type: String, reflect: true })], DialogWrapper.prototype, "size", 2), e15([(0, decorators_exports.property)({ attribute: "secondary-label" })], DialogWrapper.prototype, "secondaryLabel", 2), e15([(0, decorators_exports.property)()], DialogWrapper.prototype, "headline", 2), e15([(0, decorators_exports.property)({ type: String, attribute: "headline-visibility" })], DialogWrapper.prototype, "headlineVisibility", 2);

// ../node_modules/@spectrum-web-components/dialog/sp-dialog-wrapper.js
init_define_element();
defineElement("sp-dialog-wrapper", DialogWrapper);

// src/plans-modal.js
init_sp_overlay();

// ../node_modules/@spectrum-web-components/reactive-controllers/src/MatchMedia.js
var MatchMediaController = class {
  constructor(e16, t13) {
    this.key = Symbol("match-media-key");
    this.matches = false;
    this.host = e16, this.host.addController(this), this.media = window.matchMedia(t13), this.matches = this.media.matches, this.onChange = this.onChange.bind(this), e16.addController(this);
  }
  hostConnected() {
    var e16;
    (e16 = this.media) == null || e16.addEventListener("change", this.onChange);
  }
  hostDisconnected() {
    var e16;
    (e16 = this.media) == null || e16.removeEventListener("change", this.onChange);
  }
  onChange(e16) {
    this.matches !== e16.matches && (this.matches = e16.matches, this.host.requestUpdate(this.key, !this.matches));
  }
};

// src/global.css.js
var styles = document.createElement("style");
styles.innerHTML = `
:root {
    --consonant-merch-card-detail-font-size: 12px;
    --consonant-merch-card-detail-font-weight: 500;
    --consonant-merch-card-detail-letter-spacing: 0.8px;
    --merch-card-background-color: #fff;

    --consonant-merch-card-heading-font-size: 18px;
    --consonant-merch-card-heading-line-height: 22.5px;
    --consonant-merch-card-heading-secondary-font-size: 14px;
    --consonant-merch-card-body-font-size: 14px;
    --consonant-merch-card-body-line-height: 21px;
    --consonant-merch-card-promo-text-height: var(--consonant-merch-card-body-font-size);

    /* responsive width */
    --consonant-merch-card-mobile-width: 300px;
    --consonant-merch-card-tablet-wide-width: 700px;

    /* spacing */
    --consonant-merch-spacing-xxxs: 4px;
    --consonant-merch-spacing-xxs: 8px;
    --consonant-merch-spacing-xs: 16px;
    --consonant-merch-spacing-s: 24px;
    --consonant-merch-spacing-m: 32px;

    /* cta */
    --consonant-merch-card-cta-font-size: 15px;

    /* headings */
    --consonant-merch-card-heading-xs-font-size: 18px;
    --consonant-merch-card-heading-xs-line-height: 22.5px;
    --consonant-merch-card-heading-s-font-size: 20px;
    --consonant-merch-card-heading-s-line-height: 25px;
    --consonant-merch-card-heading-m-font-size: 24px;
    --consonant-merch-card-heading-m-line-height: 30px;
    --consonant-merch-card-heading-l-font-size: 20px;
    --consonant-merch-card-heading-l-line-height: 30px;
    --consonant-merch-card-heading-xl-font-size: 36px;
    --consonant-merch-card-heading-xl-line-height: 45px;

    /* detail */
    --consonant-merch-card-detail-m-font-size: 12px;
    --consonant-merch-card-detail-m-line-height: 15px;
    --consonant-merch-card-detail-m-font-weight: 700;
    --consonant-merch-card-detail-m-letter-spacing: 1px;

    /* body */
    --consonant-merch-card-body-xxs-font-size: 12px;
    --consonant-merch-card-body-xxs-line-height: 18px;
    --consonant-merch-card-body-xxs-letter-spacing: 1px;
    --consonant-merch-card-body-xs-font-size: 14px;
    --consonant-merch-card-body-xs-line-height: 21px;
    --consonant-merch-card-body-s-font-size: 16px;
    --consonant-merch-card-body-s-line-height: 24px;
    --consonant-merch-card-body-m-font-size: 18px;
    --consonant-merch-card-body-m-line-height: 27px;
    --consonant-merch-card-body-l-font-size: 20px;
    --consonant-merch-card-body-l-line-height: 30px;
    --consonant-merch-card-body-xl-font-size: 22px;
    --consonant-merch-card-body-xl-line-height: 33px;


    --consonant-merch-card-heading-padding: 0;

    /* colors */
    --consonant-merch-card-border-color: #eaeaea;
    --color-accent: #1473E6;
    --merch-color-focus-ring: #1473E6;
    --merch-color-grey-80: #2c2c2c;
    --merch-color-green-promo: #2D9D78;

    /* merch card generic */
    --consonant-merch-card-max-width: 300px;
    --transition: cmax-height 0.3s linear, opacity 0.3s linear;

    /* inline SVGs */
    --checkmark-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath fill='%23fff' d='M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z' class='spectrum-UIIcon--medium'/%3E%3C/svg%3E%0A");

    --secure-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23757575' viewBox='0 0 12 15'%3E%3Cpath d='M11.5 6H11V5A5 5 0 1 0 1 5v1H.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5ZM3 5a3 3 0 1 1 6 0v1H3Zm4 6.111V12.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1.389a1.5 1.5 0 1 1 2 0Z'/%3E%3C/svg%3E");

    --info-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><circle cx='18' cy='12' r='2.15'%3E%3C/circle%3E%3Cpath d='M20.333 24H20v-7.6a.4.4 0 0 0-.4-.4h-3.933s-1.167.032-1.167 1 1.167 1 1.167 1H16v6h-.333s-1.167.032-1.167 1 1.167 1 1.167 1h4.667s1.167-.033 1.167-1-1.168-1-1.168-1z'%3E%3C/path%3E%3Cpath d='M18 2.1A15.9 15.9 0 1 0 33.9 18 15.9 15.9 0 0 0 18 2.1zm0 29.812A13.912 13.912 0 1 1 31.913 18 13.912 13.912 0 0 1 18 31.913z'%3E%3C/path%3E%3C/svg%3E");

    --ellipsis-icon: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="2" cy="2" r="2" fill="%232c2c2c" transform="translate(6 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" data-name="Ellipse 71" transform="translate(12 6)"/><circle cx="2" cy="2" r="2" fill="%232c2c2c" transform="translate(0 6)"/></svg>');

    /* callout */
    --consonant-merch-card-callout-line-height: 21px;
    --consonant-merch-card-callout-font-size: 14px;
    --consonant-merch-card-callout-font-color: #2C2C2C;
    --consonant-merch-card-callout-icon-size: 16px;
    --consonant-merch-card-callout-icon-top: 6px;
    --consonant-merch-card-callout-icon-right: 8px;
    --consonant-merch-card-callout-letter-spacing: 0px;
    --consonant-merch-card-callout-icon-padding: 34px;
    --consonant-merch-card-callout-spacing-xxs: 8px;
}

merch-card-collection {
    display: contents;
}

merch-card-collection > merch-card:not([style]) {
    display: none;
}

merch-card-collection > p[slot],
merch-card-collection > div[slot] p {
    margin: 0;
}

.one-merch-card,
.two-merch-cards,
.three-merch-cards,
.four-merch-cards {
    display: grid;
    justify-content: center;
    justify-items: stretch;
    gap: var(--consonant-merch-spacing-m);
    padding: var(--spacing-m);
}

merch-card.background-opacity-70 {
    background-color: rgba(255 255 255 / 70%);
}

merch-card.has-divider hr {
    margin-bottom: var(--consonant-merch-spacing-xs);
    height: 1px;
    border: none;
}

merch-card p, merch-card h3, merch-card h4 {
    margin: 0;
}

merch-card span[is=inline-price] {
    display: inline-block;
}

merch-card [slot='heading-xs'] {
    color: var(--merch-color-grey-80);
    font-size: var(--consonant-merch-card-heading-xs-font-size);
    line-height: var(--consonant-merch-card-heading-xs-line-height);
    margin: 0;
    text-decoration: none;
}

merch-card.dc-pricing [slot='heading-xs'] {
    margin-bottom: var(--consonant-merch-spacing-xxs);
}

merch-card:not([variant='inline-heading']) [slot='heading-xs'] a {
    color: var(--merch-color-grey-80);
}

merch-card [slot='starting-at'] {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  line-height: var(--consonant-merch-card-body-xs-line-height);
  font-weight: 500;
}

merch-card [slot='heading-xs'] a:not(:hover) {
    text-decoration: inherit;
}

merch-card [slot='heading-s'] {
    font-size: var(--consonant-merch-card-heading-s-font-size);
    line-height: var(--consonant-merch-card-heading-s-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-m'] {
    font-size: var(--consonant-merch-card-heading-m-font-size);
    line-height: var(--consonant-merch-card-heading-m-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
    font-weight: 700;
}

merch-card [slot='heading-m-price'] {
    font-size: var(--consonant-merch-card-heading-m-font-size);
    line-height: var(--consonant-merch-card-heading-m-line-height);
    padding: 0 var(--consonant-merch-spacing-s);
    font-weight: 700;
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='offers'] {
    padding: var(--consonant-merch-spacing-xxs) var(--consonant-merch-spacing-s);
}

merch-card [slot='heading-l'] {
    font-size: var(--consonant-merch-card-heading-l-font-size);
    line-height: var(--consonant-merch-card-heading-l-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='heading-xl'] {
    font-size: var(--consonant-merch-card-heading-xl-font-size);
    line-height: var(--consonant-merch-card-heading-xl-line-height);
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot='callout-content'] {
    display: flex;
    flex-direction: column;
    margin: var(--consonant-merch-spacing-xxxs) 0px;
    gap: var(--consonant-merch-card-callout-spacing-xxs);
}

merch-card [slot='callout-content'] > div {
    display: flex;
    flex-direction: column;
    margin: var(--consonant-merch-spacing-xxxs) 0px;
    gap: var(--consonant-merch-card-callout-spacing-xxs);
    align-items: flex-start;
}

merch-card [slot='callout-content'] > div > div {
    display: flex;
    background: rgba(203 203 203 / 50%);
    border-radius: var(--consonant-merch-spacing-xxxs);
    padding: var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxxs) var(--consonant-merch-spacing-xxs);
}

merch-card [slot='callout-content'] > div > div > div {
    display: inline-block;
    text-align: start;
    font: normal normal normal var(--consonant-merch-card-callout-font-size)/var(--consonant-merch-card-callout-line-height) var(--body-font-family, 'Adobe Clean');
    letter-spacing: var(--consonant-merch-card-callout-letter-spacing);
    color: var(--consonant-merch-card-callout-font-color);
}

merch-card [slot='callout-content'] img {
    width: var(--consonant-merch-card-callout-icon-size);
    height: var(--consonant-merch-card-callout-icon-size);
    margin-inline-end: 2.5px;
    margin-inline-start: 9px;
    margin-block-start: 2.5px;
}

merch-card [slot='detail-m'] {
    font-size: var(--consonant-merch-card-detail-m-font-size);
    letter-spacing: var(--consonant-merch-card-detail-m-letter-spacing);
    font-weight: var(--consonant-merch-card-detail-m-font-weight);
    text-transform: uppercase;
    margin: 0;
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xxs"] {
    font-size: var(--consonant-merch-card-body-xxs-font-size);
    line-height: var(--consonant-merch-card-body-xxs-line-height);
    font-weight: normal;
    letter-spacing: var(--consonant-merch-card-body-xxs-letter-spacing);
    color: var(--merch-color-grey-80);
    margin: 0;
}

merch-card [slot="body-xs"] {
    font-size: var(--consonant-merch-card-body-xs-font-size);
    line-height: var(--consonant-merch-card-body-xs-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-m"] {
    font-size: var(--consonant-merch-card-body-m-font-size);
    line-height: var(--consonant-merch-card-body-m-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-l"] {
    font-size: var(--consonant-merch-card-body-l-font-size);
    line-height: var(--consonant-merch-card-body-l-line-height);
    color: var(--merch-color-grey-80);
}

merch-card [slot="body-xl"] {
    font-size: var(--consonant-merch-card-body-xl-font-size);
    line-height: var(--consonant-merch-card-body-xl-line-height);
    color: var(--merch-color-grey-80);
}

[slot="cci-footer"] p,
[slot="cct-footer"] p,
[slot="cce-footer"] p {
    margin: 0;
}

merch-card [slot="promo-text"] {
    color: var(--merch-color-green-promo);
    font-size: var(--consonant-merch-card-promo-text-height);
    font-weight: 700;
    line-height: var(--consonant-merch-card-promo-text-height);
    margin: 0;
    min-height: var(--consonant-merch-card-promo-text-height);
    padding: 0;
}

div[slot="footer"] {
    display: contents;
}

[slot="footer"] a {
    word-wrap: break-word;
    text-align: center;
}

[slot="footer"] a:not([class]) {
    font-weight: 700;
    font-size: var(--consonant-merch-card-cta-font-size);
}

div[slot='bg-image'] img {
    position: relative;
    width: 100%;
    min-height: var(--consonant-merch-card-image-height);
    max-height: var(--consonant-merch-card-image-height);
    object-fit: cover;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

span[is="inline-price"][data-template='strikethrough'] {
    text-decoration: line-through;
}

merch-card span.placeholder-resolved[data-template='strikethrough'],
merch-card span.price.price-strikethrough {
  font-size: var(--consonant-merch-card-body-xs-font-size);
  font-weight: normal;
}

/* merch-offer-select */
merch-offer-select[variant="subscription-options"] merch-offer span[is="inline-price"][data-display-tax='true'] .price-tax-inclusivity {
    font-size: 12px;
    font-style: italic;
    font-weight: normal;
    position: absolute;
    left: 0;
    top: 20px;
}

body.merch-modal {
    overflow: hidden;
    scrollbar-gutter: stable;
    height: 100vh;
}
`;
document.head.appendChild(styles);

// src/plans-modal.css.js
import { css } from "/libs/deps/lit-all.min.js";
var styles2 = css`
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
var plans_modal_css_default = styles2;

// src/media.js
var MOBILE_LANDSCAPE = "(max-width: 767px)";

// src/plans-modal.js
var PlansModal = class extends LitElement {
  static properties = {
    trigger: {},
    title: {},
    description: { attribute: "description" },
    includesLimit: {
      type: Number,
      attribute: "includes-limit",
      reflect: true
    },
    includes: {
      type: Array
    },
    extra: {
      type: Array
    },
    recommended: {
      type: Array
    },
    backText: { type: String, attribute: "back-text" },
    ctaText: { type: String, attribute: "cta-text" },
    extraText: { type: String, attribute: "extra-text" },
    includesText: { type: String, attribute: "includes-text" },
    recommendedText: { type: String, attribute: "recommended-text" },
    seeMoreText: { type: String, attribute: "see-more-text" }
  };
  mobileDevice = new MatchMediaController(this, MOBILE_LANDSCAPE);
  constructor() {
    super();
    this.includesLimit = 5;
    this.seeMoreText = " + See more";
  }
  render() {
    return html`
            <sp-theme theme="spectrum" color="light" scale="large">
                <sp-dialog-wrapper
                    slot="click-content"
                    title="${this.title}"
                    dismissable
                    underlay
                    no-divider
                    cancel-label="${this.backText}"
                    confirm-label="${this.ctaText}"
                    @close="${this.remove}"
                    @cancel="${this.remove}"
                    mode="${this.mobileDevice.matches ? "fullscreenTakeover" : void 0}"
                >
                    <div id="container" part="container">
                        <div id="title">
                            <slot name="icon"></slot>
                            <h2>${this.title}</h2>
                        </div>
                        <div id="description">
                            <slot name="icon"></slot>
                            <p>${this.description}</p>
                        </div>
                        <div id="includes">
                            <h3>${this.includesText || "Includes"}</h3>
                            <ul>
                                ${this.includes}
                            </ul>
                            ${this.seeMoreButton}
                        </div>
                        <div id="extra">
                            <h3>${this.extraText || "Extra"}</h3>
                            <ul>
                                ${this.extra}
                            </ul>
                        </div>
                        <div id="recommended">
                            <h3>${this.recommendedText || "Recommended"}</h3>
                            <ul>
                                ${this.recommended}
                            </ul>
                        </div>
                        <div id="actions">${this.subscriptionPanel}</div>
                    </div>
                </sp-dialog-wrapper>
            </sp-theme>
        `;
  }
  updated(changedProperties) {
    if (changedProperties.has("includesLimit")) {
      this.style.setProperty(
        "--consonant-plan-modal-includes-limit",
        this.includesLimit
      );
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(async () => {
      this.prepareSlots();
      this.openModal();
    });
  }
  seeMore() {
    this.hideSeeMoreButton = true;
    this.includesLimit = this.includes.length;
    this.style.setProperty("--consonant-plan-modal-includes", "auto");
  }
  get seeMoreButton() {
    return this.hideSeeMoreButton ? void 0 : html`
                  <sp-button
                      id="seeMore"
                      size="s"
                      treatment="outline"
                      variant="secondary"
                      @click="${this.seeMore}"
                  >
                      ${this.seeMoreText}
                  </sp-button>
              `;
  }
  prepareSlots() {
    this.offers = this.querySelector("offer");
    this.subscriptionPanel = this.querySelector("merch-subscription-panel");
    this.includes = [...this.querySelectorAll('[slot="includes"] > li')];
    this.hideSeeMoreButton = this.includes.length <= this.includesLimit;
    this.extra = [...this.querySelectorAll('[slot="extra"] > li')];
    this.recommended = [
      ...this.querySelectorAll('[slot="recommended"] > li')
    ];
  }
  async openModal() {
    const options = {
      offset: 0,
      placement: "none",
      trigger: this.trigger,
      type: "auto"
    };
    const overlay = await Overlay.open(
      this.shadowRoot.querySelector("sp-dialog-wrapper"),
      options
    );
    this.shadowRoot.querySelector("sp-theme").append(overlay);
  }
  static styles = [plans_modal_css_default];
};
customElements.define("plans-modal", PlansModal);
export {
  PlansModal as default
};
