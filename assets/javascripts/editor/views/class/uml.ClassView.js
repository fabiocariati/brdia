uml.ClassView = dia.ElementView.extend({

    initialize: function() {
        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on({
            'change:attrs': this.updateWidthByText
        });
    },


    render: function() {
        dia.ElementView.prototype.render.apply(this, arguments);

        this.updateWidthByText();
    },

    renderTools: function() {
        var self = this,
            box = this.getBBox(),
            types = ['attributes', 'methods'];

        if(!this.model.get('stereotype')) types.push('name');

        this.tools = {
            add_icons: _.map(types, function(type) {
                var rectBox = V(self.$('.uml-class-'+type+'-rect')[0]).bbox();
                return icons.add({
                    x: rectBox.width + .5,
                    y: rectBox.y - box.y + (type == 'name' ? 0 : rectBox.height - 12),
                    type: type
                });
            })
        }

        dia.ElementView.prototype.renderTools.apply(this, arguments);

        $('.add-icon').bind('click touchend', function() {
            var type = $(this).attr('type');
            self.appendText( type != 'name' ? type : 'stereotype' );
        });
    },

    appendText: function(type) {
        if(this.model.get(type) instanceof Array) {
            var collection = this.model.get(type);
            var value = type == 'methods' ? 'Method'+(collection.length+1)+'()' : 'Attribute'+(collection.length+1);
            this.model.addCollectionElement(type, 'new'+value);
        } else if(type == 'stereotype') {
            this.model.set(type, 'newStereotype');
        }

        // Exibe o input para o novo valor
        var text = this.$text(type),
            target = text.find('tspan').length > 0 ? text.find('tspan').last()[0] : text[0];

        this.renderTextInput(target);
    },

    removeText: function(type, pos) {
        if(type == 'stereotype') {
            this.model.set(type,'');
        } else if(this.model.get(type) instanceof Array) {
            this.model.removeCollectionElement(type, pos);
        }
    },

    removeTextOnFocus: function() {
        var currentTextFocus = this.paper.currentFocus,
            type = currentTextFocus.closest('text').attr('class').split('-')[2],
            pos = 0;
        this.$text(type).find('tspan').each(function(i) {
            if(currentTextFocus[0].id == this.id) pos = i;
        });

        this.removeText(type, pos);
    },

    renderTextInput: function(target) {
        var $text = $(target).closest('text'),
            type = $text.attr('class').split('-')[2],
            dispX = type == 'stereotype' ? 18 : 0;

        dia.ElementView.prototype.renderTextInput.apply(this, [arguments[0], dispX]);
    }

});