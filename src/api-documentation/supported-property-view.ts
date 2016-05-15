import './supported-property-view.html!';
import './supported-class-link';

@component('supported-property-view')
class SupportedPropertyView extends polymer.Base {

    @property()
    supportedProperty:ISupportedProperty;
    
    yesNoIcon(val) {
        if (val === true) {
            return 'icons:check';
        }

        return 'icons:clear';
    }
}

SupportedPropertyView.register();