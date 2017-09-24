import {CustomElement, notify, compute, style} from "twc/polymer";
import {PaperInput} from "bower:paper-input/paper-input.html";

import './libs/index.js';

import 'bower:polymer/polymer-element.html';
import 'bower:paper-styles/paper-styles.html';
import 'bower:paper-input/paper-input.html';
import 'bower:paper-spinner/paper-spinner.html';
import 'bower:ld-navigation/ld-navigation.html';
import 'bower:app-layout/app-layout.html';
import 'bower:iron-pages/iron-pages.html';
import 'bower:paper-icon-button/paper-icon-button.html';
import 'bower:iron-icons/iron-icons.html';
import 'bower:iron-icon/iron-icon.html';
import 'bower:iron-icons/av-icons.html';
import 'bower:paper-styles/default-theme.html';
import 'bower:paper-styles/typography.html';

import './api-documentation/viewer';
import './operation-views/operation-selector';
import './entrypoint-selector';

type ConsoleState = 'ready' | 'loading' | 'loaded' | 'error' | 'operation';

@CustomElement()
@style('augean-console.css')
export class AugeanConsole extends Polymer.Element {

    model: object = null;

    url: string;

    currentModel: object;

    readonly lastError: Error;

    @notify()
    state: ConsoleState = 'ready';

    _prevState: ConsoleState;

    @compute((model: any) => !!model && !!model.apiDocumentation)
    hasApiDocumentation: boolean;

    @compute(() => this.$.resource)
    urlInput: PaperInput;

    hasPreviousModel(_modelHistory: any) {
        return _modelHistory.base.length > 0;
    }

    showDocs() {
        this.$.documentation.open();
    }

    load() {
        this.state = 'loading';
        LdNavigation.Helpers.fireNavigation(this, this.$.resource.value);
    }

    loadResource(value: string) {
        AugeasConsole.Hydra.loadResource(value)
            .then((res: Response) => {
                this.model = res;
                this.currentModel = res;
                this.state = 'loaded';
            })
            .catch((err: Error) => {
                this._setLastError(err);
                this.state = 'error';
            });
    }

    urlChanged(e: CustomEvent) {
        Polymer.Debouncer.debounce(
            null,
            Polymer.Async.microTask,
            () => {
                if (e.detail.value !== '/') {
                    this.$.resource.value = e.detail.value;
                    if (!this.$.resource.invalid) {
                        this.state = 'loading';
                        this.loadResource(this.$.resource.value);
                    }
                }
            });
    }

    loadOnEnter(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.load();
        }
    }

    @compute((currentModel: any) => currentModel.collection || currentModel)
    displayedModel: object;

    showModel(ev: CustomEvent) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }

    //@listen('show-class-documentation')
    showDocumentation(e: CustomEvent) {
        this.$.apiDocumentation.selectClass(e.detail.classId);
        this.showDocs();
        e.stopPropagation();
    }

    _focusUrlInput() {
        this.$.resource.focus();
    }

    showOperationForm(e: CustomEvent) {
        if (e.detail.operation.requiresInput == false) {
            e.detail.operation.invoke();
        } else {
            this._prevState = this.state;
            this.state = 'operation';
        }
    }

    hideOperationForm() {
        this.state = this._prevState || 'ready';
    }

    executeOperation() {
        alert('op');
    }
}
