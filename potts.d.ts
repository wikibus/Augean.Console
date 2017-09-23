declare module "bower:paper-tabs/paper-tabs.html" {
  export class PaperTabs {
    /** * If you want to use an attribute value or property of an element for
     * `selected` instead of the index, set this to the name of the attribute
     * or property. Hyphenated values are converted to camel case when used to
     * look up the property of a selectable element. Camel cased values are
     * *not* converted to hyphenated values for attribute lookup. It's
     * recommended that you provide the hyphenated form of the name so that
     * selection works in both cases. (Use `attr-or-property-name` instead of
     * `attrOrPropertyName`.)
     */
    attrForSelected: string;

    /** * Gets or sets the selected element. The default is to use the index of the item.
     */
    selected: any;

    /** * Returns the currently selected item.
     */
    selectedItem?: any;

    /** * The event that fires from items when they are selected. Selectable
     * will listen for this event from items and update the selection state.
     * Set to empty string to listen to no events.
     */
    activateEvent: string;

    selectable: string;

    /** * The class to set on elements when selected.
     */
    selectedClass: string;

    /** * The attribute to set on elements when selected.
     */
    selectedAttribute: string;

    /** * Default fallback if the selection based on selected with `attrForSelected`
     * is not found.
     */
    fallbackSelection: string;

    /** * The list of items from which a selection can be made.
     */
    items: Array<any>;

    /** * If true, multiple selections are allowed.
     */
    multi: boolean;

    /** * Gets or sets the selected elements. This is used instead of `selected` when `multi`
     * is true.
     */
    selectedValues: Array<any>;

    /** * Returns an array of currently selected items.
     */
    selectedItems: Array<any>;

    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    keyBindings: any;

    /** * Returns the currently focused item.
     */
    focusedItem?: any;

    /** * The attribute to use on menu items to look up the item title. Typing the first
     * letter of an item when the menu is open focuses that item. If unset, `textContent`
     * will be used.
     */
    attrForItemTitle: string;

    disabled: boolean;

    /** * If true, ink ripple effect is disabled. When this property is changed,
     * all descendant `<paper-tab>` elements have their `noink` property
     * changed to the new value as well.
     */
    noink: boolean;

    /** * If true, the bottom bar to indicate the selected tab will not be shown.
     */
    noBar: boolean;

    /** * If true, the slide effect for the bottom bar is disabled.
     */
    noSlide: boolean;

    /** * If true, tabs are scrollable and the tab width is based on the label width.
     */
    scrollable: boolean;

    /** * If true, tabs expand to fit their container. This currently only applies when
     * scrollable is true.
     */
    fitContainer: boolean;

    /** * If true, dragging on the tabs to scroll is disabled.
     */
    disableDrag: boolean;

    /** * If true, scroll buttons (left/right arrow) will be hidden for scrollable tabs.
     */
    hideScrollButtons: boolean;

    /** * If true, the tabs are aligned to bottom (the selection bar appears at the top).
     */
    alignBottom: boolean;

    /** * If true, tabs are automatically selected when focused using the
     * keyboard.
     */
    autoselect: boolean;

    /** * The delay (in milliseconds) between when the user stops interacting
     * with the tabs through the keyboard and when the focused item is
     * automatically selected (if `autoselect` is true).
     */
    autoselectDelay: number;
    /** * Can be called to manually notify a resizable and its descendant
     * resizables of a resize change.
     */
    notifyResize();

    /** * Used to assign the closest resizable ancestor to this resizable
     * if the ancestor detects a request for notifications.
     */
    assignParentResizable(parentResizable: any);

    /** * Used to remove a resizable descendant from the list of descendants
     * that should be notified of a resize change.
     */
    stopResizeNotificationsFor(target: any);

    /** * This method can be overridden to filter nested elements that should or
     * should not be notified by the current element. Return true if an element
     * should be notified, or false if it should not be notified.
     *
     * @param {HTMLElement} element A candidate descendant element that
    implements `IronResizableBehavior`.
     * @return {boolean} True if the `element` should be notified of resize.
     */
    resizerShouldNotify(element: any): boolean;

    /** * Returns the index of the given item.
     *
     * @method indexOf
     * @param {Object} item
     * @returns Returns the index of the item
     */
    indexOf(item: any): any;

    /** * Selects the given value. If the `multi` property is true, then the selected state of the
     * `value` will be toggled; otherwise the `value` will be selected.
     *
     * @param value the value to select.
     */
    select(value: any);

    /** * Selects the previous item.
     *
     * @method selectPrevious
     */
    selectPrevious();

    /** * Selects the next item.
     *
     * @method selectNext
     */
    selectNext();

    /** * Selects the item at the given index.
     *
     * @method selectIndex
     */
    selectIndex(index: any);

    /** * Force a synchronous update of the `items` property.
     *
     * NOTE: Consider listening for the `iron-items-changed` event to respond to
     * updates to the set of selectable items after updates to the DOM list and
     * selection state have been made.
     *
     * WARNING: If you are using this method, you should probably consider an
     * alternate approach. Synchronously querying for items is potentially
     * slow for many use cases. The `items` property will update asynchronously
     * on its own to reflect selectable items in the DOM.
     */
    forceSynchronousItemUpdate();

    multiChanged(multi: any);

    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;
  }
}

