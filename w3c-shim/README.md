# @gaubee/w3c-shim

> [中文](./README-zh.md) / [English](./README.md)

This project maintains the same style as @gaubee/util (providing functional programming style to avoid side effects) and offers common shims.
It supports on-demand imports, and for runtimes with native support, there is minimal additional overhead.

1. **scrollend** - Scroll End Event Handling
   - Provides functions to add and remove scrollend event listeners
   - Automatically detects native browser support (Chrome 114+) and falls back to shim implementation
   - The shim implementation:
     - Uses scroll event + timeout detection
     - Handles pointer/touch events to avoid false positives
     - Cleanly manages event listener lifecycle
   - Reference: https://github.com/w3c/csswg-drafts/issues/8607
   - > Note: The shim may have slightly different timing characteristics than native implementation

2. **inert** - Inert Attribute Polyfill
   - Provides element_inert() function to get/set inert state
   - Automatically detects native browser support and falls back to shim implementation
   - The shim implementation:
     - Uses CSS to disable pointer events and user selection
     - Manages aria-hidden state for accessibility
     - Can be applied to any Element
   - Reference: https://html.spec.whatwg.org/multipage/interaction.html#inert
   - > Note: The shim may have slightly different behavior than native implementation in complex DOM scenarios
