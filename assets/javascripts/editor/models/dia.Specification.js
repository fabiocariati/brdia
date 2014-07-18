dia.Specification = Backbone.Model.extend({
    url: function() {
        return '/specification/' + encodeURIComponent(this.id)
    },

    methodUrl: {
        'create': '/specification'
    },

    initialize: function() {

        this.set('graphs', new dia.SpecificationGraphs);
        this.get('graphs').specification_id = this.id;

        // Make all the events fired in the `cells` collection available.
        // to the outside world.
        this.get('graphs').on('all', this.trigger, this);

        this.get('graphs').on('remove', this.removeCell, this);
    },

    addGraph: function(graph) {
        this.get('graphs').add(graph);
        return this;
    },

    addGraphs: function(graphs) {
        var self = this;
        _.each(graphs, function(graph){
            self.addGraph(graph);
        })
    }
});

dia.Graph = joint.dia.Graph.extend({
    url: function() {
        return '/concept_model/' + encodeURIComponent(this.id)
    },

    methodUrl: {
        'create': '/concept_model'
    }
});

dia.SpecificationGraphs = Backbone.Collection.extend({
    model: dia.Graph,

    url: function() {
        return '/concept_models/' + this.specification_id
    }
})