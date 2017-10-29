import {CustomElement, compute} from 'twc/polymer';
import {IClass, IHydraResource, IOperation, ISupportedOperation, ISupportedProperty} from "heracles";

import '../api-documentation/property-label';
import 'bower:paper-tabs/paper-tabs.html';
import 'bower:paper-card/paper-card.html';
import 'bower:ld-navigation/ld-navigation.html';
import 'bower:mat-elements/mat-item.html';
import 'bower:mat-elements/mat-list.html';
import 'bower:mat-elements/mat-header.html';
import 'bower:mat-elements/mat-paper.html';
import 'bower:iron-icons/image-icons.html';
import './resource-card';

@CustomElement()
class DefaultResourceView extends Polymer.Element {
    resource: IHydraResource;

    closeable: boolean;

    @compute((resource: IHydraResource) => {
        return resource.types.map((cId: string) => {
            const clas = resource.apiDocumentation.getClass(cId);

            if(!clas) {
                return { title: cId };
            }

            return clas;
        });
    })
    classes: Array<IClass>;

    @compute((resource: IHydraResource) => Utils.getProperties(resource))
    allProperties: Array<ISupportedProperty>;

    @compute((allProperties: ISupportedProperty[]) => _getNonLinks(allProperties))
    properties: Array<ISupportedProperty>;

    @compute((allProperties: ISupportedProperty[]) => _getLinks(allProperties))
    links: Array<ISupportedProperty>;

    @compute((resource: IHydraResource) => resource.operations)
    operations: Array<ISupportedOperation>;

    @compute((links: Array<ISupportedProperty>) => links.length > 0)
    _hasLinks: boolean;

    @compute((properties: Array<ISupportedProperty>) => properties.length > 0)
    _hasProperties: boolean;

    @compute((operations: Array<IOperation>) => operations.length > 0)
    _hasOperations: boolean;

    @compute((resource: IHydraResource) => resource.types.length > 0)
    _hasClasses: boolean;

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    _expandChild(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('child-expanded', {
            detail: {
                resource: e.model.value
            },
            bubbles: true,
            composed: true
        }));
    }

    _followLink(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('child-loaded', {
            detail: {
                resource: e.model.value
            },
            bubbles: true,
            composed: true
        }));
    }

    _showClassDocumentation(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('show-class-documentation', {
            detail: {
                classId: e.model.type.id
            },
            bubbles: true,
            composed: true
        }))
    }

    _getValues(property: ISupportedProperty) {
        let values = this.resource[property.property.id];
        if(Array.isArray(values) === false) {
            values = [ values ];
        }

        return values.filter((i: any) => typeof i !== 'undefined');
    }

    _hasValues(property: ISupportedProperty) {
        return this._getValues(property).length > 0;
    }

    _getPath(urlStr: string) {
        const url = new URL(urlStr);
        return url.pathname + url.search;
    }
}

function _getLinks(properties: Array<ISupportedProperty>) {
    return properties.filter((prop: ISupportedProperty) => {
        return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1;
    });
}

function _getNonLinks(properties: Array<ISupportedProperty>) {
    return properties.filter((prop: ISupportedProperty) => {
        return prop.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') === -1;
    });
}
