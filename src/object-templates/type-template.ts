import * as _ from 'lodash';
import {TemplateRegistry} from './template-registry';

@component('type-template')
@behavior(TemplateRegistry)
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