uml.Class = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.Class',

        attrs: {
            rect: { 'width': 1, 'stroke': 'black', 'stroke-width': 2, 'fill': 'white' },
            text: { 'fill': 'black', 'font-size': 14, 'font-family': 'Times New Roman' },

            '.uml-class-name-rect': {},
            '.uml-class-attributes-rect': {},
            '.uml-class-methods-rect': {},

            // Texts
            '.uml-class-stereotype-text': { 'ref': '.uml-class-name-rect', 'ref-y': 5, 'ref-x': .5, 'text-anchor': 'middle', 'font-weight': 'bold' },
            '.uml-class-name-text': { 'ref': '.uml-class-name-rect', 'ref-y': 5, 'ref-x': .5, 'text-anchor': 'middle', 'font-weight': 'bold' },
            '.uml-class-attributes-text': { 'ref': '.uml-class-attributes-rect', 'ref-y': 5, 'ref-x': 5 },
            '.uml-class-methods-text': { 'ref': '.uml-class-methods-rect', 'ref-y': 5, 'ref-x': 5 }

        },

        size: { width: 100, height: 100 },

        position: { x: 20, y: 20 },

        stereotype: '',
        name: '',
        attributes: [],
        methods: []

    }, dia.Element.prototype.defaults),

    initialize: function() {

        _.bindAll(this, 'updateRectangles');

        this.on('change:stereotype change:name change:attributes change:methods', function() {
            this.updateRectangles();
            this.trigger('change:attrs');
        });

        this.updateRectangles();

        dia.Element.prototype.initialize.apply(this, arguments);
    },

    updateRectangles: function() {
        var attrs = this.get('attrs'),
            stereotype = this.get("stereotype"),
            offsetY = 0,
            dispHeight = 0,
            self = this;

        _.each(['name', 'attributes', 'methods'], function(type) {
            var text = self.get(type),
                lines = text instanceof Array ? _.map(text, function(t){ return t.name }) : [text];

            attrs['.uml-class-' + type + '-text'].text = lines.join('\n');
            attrs['.uml-class-' + type + '-rect'].height = lines.length + 1;
            if(attrs['.uml-class-' + type + '-rect'].height == 1 && type == 'methods'){
                attrs['.uml-class-' + type + '-rect'].height = 1.5;
                dispHeight = 5;
            }
            attrs['.uml-class-' + type + '-rect'].transform = 'translate(0,'+ offsetY + ')';

            if(stereotype.length > 0 && type == 'name') {
                attrs['.uml-class-stereotype-text'].text = '<<'+stereotype+'>>';
                offsetY++;
                attrs['.uml-class-name-rect'].height+=1;
                attrs['.uml-class-name-text']['ref-y'] = 20;
            }else if(stereotype == '' && attrs['.uml-class-name-text']['ref-y'] == 20) {
                attrs['.uml-class-stereotype-text'].text = '';
                attrs['.uml-class-name-text']['ref-y'] = 5;
            }

            offsetY += lines.length + 1;
        });

        // Setando a altura do elemento
        this.get('size').height =  offsetY * 14 + dispHeight;
    }

});