declare module "bower:paper-input/paper-input.html" {
  export class PaperInput {
    /** * If true, the element currently has focus.
     */
    focused: boolean;

    /** * Set to true to disable this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * both the `<paper-input-container>`'s and the input's `disabled` property.
     */
    disabled: boolean;

    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    keyBindings: any;

    /** * The label for this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * `<label>`'s content and `hidden` property, e.g.
     * `<label hidden$="[[!label]]">[[label]]</label>` in your `template`
     */
    label: string;

    /** * The value for this element.
     */
    value: string;

    /** * Returns true if the value is invalid. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to both the
     * `<paper-input-container>`'s and the input's `invalid` property.
     *
     * If `autoValidate` is true, the `invalid` attribute is managed automatically,
     * which can clobber attempts to manage it manually.
     */
    invalid: boolean;

    /** * Set this to specify the pattern allowed by `preventInvalidInput`. If
     * you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `allowedPattern`
     * property.
     */
    allowedPattern: string;

    /** * The type of the input. The supported types are the
     * [native input's types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_<input>_types).
     * If you're using PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the (Polymer 1) `<input is="iron-input">`'s or (Polymer 2)
     * `<iron-input>`'s `type` property.
     */
    type: string;

    /** * The datalist of the input (if any). This should match the id of an existing `<datalist>`.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `list` property.
     */
    list: string;

    /** * A pattern to validate the `input` with. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `pattern` property.
     */
    pattern: string;

    /** * Set to true to mark the input as required. If used in a form, a
     * custom element that uses this behavior should also use
     * Polymer.IronValidatableBehavior and define a custom validation method.
     * Otherwise, a `required` element will always be considered valid.
     * It's also strongly recommended to provide a visual style for the element
     * when its value is invalid.
     */
    required: boolean;

    /** * The error message to display when the input is invalid. If you're using
     * PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the `<paper-input-error>`'s content, if using.
     */
    errorMessage: string;

    /** * Set to true to show a character counter.
     */
    charCounter: boolean;

    /** * Set to true to disable the floating label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `noLabelFloat` property.
     */
    noLabelFloat: boolean;

    /** * Set to true to always float the label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `alwaysFloatLabel` property.
     */
    alwaysFloatLabel: boolean;

    /** * Set to true to auto-validate the input value. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `autoValidate` property.
     */
    autoValidate: boolean;

    /** * Name of the validator to use. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `validator` property.
     */
    validator: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocomplete` property.
     */
    autocomplete: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autofocus` property.
     */
    autofocus: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `inputmode` property.
     */
    inputmode: string;

    /** * The minimum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `minlength` property.
     */
    minlength: number;

    /** * The maximum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `maxlength` property.
     */
    maxlength: number;

    /** * The minimum (numeric or date-time) input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `min` property.
     */
    min: string;

    /** * The maximum (numeric or date-time) input value.
     * Can be a String (e.g. `"2000-01-01"`) or a Number (e.g. `2`).
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `max` property.
     */
    max: string;

    /** * Limits the numeric or date-time increments.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `step` property.
     */
    step: string;

    /** * The name of this element.
     */
    name: string;

