import './supported-class-view.html!';
import './supported-property-view';

@component('supported-class-view')
class SupportedClassView extends polymer.Base {

    @property()
    supportedClass:IClass;

    @property()
    selectedProperty: ISupportedProperty;

    @computed()
    supportedProperties(supportedClass) {
        if(!supportedClass) {
            return;
        }

        return supportedClass.supportedProperties;
    }

    @computed({ readOnly: true })
    propertyIsSelected(selectedProperty) {
        return typeof selectedProperty !== 'undefined' && selectedProperty !== null;
    }

    @observe('supportedClass')
    getProperties(supportedClass:IClass) {
        this.$.supportedProperties.value = null;
    }

    openProperties() {
        this.$.props.toggle();
    }
}

SupportedClassView.register();