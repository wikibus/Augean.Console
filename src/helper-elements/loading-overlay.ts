import {CustomElement, template, style} from "twc/polymer";
import 'bower:polymer/polymer-element.html';
import 'bower:iron-overlay-behavior/iron-overlay-behavior.html';
import 'bower:mat-elements/mat-spinner.html';

@CustomElement()
@template(`<slot></slot>`)
class LoadingOverlay extends Polymer.mixinBehaviors([ Polymer.IronOverlayBehavior ], Polymer.Element) {
    readonly withBackdrop = true;
    readonly noCancelOnOutsideClick = true;
    readonly alwaysOnTop = true;
    readonly noCancelOnEscKey = true;
    readonly autoFitOnAttach = true;
}
