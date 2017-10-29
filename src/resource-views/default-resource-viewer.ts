import {CustomElement, style, template, observe, compute} from 'twc/polymer';
import 'bower:polymer/polymer-element.html'
import {IHydraResource} from 'heracles';
import './default-resource-view';

@CustomElement()
@style(`
:host {
    display: flex;
}

default-resource-view {
    flex: 1;    
}

@media (max-width: 899px) { 
    default-resource-view[narrow] {
        display: none;
    }
}`)
@template(`
<template is="dom-repeat" items="[[displayedResources]]">
    <default-resource-view resource="[[item]]"
                           on-child-expanded="_appendToDisplayed"
                           on-child-loaded="_loadChild"
                           on-close="_truncateDisplayedResources"
                           closeable="[[!_isFirst(index)]]"
                           narrow$="[[_isFirstOfMany(index, _isSingle)]]"></default-resource-view>
</template>
`)
class DefaultResourceViewer extends Polymer.Element {
    resource: IHydraResource;

    readonly displayedResources: Array<IHydraResource>;

    @compute((displayedResources: any) => displayedResources.base.length == 1, [ 'displayedResources.*' ])
    _isSingle: boolean;

    @observe('resource')
    _onResourceChanged(resource: IHydraResource) {
        this._setDisplayedResources([ resource ]);
    }

    _loadChild(e: CustomEvent) {
        LdNavigation.Helpers.fireNavigation(this, e.detail.resource.id);
    }

    _appendToDisplayed(e: CustomEvent) {
        const remainder = this.displayedResources.length - e.model.index - 1;
        this.splice('displayedResources', e.model.index + 1, remainder, e.detail.resource);
    }

    _truncateDisplayedResources(e: CustomEvent) {
        const remainder = this.displayedResources.length - e.model.index;
        this.splice('displayedResources', e.model.index, remainder);
    }

    _isFirst(index: number) {
        return index == 0;
    }

    _isFirstOfMany(index: number, isSingle: boolean) {
        return this._isFirst(index) && !isSingle;
    }
}
