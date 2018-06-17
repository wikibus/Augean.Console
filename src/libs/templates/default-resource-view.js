import {ViewTemplates} from 'lit-any';
import {html} from 'lit-html/lib/lit-extended';

ViewTemplates.default.when
    .scopeMatches(s => s === 'default-resource-view')
    .valueMatches(v => v.isImage)
    .renders((r, img) => html`<a target="_blaynk" href="${img.contentUrl}"><img src$="${img.thumbnail.contentUrl}"></a>`);

ViewTemplates.default.when
    .scopeMatches(s => s === 'default-resource-view')
    .renders((r, v) => {
        const matItemClicked = (e) => {
            if(!v.id) {
                return;
            }

            const _this = e.target;
            _this.dispatchEvent(new CustomEvent('child-expanded', {
                detail: {
                    resource: v
                },
                bubbles: true,
                composed: true
            }));
        };

        let icon = html``;
        if(v.id) {
            icon = html`<iron-icon icon="chevron-right" slot="secondary"></iron-icon>`;
        }

        return html`<mat-item label="${v}" on-xp-activate="${matItemClicked}">${icon}</mat-item>`;
    });
