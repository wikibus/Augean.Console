import 'src/resource-views/default-literal-view.html!';
import 'src/resource-views/default-resource-view.html!';
import {RegisteredTemplateConsumer} from './../object-templates/template-registry';

@component('object-view')
@behavior(RegisteredTemplateConsumer)
class ObjectView extends polymer.Base {

    @property()
    object:Object;

    @property({ value: null })
    predicate:String;

    @property({ value: '' })
    templateScope: String;

    @property({ value: false })
    ignoreMissing: Boolean;

    @property({ readOnly: true, notify: true, value: false })
    hasBeenRendered: Boolean;
    
    @property({ type: Object, value: {} })
    params: Object;

    @observe('object,predicate,templateScope,ignoreMissing,params')
    _draw(object, predicate, templateScope, ignoreMissing, params) {
        var templates = this.templates || [];
        var found;
        var elementRoot = Polymer.dom(this.root);

        while (elementRoot.firstChild) {
            elementRoot.removeChild(elementRoot.firstChild);
        }

        for (var i = 0; i < templates.length; i++) {
            var template = templates[i];

            if (!template.isMatch) continue;

            if (!template.isMatch(object, predicate, templateScope)) continue;

            found = true;

            if (template.name) {
                this.setAttribute('data-template', template.name);
            }

            this.getStamped(this, template, object)
                .then(stamped => elementRoot.appendChild(stamped));

            this._setHasBeenRendered(true);
            break;
        }

        if (!found && !ignoreMissing) {
            var notFoundNode = document.createElement('div');
            notFoundNode.textContent = 'Template Not found';
            elementRoot.appendChild(notFoundNode);

            console.warn('Template not found for', object);

            this._setHasBeenRendered(true);
        }
    }
}

ObjectView.register();