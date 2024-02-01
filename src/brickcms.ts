/// <reference types="jquery" />

// Implement code logic
// Defined namespace BrickCms
module BrickCms {
  // Defined interface config for plugin
  export interface IDemoPluginConfig {
    name?: string;
    color?: string;
    align?: string;
  }
  // Defined main class plugin
  export class DemoPlugin {
    private config: IDemoPluginConfig;
    private element: JQuery<HTMLElement>;

    constructor(config: IDemoPluginConfig, element: JQuery<HTMLElement>) {
      this.config = config;
      this.element = element;
      this.setup();
    }

    public setup(): void {
      // Update text html
      this.element.html(this.config.name);
      // Update style text
      this.element.css({
        color: this.config.color,
        textAlign: this.config.align
      });
    }
  }
}
// ----------------------------------------------------------------------
// Defined type plugin with JQuery
interface JQuery {
  demoPlugin(options: any): JQuery;
}
// Register plugin JQuery
(function ($) {
  $.fn.demoPlugin = function (options?: BrickCms.IDemoPluginConfig): JQuery {

    let configDefault: BrickCms.IDemoPluginConfig = {
      name: "JQuery Plugin Template",
      color: 'blue',
      align: 'left'
    };

    let settings: BrickCms.IDemoPluginConfig;

    if (options) {
      settings = $.extend(configDefault, options);
    }

    return this.each(function () {
      let demo = new BrickCms.DemoPlugin(settings, $(this));
    });
  };
})(jQuery);
