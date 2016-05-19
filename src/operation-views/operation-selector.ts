import './operation-selector.html!';
import '../../bower_components/paper-fab/paper-fab.html!';
import '../../bower_components/iron-icons/image-icons.html!';
import '../../bower_components/paper-tooltip/paper-tooltip.html!';

@component('operation-selector')
class OperationSelector extends polymer.Base {
    
    @property()
    operations:Array<IOperation>;

    @listen('blur')
    onBlur() {
        this.$.operationToggle.active = false;
    }

    getIcon(operation:IOperation) {
        switch((operation.method || '').toUpperCase()) {
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