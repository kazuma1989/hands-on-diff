// @ts-check
/// <reference path="./typings.d.ts" />

// @ts-ignore
const { origin: cdnOrigin } = new URL(import.meta.url)

Promise.all(
  [
    `${cdnOrigin}/src/base.css`,
    "https://unpkg.com/monaco-editor/min/vs/editor/editor.main.css",
    "https://unpkg.com/reveal.js/dist/reveal.css",
    "https://unpkg.com/reveal.js/dist/theme/white.css",
    "https://unpkg.com/highlight.js/styles/vs.css",
  ].map(href => appendStylesheet(href)),
)

appendEmbeddedScript(
  "importmap-shim",
  JSON.stringify({
    imports: {
      emotion: "https://cdn.pika.dev/emotion",
      htm: "https://unpkg.com/htm/dist/htm.module.js",
      "htm/preact": "https://unpkg.com/htm/preact/index.module.js",
      immer: "https://cdn.pika.dev/immer",
      "monaco-editor/": "https://unpkg.com/monaco-editor@0.20.0/",
      preact: "https://cdn.pika.dev/preact",
      "preact/": "https://cdn.pika.dev/preact/",
      "reveal.js/": "https://cdn.pika.dev/reveal.js/",
    },
  }),
)

// https://github.com/microsoft/monaco-editor/blob/v0.20.0/docs/integrate-amd-cross.md
// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl(workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: "https://unpkg.com/monaco-editor/min/",
        }
        importScripts("https://unpkg.com/monaco-editor/min/vs/base/worker/workerMain.js")
      `)}`
  },
}

Promise.all(
  [
    "https://unpkg.com/es-module-shims@0.4.7/dist/es-module-shims.min.js",
  ].map(src => appendScript(src)),
).then(() => {
  // @ts-ignore
  self.importShim(`${cdnOrigin}/src/index.js`).then(({ render }) => {
    render(document.body)
  })
})

/**
 * @param {string} src
 * @param {HTMLElement} target
 */
async function appendScript(src, target = document.head) {
  const script = document.createElement("script")
  script.crossOrigin = "anonymous"
  script.src = src

  target.appendChild(script)

  return new Promise((resolve, reject) => {
    setTimeout(reject, 20_000)

    script.addEventListener("load", resolve)
  })
}

/**
 * @param {string} type
 * @param {string} textContent
 * @param {HTMLElement} target
 */
async function appendEmbeddedScript(type, textContent, target = document.head) {
  const script = document.createElement("script")
  script.type = type
  script.textContent = textContent

  target.appendChild(script)

  return Promise.resolve()
}

/**
 * @param {string} href
 * @param {HTMLElement} target
 */
async function appendStylesheet(href, target = document.head) {
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
