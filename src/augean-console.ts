import 'bower_components/paper-material/paper-material.html!';
import 'bower_components/paper-multidrawer-panel/paper-multidrawer-panel.html!';
import 'bower_components/paper-header-panel/paper-header-panel.html!'
import 'bower_components/paper-toolbar/paper-toolbar.html!'
import 'bower_components/paper-input/paper-input.html!'
import 'bower_components/paper-styles/paper-styles.html!'
import 'bower_components/paper-spinner/paper-spinner.html!'
import 'bower_components/paper-card/paper-card.html!';
import 'bower_components/iron-icons/iron-icons.html!';
import 'bower_components/iron-pages/iron-pages.html!';
import 'bower_components/iron-icons/av-icons.html!';
import 'bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html!';
import 'bower_components/paper-icon-button/paper-icon-button.html!';
import 'src/resource-views/object-view.html!';
import 'src/api-documentation/viewer.html!';
import {Hydra} from 'heracles';

type ConsoleState = 'ready' | 'loading' | 'loaded';

@component('augean-console')
class AugeanConsole extends polymer.Base {

    @property({ value: null })
    model:IHydraResource;

    @property()
    initialUrl:string;

    @property()
    url:string;

    @property()
    currentModel:Object;

    @property({ notify: true, value: 'ready', type: String })
    state: ConsoleState;

    @computed()
    hasApiDocumentation(model) {
        return !!model && !!model.apiDocumentation;
    }

    @computed()
    urlInput(){
        return this.$.resource;
    }

    attached() {
        this.url = this.initialUrl;
    }

    hasPreviousModel(_modelHistory) {
        return _modelHistory.base.length > 0;
    }

    showDocs() {
        this.$.drawerPanel.openRightDrawer();
    }

    load() {
        this.state = 'loading';
        LdNavigation.Helpers.fireNavigation(this, this.$.resource.value);
    }

    loadResource() {
        Hydra.loadResource(this.$.resource.value)
            .then(res => {
                this.model = res;
                this.currentModel = res;
                this.state = 'loaded';
            });
    }
    
    urlChanged(e) {
        this.$.resource.value = e.detail.value;
        if(typeof this.state !== 'undefined' && this.state !== 'ready') {
            this.loadResource();
        }
    }

    loadOnEnter(e) {
        if(e.keyCode === 13) {
            this.load();
        }
    }

    @computed()
    displayedModel(currentModel) {
        return currentModel.collection || currentModel;
    }

    showModel(ev) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }
}

AugeanConsole.register();