import './default-literal-view.html!';

@component('default-literal-view')
class DefaultLiteralView extends polymer.Base {
    literal: Object,

    @computed()
    literalValue(literal) {
        return literal['@value'] || literal;
    }
}

DefaultLiteralView.register();
