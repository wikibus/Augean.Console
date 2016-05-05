import {promises as jsonld} from 'jsonld';

var templates = [];

export var TemplateRegistryAccess = {
    properties: {
        templates: {
            type: Array,
            notify: true,
            readOnly: true,
            value: templates
        }
    }    
};

var TemplateStamper = {
    getStamped: function(template, object) {
        this.templatize(template);

        if(this.compactWith) {
            return jsonld.compact(object, this.compactWith)
                .then(compacted => stamp.call(this, template, compacted));
        } else {
            return Promise.resolve(stamp.call(this, template, object));
        }
    }
};

export var RegisteredTemplate = {
    properties: {
        as: {
            type: String,
            value: 'model'
        },
        compactWith: Object,
        name: {
            type: String,
            value: ''
        }
    },
    
    ready: function() {
        this.push('templates', this);
    },

    detached: function() {
        this.pop('templates', this);
    }
};

function stamp(template, object) {
    var stampedModel = { };
    stampedModel[template.as] = object;

    return this.stamp(stampedModel).root;
}

export var RegisteredTemplate = [ RegisteredTemplate, TemplateRegistryAccess ];
export var RegisteredTemplateConsumer = [ Polymer.Templatizer, TemplateStamper, TemplateRegistryAccess ];