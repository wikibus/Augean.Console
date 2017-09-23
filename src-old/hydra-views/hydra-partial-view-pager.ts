import './hydra-partial-view-pager.html!';
import 'bower_components/paper-button/paper-button.html!';
import 'bower_components/paper-card/paper-card.html!';
import {ObjectGetter} from './hydra-behaviors';

@behavior(ObjectGetter)
@component('hydra-partial-view-pager')
class PartialViewPager extends polymer.Base {
    
    @property()
    view: IPartialCollectionView;

    go(ev) {
        LdNavigation.Helpers.fireNavigation(this, ev.target.dataTo);
    }
}

PartialViewPager.register();