import {CustomElement, notify, compute, style, listen} from "twc/polymer";
import {PaperInput} from "bower:paper-input/paper-input.html";
import {IHydraResource} from "heracles";

import './libs/Templates.js';
import './libs/Utils.js';

import 'bower:polymer/polymer-element.html';
import 'bower:paper-styles/paper-styles.html';
import 'bower:paper-input/paper-input.html';
import './helper-elements/loading-overlay';
import 'bower:ld-navigation/ld-navigation.html';
import 'bower:app-layout/app-layout.html';
import 'bower:iron-pages/iron-pages.html';
import 'bower:paper-icon-button/paper-icon-button.html';
import 'bower:iron-icons/iron-icons.html';
import 'bower:iron-icon/iron-icon.html';
import 'bower:iron-icons/av-icons.html';
import 'bower:paper-styles/default-theme.html';
import 'bower:paper-styles/typography.html';

type ConsoleState = 'ready' | 'loaded' | 'error' | 'operation';

@CustomElement()
@style('augean-console.css')
export class AugeanConsole extends Polymer.Element {

    model: IHydraResource = null;

    url: string;

    currentModel: IHydraResource;

    readonly lastError: Error;

    @notify()
    state: ConsoleState = 'ready';

    readonly isLoading: boolean = false;

    _prevState: ConsoleState;

    @compute((model: IHydraResource) => !!model && !!model.apiDocumentation)
    hasApiDocumentation: boolean;

    @compute(() => this.$.resource)
    urlInput: PaperInput;

    hasPreviousModel(_modelHistory: any) {
        return _modelHistory.base.length > 0;
    }

    connectedCallback() {
        super.connectedCallback();
        Polymer.importHref('dist/entrypoint-selector.html');
    }

    showDocs() {
        this.$.documentation.open();
    }

    load() {
        this._setIsLoading(true);
        LdNavigation.Helpers.fireNavigation(this, this.$.resource.value);
    }

    loadResource(value: string) {
        Polymer.importHref('dist/entrypoint-selector.html', async () => {
            try {
                const res = await Hypermedia.Hydra.loadResource(value);

                this.model = res;
                this.currentModel = res;
                this.state = 'loaded';
                this._setIsLoading(false);

                this._loadOutlineElement();
            } catch(err: Error) {
                this._setLastError(err);
                this.state = 'error';
                this._setIsLoading(false);
                console.error(err);
            }
        });
    }

    _loadOutlineElement() {
        Polymer.importHref('dist/menus/side-menu.html');
    }

    urlChanged(e: CustomEvent) {
        Polymer.Debouncer.debounce(
            null,
            Polymer.Async.microTask,
            () => {
                if (e.detail.value !== '/') {
                    this.$.resource.value = e.detail.value;
                    if (!this.$.resource.invalid) {
                        this._setIsLoading(true);
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

    @compute((currentModel: IHydraResource) => currentModel.collection || currentModel)
    displayedModel: IHydraResource;

    showModel(ev: CustomEvent) {
        this.push('_modelHistory', this.currentModel);
        this.currentModel = ev.detail;
    }

    _loadDocElements(e: CustomEvent) {
        if(e.detail.value === true) {
            Polymer.importHref('dist/api-documentation/viewer.html');
        }
    }

    @listen('show-class-documentation')
    showDocumentation(e: CustomEvent) {
        Polymer.importHref('dist/api-documentation/viewer.html', () => {
            this.$.apiDocumentation.selectClass(e.detail.classId);
            this.showDocs();
        });

        e.stopPropagation();
    }


    @listen('show-inline-resource')
    showResource(e: CustomEvent) {
        this.currentModel = e.detail.resource;
    }

    @listen('show-resource-json')
    showResourceJson(e: CustomEvent) {
        Polymer.importHref('dist/resource-views/resource-json.html', () => {
            this.$.source.resource = e.detail.resource;
            this.$.source.show();
        });
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
