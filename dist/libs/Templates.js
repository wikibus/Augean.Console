(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Templates"] = factory();
	else
		root["Templates"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 256);
/******/ })
/************************************************************************/
/******/ ({

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_registry__ = __webpack_require__(264);


const ViewTemplates = new __WEBPACK_IMPORTED_MODULE_0__template_registry__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewTemplates;

const FormTemplates = new __WEBPACK_IMPORTED_MODULE_0__template_registry__["a" /* default */]();
/* unused harmony export FormTemplates */



/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = html;
/* harmony export (immutable) */ __webpack_exports__["g"] = render;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// The first argument to JS template tags retain identity across multiple
// calls to a tag for the same literal, so we can cache work done per literal
// in a Map.
const templates = new Map();
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
function html(strings, ...values) {
    let template = templates.get(strings);
    if (template === undefined) {
        template = new Template(strings);
        templates.set(strings, template);
    }
    return new TemplateResult(template, values);
}
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(template, values) {
        this.template = template;
        this.values = values;
    }
}
/* unused harmony export TemplateResult */

/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 */
function render(result, container, partCallback = defaultPartCallback) {
    let instance = container.__templateInstance;
    // Repeat render, just call update()
    if (instance !== undefined && instance.template === result.template &&
        instance._partCallback === partCallback) {
        instance.update(result.values);
        return;
    }
    // First render, create a new TemplateInstance and append it
    instance = new TemplateInstance(result.template, partCallback);
    container.__templateInstance = instance;
    const fragment = instance._clone();
    instance.update(result.values);
    let child;
    while ((child = container.lastChild)) {
        container.removeChild(child);
    }
    container.appendChild(fragment);
}
/**
 * An expression marker with embedded unique key to avoid
 * https://github.com/PolymerLabs/lit-html/issues/62
 */
const exprMarker = `{{lit-${Math.random()}}}`;
/**
 * A placeholder for a dynamic expression in an HTML template.
 *
 * There are two built-in part types: AttributePart and NodePart. NodeParts
 * always represent a single dynamic expression, while AttributeParts may
 * represent as many expressions are contained in the attribute.
 *
 * A Template's parts are mutable, so parts can be replaced or modified
 * (possibly to implement different template semantics). The contract is that
 * parts can only be replaced, not removed, added or reordered, and parts must
 * always consume the correct number of values in their `update()` method.
 *
 * TODO(justinfagnani): That requirement is a little fragile. A
 * TemplateInstance could instead be more careful about which values it gives
 * to Part.update().
 */
class TemplatePart {
    constructor(type, index, name, rawName, strings) {
        this.type = type;
        this.index = index;
        this.name = name;
        this.rawName = rawName;
        this.strings = strings;
    }
}
/* unused harmony export TemplatePart */

class Template {
    constructor(strings) {
        this.parts = [];
        this.element = document.createElement('template');
        this.element.innerHTML = strings.join(exprMarker);
        const walker = document.createTreeWalker(this.element.content, 5 /* elements & text */);
        let index = -1;
        let partIndex = 0;
        const nodesToRemove = [];
        while (walker.nextNode()) {
            index++;
            const node = walker.currentNode;
            if (node.nodeType === 1 /* ELEMENT_NODE */) {
                if (!node.hasAttributes())
                    continue;
                const attributes = node.attributes;
                for (let i = 0; i < attributes.length; i++) {
                    const attribute = attributes.item(i);
                    const attributeStrings = attribute.value.split(exprMarker);
                    if (attributeStrings.length > 1) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute attribute
                        const attributeString = strings[partIndex];
                        // Trim the trailing literal value if this is an interpolation
                        const rawNameString = attributeString.substring(0, attributeString.length - attributeStrings[0].length);
                        // Find the attribute name
                        const rawName = rawNameString.match(/((?:\w|[.\-_$])+)=["']?$/)[1];
                        this.parts.push(new TemplatePart('attribute', index, attribute.name, rawName, attributeStrings));
                        node.removeAttribute(attribute.name);
                        partIndex += attributeStrings.length - 1;
                        i--;
                    }
                }
            }
            else if (node.nodeType === 3 /* TEXT_NODE */) {
                const strings = node.nodeValue.split(exprMarker);
                if (strings.length > 1) {
                    const parent = node.parentNode;
                    const lastIndex = strings.length - 1;
                    // We have a part for each match found
                    partIndex += lastIndex;
                    // We keep this current node, but reset its content to the last
                    // literal part. We insert new literal nodes before this so that the
                    // tree walker keeps its position correctly.
                    node.textContent = strings[lastIndex];
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        parent.insertBefore(new Text(strings[i]), node);
                        this.parts.push(new TemplatePart('node', index++));
                    }
                }
                else if (!node.nodeValue.trim()) {
                    nodesToRemove.push(node);
                    index--;
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
/* unused harmony export Template */

const getValue = (part, value) => {
    // `null` as the value of a Text node will render the string 'null'
    // so we convert it to undefined
    if (value != null && value.__litDirective === true) {
        value = value(part);
    }
    return value === null ? undefined : value;
};
/* harmony export (immutable) */ __webpack_exports__["e"] = getValue;

const directive = (f) => {
    f.__litDirective = true;
    return f;
};
/* harmony export (immutable) */ __webpack_exports__["d"] = directive;

class AttributePart {
    constructor(instance, element, name, strings) {
        this.instance = instance;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.size = strings.length - 1;
    }
    setValue(values, startIndex) {
        const strings = this.strings;
        let text = '';
        for (let i = 0; i < strings.length; i++) {
            text += strings[i];
            if (i < strings.length - 1) {
                const v = getValue(this, values[startIndex + i]);
                if (v &&
                    (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
                    for (const t of v) {
                        // TODO: we need to recursively call getValue into iterables...
                        text += t;
                    }
                }
                else {
                    text += v;
                }
            }
        }
        this.element.setAttribute(this.name, text);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AttributePart;

class NodePart {
    constructor(instance, startNode, endNode) {
        this.instance = instance;
        this.startNode = startNode;
        this.endNode = endNode;
    }
    setValue(value) {
        value = getValue(this, value);
        if (value === null ||
            !(typeof value === 'object' || typeof value === 'function')) {
            // Handle primitive values
            // If the value didn't change, do nothing
            if (value === this._previousValue) {
                return;
            }
            this._setText(value);
        }
        else if (value instanceof TemplateResult) {
            this._setTemplateResult(value);
        }
        else if (Array.isArray(value) || value[Symbol.iterator]) {
            this._setIterable(value);
        }
        else if (value instanceof Node) {
            this._setNode(value);
        }
        else if (value.then !== undefined) {
            this._setPromise(value);
        }
        else {
            // Fallback, will render the string representation
            this._setText(value);
        }
    }
    _insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    _setNode(value) {
        this.clear();
        this._insert(value);
        this._previousValue = value;
    }
    _setText(value) {
        const node = this.startNode.nextSibling;
        if (node === this.endNode.previousSibling &&
            node.nodeType === Node.TEXT_NODE) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if _previousValue is
            // primitive?
            node.textContent = value;
        }
        else {
            this._setNode(new Text(value));
        }
        this._previousValue = value;
    }
    _setTemplateResult(value) {
        let instance;
        if (this._previousValue &&
            this._previousValue.template === value.template) {
            instance = this._previousValue;
        }
        else {
            instance =
                new TemplateInstance(value.template, this.instance._partCallback);
            this._setNode(instance._clone());
            this._previousValue = instance;
        }
        instance.update(value.values);
    }
    _setIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _previousValue is an array, then the previous render was of an
        // iterable and _previousValue will contain the NodeParts from the previous
        // render. If _previousValue is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this._previousValue)) {
            this.clear();
            this._previousValue = [];
        }
        // Lets of keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._previousValue;
        let partIndex = 0;
        for (const item of value) {
            // Try to reuse an existing part
            let itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                // If we're creating the first item part, it's startNode should be the
                // container's startNode
                let itemStart = this.startNode;
                // If we're not creating the first part, create a new separator marker
                // node, and fix up the previous part's endNode to point to it
                if (partIndex > 0) {
                    const previousPart = itemParts[partIndex - 1];
                    itemStart = previousPart.endNode = new Text();
                    this._insert(itemStart);
                }
                itemPart = new NodePart(this.instance, itemStart, this.endNode);
                itemParts.push(itemPart);
            }
            itemPart.setValue(item);
            partIndex++;
        }
        if (partIndex === 0) {
            this.clear();
            this._previousValue = undefined;
        }
        else if (partIndex < itemParts.length) {
            const lastPart = itemParts[partIndex - 1];
            this.clear(lastPart.endNode.previousSibling);
            lastPart.endNode = this.endNode;
        }
    }
    _setPromise(value) {
        value.then((v) => {
            if (this._previousValue === value) {
                this.setValue(v);
            }
        });
        this._previousValue = value;
    }
    clear(startNode = this.startNode) {
        let node;
        while ((node = startNode.nextSibling) !== this.endNode) {
            node.parentNode.removeChild(node);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = NodePart;

const defaultPartCallback = (instance, templatePart, node) => {
    if (templatePart.type === 'attribute') {
        return new AttributePart(instance, node, templatePart.name, templatePart.strings);
    }
    else if (templatePart.type === 'node') {
        return new NodePart(instance, node, node.nextSibling);
    }
    throw new Error(`Unknown part type ${templatePart.type}`);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = defaultPartCallback;

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, partCallback = defaultPartCallback) {
        this._parts = [];
        this.template = template;
        this._partCallback = partCallback;
    }
    update(values) {
        let valueIndex = 0;
        for (const part of this._parts) {
            if (part.size === undefined) {
                part.setValue(values[valueIndex]);
                valueIndex++;
            }
            else {
                part.setValue(values, valueIndex);
                valueIndex += part.size;
            }
        }
    }
    _clone() {
        const fragment = document.importNode(this.template.element.content, true);
        if (this.template.parts.length > 0) {
            const walker = document.createTreeWalker(fragment, 5 /* elements & text */);
            const parts = this.template.parts;
            let index = 0;
            let partIndex = 0;
            let templatePart = parts[0];
            let node = walker.nextNode();
            while (node != null && partIndex < parts.length) {
                if (index === templatePart.index) {
                    this._parts.push(this._partCallback(this, templatePart, node));
                    templatePart = parts[++partIndex];
                }
                else {
                    index++;
                    node = walker.nextNode();
                }
            }
        }
        return fragment;
    }
}
/* unused harmony export TemplateInstance */

//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_augeas__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lit_html__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lit_html_lib_repeat__ = __webpack_require__(267);




__WEBPACK_IMPORTED_MODULE_0_augeas__["a" /* ViewTemplates */].when.value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection').renders((render, collection) => {
    const members = collection['http://www.w3.org/ns/hydra/core#member'];
    const view = collection['http://www.w3.org/ns/hydra/core#view'];

    return __WEBPACK_IMPORTED_MODULE_1_lit_html__["f" /* html */]`<hydra-collection collection="${collection}">
                        <div slot="members">
                            ${Object(__WEBPACK_IMPORTED_MODULE_2_lit_html_lib_repeat__["a" /* repeat */])(members, member => __WEBPACK_IMPORTED_MODULE_1_lit_html__["f" /* html */]`<hydra-member-view resource="${member}"></hydra-member-view>`)}
                        </div>
                        
                        ${render(view, 'pager')}
                    </hydra-collection>`;
});

__WEBPACK_IMPORTED_MODULE_0_augeas__["a" /* ViewTemplates */].when.value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#PartialCollectionView').scope(s => s === 'pager').renders((render, view, scope) => __WEBPACK_IMPORTED_MODULE_1_lit_html__["f" /* html */]`<hydra-partial-view-pager view="${view}" slot$="${scope}"></hydra-partial-view-pager>`);

__WEBPACK_IMPORTED_MODULE_0_augeas__["a" /* ViewTemplates */].when.value(v => typeof v === 'object' && v !== null).renders((r, v, property) => __WEBPACK_IMPORTED_MODULE_1_lit_html__["f" /* html */]`<default-resource-view nested$="${!!property}"
                                                             property="${property}"
                                                             resource="${v}"></default-resource-view>`);

__WEBPACK_IMPORTED_MODULE_0_augeas__["a" /* ViewTemplates */].when.value(v => true).renders((r, v, s) => __WEBPACK_IMPORTED_MODULE_1_lit_html__["f" /* html */]`${v}`);

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements_ags_view__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_registry__ = __webpack_require__(102);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__template_registry__["a"]; });
/* unused harmony reexport FormTemplates */






/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lit_html_lib_lit_extended__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polymer_polymer_lib_mixins_property_accessors__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lit_html__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__template_registry__ = __webpack_require__(102);





function recurseTemplates(agsView, root, inheritedScope) {
    return (value, currentScope) => {
        let templateResult;
        const scope = currentScope || inheritedScope;
        const template = __WEBPACK_IMPORTED_MODULE_3__template_registry__["a" /* ViewTemplates */].getTemplate({
            value,
            scope,
        });

        if (template) {
            if (root && template.name) {
                agsView.setAttribute('data-template', template.name);
            }

            templateResult = template.render(recurseTemplates(agsView, false, scope), value, scope);
        } else if (agsView.ignoreMissing) {
            templateResult = '';
        } else {
            templateResult = __WEBPACK_IMPORTED_MODULE_2_lit_html__["f" /* html */]`Template not found`;
            console.warn('Template not found for', value);
        }

        return templateResult;
    };
}

class AgsView extends Object(__WEBPACK_IMPORTED_MODULE_1__polymer_polymer_lib_mixins_property_accessors__["a" /* PropertyAccessors */])(HTMLElement) {
    constructor() {
        super();

        this.templateScope = null;
        this.value = null;
        this.ignoreMissing = false;

        this.__connected = false;
    }

    static get observedAttributes() {
        return [
            'value',
            'templateScope',
            'ignoreMissing',
        ];
    }

    connectedCallback() {
        this._enableProperties();
        this.__connected = true;
        this._render();
    }

    disconnectedCallback() {
        this.__connected = false;
    }

    _propertiesChanged() {
        this._render();
    }

    _render() {
        if (this.value && this.__connected) {
            if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
            }

            const templateFunc = recurseTemplates(this, true, this.templateScope);

            Object(__WEBPACK_IMPORTED_MODULE_0_lit_html_lib_lit_extended__["a" /* render */])(templateFunc(this.value), this.shadowRoot);

            this.dispatchEvent(new CustomEvent('ags-render'));
        }
    }
}
/* unused harmony export default */


AgsView.createPropertiesForAttributes();

window.customElements.define('ags-view', AgsView);


/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lit_html_js__ = __webpack_require__(22);
/* unused harmony reexport html */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/**
 *
 * @param result Renders a `TemplateResult` to a container using the
 * `extendedPartCallback` PartCallback, which allows templates to set
 * properties and declarative event handlers.
 *
 * Properties are set by default, instead of attributes. Attribute names in
 * lit-html templates preserve case, so properties are case sensitive. If an
 * expression takes up an entire attribute value, then the property is set to
 * that value. If an expression is interpolated with a string or other
 * expressions then the property is set to the string result of the
 * interpolation.
 *
 * To set an attribute instead of a property, append a `$` suffix to the
 * attribute name.
 *
 * Example:
 *
 *     html`<button class$="primary">Buy Now</button>`
 *
 * To set an event handler, prefix the attribute name with `on-`:
 *
 * Example:
 *
 *     html`<button on-click=${(e)=> this.onClickHandler(e)}>Buy Now</button>`
 *
 */
function render(result, container) {
    Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["g" /* render */])(result, container, extendedPartCallback);
}
const extendedPartCallback = (instance, templatePart, node) => {
    if (templatePart.type === 'attribute') {
        if (templatePart.rawName.startsWith('on-')) {
            const eventName = templatePart.rawName.substring(3);
            return new EventPart(instance, node, eventName);
        }
        if (templatePart.name.endsWith('$')) {
            const name = templatePart.name.substring(0, templatePart.name.length - 1);
            return new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["a" /* AttributePart */](instance, node, name, templatePart.strings);
        }
        return new PropertyPart(instance, node, templatePart.rawName, templatePart.strings);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["c" /* defaultPartCallback */])(instance, templatePart, node);
};
/* unused harmony export extendedPartCallback */

class PropertyPart extends __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["a" /* AttributePart */] {
    setValue(values, startIndex) {
        const s = this.strings;
        let value;
        if (s.length === 2 && s[0] === '' && s[s.length - 1] === '') {
            // An expression that occupies the whole attribute value will leave
            // leading and trailing empty strings.
            value = Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["e" /* getValue */])(this, values[startIndex]);
        }
        else {
            // Interpolation, so interpolate
            value = '';
            for (let i = 0; i < s.length; i++) {
                value += s[i];
                if (i < s.length - 1) {
                    value += Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["e" /* getValue */])(this, values[startIndex + i]);
                }
            }
        }
        this.element[this.name] = value;
    }
}
/* unused harmony export PropertyPart */

