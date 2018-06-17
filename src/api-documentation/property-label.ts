import { CustomElement, observe, compute, notify } from 'twc/polymer';
import {IClass, IHydraResource, IResource, ISupportedProperty} from "heracles";

import 'bower:paper-tooltip/paper-tooltip.html';
import 'bower:polymer/polymer-element.html';

@CustomElement()
class PropertyLabel extends Polymer.Element {

    readonly supportedProperty: ISupportedProperty;

    propertyId:string;

    @notify()
    @compute((supportedProperty:ISupportedProperty, propertyId: string) => {
        if(supportedProperty && supportedProperty.title) {
            return supportedProperty.title;
        }

        return propertyId;
    })
    propertyTitle: string;

    resource: IResource;

    @observe('resource', 'propertyId')
    getTitle(resource: IHydraResource, propertyId: string) {
        if (resource && resource.apiDocumentation) {
            let properties = resource.types.map((t: IClass) => resource.apiDocumentation.getProperties(t));

            const supportedProps = Utils.flatten(properties);
            const [ supportedProp, ...tail ] = supportedProps.filter((prop: ISupportedProperty) => prop.property.id === propertyId);

            if (supportedProp) {
                this._setSupportedProperty(supportedProp);
                return;
            }
        }

        this._setSupportedProperty(propertyId);
    }
}
