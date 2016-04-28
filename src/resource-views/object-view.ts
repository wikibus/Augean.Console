import 'src/resource-views/default-literal-view.html!';
import 'src/resource-views/default-resource-view.html!';

import * as _ from 'lodash';

@component('object-view')
class ObjectView extends polymer.Base {

    @property()
    model:Object;

    @property({value: 0, type: Number})
    nestingLevel:number;

    @property({value: 2})
    nestingLimit:number;

    @computed()
    nested(nestingLevel, nestingLimit) {
        return nestingLevel >= nestingLimit;
    }

    @computed()
    isArray(model) {
        return Array.isArray(model);
    }

    @computed()
    isResource(model) {
        return _.isObject(model) && !Array.isArray(model);
    }

    @computed()
    isLiteral(model) {
        return !(typeof model === 'object') || !!model['@value'];
    }

    @computed()
    arrayModel(model) {
        return this.isArray ? model : [];
    }

    showModel(ev) {
        this.fire('show-model', ev.target.dataToShow, {
            bubbles: true
        });
    }

    nextLevel(level) {
        return level + 1;
    }
}

ObjectView.register();