import { CustomElement, style } from 'twc/polymer';

@CustomElement()
@style('hydra-collection.css')
class HydraCollection extends Polymer.Element {

    collection: object;
}
