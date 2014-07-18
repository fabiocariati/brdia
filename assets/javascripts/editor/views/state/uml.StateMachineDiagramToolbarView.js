uml.StateMachineDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function() {
        dia.ToolbarView.prototype.initialize.apply(this, arguments);

        this.icons = _.union(this.icons, ['startstate', 'state', 'endstate', 'transition'], this.aftericons);
    },

    startstate: function() {
        var s0 = new uml.StartState({
            position: { x: 10  , y: 10 },
            size: { width: 30, height: 30 },
            age: "new"
        });
        this.paper.model.addCell(s0);
    },

    state: function() {
        var s = new uml.State({
            position: { x: 10  , y: 10 },
            name: "newState",
            age: "new"
        });
        this.paper.model.addCell(s);
    },

    endstate: function() {
        var s = new uml.EndState({
            position: { x: 10  , y: 10 },
            size: { width: 30, height: 30 },
            age: "new"
        });
        this.paper.model.addCell(s);
    },

    note: function() {

    },

    transition: function() {
       this.paper.tool = uml.Transition;
    }

});