import {promises as jsonld} from 'jsonld';

var templates = [];

var Registry = {
    properties: {
        templates: {
            type: Array,
            notify: true,
            readOnly: true,
            value: templates
        },
        as: {
            type: String,
            value: 'model'
        },
        compactWith: Object
    },

    ready: function() {
        this.push('templates', this);
    },

    detached: function() {
        this.pop('templates', this);
    },

    getStamped: function(object) {
        this.templatize(this);

        if(this.compactWith) {
            return jsonld.compact(object, this.compactWith).then(stamp.bind(this));
        } else {
            return Promise.resolve(stamp.call(this, object));
        }
    }
};

function stamp(object) {
    var stampedModel = { };
    stampedModel[this.as] = object;

    return this.stamp(stampedModel).root;
}

export var TemplateRegistry = [ Polymer.Templatizer, Registry ];