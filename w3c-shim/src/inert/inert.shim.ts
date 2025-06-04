import {func_remember, withEffect} from "@gaubee/util";
const inert_helper = func_remember(() => {
  const css = String.raw;
  const cssSheet = new CSSStyleSheet();
  cssSheet.replace(css`
    [inert] {
      pointer-events: none;
      cursor: default;
    }

    [inert],
    [inert] * {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, cssSheet];

  Object.defineProperty(HTMLElement.prototype, "inert", {
    enumerable: true,
    get: function (this: HTMLElement) {
      return this.hasAttribute("inert");
    },
    set: function (this: HTMLElement, inert) {
      if (inert) {
        this.setAttribute("inert", "");
        this.ariaHidden = "true";
      } else {
        this.removeAttribute("inert");
        this.setAttribute("aria-hidden", "true");
        this.ariaHidden = null;
      }
    },
  });

  return {
    get: (element: Element) => {
      return element.hasAttribute("inert");
    },
    set: (element: Element, inert: unknown) => {
      if (inert) {
        element.setAttribute("inert", "");
        element.ariaHidden = "true";
      } else {
        element.removeAttribute("inert");
        element.setAttribute("aria-hidden", "true");
        element.ariaHidden = null;
      }
    },
  };
});
export const element_inert = withEffect(
  (element: Element) => {
    const helper = inert_helper();
    return {
      get inert() {
        return helper.get(element);
      },
      set inert(inert) {
        helper.set(element, inert);
      },
    };
  },
  () => {
    const helper = inert_helper();
    Object.defineProperty(HTMLElement.prototype, "inert", {
      enumerable: true,
      get: function (this: HTMLElement) {
        return helper.get(this);
      },
      set: function (this: HTMLElement, inert) {
        helper.set(this, inert);
      },
    });
  },
);
