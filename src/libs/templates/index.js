import {ViewTemplates} from 'augeas';
import {html} from 'lit-html';
import {repeat} from 'lit-html/lib/repeat';

ViewTemplates.when
    .value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#Collection')
    .renders((render, collection) => {
        const members = collection['http://www.w3.org/ns/hydra/core#member'];
        const view = collection['http://www.w3.org/ns/hydra/core#view'];

        return html`<hydra-collection collection="${collection}">
                        <div slot="members">
                            ${repeat(members, (member) => html`<hydra-member-view resource="${member}"></hydra-member-view>`)}
                        </div>
                        
                        ${render(view, 'pager')}
                    </hydra-collection>`;
    });

ViewTemplates.when
    .value(v => v['@type'] === 'http://www.w3.org/ns/hydra/core#PartialCollectionView')
    .scope(s => s === 'pager')
    .renders((render, view, scope) => html`<hydra-partial-view-pager view="${view}" slot$="${scope}"></hydra-partial-view-pager>`);

ViewTemplates.when
    .value(v => typeof(v) === 'object' && v !== null)
    .renders((r, v, property) => html`<default-resource-view nested$="${!!property}"
                                                             property="${property}"
                                                             resource="${v}"></default-resource-view>`);

ViewTemplates.when
    .value(v => true)
    .renders((r,v,s) => html`${v}`);