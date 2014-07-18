uml.UseCaseDiagramToolbarView = dia.ToolbarView.extend({
    initialize: function(){
        dia.ToolbarView.prototype.initialize.apply(this, arguments);

        this.actorCount = 0;
        this.useCaseCount = 0;

        this.icons = _.union(this.icons, ['actor', 'usecase', 'association', 'include', 'extends'], this.aftericons);
    },

    actor: function() {
        var newActor = new uml.Actor({
            position: { x: 20, y: 10 },
            name: 'newActor' + (++this.actorCount),
            age: "new"
        });
        this.paper.model.addCell(newActor)
    },

    usecase: function() {
        var newUseCase = new uml.UseCase({
            position: { x: 30, y: 20 },
            size: {width: 120, height: 45},
            name: 'newUseCase' + (++this.useCaseCount),
            age: "new"
        });
        this.paper.model.addCell(newUseCase)
    },

    association: function() {
        this.paper.tool = uml.Association;
    },

    include: function() {
        this.paper.tool = uml.Include;

    },

    extends: function() {
        this.paper.tool = uml.Extends;
    }
});