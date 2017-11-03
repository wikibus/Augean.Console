import { CustomElement, template, compute, observe } from 'twc/polymer';
import {IHydraResource, ISupportedProperty} from "heracles";
import 'bower:polymer/polymer-element.html';

import 'bower:mat-elements/mat-list.html';

@CustomElement()
@template(`<mat-list>
    <template is="dom-repeat" items="[[links]]" as="link">
    <mat-item label="[[link.title]]" on-xp-activate="load"></mat-item>
</template>
</mat-list>`)
class EntrypointMenu extends Polymer.Element {
    entrypoint: IHydraResource;

    @compute((entrypoint: IHydraResource) => {
        return entrypoint.apiDocumentation
            .getProperties(entrypoint.types[0])
            .filter((sp: ISupportedProperty) => {
                return sp.property.types.indexOf('http://www.w3.org/ns/hydra/core#Link') !== -1;
            });
    })
    links: Array<ISupportedProperty>;

    load(e: CustomEvent) {
        LdNavigation.Helpers.fireNavigation(this, this.entrypoint[e.model.link.property.id].id);
    }
}
