uml.ObjectNodeView = dia.ElementView.extend({

    initialize: function() {
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);
    }
});