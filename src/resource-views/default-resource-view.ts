import './default-resource-view.html!';
import '../api-documentation/property-label';
import 'src/api-documentation/property-label';
import 'bower_components/paper-tabs/paper-tabs.html!';
import 'bower_components/paper-card/paper-card.html!';
import 'bower_components/ld-navigation/ld-navigation.html!';
import {ObjectGetter} from '../hydra-views/hydra-behaviors';
import * as _ from 'lodash';

@behavior(ObjectGetter)
@component('default-resource-view')
class DefaultResourceView extends polymer.Base {

    @property()
    resource:IHydraResource;

    @property({ value: 0 })
    tab:number;

    @property({ type: Boolean, value: false })
    nested:Boolean;

    @computed()
    image(resource) {
        if (resource['http://schema.org/image']) {
            return resource['http://schema.org/image']['http://schema.org/thumbnail']['http://schema.org/contentUrl'];
        }

        return null;
    }

    @computed()
    objectProperties(resource) {
        if (typeof resource === 'string') return [];

        var pairs = _.toPairs(resource)
            .filter(pair => !(pair[1].startsWith && pair[1].startsWith('_:')))
            .map(pair => ({
                id: pair[0],
                value: getValue(pair[1])
            }));
        return pairs;
    }

    load() {
        LdNavigation.Helpers.fireNavigation(this, this.resource.id);
    }
}

function getValue(object) {
    return object ['@value'] || object;
}

@component('resource-card')
class ResourceCard extends polymer.Base {

    @property()
    propertyId:String;

    @property()
    object:Object;

    @property()
    subject:Object;

    @property({ type: Boolean })
    nested = false;

    @computed({ reflectToAttribute: true })
    isId(propertyId):boolean {
        return this.propertyId === '@id';
    }

    @computed({ reflectToAttribute: true })
    hideId(isId, nested) {
        return isId;
    }
}

ResourceCard.register();
DefaultResourceView.register();