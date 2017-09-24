import { CustomElement, observe, compute, style } from 'twc/polymer';
import { IClass, ISupportedProperty } from "heracles";

import 'bower:polymer/polymer-element.html';
import 'bower:paper-tabs/paper-tabs.html';
import 'bower:paper-card/paper-card.html';
import 'bower:iron-pages/iron-pages.html';
import '../supported-properties/supported-property-view';
import '../supported-operations/supported-operations-viewer';

@CustomElement()
@style('supported-class-view.css')
export class SupportedClassView extends Polymer.Element {

    supportedClass: IClass;

    selectedProperty: ISupportedProperty;

    @compute('_propertyIsSelected', [ 'selectedProperty' ])
    readonly propertyIsSelected: boolean;

    @compute('_hasProperties', ['supportedClass'])
    hasProperties: boolean;

    @compute('_hasOperations', ['supportedClass'])
    hasOperations: boolean;

    _propertyIsSelected(selectedProperty: ISupportedProperty) {
        return typeof selectedProperty !== 'undefined' && selectedProperty !== null;
    }

    _hasProperties(supportedClass: IClass):boolean {
        if (!supportedClass) {
            return false;
        }

        return supportedClass.supportedProperties.length > 0;
    }

    _hasOperations(supportedClass: IClass):boolean {
        if (!supportedClass) {
            return false;
        }

        return supportedClass.supportedOperations.length > 0;
    }

    attached() {
        this.$.classTabs.select(0);
    }

    @observe('supportedClass')
    getProperties(supportedClass:IClass) {
        this.$.supportedProperties.value = null;
        this.$.classTabs.selected = 0;
    }

    openProperties() {
        this.$.props.toggle();
    }
}
