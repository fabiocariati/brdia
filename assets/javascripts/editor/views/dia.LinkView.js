dia.LinkView = joint.dia.LinkView.extend({

    initialize: function() {
        joint.dia.LinkView.prototype.initialize.apply(this, arguments);

        _.bindAll(this, 'updateName');

        this.vTextFocus = V(effects.textFocus());
        this.$input = $(tools.inputText);

        this.model.on({
//            'change': this.update,
            'change:name': this.updateName
        })
    },

    render: function() {
        joint.dia.LinkView.prototype.render.apply(this, arguments);
        var self = this;
        this.$('.add-text').click(function(evt) {
            log(evt.target)
            self.model.set("name", "newText")
        })
        this.updateName();
    },

    updateName: function() {
        if(this.model.get("name")) {
            this.model.set("labels",  [
                { position: .5, attrs: { text: { text: this.model.get("name") } } }
            ])
        }
//        this.$('text').remove();
//        this.renderLabel();
    },

    updateLabelPosition: function() {
        var connectionElement = this._V.connection.node;
        var connectionLength = connectionElement.getTotalLength();

        var labelCoordinates = connectionElement.getPointAtLength(connectionLength / 2);

        if(this.model.get('source').id == this.model.get('target').id) {
            this._labelCache.attr('transform', 'translate(' + (labelCoordinates.x - 15) + ', ' + (labelCoordinates.y - 32.5) + ')');
        } else {
            this._labelCache.attr('transform', 'translate(' + labelCoordinates.x + ', ' + (labelCoordinates.y - 20) + ')');
        }
    },

    renderLabel: function() {
        var labelTemplate = _.template(this.model.labelMarkup);

        var labelNode = V(labelTemplate()).node;
        // Cache label nodes so that the `updateLabels()` can just update the label node positions.
        this._labelCache = V(labelNode);

        var $text = $(labelNode).find('text');

        $text.attr({ 'text-anchor': 'middle' });

        V($text[0]).text(this.model.get('name'));

        this.$('.labels').append(labelNode);
    },

    renderTextFocus: function(target) {
        $('.element-input-text').remove();
        $('.text-focus').remove();
        var text = $(target).closest('text'),
            box = V(text[0]).bbox(),
            tSize = text.find('tspan').size(),
            self = this;

        if(tSize > 0) {
            text = $(target);
            box.y += (box.height / tSize) * $(text).index();
            if(text[0].tagName == 'text') return;
        }

        $(this.paper.svg).unbind('click touchend').bind('click touchend', function(e) {
            if($(e.target).attr('class') == 'text-focus') {
                self.vTextFocus.remove();
                if(self.paper.currentElement.id == self.id) self.renderTextInput(text[0]);
            } else if(e.target.id != self.paper.currentFocus.attr('id') || self.paper.currentElement.id != self.id) {
                self.vTextFocus.remove();
            }
        });

        box.width = text[0].getComputedTextLength() + 2;
        box.height = (box.height + 1) / (tSize > 0 ? tSize : 1 );
        box.x = box.x - 1;

        this.paper.currentFocus = text;
        this.paper.currentElement = this

        this.vTextFocus.attr(box);

        V(this.paper.svg).append(this.vTextFocus.node);
    },

    renderTextInput: function(target, dispX) {
        if(!dispX) dispX = 0;

        var self = this,
            $text = $(target).closest('text'),
            offset = this.paper.$el.offset(),
            tSize =  $text.find('tspan').size(),
            text = this.model.get("name"),
            pos = tSize > 0 ? $(target).index() : 0,
            obj_text = _.find(text, function(t){ return t.position == pos }),
            textContent = text instanceof Array ? obj_text.name : text,
            box = {
                left: $text.position().left - 14 + dispX + offset.left,
                top: (tSize > 0 ? (($text[0].getBBox().height - 3) / tSize) * $(target).index() : 0) + $text.position().top,
                width: (target.getComputedTextLength() + 10) - (dispX * 2)
            };

        this.$input.val(textContent)
            .css({
                'left': box.left + 'px',
                'top': box.top + 'px',
                'width': box.width
            })
            .on('focusout keypress', function(e) {
                if (e.keyCode == 13 || e.type != 'keypress') { //enter press
                    self.model.set("name", $(this).val())
                    self.$input.remove();
                }
            });

        $('svg').bind('click touchend', function(e) {
            var notAddTool = $(e.target).closest('g').attr('class') != 'add-icon';
            if(notAddTool) self.$input.remove();
        });

        this.$input.appendTo('body').select();
    },

//    pointermove: function(evt, x, y) {
//        if(this.paper.tool == 'dragger') {
//            this.model.set('linePosition', y)
//        } else if(this.paper.tool == uml.Message) {
//            alert('implementar')
//        }
//    },

    pointerdown: function(evt, x, y) {
        if(evt.target.tagName != 'text')
            joint.dia.LinkView.prototype.pointerdown.apply(this, arguments);
    },

    pointerup: function(evt, x, y) {
        log(evt.target)
        if(evt.target.tagName == 'text') {
            this.renderTextFocus(evt.target)
        } else {
            joint.dia.LinkView.prototype.pointerup.apply(this, arguments);
        }
    }

});

