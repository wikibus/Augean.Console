import {ViewTemplates, render} from 'lit-any';
import {directive} from 'lit-html';
import {html} from 'lit-html/lib/lit-extended';
import {repeat} from 'lit-html/lib/repeat';
import './default-resource-view';
import './FieldTemplates';

window.TemplateUtil = {
    render
};

const previousCollection = new WeakMap();

ViewTemplates.when
    .valueMatches(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection')
    .scopeMatches(s => s === null)
    .renders((render, collection) => {
        Polymer.importHref('dist/hydra-views/hydra-collection.html');

        const pcv = collection.views
            .filter(v => !!v)
            .filter(v => v.types.indexOf('http://www.w3.org/ns/hydra/core#PartialCollectionView') >= 0);
        const view = pcv[0];

        const searchTemplate = collection["http://www.w3.org/ns/hydra/core#search"];

        let contract;
        let formElement = html``;
        let litForm;

        const setValue = (part) => {
            litForm = part.element;
            litForm.value = collection['http://hydra-ex.rest/vocab/currentMappings'] || {};
        };

        const doSearch = () => {
            const target = searchTemplate.expand(litForm.value);

            LdNavigation.Helpers.fireNavigation(document, target);
        };

        if(searchTemplate) {
            contract = {
                fields: searchTemplate.mappings.map(f => ({
                    type: f.property.range,
                    property: f.property.id,
                    title: f.property.title || f.variable
                }))
            };

            formElement = html`<lit-form no-labels ref="${directive(setValue)}" contract="${contract}">
                                </lit-form>
                                <input type="submit" on-click="${doSearch}" value="filter">`;
        }

        return html`
            ${formElement}
        
            <hydra-collection collection="${collection}"></hydra-collection>
        
            ${view ? render(view, 'pager') : ''}`;
    });

ViewTemplates.when
    .valueMatches(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection')
    .scopeMatches(s => s === 'hydra-collection')
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
    .scopeMatches(s => s === 'collection-member')
    .valueMatches(v => v.id && v.id.startsWith('http://lexvo.org'))
    .renders((render, value) => {
        const countryCode = value.id.replace('http://lexvo.org/id/iso639-1/', '');
        return html`${countryCode} `;
    });

ViewTemplates.when
    .scopeMatches(s => s === 'collection-member')
    .valueMatches(v => {
        return v.isImage === true;
    })
    .renders((render, value) => {
        return html`<ld-link resource-url$="${value.id}">
                        <a>${value.name}</a>
                    </ld-link> `;
    });

ViewTemplates.when
    .scopeMatches(s => s === 'collection-member')
    .valueMatches(v => !!v.id)
    .renders((render, value) => {
        return html`<ld-link resource-url$="${value.id}">
                        <a>${value.title || value.id}</a>
                    </ld-link> `;
    });

ViewTemplates.when
    .scopeMatches(s => s === 'collection-member')
    .valueMatches(v => Array.isArray(v))
    .renders((render, array) => html`${repeat(array, element => html`${render(element)}`)}`);

ViewTemplates.when
    .valueMatches(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#PartialCollectionView')
    .scopeMatches(s => s === 'pager')
    .renders((render, view, scope) => {
        if(!view.next && !view.previous) {
            return html``;
        }

        Polymer.importHref('dist/hydra-views/hydra-partial-view-pager.html');
        return html`<hydra-partial-view-pager view="${view}" slot$="${scope}"></hydra-partial-view-pager>`;
    });

ViewTemplates.when
    .valueMatches(v => typeof(v) === 'object' && v !== null)
    .renders((r, v, property) => {
        Polymer.importHref('dist/resource-views/default-resource-viewer.html');
        return html`<default-resource-viewer property="${property}" resource="${v}"></default-resource-viewer>`;
    });

ViewTemplates.when
    .valueMatches(v => true)
    .scopeMatches(s => true)
    .renders((r,v,s) => html`${v}`);
