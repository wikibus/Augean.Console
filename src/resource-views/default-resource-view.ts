import {CustomElement, compute} from 'twc/polymer';
import {IHydraResource} from "heracles";

import '../api-documentation/property-label';
import 'bower:paper-tabs/paper-tabs.html';
import 'bower:paper-card/paper-card.html';
import 'bower:ld-navigation/ld-navigation.html';
import './resource-card';

@CustomElement()
class DefaultResourceView extends Polymer.Element {

    resource: IHydraResource;

    tab: number = 0;

    nested: Boolean = false;

    @compute('_getImage', ['resource'])
    image: object;

    _getImage(resource: IHydraResource) {
        if (resource['http://schema.org/image']) {
            return resource['http://schema.org/image']['http://schema.org/thumbnail']['http://schema.org/contentUrl'];
        }

        return null;
    }

    @compute('_getObjectProperties', ['resource'])
    objectProperties: Array<object>;

    _getObjectProperties(resource: IHydraResource) {
        if (typeof resource === 'string') return [];

        return Object.entries(resource)
            .filter(pair => !(pair[1].startsWith && pair[1].startsWith('_:')))
            .map(pair => ({
                id: pair[0],
                value: getValue(pair[1])
            }));
    }

    load() {
        LdNavigation.Helpers.fireNavigation(this, this.resource.id);
    }
}

function getValue(object: any) {
    return object['@value'] || object;
}
