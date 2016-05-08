import './type-docs-link.html!';

@template('<a on-tap="showDocumentation" href="[[class]]">[[title]]</a>')
@component('type-docs-link')
class TypeDocsLink extends polymer.Base {
    
    @property()
    'class': String;

    @property({ readOnly: true })
    title:String;
    
    @observe('class')
    titleChanged(clas) {
        this._setTitle(clas);
    }
    
    showDocumentation(e) {
        this.fire('show-class-documentation', {
            classId: this.class
        });

        e.preventDefault();
    }
}

TypeDocsLink.register();