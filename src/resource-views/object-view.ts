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

    @observe('object,predicate')
    _draw(object, predicate) {
        var templates = this.templates || [];
        var found;
        var elementRoot = Polymer.dom(this.root);

        while (elementRoot.firstChild) {
            elementRoot.removeChild(elementRoot.firstChild);
        }

        for (var i = 0; i < templates.length; i++) {
            var template = templates[i];

            if (!template.isMatch) continue;

            if (!template.isMatch(object, predicate)) continue;

            found = true;

            if (template.name) {
                this.setAttribute('data-template', template.name);
            }

            this.getStamped(template, object)
                .then(stamped => elementRoot.appendChild(stamped));
            break;
        }

        if (!found) {
            var notFoundNode = document.createElement('div');
            notFoundNode.textContent = 'Template Not found';
            elementRoot.appendChild(notFoundNode);

            console.warn('Template not found for', object);
        }
    }
}

ObjectView.register();