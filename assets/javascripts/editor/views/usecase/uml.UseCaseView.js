uml.UseCaseView = dia.ElementView.extend({

    initialize: function() {
        var self = this;
        this.createTextFieldFor('name');
        _.bindAll(this, 'updateSize');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:name', function() {
            self.updateSize();
            self.trigger('change:attrs');
        });
    },

    render: function() {
        dia.ElementView.prototype.render.apply(this, arguments);
        this.updateSize();
    },

    updateSize: function() {
        var width = this.$('text')[0].getBBox().width + 20;
        if(width < 80) width = 80;
        this.model.set("size", {width: width, height: 35});
    },

    pointerup: function(evt, x, y) {
        //
        if (this.paper.tool == 'dragger') {
            dia.ElementView.prototype.pointerup.apply(this, arguments);
        } else if(this.paper.isToolLink()) {
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            if(target) {
                var targetType = target.model.get('type');
                if(this.paper.tool == uml.Include || this.paper.tool == uml.Extends) {
                    if(targetType == 'uml.UseCase') {
                        this.paper.addLinkToTheTarget(this, target);
                    } else {
                        this.paper.removeVirtualTools();
                    }
                } else if(this.paper.tool == uml.Association) {
                    if(targetType == 'uml.Actor') {
                        this.paper.addLinkToTheTarget(this, target);
                    } else {
                        this.paper.removeVirtualTools();
                    }
                }
            } else {
                this.paper.removeVirtualTools();
            }
        }
    }
});