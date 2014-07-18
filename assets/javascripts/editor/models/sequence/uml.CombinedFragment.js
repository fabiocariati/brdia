uml.CombinedFragment = dia.Element.extend({

    defaults: joint.util.deepSupplement({
        type: 'uml.CombinedFragment',

        attrs: {
            'rect': { fill: 'none', stroke: 'black' },
            'polygon': { ref: 'rect', fill: 'white', 'fill-opacity': 0.85 },
            'text': { text: '', ref: 'rect', x: 2, y: 2,  fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-combinedfragment-operator': {
                'font-size': 14, 'font-family': 'Times New Roman', fill: '#000000'
            },
            '.uml-combinedfragment-operands': {
                'ref': 'polygon', 'ref-x': 0, 'ref-y': 32,
                'font-size': 10, 'font-family': 'Times New Roman', fill: '#000000'
            }
        },

        operator: 'alt',
        operands: [
            { name: '[guard]', linePosition: 0 }
        ]
    }, dia.Element.prototype.defaults)
});