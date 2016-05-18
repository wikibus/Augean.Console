import './supported-operation-view.html!';
import './supported-class-link';
//noinspection TypeScriptCheckImport
import {owl} from 'jasnell/linkeddata-vocabs';

var nothing = owl.ns + 'Nothing';

@component('supported-operation-view')
class SupportedOperationView extends polymer.Base {

    @property()
    supportedOperation:IOperation;

    @property({ readOnly: true })
    expectsTitle:string;

    @property({ readOnly: true })
    returnsTitle:string;

    @observe('supportedOperation.expects')
    expectsObserver(expects:IClass) {
        setTitle.call(this, expects, this._setExpectsTitle);
    }

    @observe('supportedOperation.returns')
    returnsObserver(returns:IClass) {
        setTitle.call(this, returns, this._setReturnsTitle);
    }
}

function setTitle(clas, setter) {
    if (!clas) {
        var title = '?';
    } else if (clas.id == nothing) {
        var title = 'Nothing';
    } else {
        var title = clas.title;
    }

    setter.call(this, title);
}

SupportedOperationView.register();