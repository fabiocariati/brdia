uml.Lifeline = dia.Element.extend({

    defaults: joint.util.deepSupplement({
        type: 'uml.Lifeline',

        height: 0,

        attrs: {
            'text': { 'text-anchor': 'middle', ref: '.main-reference', 'ref-x': .5, 'ref-y':.5, fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-lifeline-name': {
                'font-size': 14, ref: 'rect', 'font-family': 'Times New Roman', fill: '#000000'
            }
        },

        position: { x: 100, y: 50 },
        name: 'newLifeline'
    }, dia.Element.prototype.defaults)

});