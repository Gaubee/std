type GetEventTargetEventMap<T> = T extends EventTarget
    ? GetAddEventListenerEventMap<T["addEventListener"]>
    : object;
type GetAddEventListenerEventMap<F> = F extends (
    type: infer K,
    listener: (this: any, ev: infer E) => any,
    options?: any,
) => any ? { [eventname in K & string]: E }
    : never;
/**
 * 一个更加易用的 eventTarget.addEventListener 附加监听函数，返回一个 off 函数，用于 removeEventListener 移除监听
 * @param target
 * @param type
 * @param handler
 * @param options
 * @returns
 */
export const event_target_on = <
    T extends EventTarget,
    EM extends GetEventTargetEventMap<T> = GetEventTargetEventMap<T>,
    K extends keyof EM = keyof EM,
    EV extends EM[K] = EM[K],
>(
    target: T,
    type: K,
    handler: (ev: EV) => void,
    options?: boolean | AddEventListenerOptions,
) => {
    target.addEventListener(
        type as string,
        handler as EventListenerOrEventListenerObject,
        options,
    );
    return () => {
        target.removeEventListener(
            type as string,
            handler as EventListenerOrEventListenerObject,
        );
    };
};
