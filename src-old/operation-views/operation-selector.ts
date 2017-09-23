import './operation-selector.html!';
import '../../bower_components/paper-fab/paper-fab.html!';
import '../../bower_components/iron-icons/image-icons.html!';
import '../../bower_components/paper-tooltip/paper-tooltip.html!';

@component('operation-selector')
class OperationSelector extends polymer.Base {

    @property()
    operations:Array<IOperation>;

    @property({ readOnly: true, notify: true })
    operation:IOperation;

    @computed()
    hasOperations(operations) {
        return !!operations && operations.length > 0;
    }

    @observe('hasOperations')
    updateFabStyle(hasOperations) {
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

    selectOperation(e) {
        this._setOperation(e.model.operation);

        console.dir(e.model.operation);

        this.fire('operation-selected', {
            operation: e.model.operation
        });
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

OperationSelector.register();