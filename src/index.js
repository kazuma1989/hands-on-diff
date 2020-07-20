// @ts-check
/// <reference path="./typings.d.ts" />

import { html } from "htm/preact";
import { render as _render } from "preact";
import { App } from "./App.js";

/**
 * @param {HTMLElement} target
 */
export function render(target) {
  _render(html`<${App} />`, target);
}
