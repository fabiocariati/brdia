uml.ActorView = dia.ElementView.extend({

    initialize: function() {
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);
    },

    pointerup: function(evt, x, y) {
        //
        if (this.paper.tool == 'dragger') {
            dia.ElementView.prototype.pointerup.apply(this, arguments);
        } else if(this.paper.isToolLink()) {
            if(this.paper.tool == uml.Association) {
                var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
                if(target && target.model.get('type') == 'uml.UseCase') {
                    this.paper.addLinkToTheTarget(this, target);
                } else {
                    this.paper.removeVirtualTools();
                }
            }
        }
    }
});