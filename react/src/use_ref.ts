import {useLayoutEffect, useRef} from "react";

type Destructor = ReturnType<React.EffectCallback>;
type UseDomEffect<T extends HTMLElement> = (el: T) => Destructor;

export interface UseDomRef {
  <T extends HTMLElement>(hook: UseDomEffect<T>, initialValue?: T | null): React.RefObject<T | null>;
  <T extends HTMLElement>(hook: UseDomEffect<T>, initialValue: T): React.RefObject<T>;
}

export const useDomRef: UseDomRef = <T extends HTMLElement>(hook: UseDomEffect<T>, initialValue: T | null = null) => {
  const ref = useRef<T>(initialValue);
  useLayoutEffect(() => {
    if (ref.current == null) {
      return;
    }
    return hook(ref.current);
  }, [ref.current]);
  return ref;
};

type UseCustomEffect<T extends unknown> = (value: NonNullable<T>) => Destructor;

export interface UseCustomRef {
  <T extends unknown>(hook: UseCustomEffect<T>, initialValue?: T | null): React.RefObject<T | null> | React.MutableRefObject<T>;
  <T extends unknown>(hook: UseCustomEffect<T>, initialValue: T): React.RefObject<T>;
}
export const useCustomRef: UseCustomRef = <T extends unknown>(hook: UseCustomEffect<T>, initialValue: T | null = null) => {
  const ref = useRef(initialValue);
  useLayoutEffect(() => {
    if (ref.current == null) {
      return;
    }
    return hook(ref.current);
  }, [ref.current]);
  return ref;
};
export interface UseMutableCustomRef {
  <T extends unknown>(hook: UseCustomEffect<T>): React.MutableRefObject<T>;
}
export const useCustomMutableRef = useCustomRef as UseMutableCustomRef;
