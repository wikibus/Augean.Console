export function Mixin(Base) {
    class Class extends Base {

        get isImage() {
            return true;
        }

        get contentUrl() {
            return this['http://schema.org/contentUrl'];
        }

        get thumbnail() {
            return this['http://schema.org/thumbnail'];
        }
    }

    return Class;
}

export function shouldApply(res) {
    return !!res['http://schema.org/contentUrl'];
}
