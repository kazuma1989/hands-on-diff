declare module "emotion" {
  export const css: Function
  export const cx: Function
  export const injectGlobal: Function
  export const keyframes: Function
}

declare module "htm/preact" {
  export const html: Function
}

declare module "immer" {
  export default function produce<T, P extends any[]>(
    fn: (draft: T, ...args: P) => void,
  ): (value: T, ...args: P) => T
}

declare module "monaco-editor/*"

declare module "preact" {
  export const render: Function
}

declare module "preact/hooks" {
  export const useEffect: Function

  export function useMemo<T>(factory: () => T, deps: any[]): T

  export function useRef<T>(
    initial?: T,
  ): {
    current?: T
  }

  export function useState<S>(initial?: S): [S, (s: S | ((s: S) => S)) => void]

  export function useCallback<T>(fn: T, deps: any[]): T

  export function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initialState?: S,
  ): [S, (action: A) => void]
}

declare module "reveal.js/*"

/**
 * @see https://gist.github.com/strothj/708afcf4f01dd04de8f49c92e88093c3
 */
declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback)
  disconnect: () => void
  observe: (target: Element, options?: ResizeObserverObserveOptions) => void
  unobserve: (target: Element) => void
}

interface ResizeObserverObserveOptions {
  box?: "content-box" | "border-box"
}

type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void

interface ResizeObserverEntry {
  readonly borderBoxSize: ResizeObserverEntryBoxSize
  readonly contentBoxSize: ResizeObserverEntryBoxSize
  readonly contentRect: DOMRectReadOnly
  readonly target: Element
}

interface ResizeObserverEntryBoxSize {
  blockSize: number
  inlineSize: number
}

interface Window {
  ResizeObserver: typeof ResizeObserver
}
