import * as _ from 'lodash';

@component('property-label')
class PropertyLabel extends polymer.Base {

    @property({readOnly: true})
    propertyTitle:string;

    @property()
    propertyId:string;

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

            Promise.all(properties).then(resolved => {
                var supportedProp = _.chain(resolved)
                    .flatten()
                    .filter(prop => prop.property === propertyId)
                    .head()
                    .value();

                if (supportedProp) {
                    this._setPropertyTitle(supportedProp.title)
                }
            });
        }
        this._setPropertyTitle(propertyId);
    }
}

PropertyLabel.register();