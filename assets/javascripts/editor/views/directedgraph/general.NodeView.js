general.NodeView = dia.ElementView.extend({

    initialize: function() {
        var self = this;
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:name', function() {
            self.trigger('change:attrs');
        });
    }
});