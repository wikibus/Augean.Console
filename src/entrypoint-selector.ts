import { CustomElement, notify, template } from 'twc/polymer';
import 'bower:polymer/polymer-element.html';
import './libs/Hypermedia.js';
import 'bower:vaadin-combo-box/vaadin-combo-box.html'

@CustomElement()
@template('<vaadin-combo-box id="selector" label="Select Hydra API" items="[[apis]]" on-value-changed="_entrypointSelected"></vaadin-combo-box>')
export class EntrypointSelector extends Polymer.Element {

    @notify()
    url: string;

    readonly apis: Array<string>;

    ready() {
        super.ready();

        const apis = Array.prototype.map.call(this.children, (apiEl: HTMLElement) => {
            return {
                label: apiEl.textContent,
                value: apiEl.getAttribute('data-url')
            };
        });

        this._setApis(apis);

        if(apis.filter((api: any) => api.value === this.url)) {
            this.$.selector.value = this.url;
        }
    }

    _entrypointSelected(e: CustomEvent) {
        if(e.detail.value) {
            this.url = e.detail.value;
        }
    }
}
