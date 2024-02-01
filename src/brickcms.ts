/// <reference types='jquery'/>

// Implement code logic
// Defined namespace Demo
module Demo {
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
  $.fn.demoPlugin = function (options?: Demo.IDemoPluginConfig): JQuery {

    let configDefault: Demo.IDemoPluginConfig = {
      name: "JQuery Plugin Template",
      color: 'blue',
      align: 'left'
    };

    let settings: Demo.IDemoPluginConfig;

    if (options) {
      settings = $.extend(configDefault, options);
    }

    return this.each(function () {
      let demo = new Demo.DemoPlugin(settings, $(this));
    });
  };
})(jQuery);
