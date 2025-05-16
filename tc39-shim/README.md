# @gaubee/tc39-shim

> [中文](./README-zh.md) [English](./README.md)

This project maintains the same style as @gaubee/util (providing functional programming style to avoid side effects) and offers common shims.
It supports on-demand imports, and for runtimes with native support, there is minimal additional overhead.

1. **decimal** - Decimal arithmetic for precise numerical calculations
   - Based on migration from big.js, serving as a drop-in replacement with pure functions and minimal side effects (stringify:toString/valueOf/toJSON)
   - Reference: https://github.com/tc39/proposal-decimal
2. **pipeline** - Functional pipeline operations
   - Simulates the `|>` operator capability through array arrangement
   - Reference: https://github.com/tc39/proposal-pipeline-operator
   - > Note: Currently implements basic pipeline operations only. Additional features like parameter position transformation will be improved in future updates
3. **promise** - Promise extension functions
   - Provides Promise.withResolvers method to obtain Promise's resolve and reject functions
   - Reference: https://github.com/tc39/proposal-promise-with-resolvers
4. **set** - Set extension functions
   - Provides set operation methods: union, intersection, difference, etc.
   - Reference: https://github.com/tc39/proposal-set-methods

## About Side Effects

By default, this project does not modify any native objects. If you need to apply it globally (polyfill), please use `applyEffect` for installation. For example:

```ts
import {
  applyEffect,
  promise_with_resolvers,
  set_union,
  set_intersection,
  set_difference,
  set_symmetric_difference,
  set_is_subset_of,
  set_is_superset_of,
  set_is_disjoint_from,
} from "@gaubee/tc39-shim";
applyEffect(promise_with_resolvers, set_union, set_intersection, set_difference, set_symmetric_difference, set_is_subset_of, set_is_superset_of, set_is_disjoint_from);
```