class EventPart {
    constructor(instance, element, eventName) {
        this.instance = instance;
        this.element = element;
        this.eventName = eventName;
    }
    setValue(value) {
        const listener = Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["e" /* getValue */])(this, value);
        if (listener === this._listener) {
            return;
        }
        if (listener == null) {
            this.element.removeEventListener(this.eventName, this);
        }
        else if (this._listener == null) {
            this.element.addEventListener(this.eventName, this);
        }
        this._listener = listener;
    }
    handleEvent(event) {
        if (typeof this._listener === 'function') {
            this._listener.call(this.element, event);
        }
        else if (typeof this._listener.handleEvent === 'function') {
            this._listener.handleEvent(event);
        }
    }
}
/* unused harmony export EventPart */

//# sourceMappingURL=lit-extended.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_async_js__ = __webpack_require__(263);





let caseMap = __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__;

let microtask = __WEBPACK_IMPORTED_MODULE_3__utils_async_js__["a" /* microTask */];

// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;
while (proto) {
  let props = Object.getOwnPropertyNames(proto);
  for (let i=0; i<props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

const PropertyAccessors = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends HTMLElement
   * @unrestricted
   */
  class PropertyAccessors extends superClass {

    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     */
    static createPropertiesForAttributes() {
      let a$ = this.observedAttributes;
      for (let i=0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
      }
    }

    constructor() {
      super();
      /** @type {boolean} */
      this.__serializing;
      /** @type {number} */
      this.__dataCounter;
      /** @type {boolean} */
      this.__dataEnabled;
      /** @type {boolean} */
      this.__dataReady;
      /** @type {boolean} */
      this.__dataInvalid;
      /** @type {!Object} */
      this.__data;
      /** @type {Object} */
      this.__dataPending;
      /** @type {Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__dataProto;
      /** @type {Object} */
      this.__dataHasAccessor;
      /** @type {Object} */
      this.__dataInstanceProps;
      this._initializeProperties();
    }

    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @protected
     */
    _initializeProperties() {
      this.__serializing = false;
      this.__dataCounter = 0;
      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);
        this.__dataProto = null;
      }
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }

    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }

    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }

    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     */
    _ensureAttribute(attribute, value) {
      if (!this.hasAttribute(attribute)) {
        this._valueToNodeAttribute(this, value, attribute);
      }
    }

    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to.
     */
    _attributeToProperty(attribute, value, type) {
      // Don't deserialize back to property if currently reflecting
      if (!this.__serializing) {
        let property = caseMap.dashToCamelCase(attribute);
        this[property] = this._deserializeValue(value, type);
      }
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect.
     * @param {*=} value Property value to refect.
     */
    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = (arguments.length < 3) ? this[property] : value;
      this._valueToNodeAttribute(this, value,
        attribute || caseMap.camelToDashCase(property));
      this.__serializing = false;
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     */
    _valueToNodeAttribute(node, value, attribute) {
      let str = this._serializeValue(value);
      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }

    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called by Polymer when setting JS property values to
     * HTML attributes.  Users may override this method on Polymer element
     * prototypes to provide serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property value.
     */
    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(x) {
              return '';
            }
          }

        default:
          return value != null ? value.toString() : undefined;
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     * Note: The return value of `undefined` is used as a sentinel value to
     * indicate the attribute should be removed.
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     */
    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;
      switch (type) {
        case Number:
          outValue = Number(value);
          break;

        case Boolean:
          outValue = (value !== null);
          break;

        case Object:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            // allow non-JSON literals like Strings and Numbers
          }
          break;

        case Array:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }
          break;

        case Date:
          outValue = new Date(value);
          break;

        case String:
        default:
          outValue = value;
          break;
      }

      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.  When calling on
     * a prototype, any overwritten values are saved in `__dataProto`,
     * and it is up to the subclasser to decide how/when to set those
     * properties back into the accessor.  When calling on an instance,
     * the overwritten value is set via `_setPendingProperty`, and the
     * user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @protected
     */
    _createPropertyAccessor(property, readOnly) {
      if (!this.hasOwnProperty('__dataHasAccessor')) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }
      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;
        saveAccessorValue(this, property);
        Object.defineProperty(this, property, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertyAccessors} */
          get: function() {
            return this.__data[property];
          },
          /** @this {PropertyAccessors} */
          set: readOnly ? function() {} : function(value) {
            this._setProperty(property, value);
          }
          /* eslint-enable */
        });
      }
    }

    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     */
    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }

    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @protected
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }

    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {boolean} Returns true if the property changed
     * @protected
     */
    _setPendingProperty(property, value) {
      let old = this.__data[property];
      let changed = this._shouldPropertyChange(property, value, old);
      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }
        this.__data[property] = value;
        this.__dataPending[property] = value;
      }
      return changed;
    }

    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     */
    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && (prop in this.__dataPending));
    }

    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @protected
     */
    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;
            this._flushProperties();
          }
        });
      }
    }

    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     */
    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;
        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);
          this.__dataInstanceProps = null;
        }
        this.ready();
      }
    }

    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     *
     * @protected
     */
    _flushProperties() {
      if (this.__dataPending && this.__dataOld) {
        let changedProps = this.__dataPending;
        this.__dataPending = null;
        this.__dataCounter++;
        this._propertiesChanged(this.__data, changedProps, this.__dataOld);
        this.__dataCounter--;
      }
    }

    /**
     * Lifecycle callback called the first time properties are being flushed.
     * Prior to `ready`, all property sets through accessors are queued and
     * their effects are flushed after this method returns.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its properties initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @public
     */
    ready() {
      this.__dataReady = true;
      // Run normal flush
      this._flushProperties();
    }

    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {!Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {!Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @protected
     */
    _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
    }

    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` for primitive types if a
     * strict equality check fails, and returns `true` for all Object/Arrays.
     * The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return (
        // Strict equality check
        (old !== value &&
         // This ensures (old==NaN, value==NaN) always returns false
         (old === old || value === value))
      );
    }

  }

  return PropertyAccessors;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyAccessors;



/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


// unique global id for deduping mixins.
let dedupeId = 0;

/**
 * @constructor
 * @extends {Function}
 */
function MixinFunction(){}
/** @type {(WeakMap | undefined)} */
MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */
MixinFunction.prototype.__mixinSet;

const dedupingMixin = function(mixin) {
  let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */(mixin)(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dedupingMixin;



/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["dashToCamelCase"] = dashToCamelCase;
/* harmony export (immutable) */ __webpack_exports__["camelToDashCase"] = camelToDashCase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;

function dashToCamelCase(dash) {
  return caseMap[dash] || (
    caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
      (m) => m[1].toUpperCase()
    )
  );
}

function camelToDashCase(camel) {
  return caseMap[camel] || (
    caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
  );
}


/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncInterface; // eslint-disable-line no-unused-vars

// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

function microtaskFlush() {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => { throw e; });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}

const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} delay Time to wait before calling callbacks in ms
   * @return {AsyncInterface} An async timeout interface
   */
  after(delay) {
    return  {
      run(fn) { return setTimeout(fn, delay); },
      cancel: window.clearTimeout.bind(window)
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof Polymer.Async.timeOut
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.setTimeout.bind(window),
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.clearTimeout.bind(window)
};
/* unused harmony export timeOut */


const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof Polymer.Async.animationFrame
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.requestAnimationFrame.bind(window),
  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.cancelAnimationFrame.bind(window)
};
/* unused harmony export animationFrame */


const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {function(IdleDeadline)} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ?
      window.requestIdleCallback(fn) :
      window.setTimeout(fn, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    window.cancelIdleCallback ?
      window.cancelIdleCallback(handle) :
      window.clearTimeout(handle);
  }
};
/* unused harmony export idlePeriod */


const microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof Polymer.Async.microTask
   * @param {Function} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof Polymer.Async.microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = microTask;



/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TemplateSelectorBuilder__ = __webpack_require__(265);


class TemplateRegistry {
    constructor() {
        this._templates = [];
    }

    get count() {
        return this._templates.length;
    }

    /**
     *
     * @returns {TemplateSelectorBuilder}
     */
    get when() {
        return new __WEBPACK_IMPORTED_MODULE_0__TemplateSelectorBuilder__["a" /* default */](this);
    }

    getTemplate(criteria) {
        let selectedTemplate;
        if (criteria.value !== null && typeof criteria.value !== 'undefined') {
            selectedTemplate = this._templates.find(template =>
                template.selector.matches(criteria));
        }

        if (!selectedTemplate) {
            return null;
        }

        return {
            render: selectedTemplate.templateFunc,
            name: selectedTemplate.name || null,
        };
    }

    push(selector, templateFuncOrResult, name) {
        let templateFunc = templateFuncOrResult;

        if (typeof templateFunc !== 'function') {
            templateFunc = () => templateFuncOrResult;
        }

        this._templates.push({
            selector,
            templateFunc,
            name,
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateRegistry;



/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TemplateSelector__ = __webpack_require__(266);


class TemplateSelectorBuilder {
    constructor(registry) {
        this._registry = registry;
        this._selector = new __WEBPACK_IMPORTED_MODULE_0__TemplateSelector__["a" /* default */]();
    }

    value(valueMatcher) {
        this._selector._matchers.push(contraint => valueMatcher(contraint.value));

        return this;
    }

    scope(scopeMatcher) {
        this._selector._matchers.push(contraint => scopeMatcher(contraint.scope));

        return this;
    }

    renders(fn) {
        this._registry.push(this._selector, fn);
        return this._registry;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateSelectorBuilder;



/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TemplateSelector {
    constructor() {
        this.name = '';
        this._matchers = [];
    }

    matches(criteria) {
        return this._matchers.every(matcher => matcher.call(matcher, criteria));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateSelector;



/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = repeat;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lit_html_js__ = __webpack_require__(22);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const stateCache = new WeakMap();
function repeat(items, keyFnOrTemplate, template) {
    let keyFn;
    if (arguments.length === 2) {
        template = keyFnOrTemplate;
    }
    else if (arguments.length === 3) {
        keyFn = keyFnOrTemplate;
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["d" /* directive */])((part) => {
        let state = stateCache.get(part);
        if (state === undefined) {
            state = {
                keyMap: keyFn && new Map(),
                parts: [],
            };
            stateCache.set(part, state);
        }
        const container = part.startNode.parentNode;
        const oldParts = state.parts;
        const endParts = new Map(oldParts.map((p) => [p.endNode, p]));
        const keyMap = state.keyMap;
        const itemParts = [];
        let index = 0;
        let oldPartsIndex = 0;
        let currentMarker;
        for (const item of items) {
            let result;
            let key;
            try {
                result = template(item, index++);
                key = keyFn && keyFn(item);
            }
            catch (e) {
                console.error(e);
                continue;
            }
            // Try to reuse a part, either keyed or from the list of previous parts
            // if there's no keyMap
            let itemPart = keyMap === undefined ? oldParts[oldPartsIndex++] : keyMap.get(key);
            if (itemPart === undefined) {
                // New part, attach it
                if (currentMarker === undefined) {
                    currentMarker = new Text();
                    container.insertBefore(currentMarker, part.startNode.nextSibling);
                }
                const endNode = new Text();
                container.insertBefore(endNode, currentMarker.nextSibling);
                itemPart = new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["b" /* NodePart */](part.instance, currentMarker, endNode);
                if (key !== undefined && keyMap !== undefined) {
                    keyMap.set(key, itemPart);
                }
            }
            else {
                // Existing part, maybe move it
                const range = document.createRange();
                range.setStartBefore(itemPart.startNode);
                range.setEndBefore(itemPart.endNode);
                if (currentMarker === undefined) {
                    // this should be the first part, make sure it's first
                    if (part.startNode.nextSibling !== itemPart.startNode) {
                        // move the whole part
                        // get previous and next parts
                        const previousPart = endParts.get(itemPart.startNode);
                        if (previousPart) {
                            previousPart.endNode = itemPart.endNode;
                            endParts.set(previousPart.endNode, previousPart);
                        }
                        const contents = range.extractContents();
                        if (part.startNode.nextSibling === part.endNode) {
                            // The container part was empty, so we need a new endPart
                            itemPart.endNode = new Text();
                            container.insertBefore(itemPart.endNode, part.startNode.nextSibling);
                        }
                        else {
                            // endNode should equal the startNode of the currently first part
                            itemPart.endNode = part.startNode.nextSibling;
                        }
                        container.insertBefore(contents, part.startNode.nextSibling);
                    }
                    // else part is in the correct position already
                }
                else if (currentMarker !== itemPart.startNode) {
                    // move to correct position
                    const previousPart = endParts.get(itemPart.startNode);
                    if (previousPart) {
                        previousPart.endNode = itemPart.endNode;
                        endParts.set(previousPart.endNode, previousPart);
                    }
                    const contents = range.extractContents();
                    container.insertBefore(contents, currentMarker);
                }
                // remove part from oldParts list so it's not cleaned up
                oldParts.splice(oldParts.indexOf(itemPart), 1);
            }
            // else part is in the correct position already
            itemPart.setValue(result);
            itemParts.push(itemPart);
            currentMarker = itemPart.endNode;
        }
        // Cleanup
        if (oldParts.length > 0) {
            const clearStart = oldParts[0].startNode;
            const clearEnd = oldParts[oldParts.length - 1].endNode;
            const clearRange = document.createRange();
            if (itemParts.length === 0) {
                clearRange.setStartBefore(clearStart);
            }
            else {
                clearRange.setStartAfter(clearStart);
            }
            clearRange.setEndAfter(clearEnd);
            clearRange.deleteContents();
            clearRange.detach(); // is this neccessary?
        }
        state.parts = itemParts;
    });
}
//# sourceMappingURL=repeat.js.map

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

window.JSCompiler_renameProperty = function(prop, obj) { return prop; }

/** @namespace */
let Polymer;


/***/ })

/******/ });
});
//# sourceMappingURL=Templates.js.map