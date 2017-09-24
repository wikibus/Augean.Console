import { CustomElement, observe, style } from 'twc/polymer';
import { IClass, IOperation } from "heracles";

import '../supported-classes/supported-class-link';

const nothing = 'http://www.w3.org/2002/07/owl#Nothing';

@CustomElement()
@style(`
:host { 
    display: block; 
}

[hidden] {
  display: none;
}`)
class SupportedOperationView extends Polymer.Element {

    supportedOperation:IOperation;

    readonly expectsTitle:string;

    readonly returnsTitle:string;

    readonly hasExpects:string;

    readonly hasReturns:string;

    @observe('supportedOperation.expects')
    expectsObserver(expects:IClass) {
        this._setHasExpects(!!expects && expects.id !== nothing);
        setTitle.call(this, expects, this._setExpectsTitle);
    }

    @observe('supportedOperation.returns')
    returnsObserver(returns:IClass) {
        this._setHasReturns(!!returns && returns.id !== nothing);
        setTitle.call(this, returns, this._setReturnsTitle);
    }
}

function setTitle(clas: IClass, setter: () => {}) {
    let title;
    if (!clas) {
        title = '?';
    } else if (clas.id == nothing) {
        title = 'Nothing';
    } else {
        title = clas.title;
    }

    setter.call(this, title);
}
