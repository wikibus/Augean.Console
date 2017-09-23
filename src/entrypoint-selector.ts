import { CustomElement, notify, template } from 'twc/polymer';
import 'bower:polymer/polymer-element.html';

import 'bower:vaadin-combo-box/vaadin-combo-box.html'

@CustomElement()
@template('<vaadin-combo-box label="Select Hydra API" items="[[apis]]" on-value-changed="_entrypointSelected"></vaadin-combo-box>')
export class EntrypointSelector extends Polymer.Element {

    @notify()
    readonly url: string;

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
    }

    _entrypointSelected(e: CustomEvent) {
        this._setUrl(e.detail.value);
    }
}
