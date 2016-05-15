import './property-label.html!';
import 'bower_components/paper-tooltip/paper-tooltip.html!'
import * as _ from 'lodash';

@component('property-label')
class PropertyLabel extends polymer.Base {

    @property({readOnly: true})
    supportedProperty:ISupportedProperty;

    @property()
    propertyId:string;

    @computed({notify: true})
    propertyTitle(supportedProperty:ISupportedProperty, propertyId) {
        return supportedProperty.title || propertyId;
    }

    @property()
    resource:Object;

    @observe('resource, propertyId')
    getTitle(resource:IHydraResource, propertyId) {
        if (resource.apiDocumentation) {
            var properties;
            if (_.isArray(resource['@type'])) {
                properties = _.map(resource['@type'], t => resource.apiDocumentation.getProperties(t));
            }
            else {
                properties = [resource.apiDocumentation.getProperties(resource['@type'])]
            }

            var supportedProp = _.chain(properties)
                .flatten()
                .filter(prop => prop.property.id === propertyId)
                .head()
                .value();

            if (supportedProp) {
                this._setSupportedProperty(supportedProp);
                return;
            }
        }

        this._setSupportedProperty(propertyId);
    }
}

PropertyLabel.register();