import * as _ from 'lodash';
import {RegisteredTemplate} from './template-registry';

@component('type-template')
@behavior(RegisteredTemplate)
@extend('template')
class TypeTemplate extends polymer.Base {

    @property()
    type: String;

    objectMatches(res) {
        if(Array.isArray(res['@type'])) {
            return _.some(res['@type'], t => t === this.type);
        }

        return res['@type'] === this.type;
    }
}

@behavior(RegisteredTemplate)
@extend('template')
@component('any-object-template')
class AnyObjectTemplate extends polymer.Base {
    objectMatches(resource) {
        var isObject = typeof resource === 'object' && resource['@id'];

        return isObject;
    }

    predicateMatches(predicate) {
        var predicateMatches = true;

        if(this.predicate) {
            predicateMatches = predicate === this.predicate;
        }

        return predicateMatches;
    }
}

@behavior(RegisteredTemplate)
@extend('template')
@component('any-literal-template')
class AnyLiteralTemplate extends polymer.Base {
    objectMatches(resource) {
        return !(typeof resource === 'object') || !! resource['@value'];
    }
}

AnyLiteralTemplate.register();
AnyObjectTemplate.register();
TypeTemplate.register();