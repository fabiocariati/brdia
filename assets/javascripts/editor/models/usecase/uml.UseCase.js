uml.UseCase = dia.Element.extend({

    defaults: joint.util.deepSupplement({

        type: 'uml.UseCase',
        size: { width: 60, height: 20 },
        attrs: {
            'circle': { fill: '#FFFFFF', stroke: 'black', transform: 'translate(20, 20)' },
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' },
            '.uml-usecase-name': {
                'font-size': 16, 'font-family': 'Times New Roman', fill: '#000000'
            }
        },
        name: ''
    }, dia.Element.prototype.defaults)
});