import './supported-operations-viewer.html!';
import './supported-operation-view';

@component('supported-operations-viewer')
class SupportedOperationsViewer extends polymer.Base {

    @property()
    supportedOperations:Array<IOperation>;

    @property()
    selectedOperation:IOperation;

    @computed({readOnly: true})
    operationIsSelected(selectedOperation) {
        return typeof selectedOperation !== 'undefined' && selectedOperation !== null;
    }

    @observe('supportedOperations')
    clearSelection() {
        this.$.selectedOperation = null;
        this.$.supportedOperations.value = '';
    }
}

SupportedOperationsViewer.register();