import 'bower_components/paper-dropdown-menu/paper-dropdown-menu.html!';
import 'bower_components/paper-listbox/paper-listbox.html!';
import 'bower_components/paper-item/paper-item.html!';
import 'src/api-documentation/supported-class-view.html!'

import * as _ from 'lodash';

@component('api-documentation-viewer')
class ApiDocumentationViewer extends polymer.Base {

    @property()
    apiDocs:IApiDocumentation;
    
    @property({ value: [] })
    modelTypes:Array;

    @property({ readOnly: true })
    classes:Array<IClass>;

    @observe('classes,modelTypes')
    selectCurrentClass(classes, types) {
        var classIdx = _.findIndex(classes, c => {
            return _.some(types, t => c.id === t)
        });

        this.$.classSelect.select(classIdx);
    }

    @observe('apiDocs')
    _getClasses(apiDocs:IApiDocumentation) {
        apiDocs.getClasses()
            .then(setClasses.bind(this))
    }

    isCurrent(typeId) {
        return _.some(this.modelTypes, t => {
            return t === typeId;
        });
    }

    displayClass(e) {
        var selectedItem = e.target.selectedItem;

        this.class = _.find(this.classes, cs => cs.id === selectedItem.classId)
    }
}

function setClasses(classes) {
    this._setClasses(classes);
}

ApiDocumentationViewer.register();