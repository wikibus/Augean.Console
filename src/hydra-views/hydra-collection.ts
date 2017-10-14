import { CustomElement, style } from 'twc/polymer';
import 'bower:polymer/polymer-element.html';

@CustomElement()
@style('hydra-collection.css')
class HydraCollection extends Polymer.Element {

    collection: object;
}
