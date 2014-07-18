var AppRoutes = Backbone.Router.extend({

    initialize: function(options) {
        this.editor = options.editor;
        this.editor.app = this;
//        dia.setDialogEventLink();
//        $(".custom-modal").attr("id", "edit_base")

    },

    routes: {
        'show_specifications': "showSpecifications",
        'edit_base': "editBase",
        'edit_method_base':'editMethodBase',
        'new_specification': "newSpecification",
        'edit_specification/:id': "editSpecification",
        'new_diagram': "newDiagram",
        'edit_diagram/:id': "editDiagram",
        'edit/:id': "edit",
        'graph/:specification/:id': "showDiagram",
        'examples': "editExamples"
    },

    editBase: function() {
        var diagrams = _.filter(this.currentSpecification.get("graphs").models, function(model){return model.get("type") == "ClassDiagram"})
        var cells = _.map(diagrams, function(diagram){return diagram.get("cells").models})
        var classes = _.filter(_.flatten(cells), function(cell){return cell.get("type") == "uml.Class" })
        $(".edit-base-modal").html(dia.template('BaseClass', 'edit', {
            classes: classes
        }))
        $('.class-item').click(function(){
            var baseId = $(this).attr("id");
            var baseClass = _.find(classes, function(c) { return c.id == baseId })
            dia.app.current_element.set("base", baseId)
            history.back();
        });
    },

    editMethodBase: function() {
        var diagrams = _.filter(this.currentSpecification.get("graphs").models, function(model){return model.get("type") == "ClassDiagram"});
        var cells = _.map(diagrams, function(diagram){return diagram.get("cells").models});
        var classes = _.filter(_.flatten(cells), function(cell){return cell.get("type") == "uml.Class" });

        var el = _.find(dia.app.current_element.collection.models, function(el){return el.id == dia.app.current_element.get("target").id});
        var baseClass = _.find(classes, function(c) { return c.id == el.get("base") });
        var methods = baseClass.get("methods");
        log(methods)
        $(".edit-method-base-modal").html(dia.template('BaseMethod', 'edit', {
            methods: methods
        }))

        $('.method-item').click(function(){
            var baseId = $(this).attr("id");
            dia.app.current_element.set("base", baseId)
            history.back();
        });
    },

    showSpecifications: function() {
        this.editor.showSpecificationsList();
    },

    newSpecification: function() {
        this.editor.showNewSpecificationDialog(this);
    },

    editSpecification: function(id) {
        this.editor.showEditSpecificationDialog(this, id);
    },

    newDiagram: function() {
        this.editor.showNewDiagramDialog();
    },

    editDiagram: function(id) {
        this.editor.showEditDiagramDialog(id);
    },

    edit: function(id) {
        this.editor.showSpecification(id);
    },

    showDiagram: function(specification_id, id) {
        this.editor.showDiagram(specification_id, id);
    }

});