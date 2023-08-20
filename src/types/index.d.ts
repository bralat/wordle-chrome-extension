export {};

declare global {
  interface Window {
    dataLayer: IArguments[];
    GTAG_ID: string
  }

  interface Array<T> {
    toReversed(): T[];
  }
}