    /** * A placeholder string in addition to the label. If this is set, the label will always float.
     */
    placeholder: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `readonly` property.
     */
    readonly: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `size` property.
     */
    size: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocapitalize` property.
     */
    autocapitalize: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocorrect` property.
     */
    autocorrect: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autosave` property,
     * used with type=search.
     */
    autosave: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `results` property,
     * used with type=search.
     */
    results: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `accept` property,
     * used with type=file.
     */
    accept: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the`<input is="iron-input">`'s `multiple` property,
     * used with type=file.
     */
    multiple: boolean;
    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;

    /** * Returns a reference to the input element.
     */
    inputElement();

    /** * Validates the input element and sets an error style if needed.
     *
     * @return {boolean}
     */
    validate(): boolean;

    /** * Restores the cursor to its original position after updating the value.
     *
     * @param {string} newValue The value that should be saved.
     */
    updateValueAndPreserveCaret(newValue: string);
  }
}

declare module "bower:paper-input/paper-textarea.html" {
  export class PaperTextarea {
    /** * If true, the element currently has focus.
     */
    focused: boolean;

    /** * Set to true to disable this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * both the `<paper-input-container>`'s and the input's `disabled` property.
     */
    disabled: boolean;

    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    keyBindings: any;

    /** * The label for this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * `<label>`'s content and `hidden` property, e.g.
     * `<label hidden$="[[!label]]">[[label]]</label>` in your `template`
     */
    label: string;

    /** * The value for this element.
     */
    value: string;

    /** * Returns true if the value is invalid. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to both the
     * `<paper-input-container>`'s and the input's `invalid` property.
     *
     * If `autoValidate` is true, the `invalid` attribute is managed automatically,
     * which can clobber attempts to manage it manually.
     */
    invalid: boolean;

    /** * Set this to specify the pattern allowed by `preventInvalidInput`. If
     * you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `allowedPattern`
     * property.
     */
    allowedPattern: string;

    /** * The type of the input. The supported types are the
     * [native input's types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_<input>_types).
     * If you're using PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the (Polymer 1) `<input is="iron-input">`'s or (Polymer 2)
     * `<iron-input>`'s `type` property.
     */
    type: string;

    /** * The datalist of the input (if any). This should match the id of an existing `<datalist>`.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `list` property.
     */
    list: string;

    /** * A pattern to validate the `input` with. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `pattern` property.
     */
    pattern: string;

    /** * Set to true to mark the input as required. If used in a form, a
     * custom element that uses this behavior should also use
     * Polymer.IronValidatableBehavior and define a custom validation method.
     * Otherwise, a `required` element will always be considered valid.
     * It's also strongly recommended to provide a visual style for the element
     * when its value is invalid.
     */
    required: boolean;

    /** * The error message to display when the input is invalid. If you're using
     * PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the `<paper-input-error>`'s content, if using.
     */
    errorMessage: string;

    /** * Set to true to show a character counter.
     */
    charCounter: boolean;

    /** * Set to true to disable the floating label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `noLabelFloat` property.
     */
    noLabelFloat: boolean;

    /** * Set to true to always float the label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `alwaysFloatLabel` property.
     */
    alwaysFloatLabel: boolean;

    /** * Set to true to auto-validate the input value. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `autoValidate` property.
     */
    autoValidate: boolean;

    /** * Name of the validator to use. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `validator` property.
     */
    validator: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocomplete` property.
     */
    autocomplete: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autofocus` property.
     */
    autofocus: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `inputmode` property.
     */
    inputmode: string;

    /** * The minimum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `minlength` property.
     */
    minlength: number;

    /** * The maximum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `maxlength` property.
     */
    maxlength: number;

    /** * The minimum (numeric or date-time) input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `min` property.
     */
    min: string;

    /** * The maximum (numeric or date-time) input value.
     * Can be a String (e.g. `"2000-01-01"`) or a Number (e.g. `2`).
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `max` property.
     */
    max: string;

    /** * Limits the numeric or date-time increments.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `step` property.
     */
    step: string;

    /** * The name of this element.
     */
    name: string;

    /** * A placeholder string in addition to the label. If this is set, the label will always float.
     */
    placeholder: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `readonly` property.
     */
    readonly: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `size` property.
     */
    size: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocapitalize` property.
     */
    autocapitalize: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocorrect` property.
     */
    autocorrect: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autosave` property,
     * used with type=search.
     */
    autosave: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `results` property,
     * used with type=search.
     */
    results: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `accept` property,
     * used with type=file.
     */
    accept: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the`<input is="iron-input">`'s `multiple` property,
     * used with type=file.
     */
    multiple: boolean;

    /** * The initial number of rows.
     *
     * @attribute rows
     */
    rows: number;

    /** * The maximum number of rows this element can grow to until it
     * scrolls. 0 means no maximum.
     *
     * @attribute maxRows
     */
    maxRows: number;
    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;

    /** * Returns a reference to the input element.
     */
    inputElement();

    /** * Validates the input element and sets an error style if needed.
     *
     * @return {boolean}
     */
    validate(): boolean;

