uml.Actor = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.Actor',
        attrs: {
            'circle': { fill: '#FFFFFF', stroke: 'black', transform: 'translate(20, 20)' },
            'text': { text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': 78, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-actor-name': {
                'font-size': 16, 'font-family': 'Times New Roman', fill: '#000000'
            }
        },
        name: ''
    }, dia.Element.prototype.defaults)
});