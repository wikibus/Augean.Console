import {ObjectGetter} from './hydra-behaviors';

@template(`
<object-view model="[[getObject(collection, 'http://www.w3.org/ns/hydra/core#member')]]"></object-view>
<object-view model="[[getObject(collection, 'http://www.w3.org/ns/hydra/core#view')]]"></object-view>
`)
@behavior(ObjectGetter)
@component('hydra-collection')
class HydraCollection extends polymer.Base {

    @property()
    collection: Object;


}

HydraCollection.register();