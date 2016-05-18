import './supported-class-view.html!';
import './supported-property-view';
import './supported-operation-view';

@component('supported-class-view')
class SupportedClassView extends polymer.Base {

    @property()
    supportedClass:IClass;

    @property()
    selectedProperty:ISupportedProperty;

    @property()
    selectedOperation:IOperation;

    @computed({readOnly: true})
    propertyIsSelected(selectedProperty) {
        return typeof selectedProperty !== 'undefined' && selectedProperty !== null;
    }

    @computed({readOnly: true})
    operationIsSelected(selectedOperation) {
        return typeof selectedOperation !== 'undefined' && selectedOperation !== null;
    }

    @computed()
    hasProperties(supportedClass):boolean {
        if (!supportedClass) {
            return false;
        }

        return supportedClass.supportedProperties.length > 0;
    }

    @computed()
    hasOperations(supportedClass):boolean {
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

SupportedClassView.register();