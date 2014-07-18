uml.ActionView = dia.ElementView.extend({

    initialize: function() {
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on({
            'change:name': this.updateWidthByText
        });
    },

    render: function() {
        var subtype = this.model.get('subtype') && !_.isUndefined(this.model.get('subtype')) ?  this.model.get('subtype') : '';
        V(this.el).append(
            V(dia.template(subtype + this.model.get('type').split(".")[1], 'markup', {width: 80, stroke:1}))
        );

        this.update();
        this.resize();
        this.translate();

        this.updateWidthByText();

        return this;
    },

    updateWidthByText: function() {
        var width = this.$('text')[0].getBBox().width,
            subtype = this.model.get('subtype'),
            text = this.model.get('attrs').text;

        if(subtype) {
            if(subtype == 'SendSignal') {
                this.$('.main-reference').html(_.template(shapes.sendsignal)({width: width, stroke:1}));
                text['ref-x'] = '10px'
            } else if(subtype == 'AcceptEvent') {
                this.$('.main-reference').html(_.template(shapes.acceptevent)({width: width + 20, stroke:1}));
                text['ref-x'] = '20px'
            } else if(subtype == 'AcceptTimeEvent') {
                text['ref-y'] = '38px'
                text['x-alignment'] = 'middle'
            }
        } else {
            text['text-anchor'] = 'middle'
            this.model.get('attrs')['.main-reference']['width'] = width + 10
        }

        this.model.trigger('change:attrs')
    }

});