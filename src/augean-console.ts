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

    @property({value: 0, reflectToAttribute: true, type: Number})
    nestingLevel:number;

    @computed()
    nested(nestingLevel) {
        return nestingLevel >= 2;
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
        return !(typeof model === 'object') || model['@value'];
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

@component('documented-property')
class DocumentedProperty extends polymer.Base {

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
        return this._setPropertyTitle(propertyId);
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
DocumentedProperty.register();