import {ViewTemplates, render} from 'augeas';
import {html} from 'lit-html';
import {repeat} from 'lit-html/lib/repeat';
import './default-resource-view';

window.TemplateUtil = {
    render
};

ViewTemplates.when
    .value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection')
    .scope(s => s === null)
    .renders((render, collection) => {
        Polymer.importHref('dist/hydra-views/hydra-collection.html');

        const view = collection.views[0];

        return html`
            <hydra-collection collection="${collection}"></hydra-collection>
        
            ${view ? render(view, 'pager') : ''}`;
    });

ViewTemplates.when
    .value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection')
    .scope(s => s === 'hydra-collection')
    .renders((render, collection) => {
        const members = collection.members;

        if(!members || members.length === 0) {
            return html``;
        }

        const properties = Utils.getProperties(members[0]);

        return html`
            <table>
                <thead>
                    <tr>
                        ${repeat(properties, (property) => html`
                        <th>
                            <span><property-label resource="${members[0]}" property-id$="${property.property.id}"></property-label></span>
                        </th>`)}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${repeat(members, member => html`
                    <tr>
                        ${repeat(properties, (property) => html`
                        <td>
                            <span>${render(member[property.property.id] || '', 'collection-member')}</span>
                        </td>`)}
                        <td>
                            <ld-link resource-url$="${member.id}">
                                <paper-icon-button icon="chevron-right"></paper-icon-button>
                            </ld-link>
                        </td>
                    </tr>`)}
                </tbody>
            </table>`;
    });

ViewTemplates.when
    .scope(s => s === 'collection-member')
    .value(v => v.id && v.id.startsWith('http://lexvo.org'))
    .renders((render, value) => {
        const countryCode = value.id.replace('http://lexvo.org/id/iso639-1/', '');
        return html`${countryCode} `;
    });

ViewTemplates.when
    .scope(s => s === 'collection-member')
    .value(v => !!v.id)
    .renders((render, value) => {
        return html`<ld-link resource-url$="${value.id}">
                        <a>${value.title || value.id}</a>
                    </ld-link> `;
    });

ViewTemplates.when
    .scope(s => s === 'collection-member')
    .value(v => Array.isArray(v))
    .renders((render, array) => html`${repeat(array, element => html`${render(element)}`)}`);

ViewTemplates.when
    .value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#PartialCollectionView')
    .scope(s => s === 'pager')
    .renders((render, view, scope) => {
        Polymer.importHref('dist/hydra-views/hydra-partial-view-pager.html');
        return html`<hydra-partial-view-pager view="${view}" slot$="${scope}"></hydra-partial-view-pager>`;
    });

ViewTemplates.when
    .value(v => typeof(v) === 'object' && v !== null)
    .renders((r, v, property) => {
        Polymer.importHref('dist/resource-views/default-resource-viewer.html');
        return html`<default-resource-viewer property="${property}" resource="${v}"></default-resource-viewer>`;
    });

ViewTemplates.when
    .value(v => true)
    .scope(s => true)
    .renders((r,v,s) => html`${v}`);
