uml.SequenceDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function() {
        dia.ToolbarView.prototype.initialize.apply(this, arguments);

        this.icons = _.union(this.icons, ['lifeline', 'actorlifeline', 'message', 'combinedfragment', 'interactionuse', 'stopline'], this.aftericons);
    },

    lifeline: function() {
        var lifeline = new uml.Lifeline({
            position: { x: 10 },
            name: 'newLifeline',
            age: "new"
        });
        this.paper.model.addCell(lifeline);
    },

    actorlifeline: function() {
        var actor_lifeline = new uml.Lifeline({
            position: { x: 10 },
            name: 'newActor',
            subtype: 'Actor',
            age: "new"
        });
        this.paper.model.addCell(actor_lifeline);
    },

    message: function() {
       this.paper.tool = uml.Message;
    },

    combinedfragment: function() {
        this.paper.tool = 'uml.CombinedFragment';
    },

    interactionuse: function() {
        this.paper.tool = 'uml.InteractionUse';
    },

    stopline: function() {
        this.paper.tool = 'stopline';
    }

});