import { CustomElement, compute, observe, style } from 'twc/polymer';
import { IOperation, ISupportedOperation } from "heracles";

import './supported-operation-view';
import 'bower:vaadin-combo-box/vaadin-combo-box.html';

@CustomElement()
@style(`
[hidden] {
    display: none;
}`)
export class SupportedOperationsViewer extends Polymer.Element {

    supportedOperations: Array<IOperation>;

    selectedOperation: IOperation;

    @compute((selectedOperation: ISupportedOperation) => typeof selectedOperation !== 'undefined' && selectedOperation !== null)
    operationIsSelected: boolean;

    @observe('supportedOperations')
    clearSelection() {
        this.$.selectedOperation = null;
        this.$.supportedOperations.value = '';
    }
}
