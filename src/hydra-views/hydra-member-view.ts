import { CustomElement, compute, style } from 'twc/polymer';
import { IHydraResource } from "heracles";

import 'bower:paper-button/paper-button.html';
import 'bower:paper-card/paper-card.html';
import '../api-documentation/property-label';

@CustomElement()
@style(':host { display: inline; }')
class HydraMemberView extends Polymer.Element {

    resource: IHydraResource;

    @compute('_getImage', [ 'resource' ])
    image: object;

    _getImage(resource: IHydraResource) {
        if (resource['http://schema.org/image']) {
            return resource['http://schema.org/image']['http://schema.org/thumbnail']['http://schema.org/contentUrl'];
        }

        return null;
    }

    getKeys(model: any) {
        if (typeof model === 'string') return [];

        const pairs = Object.entries(model)
            .filter((pair: any) => !pair[0].startsWith('@'))
            .filter((pair: any) => pair[0] !== 'http://schema.org/image');
        return pairs;
    }

    load() {
        LdNavigation.Helpers.fireNavigation(this, this.resource.id);
    }
}
