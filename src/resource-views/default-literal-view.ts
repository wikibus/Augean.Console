import { CustomElement, compute, style, template } from 'twc/polymer';

@CustomElement()
@style('{ :host { display: block }')
@template('<span>[[literalValue]]</span>')
class DefaultLiteralView extends Polymer.Element {
    literal: object;

    @compute((literal: any) => literal['@value'] || literal)
    literalValue: string;
}
