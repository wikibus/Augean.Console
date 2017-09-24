import './hydra-member-view.html!';
import 'bower_components/paper-button/paper-button.html!';
import 'bower_components/paper-card/paper-card.html!';
import '../../src/api-documentation/property-label';
import {ObjectGetter} from '../hydra-views/hydra-behaviors';
import * as _ from 'lodash';

@behavior(ObjectGetter)
@component('hydra-member-view')
class HydraMemberView extends polymer.Base {

    @property()
    resource:IHydraResource;

    @computed()
    image(resource) {
        if (resource['http://schema.org/image']) {
            return resource['http://schema.org/image']['http://schema.org/thumbnail']['http://schema.org/contentUrl'];
        }

        return null;
    }

    getKeys(model) {
        if (typeof model === 'string') return [];

        var pairs = _.toPairs(model)
            .filter(pair => !pair[0].startsWith('@'))
            .filter(pair => pair[0] !== 'http://schema.org/image');
        return pairs;
    }

    load() {
        LdNavigation.Helpers.fireNavigation(this, this.resource.id);
    }
}

HydraMemberView.register();
