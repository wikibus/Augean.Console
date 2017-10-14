import {CustomElement, template, style} from 'twc/polymer';
import 'bower:polymer/polymer-element.html';

import 'bower:paper-dialog/paper-dialog.html';
import 'bower:show-json/show-json.html';
import {IHydraResource} from "heracles";

@CustomElement()
@template(`<paper-dialog id="dialog">
    <show-json json="[[resource]]" hide-copy-button></show-json>
</paper-dialog>`)
@style(`
paper-dialog {
    width: 750px;
}`)
class ResourceJson extends Polymer.Element {
    resource: IHydraResource;

    show() {
        this.$.dialog.open();
    }
}
