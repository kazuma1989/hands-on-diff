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
  ].map(href => appendStylesheet({ href })),
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

Promise.all([
  appendScript({
    src: `${cdnOrigin}/src/import-map.json`,
    type: "importmap-shim",
  }),
  appendScript({
    src: "https://unpkg.com/es-module-shims@0.4.7/dist/es-module-shims.min.js",
    async: true,
  }),
]).then(() => {
  // @ts-ignore
  self.importShim(`${cdnOrigin}/src/index.js`).then(({ render }) => {
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
