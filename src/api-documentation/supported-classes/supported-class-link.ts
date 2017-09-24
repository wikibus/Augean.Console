import { CustomElement, compute } from 'twc/polymer';
import {IClass, IDocumentedResource} from "heracles";

import 'bower:paper-tooltip/paper-tooltip.html';

@CustomElement()
class SupportedClassLink extends Polymer.Element {

    supportedClass: IClass;

    @compute((supportedClass: IDocumentedResource) => supportedClass.title || supportedClass.id)
    classTitle: string;

    selectClass(e: Event) {
        this.dispatchEvent(new CustomEvent('class-selected', {
            detail: {
                classId: this.supportedClass.id,
            },
            bubbles: true,
            composed: true
        }));

        e.preventDefault();
    }
}
