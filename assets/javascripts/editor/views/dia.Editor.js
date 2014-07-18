dia.Editor = Backbone.View.extend({
    initialize: function() {
        this.specifications = this.options.specifications;
        this.render();
    },

    render: function() {
        this.$el.append(dia.template("Editor", "body", {}));

        dia.setDialogEventLink();
    },

    showSpecification: function(id, graph_id) {
        var self = this;
        this.app.currentSpecification = this.specifications.get(id);

        if(!this.app.currentSpecification || !this.app.currentSpecification._is_loaded) {
            this.createViewForSpecification(this.app.currentSpecification);

            if(this.app.currentSpecification.get("id") == 'specification_example') {
                var graphs = dia.graphs([examples.classGraph, examples.activityGraph, examples.sequenceGraph, examples.stateGraph, examples.userCaseGraph])
                this.app.currentSpecification.addGraphs(graphs);
            } else {
                var graphs = [];
                this.app.currentSpecification.get("graphs").fetch({
                    success: function(model, resp) { //Todo ver fromJSON, acho que é melhor
                        _.each(resp, function(r){
                            var graph = self.app.currentSpecification.get("graphs").get(r.id);
                            var cells = r.cells;
                            _.each(cells, function(c){
                                c.id = c.id+"";
                                var types = c.type.split("."),
                                    module = types[0], entity = types[1];
                                graph.addCell(new window[module][entity](c));
                            })
                        })
                        self.changeTo('paper', graph_id);
                    }
                })
            }

            this.app.currentSpecification._is_loaded = true;
        }
        this.changeTo('specification', id);
    },

    showDiagram: function(specification_id, id){
        this.showSpecification(specification_id, id);
        this.changeTo('paper', id);
    },

    showSpecificationsList: function() {
        var self = this;
        $(".general-modal").attr("id", "show_specifications")

        $(".general-modal").html(dia.template('Specification', 'show', {
            specifications: this.specifications.models
        }))

        dia.setDialogEventLink();

        $(".general-modal").find(".btn-danger").click(function(){W
            var id = $(this).closest("tr").attr("specification");
            self.specifications.get(id).destroy({
                success: function() {
                    self.showSpecificationsList();
                },
                error: function() {

                }
            })
        });
    },

    showNewSpecificationDialog: function(app) {
        var self = this;
        $(".general-modal").attr("id", "new_specification")

        $(".general-modal").html(dia.template('Specification', 'edit',
            {
                type: "New",
                specification: { name: "", type: "", repository: "", repository_user: "" }
            }
        ))
        $("#save_specification_buttom").click(function(evt){
            var $div = $("#save_specification");

            var specification = new dia.Specification({
                type: $div.find("select[name='type']")[0].value,
                name: $div.find("input[name='name']")[0].value,
                repository: $div.find("input[name='repository']")[0].value,
                repository_user: $div.find("input[name='repository_user']")[0].value,
                project_id: dia.project_id
            })

            specification.save(null, {
                success: function (model, resp) {
                    model.id = resp.id; //Todo: mudar isso
                    self.createViewForSpecification(model);
                    model._is_loaded = true;
                    self.specifications.add(model);
                    app.navigate("edit/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
                }
            });
        })
    },

    showEditSpecificationDialog: function(app, id) {
        var self = this;
        $(".general-modal").attr("id", "edit_specification/" + id)

        var specification = this.specifications.get(id);

        $(".general-modal").html(dia.template('Specification', 'edit',
            {
                type: "Edit",
                specification:
                {
                    repository: specification.get("repository"),
                    repository_user: specification.get("repository_user"),
                    name: specification.get("name"),
                    type: specification.get("type")
                }
            }
        ))

        $("#save_specification_buttom").click(function(evt){
            var $div = $("#save_specification");

            specification.set("type", $div.find("select[name='type']")[0].value);
            specification.set("name", $div.find("input[name='name']")[0].value);
            specification.set("repository", $div.find("input[name='repository']")[0].value);
            specification.set("repository_user", $div.find("input[name='repository_user']")[0].value);

            // Update
            specification.save(null, {
                success: function (model, resp) {
                    model.id = resp.id; //Todo: mudar isso
                    self.updateViewForSpecification(model);
                    model._is_loaded = true;
                    app.navigate("edit/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
//                    log(resp.responseText)
                }
            });
        })
    },

    showNewDiagramDialog: function() {
        var self = this;
        $(".general-modal").attr("id", "new_diagram")
        $(".general-modal").html(dia.template('Specification', 'edit_diagram', {
            specifications: this.specifications.models,
            graph: { name: "", type: "" },
            types: self.app.currentSpecification.get("concept_types"),
            repository_type: "",
            repository_path: "",
            repository_types: ["JavaProject"]
        }))

        $("#save_diagram_buttom").click(function(evt){
            var $div = $("#save_diagram");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;
            var repository_path = $div.find("input[name='repository_path']")[0].value;
            var repository_type = $div.find("select[name='repository_type']")[0].value;
            var graph = new dia.Graph({
                type: type,
                name: name,
                repository_path: repository_path,
                repository_type: repository_type,
                specification_id: self.app.currentSpecification.get("id")
            })

            graph.save(null, {
                success: function (model, resp) {
                    self.app.navigate("graph/" + model.get("specification_id") + "/" + resp.id, { trigger: true, replace: true });
                    self.app.currentSpecification.addGraph(graph);
                },
                error: function(model, resp) {
//                    log(resp.responseText)
                }
            });
        })
    },

    showEditDiagramDialog: function(id) {
        var self = this;

        var graph = self.app.currentSpecification.get("graphs").get(id);

        $(".general-modal").attr("id", "edit_diagram/" + id)

        $(".general-modal").html(dia.template('Specification', 'edit_diagram', {
            types: self.app.currentSpecification.get("concept_types"),
            specifications: this.specifications.models,
            graph: { name: graph.get("name"), type: graph.get("type") },
            repository_type: graph.get("repository_type") || "",
            repository_path: graph.get("repository_path") || "",
            repository_types: ["JavaProject"]
        }))

        $("#save_diagram_buttom").click(function(evt){
            var $div = $("#save_diagram");

            var type = $div.find("select[name='type']")[0].value;
            var name = $div.find("input[name='name']")[0].value;

            graph.set("type", type);
            graph.set("name", name);

            // Update
            graph.save(null, {
                success: function (model, resp) {
                    self.app.navigate("graph/" + model.get("specification_id") + "/" + resp.id, { trigger: true, replace: true });
                },
                error: function(model, resp) {
//                    log(resp.responseText)
                }
            });
        })
    },

    changeTo: function(type, id) {
        if(id == 'body'){
            $('.paper').hide();
            // Todo: implementar a visualização da especificação
        } else {
            $('.'+type).hide();
            $('#'+type+'_'+ id).show();
        }
    },

    createViewForSpecification: function(specification) {
        this.$el.append('<div id="specification_' + specification.get('id') + '" class="specification" />')

        var view = new dia.SpecificationView({
            el: "#specification_" + specification.get("id"),
            model: specification
        })

        view.render();

        this.changeTo('specification', 'body');
    },

    updateViewForSpecification: function(specification) {
        this.$el.find("#specification_" + specification.get('id')).html("");

        var view = new dia.SpecificationView({
            el: "#specification_" + specification.get("id"),
            model: specification
        })

        view.render();
        view.updateSideBar();

        this.changeTo('specification', 'body');
    }
});