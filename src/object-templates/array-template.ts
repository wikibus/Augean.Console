import {RegisteredTemplate} from './template-registry';

@component('array-template')
@behavior(RegisteredTemplate)
@extend('template')
class ArrayTemplate extends polymer.Base {
    objectMatches(res) {
        return Array.isArray(res);
    }
}

ArrayTemplate.register();