    /** * Restores the cursor to its original position after updating the value.
     *
     * @param {string} newValue The value that should be saved.
     */
    updateValueAndPreserveCaret(newValue: string);
  }
}

declare module "bower:paper-input/paper-input-behavior.html" {
  /** * Use `Polymer.PaperInputBehavior` to implement inputs with `<paper-input-container>`. This
   * behavior is implemented by `<paper-input>`. It exposes a number of properties from
   * `<paper-input-container>` and `<input is="iron-input">` and they should be bound in your
   * template.
   *
   * The input element can be accessed by the `inputElement` property if you need to access
   * properties or methods that are not exposed.
   *
   * @polymerBehavior Polymer.PaperInputBehavior
   * @namespace Polymer
   */
  export const PaperInputBehavior: {
    /** * If true, the element currently has focus.
     */
    focused: boolean;

    /** * Set to true to disable this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * both the `<paper-input-container>`'s and the input's `disabled` property.
     */
    disabled: boolean;

    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    keyBindings: any;

    /** * The label for this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * `<label>`'s content and `hidden` property, e.g.
     * `<label hidden$="[[!label]]">[[label]]</label>` in your `template`
     */
    label: string;

    /** * The value for this input. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<iron-input>`'s `bindValue`
     * property, or the value property of your input that is `notify:true`.
     */
    value: string;

    /** * Returns true if the value is invalid. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to both the
     * `<paper-input-container>`'s and the input's `invalid` property.
     *
     * If `autoValidate` is true, the `invalid` attribute is managed automatically,
     * which can clobber attempts to manage it manually.
     */
    invalid: boolean;

    /** * Set this to specify the pattern allowed by `preventInvalidInput`. If
     * you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `allowedPattern`
     * property.
     */
    allowedPattern: string;

    /** * The type of the input. The supported types are the
     * [native input's types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_<input>_types).
     * If you're using PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the (Polymer 1) `<input is="iron-input">`'s or (Polymer 2)
     * `<iron-input>`'s `type` property.
     */
    type: string;

    /** * The datalist of the input (if any). This should match the id of an existing `<datalist>`.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `list` property.
     */
    list: string;

    /** * A pattern to validate the `input` with. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `pattern` property.
     */
    pattern: string;

    /** * Set to true to mark the input as required. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `required` property.
     */
    required: boolean;

    /** * The error message to display when the input is invalid. If you're using
     * PaperInputBehavior to implement your own paper-input-like element,
     * bind this to the `<paper-input-error>`'s content, if using.
     */
    errorMessage: string;

    /** * Set to true to show a character counter.
     */
    charCounter: boolean;

    /** * Set to true to disable the floating label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `noLabelFloat` property.
     */
    noLabelFloat: boolean;

    /** * Set to true to always float the label. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `alwaysFloatLabel` property.
     */
    alwaysFloatLabel: boolean;

    /** * Set to true to auto-validate the input value. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<paper-input-container>`'s `autoValidate` property.
     */
    autoValidate: boolean;

    /** * Name of the validator to use. If you're using PaperInputBehavior to
     * implement your own paper-input-like element, bind this to
     * the `<input is="iron-input">`'s `validator` property.
     */
    validator: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocomplete` property.
     */
    autocomplete: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autofocus` property.
     */
    autofocus: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `inputmode` property.
     */
    inputmode: string;

    /** * The minimum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `minlength` property.
     */
    minlength: number;

    /** * The maximum length of the input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `maxlength` property.
     */
    maxlength: number;

    /** * The minimum (numeric or date-time) input value.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `min` property.
     */
    min: string;

    /** * The maximum (numeric or date-time) input value.
     * Can be a String (e.g. `"2000-01-01"`) or a Number (e.g. `2`).
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `max` property.
     */
    max: string;

    /** * Limits the numeric or date-time increments.
     * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `step` property.
     */
    step: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `name` property.
     */
    name: string;

    /** * A placeholder string in addition to the label. If this is set, the label will always float.
     */
    placeholder: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `readonly` property.
     */
    readonly: boolean;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `size` property.
     */
    size: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocapitalize` property.
     */
    autocapitalize: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autocorrect` property.
     */
    autocorrect: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `autosave` property,
     * used with type=search.
     */
    autosave: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `results` property,
     * used with type=search.
     */
    results: number;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the `<input is="iron-input">`'s `accept` property,
     * used with type=file.
     */
    accept: string;

    /** * If you're using PaperInputBehavior to implement your own paper-input-like
     * element, bind this to the`<input is="iron-input">`'s `multiple` property,
     * used with type=file.
     */
    multiple: boolean;
    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;

    /** * Returns a reference to the input element.
     */
    inputElement();

    /** * Validates the input element and sets an error style if needed.
     *
     * @return {boolean}
     */
    validate(): boolean;

    /** * Restores the cursor to its original position after updating the value.
     *
     * @param {string} newValue The value that should be saved.
     */
    updateValueAndPreserveCaret(newValue: string);
  }
}

