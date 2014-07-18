uml.ForkAndJoinBarView = dia.ElementView.extend({

    renderTools: function() {
        var self = this;

        this.tools = {
            orientation_icon: shapes.undo
        }

        dia.ElementView.prototype.renderTools.apply(this, arguments);

        $('.orientation-icon').bind('click touchend', function() {
            self.removeTools();
            self.model.rotate(-90);
        });
    }

});