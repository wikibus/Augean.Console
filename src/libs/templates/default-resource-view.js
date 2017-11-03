import {ViewTemplates} from 'lit-any';
import {html} from 'lit-html';

ViewTemplates.when
    .scope(s => s === 'default-resource-view')
    .renders((r, v) => html`<mat-item label="${v}"></mat-item>`);

ViewTemplates.when
    .scope(s => s === 'default-resource-view')
    .renders((r, v) => html`${v}`);
