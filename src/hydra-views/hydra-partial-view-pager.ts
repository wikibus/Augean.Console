import 'bower:paper-button/paper-button.html';
import 'bower:paper-card/paper-card.html';
import {IPartialCollectionView} from "heracles";
import { CustomElement, style } from 'twc/polymer';

@CustomElement()
@style(`paper-card {
                width: 100%;
                margin: 5px;
            }`)
class HydraPartialViewPager extends Polymer.Element {

    view: IPartialCollectionView;

    go(ev: Event) {
        LdNavigation.Helpers.fireNavigation(this, ev.target.dataTo);
    }
}
