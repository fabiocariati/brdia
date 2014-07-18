
uml.ObjectNode = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.ObjectNode',

        attrs: {
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-objectnode-name': {
                'font-size': 16, 'font-family': 'Times New Roman', fill: '#000000'
            }
        }

    }, dia.Element.prototype.defaults)

});