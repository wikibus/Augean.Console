import 'src/api-documentation/property-label.html!';

import * as _ from 'lodash';

@component('default-resource-view')
class DefaultResourceView extends polymer.Base {

    @property()
    resource:Object;

    getKey(key, model) {
        return model[key];
    }

    getKeys(model) {
        if (typeof model === 'string') return [];

        var pairs = _.toPairs(model)
            .filter(pair => !pair[0].startsWith('@'));
        return pairs;
    }
}

DefaultResourceView.register();