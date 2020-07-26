// @ts-check
/// <reference path="./typings.d.ts" />

import MonacoEnvironment from "./monaco-environment.js"

self.MonacoEnvironment = MonacoEnvironment

// @ts-ignore
const cdnPath = import.meta.url.replace(/\/[^/]+$/, "")

Promise.all(
  [
    `${cdnPath}/base.css`,
    "https://unpkg.com/monaco-editor/min/vs/editor/editor.main.css",
    "https://unpkg.com/reveal.js/dist/reveal.css",
    "https://unpkg.com/reveal.js/dist/theme/white.css",
    "https://unpkg.com/highlight.js/styles/vs.css",
  ].map(href => appendStylesheet({ href })),
)

Promise.all([
  appendScript({
    async: true,
    src: "https://unpkg.com/es-module-shims@0.4.7/dist/es-module-shims.min.js",
  }),
  appendScript({
    type: "importmap-shim",
    src: `${cdnPath}/import-map.json`,
  }),
]).then(() => {
  self.importShim("hands-on-diff/src/index.js").then(({ render }) => {
    render(document.body)
  })
})

/**
 * @param {{
    src: string
    type?: string
    async?: boolean
  }} _
 * @param {HTMLElement} target
 */
async function appendScript({ src, type, async }, target = document.head) {
  const script = document.createElement("script")
  script.crossOrigin = "anonymous"
  script.src = src
  if (type) {
    script.type = type
  }
  script.async = async

  target.appendChild(script)

  switch (type) {
    case undefined:
    case "module": {
      return new Promise((resolve, reject) => {
        setTimeout(reject, 20_000)

        script.addEventListener("load", resolve)
      })
    }

    default: {
      return Promise.resolve()
    }
  }
}

/**
 * @param {{
    href: string
  }} _
 * @param {HTMLElement} target
 */
async function appendStylesheet({ href }, target = document.head) {
  const link = document.createElement("link")
  link.crossOrigin = "anonymous"
  link.rel = "stylesheet"
  link.href = href

  target.appendChild(link)

  return new Promise((resolve, reject) => {
    setTimeout(reject, 20_000)

    link.addEventListener("load", resolve)
  })
}