declare module "bower:paper-input/paper-input-container.html" {
  export class PaperInputContainer {
    /** * Set to true to disable the floating label. The label disappears when the input value is
     * not null.
     */
    noLabelFloat: boolean;

    /** * Set to true to always float the floating label.
     */
    alwaysFloatLabel: boolean;

    /** * The attribute to listen for value changes on.
     */
    attrForValue: string;

    /** * Set to true to auto-validate the input value when it changes.
     */
    autoValidate: boolean;

    /** * True if the input is invalid. This property is set automatically when the input value
     * changes if auto-validating, or when the `iron-input-validate` event is heard from a child.
     */
    invalid: boolean;

    /** * True if the input has focus.
     */
    focused: boolean;
    /** * Call this to update the state of add-ons.
     *
     * @param {Object} state Add-on state.
     */
    updateAddons(state: any);
  }
}

declare module "bower:paper-input/paper-input-error.html" {
  export class PaperInputError {
    /** * True if the error is showing.
     */
    invalid: boolean;
    /** * This overrides the update function in PaperInputAddonBehavior.
     *
     * @param state inputElement: The input element.
        value: The input value.
        invalid: True if the input value is invalid.
     */
    update(state: any);
  }
}

declare module "bower:paper-input/paper-input-addon-behavior.html" {
  /** * Use `Polymer.PaperInputAddonBehavior` to implement an add-on for `<paper-input-container>`. A
   * add-on appears below the input, and may display information based on the input value and
   * validity such as a character counter or an error message.
   *
   * @polymerBehavior
   * @namespace Polymer
   */
  export const PaperInputAddonBehavior: {
    /** * The function called by `<paper-input-container>` when the input value or validity changes.
     *
     * @param state inputElement: The input element.
        value: The input value.
        invalid: True if the input value is invalid.
     */
    update(state: any);
  }
}

declare module "bower:paper-input/paper-input-char-counter.html" {
  export class PaperInputCharCounter {
    /** * This overrides the update function in PaperInputAddonBehavior.
     *
     * @param state inputElement: The input element.
        value: The input value.
        invalid: True if the input value is invalid.
     */
    update(state: any);
  }
}

declare module "bower:paper-styles/paper-styles.html" {
  /** * The `<paper-styles>` component provides simple ways to use Material Design CSS styles
   * in your application. The following imports are available:
   *
   * 1. [color.html](https://github.com/PolymerElements/paper-styles/blob/master/color.html):
   * a complete list of the colors defined in the Material Design [palette](https://www.google.com/design/spec/style/color.html)
   *
   * 2. [default-theme.html](https://github.com/PolymerElements/paper-styles/blob/master/default-theme.html): text,
   * background and accent colors that match the default Material Design theme
   *
   * 3. [shadow.html](https://github.com/PolymerElements/paper-styles/blob/master/shadow.html): Material Design
   * [elevation](https://www.google.com/design/spec/what-is-material/elevation-shadows.html) and shadow styles
   *
   * 4. [typography.html](https://github.com/PolymerElements/paper-styles/blob/master/typography.html):
   * Material Design [font](http://www.google.com/design/spec/style/typography.html#typography-styles) styles and sizes
   *
   * 5. [demo-pages.html](https://github.com/PolymerElements/paper-styles/blob/master/demo-pages.html): generic styles
   * used in the PolymerElements demo pages
   *
   * We recommend importing each of these individual files, and using the style mixins
   * available in each ones, rather than the aggregated `paper-styles.html` as a whole.
   *
   * @group Paper Elements
   * @pseudoElement paper-styles
   * @demo demo/index.html
   */
  export class PaperStyles {
  }
}

declare module "bower:paper-spinner/paper-spinner.html" {
  export class PaperSpinner {
    /** * Displays the spinner.
     */
    active: boolean;

    /** * Alternative text content for accessibility support.
     * If alt is present, it will add an aria-label whose content matches alt when active.
     * If alt is not present, it will default to 'loading' as the alt value.
     */
    alt: string;
  }
}

