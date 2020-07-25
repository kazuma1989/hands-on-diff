/**
 * @see https://github.com/microsoft/monaco-editor/blob/v0.20.0/docs/integrate-amd-cross.md
 */

const cdnOrigin = "https://unpkg.com"

const url = `data:text/javascript;charset=utf-8,${encodeURIComponent(`
  self.MonacoEnvironment = { baseUrl: "${cdnOrigin}/monaco-editor/min/" };
  importScripts("${cdnOrigin}/monaco-editor/min/vs/base/worker/workerMain.js");
`)}`

export default {
  getWorkerUrl(workerId, label) {
    return url
  },
}
