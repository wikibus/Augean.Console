import 'src/resource-views/default-literal-view.html!';
import 'src/resource-views/default-resource-view.html!';
import {RegisteredTemplateConsumer} from './../object-templates/template-registry';

@component('object-view')
@behavior(RegisteredTemplateConsumer)
class ObjectView extends polymer.Base {

    @property()
    object:Object;

    @property()
    predicate:String;

    @observe('object')
    _draw() {
        var templates = this.templates || [];
        var found;
        var elementRoot = Polymer.dom(this.root);

        while (elementRoot.firstChild) {
            elementRoot.removeChild(elementRoot.firstChild);
        }

        for (var i = 0; i < templates.length; i++) {
            var template = templates[i];

            if (!template.isMatch) continue;

            if (!template.isMatch(this.object)) continue;

            found = true;

            if (template.name) {
                this.setAttribute('data-template', template.name);
            }

            this.getStamped(template, this.object)
                .then(stamped => elementRoot.appendChild(stamped));
            break;
        }

        if (!found) {
            var notFoundNode = document.createElement('div');
            notFoundNode.textContent = 'Template Not found';
            elementRoot.appendChild(notFoundNode);

            console.warn('Template not found for', this.object);
        }
    }
}

ObjectView.register();