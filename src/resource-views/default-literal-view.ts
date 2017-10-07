import { CustomElement, compute, style, template } from 'twc/polymer';
import 'bower:polymer/polymer.html';

@CustomElement()
@style('{ :host { display: block }')
@template('<span>[[literalValue]]</span>')
class DefaultLiteralView extends Polymer.Element {
    literal: object;

    @compute((literal: any) => literal['@value'] || literal)
    literalValue: string;
}
