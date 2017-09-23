@template('<a on-tap="showDocumentation" href="[[class.id]]">[[title]]</a>')

@component('type-docs-link')
export class TypeDocsLink extends polymer.Base {

    @property()
    'class':IClass;

    @property()
    classId:IClass;

    @property({readOnly: true})
    title:String;

    @observe('classId')
    classIdChanged(classId) {
        var apiDocumentation = document.createElement('iron-meta').byKey('apiDocs');

        if (apiDocumentation) {
            this.class = apiDocumentation.getClass(classId);
        }
    }

    @observe('class')
    titleChanged(clas:IDocumentedResource) {
        if (clas) {
            this._setTitle(clas.title);
        }
        else {
            this._setTitle('');
        }
    }

    showDocumentation(e) {
        this.fire('show-class-documentation', {
            classId: this.class.id
        });

        e.preventDefault();
    }
}

TypeDocsLink.register();