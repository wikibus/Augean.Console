import 'bower:paper-button/paper-button.html';
import 'bower:paper-card/paper-card.html';
import {IPartialCollectionView} from "heracles";
import { CustomElement, style, compute } from 'twc/polymer';

@CustomElement()
@style(`paper-card {
                width: 100%;
                margin: 5px;
            }`)
class HydraPartialViewPager extends Polymer.Element {

    view: IPartialCollectionView;

    @compute((view: IPartialCollectionView) => !view.first || view.first.id === view.id)
    disableFirst: boolean;

    @compute((view: IPartialCollectionView) => !view.previous)
    disablePrevious: boolean;

    @compute((view: IPartialCollectionView) => !view.next)
    disableNext: boolean;

    @compute((view: IPartialCollectionView) => !view.last || view.last.id === view.id)
    disableLast: boolean;

    go(ev: Event) {
        LdNavigation.Helpers.fireNavigation(this, ev.target.dataTo);
    }
}
