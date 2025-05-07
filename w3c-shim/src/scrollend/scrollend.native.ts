export const removeScrollendEventListener = (
    ele: Element,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
) => ele.removeEventListener("scrollend", listener, options);
export const addScrollendEventListener = (
    ele: Element,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
) => {
    ele.addEventListener("scrollend", listener, options);
    return () => removeScrollendEventListener(ele, listener, options);
};
