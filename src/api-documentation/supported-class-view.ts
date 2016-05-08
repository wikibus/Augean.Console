import * as _ from 'lodash';

@component('supported-class-view')
class SupportedClassView extends polymer.Base {

    @property()
    supportedClass:IClass;

    @property({ readOnly: true })
    supportedProperties:Array;

    @observe('supportedClass')
    getProperties(supportedClass:IClass) {
        if(!supportedClass) {
            return;
        }

        supportedClass.getSupportedProperties()
            .then(setProperties.bind(this));
    }
}

function setProperties(props) {
    this._setSupportedProperties(props);
}

SupportedClassView.register();