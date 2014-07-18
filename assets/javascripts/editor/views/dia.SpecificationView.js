dia.SpecificationView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'addPaper', 'updateSideBar');

        this.model.on("add", this.addPaper);
        this.model.on("add", this.updateSideBar);

        if(this.options.graphs) this.model.addGraphs(this.options.graphs)

        this.model._is_loaded = true;
    },

    render: function() {
        this.$el.prepend(dia.template('Specification', 'sidebar', {
            id: this.model.get('id'),
            name: this.model.get('name'),
            graphs: this.options.graphs
        }))
        dia.setDialogEventLink();
        return this;
    },

    updateSideBar: function() {
        var self = this;
        var div = dia.template('Specification', 'sidebar', {
            id: this.model.get('id'),
            name: this.model.get('name'),
            graphs: this.model.get("graphs").models,
            currentGraph: currentGraph
        })

        this.$el.find('.sidebar').html($(div).html());

        // Current graph
        var currentGraph = Backbone.history.fragment.split("/")[2] || null;
        if(currentGraph) {
            this.$el.find(".row-focus").hide();
            this.$el.find(".row-simple").show();
            var $el = this.$el.find("[graph='"+ currentGraph +"']");
            $el.parent().find(".row-focus").show();
            $el.parent().find(".row-simple").hide();
        }

        this.$el.find(".row").click(function(){
            self.$el.find(".row-focus").hide();
            self.$el.find(".row-simple").show();
            $(this).parent().find(".row-focus").show();
            $(this).parent().find(".row-simple").hide();
        })

        this.$el.find(".btn-danger").click(function(){
            var id = $(this).closest(".row").attr("graph");
            self.model.get("graphs").get(id).destroy({
                success: function (model, resp) {
                    self.updateSideBar();
                    dia.app.navigate("edit/" + self.model.get("id"), {trigger: true, replace: true})
                    $(".paper").hide();
                },
                error: function(model, resp) {
//                    log(resp.responseText)
                }
            })
        })

        dia.setDialogEventLink();
    },

    addPaper: function(graph) {
        this.$el.append('<div id="paper_' + graph.get('id') + '" class="paper" />')

        var type = graph.get('type'),
            module ='uml'; //Todo: Tirar uml daqui

        if(type == 'DirectedGraphDiagram') module = 'general'; //Todo: Tirar

        var paper = new dia.Paper({
            el: $('#paper_' + graph.get('id')),
            gridSize: 1,
            width: 1000,
            height: 800,
            model: graph,
            linkView: dia.LinkView,
            specification: this.model,
            toolbarView: window[module][type + 'ToolbarView']
        });

        if(graph.get('cells')) {
            _.each(graph.get('cells').models, function(cell) {
                paper.addCell(cell);
            });
        }
    }
});