
uml.Action = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.Action',

        attrs: {
            'text': { ref: '.main-reference', 'font-size': 14, text: '', 'ref-y': .5, 'ref-x': .5, 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.main-reference': {width: 60, height: 30},
            '.uml-action-name': {
                'font-size': 16, 'font-family': 'Times New Roman', fill: '#000000'
            }
        }

    }, dia.Element.prototype.defaults)

});

uml.Start = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.Start',
        attrs: {
            'circle': { fill: '#2c3e50', stroke: 'black', r: 30, transform: 'translate(30, 30)' },
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
        },
        size: {
            width: 30, height: 30
        }

    }, basic.Circle.prototype.defaults)

});

uml.End = dia.Element.extend({

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