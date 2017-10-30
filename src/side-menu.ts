import { CustomElement, template, style } from 'twc/polymer';
import {IHydraResource} from "heracles";
import 'bower:polymer/polymer-element.html';

import 'bower:mat-elements/mat-list.html';
import 'bower:mat-elements/mat-sublist.html';
import './outline/resource-outline';

@CustomElement()
@style(`:host { display: block }`)
@template(`
<mat-list>
    <mat-sublist label="Main menu" collapsible>
        <span class="item">Only one item will be opened inside a group</span>
    </mat-sublist>
    <mat-sublist label="Resource outline" collapsible>
        <resource-outline root-resource="[[resource]]"></resource-outline>
    </mat-sublist>
</mat-list>`)
class SideMenu extends Polymer.Element {
    resource: IHydraResource;
}
