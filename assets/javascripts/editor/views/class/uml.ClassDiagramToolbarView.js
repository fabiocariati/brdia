uml.ClassDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function(){
        dia.ToolbarView.prototype.initialize.apply(this, arguments);
        this.classCount = 0;

        this.icons = _.union(this.icons, ['class', 'association', 'generalization', 'implementation', 'aggregation', 'composition'], this.aftericons, ['commit']);
    },

    class: function() {
        var newclass = new uml.Class({
            position: { x: 10, y: 10 },
            name: 'NewClass' + (++this.classCount),
            age: "new"
        });
        this.paper.model.addCell(newclass)
    },
    note: function() {
        alert("falta implementar note")
    },
    association: function() {
        this.paper.tool = uml.Association;
    },
    generalization: function() {
        this.paper.tool = uml.Generalization;
    },
    implementation: function() {
        this.paper.tool = uml.Implementation;
    },
    aggregation: function() {
        this.paper.tool = uml.Aggregation
    },
    composition: function() {
        this.paper.tool = uml.Composition
    },

    commit: function() {
        var  graph = this.paper.model
        graph.save({commit: true}, {
            success: function (model, resp) {
                //Todo resolver as duplicações
//                console.log("success");
            },
            error: function (model, response) {
//                console.log("error");
            }
        });
    }
});