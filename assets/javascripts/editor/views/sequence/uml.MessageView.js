uml.MessageView = joint.dia.LinkView.extend({

    initialize: function() {
        joint.dia.LinkView.prototype.initialize.apply(this, arguments);
        var self = this;
        _.bindAll(this, 'updateName');

        this.vTextFocus = V(effects.textFocus());
        this.$input = $(tools.inputText);

        this.model.on({
           'change': this.update,
           'change:name': this.updateName
        })

        this.model.on('change:base', function() {
            var diagrams = _.filter(self.paper.options.specification.get("graphs").models, function(model){return model.get("type") == "ClassDiagram"});
            var cells = _.map(diagrams, function(diagram){return diagram.get("cells").models});
            var classes = _.filter(_.flatten(cells), function(cell){return cell.get("type") == "uml.Class" });
//
            var el = _.find(self.model.collection.models, function(el){return el.id == self.model.get("target").id});
            var baseClass = _.find(classes, function(c) { return c.id == el.get("base") });
            var method = _.find(baseClass.get("methods"), function(c) { return String(c.id) == String(self.model.get("base")) });
            self.model.set("name", method.name)

            baseClass.on('change:methods', function(){
                var method = _.find(this.get("methods"), function(c) { return String(c.id) == String(self.model.get("base")) });
                self.model.set("name", method.name)
            })
        });

    },

    renderTools: function() {
        joint.dia.LinkView.prototype.renderTools.apply(this, arguments);
        var self = this
        this.$(".tool-method").click(function(){
            dia.app.current_element = self.model;
            dia.app.navigate("edit_method_base", {trigger: true});
        })
    },

    updateName: function() {
        this.$('text').remove();
        this.renderLabel();
    },

    render: function() {
        var children = V(dia.template('Message', 'markup', {}));

        // custom markup may contain only one children
        if (!_.isArray(children)) children = [children];

        // Cache all children elements for quicker access.
        this._V = {} // vectorized markup;
        _.each(children, function(child) {
            var c = child.attr('class');
            c && (this._V[$.camelCase(c)] = child);
        }, this);

        // Only the connection path is mandatory
        if (!this._V.connection) throw new Error('link: no connection path in the markup');

        $(this.el).empty();
        V(this.el).append(children);

        this.renderLabel();
        this.renderTools();

        this.update();

        this.renderVertexMarkers();

        return this;
    },

    update: function() {
        var linepos = this.model.get('linePosition'),
            source =  this.model.get('source'),
            target =  this.model.get('target'),
            sourceView = this.paper.findViewByModel(source.id),
            sourceBox = sourceView.$('.main-reference')[0].getBBox(),//ver qual main
            targetView = this.paper.findViewByModel(target.id),
            targetBox = targetView.$('.main-reference')[0].getBBox(),
            sourcePosition = sourceView.model.get('position'),
            targetPosition = targetView.model.get('position');


        // Update attributes.
        _.each(this.model.get('attrs'), function(attrs, selector) {
            var $selected = this.findBySelector(selector);
            $selected.attr(attrs);
        }, this);

        // Update life rect
        this._V.lifeRectSource.attr({
            width:10, height: 50,
            x: sourcePosition.x + (sourceBox.width/2) - 5, y: linepos
        })
        if(source.id != target.id) {
            if(targetPosition.x - sourcePosition.x >= sourceBox.width/2 - targetBox.width/2) {
                var disp = -5;
            } else {
                var disp = 5;
            }

//            this._V.markerTarget.translateAndAutoOrient({ x: targetPosition.x + (targetBox.width/2) + disp, y: linepos }, { x: sourcePosition.x, y: linepos }, this.paper.viewport);

            this._V.lifeRectTarget.attr({
                width: 10, height: 30,
                x: targetPosition.x + (targetBox.width/2) - 5, y: linepos
            })

            var dispX = 0, dispMarker = 0;
            if((linepos > targetPosition.y) && (linepos < (targetPosition.y + 35))) { // se é criação de objeto
                this._V.lifeRectTarget.attr('display', 'none')
                dispX = -(targetBox.width/2 - 5) - 5;
                dispMarker = -(targetBox.width/2 - 5);
            } else {
                this._V.lifeRectTarget.attr('display', 'inline')
            }

            this._V.markerTarget.translateAndAutoOrient({ x: targetPosition.x + dispMarker + (targetBox.width/2) + disp, y: linepos }, { x: sourcePosition.x, y: linepos }, this.paper.viewport);

            var pathData = [
                'M', sourcePosition.x + sourceBox.width/2, linepos,
                targetPosition.x + dispX + targetBox.width/2, linepos
            ].join(' ');
        } else {
            this._V.markerTarget.translateAndAutoOrient({ x: targetPosition.x + (targetBox.width/2) + 25, y: linepos + 25 }, { x: sourcePosition.x + 60 , y: linepos + 25 }, this.paper.viewport);

            this._V.lifeRectTarget.attr({
                width: 10, height: 20,
                x: targetPosition.x + (targetBox.width/2) + 5, y: linepos + 15
            })

            var pathData = [
                'M', sourcePosition.x + sourceBox.width/2, linepos,
                targetPosition.x + 50 + targetBox.width/2, linepos,
                targetPosition.x + 50 + targetBox.width/2, linepos + 15 + 10,
                targetPosition.x + targetBox.width/2, linepos + 15 + 10,
            ].join(' ');
        }

        this._V.connection.attr('d', pathData);
        this._V.connectionWrap.attr('d', pathData);

        this.updateLabelPosition();

        this.updateToolsPosition();
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
            });D

        $('svg').bind('click touchend', function(e) {
            var notAddTool = $(e.target).closest('g').attr('class') != 'add-icon';
            if(notAddTool) self.$input.remove();
        });

        this.$input.appendTo('body').select();
    },

    pointermove: function(evt, x, y) {
        if(this.paper.tool == 'dragger') {
            this.model.set('linePosition', y)
        } else if(this.paper.tool == uml.Message) {
            alert('implementar')
        }
    },

    pointerdown: function(evt, x, y) {
        if(this.paper.tool == uml.Message) {
            log("foiiiiiiiiiiiiiiiiiiii")
        }
//        joint.dia.LinkView.prototype.pointerdown.apply(this, arguments);
    },

    pointerup: function(evt, x, y) {
        if(evt.target.tagName == 'text' && $(evt.target).attr("class") != "text-icon") {
            this.renderTextFocus(evt.target)
        } else {
            joint.dia.LinkView.prototype.pointerup.apply(this, arguments);
        }
    }

});

