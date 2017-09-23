import './supported-class-link';

@component('supported-class-link')
class SupportedClassLink extends polymer.Base {

    @property()
    supportedClass: IClass;

    @computed()
    classTitle(supportedClass:IDocumentedResource) {
        return supportedClass.title || supportedClass.id;
    }

    selectClass() {
        this.fire('class-selected', {
            classId: this.supportedClass.id
        });
    }
}

SupportedClassLink.register();