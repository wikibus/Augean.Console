import * as _ from 'lodash';
import {RegisteredTemplate} from './template-registry';

@component('type-template')
@behavior(RegisteredTemplate)
@extend('template')
class TypeTemplate extends polymer.Base {

    @property()
    type: String;

    isMatch(res) {
        if(Array.isArray(res['@type'])) {
            return _.some(res['@type'], t => t === this.type);
        }

        return res['@type'] === this.type;
    }
}

TypeTemplate.register();