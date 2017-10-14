import {CustomElement, style, compute} from 'twc/polymer';
import {ISupportedProperty} from "heracles";

import '../supported-classes/supported-class-link';

@CustomElement()
@style(`
:host { 
    display: block; 
}

[hidden] {
    display: none;
}`)
class SupportedPropertyView extends Polymer.Element {

    supportedProperty: ISupportedProperty;

    @compute((supportedProperty: ISupportedProperty): boolean => {
        if (supportedProperty) {
            return supportedProperty.property.supportedOperations.length > 0;
        }

        return false;
    })
    hasOperations: boolean;

    yesNoIcon(val: boolean) {
        if (val === true) {
            return 'icons:check';
        }

        return 'icons:clear';
    }
}