declare module "bower:paper-spinner/paper-spinner-lite.html" {
  export class PaperSpinnerLite {
    /** * Displays the spinner.
     */
    active: boolean;

    /** * Alternative text content for accessibility support.
     * If alt is present, it will add an aria-label whose content matches alt when active.
     * If alt is not present, it will default to 'loading' as the alt value.
     */
    alt: string;
  }
}

declare module "bower:paper-card/paper-card.html" {
  export class PaperCard {
    /** * The title of the card.
     */
    heading: string;

    /** * The url of the title image of the card.
     */
    image: string;

    /** * The text alternative of the card's title image.
     */
    alt: string;

    /** * When `true`, any change to the image url property will cause the
     * `placeholder` image to be shown until the image is fully rendered.
     */
    preloadImage: boolean;

    /** * When `preloadImage` is true, setting `fadeImage` to true will cause the
     * image to fade into place.
     */
    fadeImage: boolean;

    /** * This image will be used as a background/placeholder until the src image has
     * loaded. Use of a data-URI for placeholder is encouraged for instant rendering.
     */
    placeholderImage: string;

    /** * The z-depth of the card, from 0-5.
     */
    elevation: number;

    /** * Set this to true to animate the card shadow when setting a new
     * `z` value.
     */
    animatedShadow: boolean;

    /** * Read-only property used to pass down the `animatedShadow` value to
     * the underlying paper-material style (since they have different names).
     */
    animated: boolean;
  }
}

declare module "bower:iron-icons/iron-icons.html" {
  /** * `iron-icons` is a utility import that includes the definition for the `iron-icon` element, `iron-iconset-svg` element, as well as an import for the default icon set.
   *
   * The `iron-icons` directory also includes imports for additional icon sets that can be loaded into your project.
   *
   * Example loading icon set:
   *
   *     <link rel="import" href="../iron-icons/maps-icons.html">
   *
   * To use an icon from one of these sets, first prefix your `iron-icon` with the icon set name, followed by a colon, ":", and then the icon id.
   *
   * Example using the directions-bus icon from the maps icon set:
   *
   *     <iron-icon icon="maps:directions-bus"></iron-icon>
   *
   *     To load a subset of icons from one of the default `iron-icons` sets, you can
   *     use the [poly-icon](https://poly-icon.appspot.com/) tool. It allows you
   *     to select individual icons, and creates an iconset from them that you can
   *     use directly in your elements.
   *
   * See [iron-icon](#iron-icon) for more information about working with icons.
   *
   * See [iron-iconset](#iron-iconset) and [iron-iconset-svg](#iron-iconset-svg) for more information about how to create a custom iconset.
   *
   * @group Iron Elements
   * @pseudoElement iron-icons
   * @demo demo/index.html
   */
  export class IronIcons {
  }
}

declare module "bower:iron-pages/iron-pages.html" {
  export class IronPages {
    /** * If you want to use an attribute value or property of an element for
     * `selected` instead of the index, set this to the name of the attribute
     * or property. Hyphenated values are converted to camel case when used to
     * look up the property of a selectable element. Camel cased values are
     * *not* converted to hyphenated values for attribute lookup. It's
     * recommended that you provide the hyphenated form of the name so that
     * selection works in both cases. (Use `attr-or-property-name` instead of
     * `attrOrPropertyName`.)
     */
    attrForSelected: string;

    /** * Gets or sets the selected element. The default is to use the index of the item.
     */
    selected: any;

    /** * Returns the currently selected item.
     */
    selectedItem?: any;

    /** * handler immediately changes it back
     */
    activateEvent: string;

    /** * This is a CSS selector string.  If this is set, only items that match the CSS selector
     * are selectable.
     */
    selectable: string;

    /** * The class to set on elements when selected.
     */
    selectedClass: string;

    /** * The attribute to set on elements when selected.
     */
    selectedAttribute: string;

    /** * Default fallback if the selection based on selected with `attrForSelected`
     * is not found.
     */
    fallbackSelection: string;

    /** * The list of items from which a selection can be made.
     */
    items: Array<any>;
    /** * Can be called to manually notify a resizable and its descendant
     * resizables of a resize change.
     */
    notifyResize();

    /** * Used to assign the closest resizable ancestor to this resizable
     * if the ancestor detects a request for notifications.
     */
    assignParentResizable(parentResizable: any);

    /** * Used to remove a resizable descendant from the list of descendants
     * that should be notified of a resize change.
     */
    stopResizeNotificationsFor(target: any);

