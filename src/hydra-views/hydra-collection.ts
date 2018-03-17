import { CustomElement, observe, template } from 'twc/polymer';
import 'bower:polymer/polymer-element.html';
import 'bower:mat-elements/mat-table.html';
import 'bower:mat-elements/mat-table-styles.html';
import {IHydraResource} from "heracles";
import '../api-documentation/property-label';

@CustomElement()
@template(`
<style include="mat-table-styles"></style>

<mat-table id="table">
</mat-table>`)
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
