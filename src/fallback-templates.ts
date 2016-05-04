import {RegisteredTemplate} from './object-templates/template-registry';

@behavior(RegisteredTemplate)
@extend('template')
@component('any-object-template')
class AnyObjectTemplate extends polymer.Base {
    isMatch(resource) {
        return typeof resource === 'object' && !resource['@value'];
    }
}

@behavior(RegisteredTemplate)
@extend('template')
@component('any-literal-template')
class AnyLiteralTemplate extends polymer.Base {
    isMatch(resource) {
        return typeof resource === 'string' || !! resource['@value'];
    }
}

@component('fallback-templates')
class FallbackTemplates extends polymer.Base {
    
}

AnyLiteralTemplate.register();
AnyObjectTemplate.register();
FallbackTemplates.register();