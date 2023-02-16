import { Component } from "./Component";

export type UnsubscribeStoreFn = () => void;

/** Stores are used to created Proxied objects which can be observed, mutated and trigger renders on Components*/
export class Store<T extends object> {
  readonly target: T;
  protected defaultProxy: T;
  private listeners: { path?: string; component: Component }[];

  constructor(target: T) {
    this.target = target;
    this.listeners = [];
    const [proxy] = this.proxy();
    this.defaultProxy = proxy;
  }

  private setHandlers(parentKey?: string): ProxyHandler<T> {
    const listeners = this.listeners;
    return {
      get: (target: any, key) => {
        if (typeof target[key] === "object" && target[key] !== null) {
          const newProxy = new Proxy(
            target[key],
            this.setHandlers(
              parentKey ? `${parentKey}.${key.toString()}` : key.toString()
            )
          );
          return newProxy;
        } else {
          return target[key];
        }
      },
      set: (target: any, p, newValue, receiver) => {
        // Do nothing if its the same value
        if (target[p] === newValue) return true;

        const val = Reflect.set(target, p, newValue, receiver);
        listeners.forEach((l) => {
          if (!l.component.parentNode) return;

          // Check if a path is specified. If it is, we compare it to the prop path to see if we should
          // dispatch a render
          if (l.path) {
            if (
              !(
                parentKey ? `${parentKey}.${p.toString()}` : p.toString()
              ).startsWith(l.path)
            )
              return;
          }

          l.component.render();
        });
        return val;
      },
    };
  }

  /** Creates a proxy of the store's target*/
  proxy(component?: Component, path?: string): [T, UnsubscribeStoreFn] {
    const listeners = this.listeners;

    if (component) listeners.push({ component, path });

    return [
      new Proxy<T>(this.target, this.setHandlers()),
      (() =>
        this.listeners.splice(
          listeners.findIndex((val) => val.component === component),
          1
        )) as UnsubscribeStoreFn,
    ];
  }
}
