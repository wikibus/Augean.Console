import { FieldTemplates } from 'lit-any/src/template-registry';
import {html} from 'lit-html/lib/lit-extended';

function jsonLdWrapped(v) {
    return {
        '@value': v
    };
}

function valueGetter(v) {
    if (typeof v === 'object' && v !== null) {
        v = v['@value'];
    }

    return v || '';
}

function typeMatches(uri) {
    return (f) => {
        return f.type && f.type.id === uri;
    };
}

FieldTemplates.when
    .fieldMatches(typeMatches('http://www.w3.org/2001/XMLSchema#integer'))
    .renders((f, id, v, set) => html`<paper-input label="${f.title}" type="number" value$="${v}" on-input="${e => set(jsonLdWrapped(e.target.value))}" >`);

FieldTemplates.when
    .fieldMatches(f => true)
    .renders((f, id, v, set) => {
        return html`<paper-input label="${f.title}" type="text" value="${valueGetter(v)}" on-input="${e => set(jsonLdWrapped(e.target.value))}" >`;
    });
