uml.InteractionUseView = dia.ElementView.extend({
    initialize: function() {
        this.createTextFieldFor('name');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change:size', this.updateRect);

        this.updateRect();
    },

    update: function() {
        dia.ElementView.prototype.update.apply(this, arguments);
    },

    renderTools: function() {
        var self = this;

        this.tools = {}

        dia.ElementView.prototype.renderTools.apply(this, arguments);

        $('.resizer').bind('mousedown touchstart', function() {
            self.paper._resizer_moving = true;
            self.paper._resized_element = self;
        });

        $('.resizer').bind('mouseup touchend', function() {
            self.paper._resizer_moving = false;
        });

//        $('.resizer').css('cursor', 'nesw-resize'); Todo: ver como fazer isso no chrome
    },

    updateRect: function() {
        this.model.get('attrs')['rect'].width = this.model.get('size').width;
        this.model.get('attrs')['rect'].height = this.model.get('size').height;
    },

    pointermove: function(evt, x, y) {
        var targetClass = $(evt.target).attr('class');
        if(targetClass == 'div-virtual-line' || targetClass == 'div-line' || this._inner_member) {
            var opid = $(evt.target).attr('opid');
            var model = _.where(this.model.get('operands').models, {cid: opid})[0];

            if(!model) model = this._inner_member;

            model.set('linePosition', y - this.model.get('position').y - 21); //Todo: melhorar

            this.model.trigger('change:attrs')
            this._inner_member = model;
        } else {
            if(this._inner_member == null) {
                dia.ElementView.prototype.pointermove.apply(this, arguments);
            }
        }
    },

    pointerup: function() {
        this._inner_member = null;
        dia.ElementView.prototype.pointerup.apply(this, arguments);
    }
});