import './templates/console-templates';
import './templates/fallback-templates';
import "./templates/hydra-templates";
import 'bower_components/ld-navigation/ld-navigation.html!';
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
import 'bower_components/iron-meta/iron-meta.html!';
import 'wikibus/augeas';
import './api-documentation/viewer';
import './operation-views/operation-selector';
import {Hydra} from 'heracles';

type ConsoleState = 'ready' | 'loading' | 'loaded' | 'error';

@component('augean-console')
class AugeanConsole extends polymer.Base {

    @property({value: null})
    model:IHydraResource;

    @property()
    initialUrl:string;

    @property()
    url:string;

    @property()
    currentModel:Object;

    @property({readOnly: true})
    lastError:Error;

    @property({notify: true, value: 'ready', type: String})
    state:ConsoleState;

    @computed()
    hasApiDocumentation(model) {
        return !!model && !!model.apiDocumentation;
    }

    @computed()
    urlInput() {
        return this.$.resource;
    }

    attached() {
        this.url = this.initialUrl;
        this.state = 'ready';
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
        this.loadResource(this.$.resource.value);
    }

    loadResource(value) {
        Hydra.loadResource(value)
            .then((res:IHydraResource) => {
                this.model = res;
                this.currentModel = res;
                this.state = 'loaded';
            })
            .catch(err => {
                this._setLastError(err);
                this.state = 'error';
            });
    }

    urlChanged(e) {
        this.debounce('load-model', () => {
            if (e.detail.value !== '/') {
                this.$.resource.value = e.detail.value;
                if (!this.$.resource.invalid) {
                    this.state = 'loading';
                    this.loadResource(this.$.resource.value);
                }
            }
        });
    }

    loadOnEnter(e) {
        if (e.keyCode === 13) {
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

    @listen('show-class-documentation')
    showDocumentation(e:Event) {
        this.$.apiDocumentation.selectClass(e.detail.classId);
        this.showDocs();
        e.stopPropagation();
    }
}

AugeanConsole.register();