/**
 * 一个 adoptedStyleSheets 的垫片实现
 */
class AdoptedStyleSheets extends Array<CSSStyleSheet> {
  constructor() {
    super();
    const methods: (keyof Array<CSSStyleSheet>)[] = [
      "push",
      "pop",
      "shift",
      "unshift",
      "splice",
    ];
    let dirty = false;
    const emitChange = () => {
      if (dirty) {
        return;
      }
      dirty = true;
      queueMicrotask(() => {
        dirty = false;
        document.adoptedStyleSheets = this;
      });
    };

    for (const method of methods) {
      Object.defineProperty(this, method, {
        value: (...args: any[]) => {
          const res = Array.prototype[method].apply(this, args);
          emitChange();
          return res;
        },
      });
    }
  }
}
export const adoptedStyleSheets = new AdoptedStyleSheets();
