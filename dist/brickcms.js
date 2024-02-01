var BrickCms;
(function (BrickCms) {
    var DemoPlugin = (function () {
        function DemoPlugin(config, element) {
            this.config = config;
            this.element = element;
            this.setup();
        }
        DemoPlugin.prototype.setup = function () {
            this.element.html(this.config.name);
            this.element.css({
                color: this.config.color,
                textAlign: this.config.align
            });
        };
        return DemoPlugin;
    }());
    BrickCms.DemoPlugin = DemoPlugin;
})(BrickCms || (BrickCms = {}));
(function ($) {
    $.fn.demoPlugin = function (options) {
        var configDefault = {
            name: "JQuery Plugin Template",
            color: 'blue',
            align: 'left'
        };
        var settings;
        if (options) {
            settings = $.extend(configDefault, options);
        }
        return this.each(function () {
            var demo = new BrickCms.DemoPlugin(settings, $(this));
        });
    };
})(jQuery);
//# sourceMappingURL=brickcms.js.map