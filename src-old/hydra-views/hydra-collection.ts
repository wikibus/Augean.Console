import './hydra-collection.html!';
import {ObjectGetter} from './hydra-behaviors';

@behavior(ObjectGetter)
@component('hydra-collection')
class HydraCollection extends polymer.Base {

    @property()
    collection: Object;
}

HydraCollection.register();