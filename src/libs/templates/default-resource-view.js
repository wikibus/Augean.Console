import {ViewTemplates} from 'lit-any';
import {html} from 'lit-html/lib/lit-extended';

ViewTemplates.when
    .scopeMatches(s => s === 'default-resource-view')
    .valueMatches(v => v.isImage)
    .renders((r, img) => html`<a target="_blank" href="${img.contentUrl}"><img src$="${img.thumbnail.contentUrl}"></a>`);

ViewTemplates.when
    .scopeMatches(s => s === 'default-resource-view')
    .renders((r, v) => html`<mat-item label="${v}"></mat-item>`);
