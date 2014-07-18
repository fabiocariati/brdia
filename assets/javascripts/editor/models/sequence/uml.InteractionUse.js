uml.InteractionUse = dia.Element.extend({

    defaults: joint.util.deepSupplement({
        type: 'uml.InteractionUse',

        attrs: {
            'rect': { fill: 'none', stroke: 'black' },
            'polygon': { ref: 'rect', fill: 'white', 'fill-opacity': 0.85 },
            'text': {
                ref: 'rect', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif',
                'font-size': 14, 'font-family': 'Times New Roman', fill: '#000000'
            },
            '.uml-interactionuse-name': {
                'ref-y': .5, 'ref-x': .5, 'y-alignment': 'middle','x-alignment': 'middle'
            },
            '.uml-interactionuse-ref': {
                'x': 2, 'y': 14
            }
        }
    }, dia.Element.prototype.defaults)
});