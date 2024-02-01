export {}; // need this for export below

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }

  interface Global {
    window: Window;
    document: Document;
    navigator: Navigator;
  }
}
