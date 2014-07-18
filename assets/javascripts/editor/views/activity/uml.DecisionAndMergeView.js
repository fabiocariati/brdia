uml.DecisionAndMergeView = dia.ElementView.extend({

    initialize: function() {
        dia.ElementView.prototype.initialize.apply(this, arguments);
    },

    render: function() {
        V(this.el).append(V(dia.template('DecisionAndMerge', 'markup', {})));

        dia.ElementView.prototype.render.apply(this, arguments);
    }

});