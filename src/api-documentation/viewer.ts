import { CustomElement, observe, compute, style } from 'twc/polymer';
import {IApiDocumentation, IClass, IResource} from "heracles";

import 'bower:polymer/polymer.html';

import 'bower:vaadin-combo-box/vaadin-combo-box.html';
import 'bower:paper-toast/paper-toast.html';
import 'bower:paper-dropdown-menu/paper-dropdown-menu.html'
import './supported-classes/supported-class-view';

@CustomElement()
@style('viewer.css')
class ApiDocumentationViewer extends Polymer.Element {

    apiDocs: IApiDocumentation;

    modelTypes: Array<string> = [];

    selectedClass: IClass;

    selectClass(classId: string) {
        if(!this.apiDocs || !this.apiDocs.classes) return;

        const clazz = this.apiDocs.classes.find((c: IClass) => {
            return c.id === classId;
        });

        selectClass.call(this, clazz);
    }

    onClassSelected(e: CustomEvent) {
        this.selectClass(e.detail.classId);
        e.preventDefault();
    }

    @observe('apiDocs', 'modelTypes')
    selectCurrentClass(apiDocs: IApiDocumentation, types: Array<string>) {
        if(!apiDocs || !apiDocs.classes) return;

        const clazz = apiDocs.classes.find((c: IClass) => {
            return types.some((t: IResource) => c.id === t)
        });

        selectClass.call(this, clazz);
    }

    isCurrent(typeId: string) {
        return this.modelTypes.some((t: IResource) => {
            return t === typeId;
        });
    }

    @compute((selectedClass: IClass) => !!selectedClass)
    classFound: boolean;

    closeToast() {
        this.$.toast.close();
    }
}

function selectClass(clas: IClass) {
    this.selectedClass = clas;

    if (!clas) {
        this.$.toast.open();
        this.$.classSelect.value = null;
    } else {
        this.$.toast.close();
        this.$.classSelect.value = clas.id;
    }
}
