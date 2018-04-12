/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';

const lifeCycleFunction = [];

function __boundMethod(target, key, descriptor) {
  let fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }

      const boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      definingProperty = false;
      return boundFn;
    }
  };
}

function autobind(component) {
  const keys = Reflect.ownKeys(component.prototype);
  keys.forEach(key => {
    if (key === 'constructor') {
      return;
    }
    const descriptor = Object.getOwnPropertyDescriptor(component.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(component.prototype, key, __boundMethod(component, key, descriptor));
    }
  });
  return component;
}

export default autobind;