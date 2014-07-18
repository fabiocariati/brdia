uml.StateLinkView = joint.dia.LinkView.extend({

    events: {
        'mouseenter': 'mouseover',
        'touchenter': 'mouseover'
    },

    mouseover: function() {
        $(this.paper.svg).find('.element-tools').remove();
    }
});