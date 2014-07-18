general.Node = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'general.Node',
        attrs: {
            'circle': { fill: '#FFFFFF', stroke: 'black' },
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.general-node-name': {
                'font-size': 16, 'font-family': 'Times New Roman', fill: '#000000'
            }
        },
        name: ''
    }, dia.Element.prototype.defaults)
});