import {TemplateRegistry} from './template-registry';

@component('array-template')
@behavior(TemplateRegistry)
@extend('template')
class ArrayTemplate extends polymer.Base {
    isMatch(res) {
        return Array.isArray(res);
    }
}

ArrayTemplate.register();