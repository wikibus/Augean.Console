import { CustomElement, notify, compute, observe } from 'twc/polymer';
import {IOperation} from "heracles";

import 'bower:paper-fab/paper-fab.html';
import 'bower:iron-icons/image-icons.html';
import 'bower:paper-tooltip/paper-tooltip.html';

@CustomElement()
class OperationSelector extends Polymer.Element {

    operations: Array<IOperation>;

    @notify()
    readonly operation: IOperation;

    @compute((operations: Array<IOperation>) => !!operations && operations.length > 0)
    hasOperations: boolean;

    @observe('hasOperations')
    updateFabStyle(hasOperations: boolean) {
        this.updateStyles();
    }

    @listen('blur')
    onBlur() {
        this.$.operationToggle.active = false;
    }

    showTooltip() {
        if (!this.hasOperations) {
            this.$.noOperationsTooltip.show();
        }
    }

    selectOperation(e: CustomEvent) {
        this._setOperation(e.model.operation);

        console.dir(e.model.operation);

        this.dispatchEvent(new CustomEvent('operation-selected', {
            detail: {
                operation: e.model.operation
            },
            // composed: true,
            // bubbles: true
        }));
    }

    getIcon(operation:IOperation) {
        switch ((operation.method || '').toUpperCase()) {
            case 'GET':
                return 'icons:file-download';
            case 'PUT':
                return 'icons:file-upload';
            case 'DELETE':
                return 'icons:delete';
            default:
                return 'icons:settings';
        }
    }
}
