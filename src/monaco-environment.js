/**
 * @see https://github.com/microsoft/monaco-editor/blob/v0.20.0/docs/integrate-amd-cross.md
 */

const cdnPath = "https://unpkg.com/monaco-editor@0.20.0"

const url = `data:text/javascript;charset=utf-8,${encodeURIComponent(`
  self.MonacoEnvironment = { baseUrl: "${cdnPath}/min/" };
  importScripts("${cdnPath}/min/vs/base/worker/workerMain.js");
`)}`

export default {
  getWorkerUrl(workerId, label) {
    return url
  },
}
