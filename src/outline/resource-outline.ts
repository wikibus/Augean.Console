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
@style(`
mat-sublist mat-item {
    padding-left: 80px !important
`)
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
        return Object.entries(resource)
                     .filter(entry => entry[1]['@id'])
                     .map(entry => ({
                         id: entry[1]['@id'],
                         property: entry[0]
                     }));
    }

    _getPath(uri: string) {
        return new URL(uri).pathname;
    }

    @observe()
    _rootChanged(rootResource: IHydraResource) {
        this._setResource(rootResource);
    }

    _changeResource(e: CustomEvent) {
        const property = e.model.item.property;
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
        Polymer.importHref('dist/outline/resource-json.html', () => {
            this.$.source.show();
        });
    }
}
