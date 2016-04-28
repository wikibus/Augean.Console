import 'bower_components/paper-material/paper-material.html!';
import 'bower_components/paper-multidrawer-panel/paper-multidrawer-panel.html!';
import 'bower_components/paper-header-panel/paper-header-panel.html!'
import 'bower_components/paper-toolbar/paper-toolbar.html!'
import 'bower_components/paper-input/paper-input.html!'
import 'bower_components/paper-styles/paper-styles.html!'
import 'bower_components/paper-card/paper-card.html!';
import 'bower_components/iron-icons/iron-icons.html!';
import 'bower_components/iron-icons/av-icons.html!';
import 'bower_components/paper-icon-button/paper-icon-button.html!';

import 'src/resource-views/object-view.html!';
import 'src/api-documentation/viewer.html!';

import {Hydra} from 'heracles';

@component('augean-console')
class AugeanConsole extends polymer.Base {

    @property({value: []})
    _modelHistory:Array;

    @property()
    model:Object;

    @property()
    url:string;

    @property()
    currentModel:Object;

    hasPreviousModel(_modelHistory) {
        return _modelHistory.base.length > 0;
    }

    showDocs() {
        this.$.drawerPanel.openRightDrawer();
    }

    load(e) {
        Hydra.loadResource(this.$.resource.value)
            .then(res => {
                this.model = res;
                this.currentModel = res;
            });

        e.preventDefault();
    }

    @computed()
    displayedModel(currentModel) {
        return currentModel.collection || currentModel;
    }

    showModel(ev) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }

    back() {
        this.currentModel = this.pop('_modelHistory');
    }
}

AugeanConsole.register();