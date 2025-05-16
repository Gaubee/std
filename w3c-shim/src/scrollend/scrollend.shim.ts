import {arr_remove_first, func_lazy, iter_iterable, map_get_or_put} from "@gaubee/util";

const binds_offs_wm = /*@__PURE__*/ new WeakMap<Element, WeakMap<EventListenerOrEventListenerObject, (() => void)[]>>();
const addOff = (ele: Element, handler: EventListenerOrEventListenerObject, off: () => void) => {
  const binds = map_get_or_put(binds_offs_wm, ele, () => new WeakMap());
  const offs = map_get_or_put(binds, handler, () => []);
  offs.push(off);
};
const getAndRemoveOff = (ele: Element, handler: EventListenerOrEventListenerObject, off?: () => void) => {
  const binds = binds_offs_wm.get(ele);
  const offs = binds?.get(handler);
  if (null == offs) {
    return;
  }
  if (off === undefined) {
    [off] = offs.splice(0, 1);
    if (offs.length === 0) {
      binds?.delete(handler);
    }
  } else {
    arr_remove_first(offs, off);
  }

  return off;
};
export const removeScrollendEventListener = (ele: Element, listener: EventListenerOrEventListenerObject, _options?: boolean | EventListenerOptions) => {
  const off = getAndRemoveOff(ele, listener);
  off?.();
};
/**
 * 借鉴于 https://github.com/argyleink/scrollyfills/blob/main/src/scrollend.js
 */
export const addScrollendEventListener = func_lazy<(ele: Element, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void>(() => {
  // Map of scroll-observed elements.
  const observed = new WeakMap<Element, ReturnType<typeof createScrollOb>>();
  const pointers = new Set();
  // Track if any pointer is active
  document.addEventListener(
    "touchstart",
    (e) => {
      for (const touch of iter_iterable(e.changedTouches)) pointers.add(touch.identifier);
    },
    {passive: true},
  );

  document.addEventListener(
    "touchend",
    (e) => {
      for (const touch of iter_iterable(e.changedTouches)) pointers.delete(touch.identifier);
    },
    {passive: true},
  );

  document.addEventListener(
    "touchcancel",
    (e) => {
      for (const touch of iter_iterable(e.changedTouches)) pointers.delete(touch.identifier);
    },
    {passive: true},
  );

  document.addEventListener(
    "pointerdown",
    (e) => {
      pointers.add(e.pointerId);
    },
    {passive: true},
  );
  document.addEventListener(
    "pointerup",
    (e) => {
      pointers.delete(e.pointerId);
    },
    {passive: true},
  );
  document.addEventListener(
    "pointercancel",
    (e) => {
      pointers.delete(e.pointerId);
    },
    {passive: true},
  );
  const createScrollOb = (ele: Element) => {
    const scrollOb = {
      scrollport: ele,
      timeout: 0,
      scrollListener: (_evt: Event) => {
        clearTimeout(scrollOb.timeout);
        scrollOb.timeout = setTimeout(() => {
          if (pointers.size) {
            // if pointer(s) are down, wait longer
            setTimeout(scrollOb.scrollListener, 100);
          } else {
            // dispatch
            scrollOb.scrollport.dispatchEvent(new Event("scrollend"));
            scrollOb.timeout = 0;
          }
        }, 100);
      },
      listeners: 0, // Count of number of listeners.
      start() {
        if (scrollOb.listeners === 0) {
          ele.addEventListener("scroll", scrollOb.scrollListener);
        }
        scrollOb.listeners++;
      },
      stop() {
        scrollOb.listeners--;
        if (scrollOb.listeners === 0) {
          ele.removeEventListener("scroll", scrollOb.scrollListener);
        }
      },
    };
    return scrollOb;
  };

  return (ele: Element, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => {
    ele.addEventListener("scrollend", listener, options);
    const scrollOb = map_get_or_put(observed, ele, createScrollOb);
    scrollOb.start();
    const off = () => {
      getAndRemoveOff(ele, listener, off);
      ele.removeEventListener("scrollend", listener, options);
      scrollOb.stop();
    };
    addOff(ele, listener, off);
    return off;
  };
});