    /** * This method can be overridden to filter nested elements that should or
     * should not be notified by the current element. Return true if an element
     * should be notified, or false if it should not be notified.
     *
     * @param {HTMLElement} element A candidate descendant element that
    implements `IronResizableBehavior`.
     * @return {boolean} True if the `element` should be notified of resize.
     */
    resizerShouldNotify(element: any): boolean;

    /** * Returns the index of the given item.
     *
     * @method indexOf
     * @param {Object} item
     * @returns Returns the index of the item
     */
    indexOf(item: any): any;

    /** * Selects the given value.
     *
     * @method select
     * @param value the value to select.
     */
    select(value: any);

    /** * Selects the previous item.
     *
     * @method selectPrevious
     */
    selectPrevious();

    /** * Selects the next item.
     *
     * @method selectNext
     */
    selectNext();

    /** * Selects the item at the given index.
     *
     * @method selectIndex
     */
    selectIndex(index: any);

    /** * Force a synchronous update of the `items` property.
     *
     * NOTE: Consider listening for the `iron-items-changed` event to respond to
     * updates to the set of selectable items after updates to the DOM list and
     * selection state have been made.
     *
     * WARNING: If you are using this method, you should probably consider an
     * alternate approach. Synchronously querying for items is potentially
     * slow for many use cases. The `items` property will update asynchronously
     * on its own to reflect selectable items in the DOM.
     */
    forceSynchronousItemUpdate();
  }
}

declare module "bower:iron-a11y-keys-behavior/iron-a11y-keys-behavior.html" {
  /** * `Polymer.IronA11yKeysBehavior` provides a normalized interface for processing
   * keyboard commands that pertain to [WAI-ARIA best practices](http://www.w3.org/TR/wai-aria-practices/#kbd_general_binding).
   * The element takes care of browser differences with respect to Keyboard events
   * and uses an expressive syntax to filter key presses.
   *
   * Use the `keyBindings` prototype property to express what combination of keys
   * will trigger the callback. A key binding has the format
   * `"KEY+MODIFIER:EVENT": "callback"` (`"KEY": "callback"` or
   * `"KEY:EVENT": "callback"` are valid as well). Some examples:
   *
   *      keyBindings: {
   *        'space': '_onKeydown', // same as 'space:keydown'
   *        'shift+tab': '_onKeydown',
   *        'enter:keypress': '_onKeypress',
   *        'esc:keyup': '_onKeyup'
   *      }
   *
   * The callback will receive with an event containing the following information in `event.detail`:
   *
   *      _onKeydown: function(event) {
   *        console.log(event.detail.combo); // KEY+MODIFIER, e.g. "shift+tab"
   *        console.log(event.detail.key); // KEY only, e.g. "tab"
   *        console.log(event.detail.event); // EVENT, e.g. "keydown"
   *        console.log(event.detail.keyboardEvent); // the original KeyboardEvent
   *      }
   *
   * Use the `keyEventTarget` attribute to set up event handlers on a specific
   * node.
   *
   * See the [demo source code](https://github.com/PolymerElements/iron-a11y-keys-behavior/blob/master/demo/x-key-aware.html)
   * for an example.
   *
   * @demo demo/index.html
   * @polymerBehavior
   * @namespace Polymer
   */
  export const IronA11yKeysBehavior: {
    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    /** * To be used to express what combination of keys  will trigger the relative
     * callback. e.g. `keyBindings: { 'esc': '_onEscPressed'}`
     */
    keyBindings: any;
    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;
  }
}

declare module "bower:paper-icon-button/paper-icon-button.html" {
  export class PaperIconButton {
    /** * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     */
    keyEventTarget?: any;

    /** * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: boolean;

    keyBindings: any;

    /** * If true, the user is currently holding down the button.
     */
    pressed: boolean;

    /** * If true, the button toggles the active state with each tap or press
     * of the spacebar.
     */
    toggles: boolean;

    /** * If true, the button is a toggle and is currently in the active state.
     */
    active: boolean;

    /** * True if the element is currently being pressed by a "pointer," which
     * is loosely defined as mouse or touch input (but specifically excluding
     * keyboard input).
     */
    pointerDown: boolean;

    /** * True if the input device that caused the element to receive focus
     * was a keyboard.
     */
    receivedFocusFromKeyboard: boolean;

    /** * The aria attribute to be set if the button is a toggle and in the
     * active state.
     */
    ariaActiveAttribute: string;

