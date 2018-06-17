import { CustomElement, template, style, observe } from 'twc/polymer';
import {IHydraResource, IHydraResponse} from "alcaeus";
import 'bower:polymer/polymer-element.html';

import 'bower:mat-elements/mat-list.html';
import 'bower:mat-elements/mat-sublist.html';
import './resource-outline';
import './entrypoint-menu';

@CustomElement()
@style(`:host { display: block }`)
@template(`
<mat-list>
    <mat-sublist label="Main menu" collapsible>
        <entrypoint-menu entrypoint="[[entrypoint]]"></entrypoint-menu>
    </mat-sublist>
    <mat-sublist label="Resource outline" collapsible collapsed>
        <resource-outline root-resource="[[resource]]"></resource-outline>
    </mat-sublist>
</mat-list>`)
class SideMenu extends Polymer.Element {
    resource: IHydraResource;

    readonly entrypoint: IHydraResource;

    @observe('resource')
    _getEntrypoint(resource: IHydraResource) {
        resource.apiDocumentation.getEntrypoint()
            .then((entrypoint: IHydraResponse) => {
                this._setEntrypoint(entrypoint.root);
            })
            .catch(() => {
                this._setEntrypoint({});
            });
    }
}
