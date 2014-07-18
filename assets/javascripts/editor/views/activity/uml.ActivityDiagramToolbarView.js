uml.ActivityDiagramToolbarView = dia.ToolbarView.extend({

    initialize: function() {
        dia.ToolbarView.prototype.initialize.apply(this, arguments);

        this.icons = _.union(this.icons, ['action', 'sendsignal', 'acceptevent', 'accepttime', 'objectnode', 'initialnode', 'finalnode', 'decisionandmerge', 'forkandjoinbar', 'transition'], this.aftericons);
    },

    action: function() {
        var newaction = new uml.Action({
            name: 'new action',
            position: { x:20, y: 20 },
            age: "new"
        })

        this.paper.model.addCell(newaction);
    },

    sendsignal: function() {
        var send_signal = new uml.Action({
            name: 'New Send Signal',
            subtype: 'SendSignal',
            position: { x:20, y: 20 },
            age: "new"
        })
        this.paper.model.addCell(send_signal)
    },

    acceptevent: function() {
        var accept_event = new uml.Action({
            name: 'New Accept Event',
            subtype: 'AcceptEvent',
            position: { x:20, y: 20 },
            age: "new"
        })
        this.paper.model.addCell(accept_event)
    },

    accepttime: function() {
        var accept_time_event = new uml.Action({
            name: 'New time event',
            subtype: 'AcceptTimeEvent',
            position: { x:20, y: 20 },
            age: "new"
        })
        this.paper.model.addCell(accept_time_event)
    },

    objectnode: function() {
        var object = new uml.ObjectNode({
            name: 'new object',
            position: { x:20, y: 20 },
            age: "new"
        })
        this.paper.model.addCell(object)
    },

    initialnode: function() {
        var start = new uml.Start({
            position: { x:30, y: 150 },
            age: "new"
        })
        this.paper.model.addCell(start);
    },

    finalnode: function() {
        var end = new uml.End({
            position: { x:30, y: 150 },
            age: "new"
        })
        this.paper.model.addCell(end);
    },

    decisionandmerge: function() {
        var decision = new uml.DecisionAndMerge({
            position: { x: 30, y: 150},
            age: "new"
        })
        this.paper.model.addCell(decision);
    },

    forkandjoinbar: function() {
        var bar = new uml.ForkAndJoinBar({
            position: { x: 100, y:150 },
            angle: 180,
            age: "new"
        })
        this.paper.model.addCell(bar);
    },

    transition: function() {
        this.paper.tool = uml.Transition;
    }

});