    /** * If true, the element currently has focus.
     */
    focused: boolean;

    /** * If true, the user cannot interact with this element.
     */
    disabled: boolean;

    /** * If true, the element will not produce a ripple effect when interacted
     * with via the pointer.
     */
    noink: boolean;

    /** * The URL of an image for the icon. If the src property is specified,
     * the icon property should not be.
     */
    src: string;

    /** * Specifies the icon name or index in the set of icons available in
     * the icon's icon set. If the icon property is specified,
     * the src property should not be.
     */
    icon: string;

    /** * Specifies the alternate text for the button, for accessibility.
     */
    alt: string;
    /** * Can be used to imperatively add a key binding to the implementing
     * element. This is the imperative equivalent of declaring a keybinding
     * in the `keyBindings` prototype property.
     *
     * @param {string} eventString
     * @param {string} handlerName
     */
    addOwnKeyBinding(eventString: string, handlerName: string);

    /** * When called, will remove all imperatively-added key bindings.
     */
    removeOwnKeyBindings();

    /** * Returns true if a keyboard event matches `eventString`.
     *
     * @param {KeyboardEvent} event
     * @param {string} eventString
     * @return {boolean}
     */
    keyboardEventMatchesKeys(event: any, eventString: string): boolean;

    /** * Ensures this element contains a ripple effect. For startup efficiency
     * the ripple effect is dynamically on demand when needed.
     *
     * @param optTriggeringEvent (optional) event that triggered the
    ripple.
     */
    ensureRipple(optTriggeringEvent: any);

    /** * Returns the `<paper-ripple>` element used by this element to create
     * ripple effects. The element's ripple is created on demand, when
     * necessary, and calling this method will force the
     * ripple to be created.
     */
    getRipple();

    /** * Returns true if this element currently contains a ripple effect.
     *
     * @return {boolean}
     */
    hasRipple(): boolean;
  }
}

declare module "bower:iron-meta/iron-meta.html" {
  /** * `iron-meta` is a generic element you can use for sharing information across the DOM tree.
   * It uses [monostate pattern](http://c2.com/cgi/wiki?MonostatePattern) such that any
   * instance of iron-meta has access to the shared
   * information. You can use `iron-meta` to share whatever you want (or create an extension
   * [like x-meta] for enhancements).
   *
   * The `iron-meta` instances containing your actual data can be loaded in an import,
   * or constructed in any way you see fit. The only requirement is that you create them
   * before you try to access them.
   *
   * Examples:
   *
   * If I create an instance like this:
   *
   *     <iron-meta key="info" value="foo/bar"></iron-meta>
   *
   * Note that value="foo/bar" is the metadata I've defined. I could define more
   * attributes or use child nodes to define additional metadata.
   *
   * Now I can access that element (and it's metadata) from any iron-meta instance
   * via the byKey method, e.g.
   *
   *     meta.byKey('info');
   *
   * Pure imperative form would be like:
   *
   *     document.createElement('iron-meta').byKey('info');
   *
   * Or, in a Polymer element, you can include a meta in your template:
   *
   *     <iron-meta id="meta"></iron-meta>
   *     ...
   *     this.$.meta.byKey('info');
   *
   * @group Iron Elements
   * @demo demo/index.html
   * @hero hero.svg
   * @element iron-meta
   */
  export class IronMeta {
    /** * The type of meta-data.  All meta-data of the same type is stored
     * together.
     *
     * @type {string}
     */
    type: string;

    /** * The key used to store `value` under the `type` namespace.
     */
    key?: string;

    /** * The meta-data to store or retrieve.
     */
    value: any;

    /** * If true, `value` is set to the iron-meta instance itself.
     */
    self: boolean;

    list: any;
    /** * Retrieves meta data value by key.
     *
     * @method byKey
     * @param {string} key The key of the meta-data to be returned.
     * @return
     */
    byKey(key: string): any;
  }
}

declare module "bower:paper-toolbar/paper-toolbar.html" {
  export class PaperToolbar {
    /** * Controls how the items are aligned horizontally when they are placed
     * at the bottom.
     * Options are `start`, `center`, `end`, `justified` and `around`.
     */
    bottomJustify: string;

    /** * Controls how the items are aligned horizontally.
     * Options are `start`, `center`, `end`, `justified` and `around`.
     */
    justify: string;

    /** * Controls how the items are aligned horizontally when they are placed
     * in the middle.
     * Options are `start`, `center`, `end`, `justified` and `around`.
     */
    middleJustify: string;
  }
}
