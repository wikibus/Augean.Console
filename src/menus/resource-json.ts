import {CustomElement, template, style, compute} from 'twc/polymer';
import 'bower:polymer/polymer-element.html';
import '../libs/Cycle.js';

import 'bower:paper-dialog/paper-dialog.html';
import 'bower:show-json/show-json.html';
import {IHydraResource} from "heracles";

@CustomElement()
@template(`<paper-dialog id="dialog">
    <show-json json="[[_decycledResource]]" hide-copy-button></show-json>
</paper-dialog>`)
@style(`
paper-dialog {
    width: 750px;
}`)
class ResourceJson extends Polymer.Element {
    resource: IHydraResource;

    @compute((resource: IHydraResource) => JSON.decycle(resource))
    _decycledResource: object;

    show() {
        this.$.dialog.open();
    }
}
