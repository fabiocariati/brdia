general.DirectedGraphDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function(){
        dia.ToolbarView.prototype.initialize.apply(this, arguments);
        this.nodeCount = 0;

        this.icons = _.union(this.icons, ['node', 'transition']);
    },

    node: function() {
        var newNode = new general.Node({
            position: { x: 30, y: 20 },
            name: 'new' + (++this.nodeCount),
            age: "new"
        });
        this.paper.model.addCell(newNode)
    },

    transition: function() {
        this.paper.tool = uml.Transition;
    }

});