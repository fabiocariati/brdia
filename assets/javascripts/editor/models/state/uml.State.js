uml.State =dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.State',

        attrs: {
            rect: { 'width': 200, 'height': 200, 'fill': '#ecf0f1', 'stroke': '#bdc3c7', 'stroke-width': 3, 'rx': 10, 'ry': 10 },
            path: { 'd': 'M 0 20 L 200 20', 'stroke': '#bdc3c7', 'stroke-width': 2 },
            '.uml-state-name': {
                'ref': 'rect', 'ref-x': .5, 'ref-y': 5, 'text-anchor': 'middle',
                'font-size': 14, 'font-family': 'Times New Roman', fill: '#000000'
            },
            '.uml-state-events-text': {
                'ref': 'path', 'ref-x': 5, 'ref-y': 5,
                'font-size': 14, 'font-family': 'Times New Roman', fill: '#000000'
            }
        },

        size: { width: 0, height: 0 },
        name: 'State',
        events: []

    }, dia.Element.prototype.defaults),

    initialize: function() {

        _.bindAll(this, 'updateEvents', 'updatePath');

        this.on({
            'change:name': function() { this.updateName(); this.trigger('change:attrs'); },
            'change:events': function() { this.updateEvents(); this.trigger('change:attrs'); },
            'change:size': this.updatePath
        });

        this.updateName();
        this.updateEvents();
        this.updatePath();

        dia.Element.prototype.initialize.apply(this, arguments);
    },

    updateName: function() {
        this.get('attrs')['.uml-state-name'].text = this.get('name');
    },

    updateEvents: function() {
        this.get('attrs')['.uml-state-events-text'].text = _.map(this.get('events'), function(e){ return e.name }).join('\n');
    },

    updatePath: function() {
        this.get('attrs')['path'].d = 'M 0 20 L ' + this.get('size').width + ' 20';
    }

});

uml.StartState = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'uml.Start',
        attrs: {
            'circle': { fill: '#2c3e50', stroke: 'black', r: 30, transform: 'translate(30, 30)' },
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
        },
        size: {
            width: 30, height: 30
        }

    }, dia.Element.prototype.defaults)

});

uml.EndState = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'uml.End',
        size: { width: 30, height: 30 },
        attrs: {
            'circle.outer': {
                transform: 'translate(10, 10)',
                r: 10,
                fill: 'white',
                stroke: '#2c3e50'
            },

            'circle.inner': {
                transform: 'translate(10, 10)',
                r: 6,
                fill: '#34495e'
            }
        }

    }, dia.Element.prototype.defaults)

});