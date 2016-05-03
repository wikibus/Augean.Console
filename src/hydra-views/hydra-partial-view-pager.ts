import {ObjectGetter} from './hydra-behaviors';

@behavior(ObjectGetter)
@component('hydra-partial-view-pager')
class PartialViewPager extends polymer.Base {
    
    @property()
    view: IPartialCollectionView;

    go(ev) {
        console.log(ev.target.dataTo);
    }
}

PartialViewPager.register();