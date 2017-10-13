import {CustomElement, compute, attr, style} from 'twc/polymer';

import '../api-documentation/property-label';
import 'bower:paper-card/paper-card.html';
import 'bower:ld-navigation/ld-navigation.html';

@CustomElement()
@style('resource-card.css')
class ResourceCard extends Polymer.Element {

    propertyId: string;

    object: object;

    subject: object;

    nested = false;

    @attr()
    @compute((propertyId: string) => propertyId === '@id')
    isId: boolean;

    @attr()
    @compute((isId: boolean, nested: boolean) => isId)
    hideId: boolean;
}
