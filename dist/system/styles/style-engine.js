System.register(['aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-binding'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_metadata_1, aurelia_dependency_injection_1, aurelia_pal_1, aurelia_binding_1;
    var StyleEngine;
    return {
        setters:[
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            }],
        execute: function() {
            StyleEngine = (function () {
                function StyleEngine(container) {
                    this.container = container;
                    this.controllers = new Map();
                }
                StyleEngine.prototype.getThemeKeyForComponent = function (obj) {
                    return aurelia_binding_1.camelCase(aurelia_metadata_1.Origin.get(obj.constructor).moduleMember + 'Theme');
                };
                StyleEngine.prototype.applyTheme = function (themable, theme) {
                    var _this = this;
                    var themeKey = this.getThemeKeyForComponent(themable);
                    var currentController = themable.view[themeKey];
                    var bindingContext;
                    var newController;
                    if (!theme) {
                        if (currentController !== currentController.factory.defaultController) {
                            currentController.unbind();
                            newController = currentController.factory.defaultController;
                            themable.view[themeKey] = newController;
                            newController.bind(themable.view);
                        }
                        return;
                    }
                    if (typeof theme === 'string') {
                        bindingContext = themable.resources.getValue(theme) || themable.view.container.get(theme);
                    }
                    else {
                        bindingContext = theme;
                    }
                    if (this.getShadowDOMRoot(themable.view) !== null) {
                        currentController.unbind();
                        currentController.bindingContext = bindingContext;
                        currentController.bind(themable.view);
                    }
                    else {
                        newController = this.controllers.get(bindingContext);
                        if (!newController) {
                            newController = currentController.factory.create(this.container, null, bindingContext);
                        }
                        currentController.unbind();
                        themable.view[themeKey] = newController;
                        newController.bind(themable.view);
                        this.controllers.set(bindingContext, newController);
                        newController.onRemove = function () {
                            _this.controllers.delete(bindingContext);
                        };
                    }
                };
                StyleEngine.prototype.getOrCreateStyleController = function (view, factory) {
                    var controller = view[factory.themeKey];
                    if (controller === undefined) {
                        var shadowDOMRoot = this.getShadowDOMRoot(view);
                        if (shadowDOMRoot === null) {
                            view[factory.themeKey] = controller = factory.getOrCreateDefault(this.container);
                        }
                        else {
                            view[factory.themeKey] = controller = factory.create(view.container, shadowDOMRoot);
                        }
                    }
                    return controller;
                };
                StyleEngine.prototype.getShadowDOMRoot = function (view) {
                    var root = view.container.get(aurelia_pal_1.DOM.boundary);
                    if (root && root.host instanceof Element) {
                        return root;
                    }
                    return null;
                };
                StyleEngine = __decorate([
                    aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container)
                ], StyleEngine);
                return StyleEngine;
            }());
            exports_1("StyleEngine", StyleEngine);
        }
    }
});
