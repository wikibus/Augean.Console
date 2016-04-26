import * as _ from 'lodash';
import {Hydra} from 'heracles';

@component('augean-console')
class AugeanConsole extends polymer.Base {

    @property({value: []})
    _modelHistory:Array;

    @property()
    model:Object;

    @property()
    currentModel:Object;
    
    hasPreviousModel(_modelHistory) {
        return _modelHistory.base.length > 0;
    }

    load(e) {
        Hydra.loadResource(this.$.resource.value)
            .then(res => {
                this.model = res;
                this.currentModel = res;
            });

        e.preventDefault();
    }

    @computed()
    displayedModel(currentModel) {
        return currentModel.collection || currentModel;
    }

    showModel(ev) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }

    back() {
        this.currentModel = this.pop('_modelHistory');
    }
}

@component('object-view')
class ObjectView extends polymer.Base {

    @property()
    model:Object;

    @property({ value:false, type:Boolean })
    nested:Boolean;

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
        return !(typeof model === 'object') || model['@value'];
    }

    showModel(ev) {
        this.fire('show-model', ev.target.dataToShow, {
            bubbles: true
        });
    }

    forwardEvent(ev) {
        //this.fire()
    }
}

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

@component('default-literal-view')
class DefaultLiteralView extends polymer.Base {

    @property()
    literal:any;

    @computed()
    literalValue(literal) {
        return literal['@value'] || literal;
    }
}

AugeanConsole.register();
ObjectView.register();
DefaultLiteralView.register();
DefaultResourceView.register();