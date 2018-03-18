import {CustomElement, style, compute, observe} from 'twc/polymer';
import 'bower:polymer/polymer-element.html';
import 'bower:mat-elements/mat-list.html';
import 'bower:mat-elements/mat-sublist.html';
import 'bower:mat-elements/mat-item.html';
import 'bower:mat-elements/mat-divider.html';
import 'bower:mat-elements/mat-avatar.html';
import 'bower:paper-icon-button/paper-icon-button.html';
import 'bower:iron-icons/iron-icons.html';
import {IHydraResource} from "heracles";

import '../api-documentation/property-label';

@CustomElement()
export class ResourceOutline extends Polymer.Element {
    rootResource: IHydraResource;

    readonly resource: IHydraResource;

    readonly _history: Array<IHydraResource> = [];

    @compute((resource: IHydraResource) => resource['@id'])
    resourceId: string;

    readonly _hasHistory = false;

    @compute('_getCurrentProperties', ['resource'])
    currentProperties: Array<string>;

    _getCurrentProperties(resource: IHydraResource) {
        const enumerableProperties = Object.entries(resource)
            .filter(entry => entry[1]['@id'] || Array.isArray(entry[1]))
            .map(entry => {
                const id = Array.isArray(entry[1])
                    ? 'Multiple items'
                    : entry[1]['@id'];

                return {
                    id: id,
                    property: entry[0]
                };
            });

        return [...enumerableProperties];
    }

    _getPath(uri: string) {
        try {

            const url = new URL(uri);
            return url.pathname + url.search;
        } catch(e) {
            return uri;
        }
    }

    @observe()
    _rootChanged(rootResource: IHydraResource) {
        this._setResource(rootResource);
    }

    _changeResource(e: CustomEvent) {
        const property = e.target.data;
        this._history.push(this.resource);
        this._setResource(this.resource[property]);
        this._set_hasHistory(true);
    }

    _goUp() {
        const previous = this._history.pop();

        if (previous) {
            this._setResource(previous);
        }

        this._set_hasHistory(this._history.length > 0);
    }

    _showSource() {
        this.dispatchEvent(new CustomEvent('show-resource-json', {
            bubbles: true,
            composed: true,
            detail: {
                resource: this.resource
            }
        }));
    }
}
