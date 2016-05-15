import './viewer.html!';
import 'bower_components/vaadin-combo-box/vaadin-combo-box.html!';
import 'bower_components/paper-toast/paper-toast.html!';
import '../api-documentation/supported-class-view';

import * as _ from 'lodash';

@component('api-documentation-viewer')
class ApiDocumentationViewer extends polymer.Base {

    @property()
    apiDocs:IApiDocumentation;

    @property({value: []})
    modelTypes:Array;

    @property()
    selectedClass:IClass;

    selectClass(classId) {
        var clazz = _.find(this.apiDocs.classes, { id: classId });

        selectClass.call(this, clazz);
    }

    onClassSelected(e:Event) {
        this.selectClass(e.detail.classId);
        e.preventDefault();
    }

    @observe('apiDocs,modelTypes')
    selectCurrentClass(apiDocs, types) {
        var clazz = _.find(apiDocs.classes, c => {
            return _.some(types, t => c.id === t)
        });

        selectClass.call(this, clazz);
    }

    isCurrent(typeId) {
        return _.some(this.modelTypes, t => {
            return t === typeId;
        });
    }

    @computed()
    classFound(selectedClass) {
        return !!selectedClass;
    }

    closeToast() {
        this.$.toast.close();
    }
}

function selectClass(clas) {
    this.selectedClass = clas;

    if (!clas) {
        this.$.toast.open();
        this.$.classSelect.value = null;
    } else {
        this.$.toast.close();
        this.$.classSelect.value = clas.id;
    }
}

ApiDocumentationViewer.register();