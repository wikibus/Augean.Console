import { CustomElement, observe } from 'twc/polymer';
import 'bower:polymer/polymer-element.html';
import 'bower:mat-elements/mat-table.html';
import 'bower:mat-elements/mat-table-styles.html';
import {IHydraResource} from "heracles";
import '../api-documentation/property-label';

@CustomElement()
class HydraCollection extends Polymer.Element {
    collection: IHydraResource;

    @observe('collection.*')
    _collectionChanged(collection: any) {
        TemplateUtil.render({
            value: collection.base,
            scope: 'hydra-collection'
        }, this.$.table);
    }
}
