uml.StateView = dia.ElementView.extend({
    initialize: function() {
        dia.ElementView.prototype.initialize.apply(this, arguments);

        _.bindAll(this, 'updateSize');

        this.model.on({
            'change:attrs change:embeds': this.updateSize
        });
        this.updateSize();
    },

    render: function() {
        dia.ElementView.prototype.render.apply(this, arguments);

        this.updateSize();

        this.updateParent();
//        log(this.model)
    },

    updateSize: function() {
        this.updateWidthByText();

        var greatestRightDiff = 0,
            greatestBottomDiff = 0,
            parentBox = _.assign(this.model.get('position'), this.model.get('size')),
            parentRight = parentBox.x + parentBox.width,
            parentBottom = parentBox.y + parentBox.height,
            bottom = 0, right = 0,
            textHeight = 0;

        _.each(this.model.getEmbeddedCells(), function(cell) {
            var childBox = _.assign(cell.get('position'), cell.get('size')),
                childRight = childBox.x + childBox.width,
                childBottom = childBox.y + childBox.height;
                textHeight += childBox.height;

            if(childRight > right) {
                greatestRightDiff = childRight - parentRight;
                right = childRight;
            }
            if(childBottom > bottom) {
                greatestBottomDiff = childBottom - parentBottom;
                bottom = childBottom;
            }
        });

        if(this.$('text')[0]) {
            _.each(this.$('text'), function(text) {
                var box = V(text).bbox();
                textHeight += box.height;
            });
        }

        textHeight += 15;

        var height = parentBox.height + greatestBottomDiff + 8;
        if(this.model.get("events").length == 0) height += 20;
        var diff = 0;
        this.model.set('size', {
            width: parentBox.width + greatestRightDiff + 8,
            height: height > textHeight ? height : textHeight
        });

    },

    renderTools: function() {
        var box = this.getBBox(),
            self = this;

        this.tools = {
            settings_icon: icons.settings({
                x: 0, y: -5.5
            }),
            add_icon: icons.add({
                x: box.width + .5,
                y: 14 * (this.model.get('events').length + 1) + 7,
                type: 'events'
            })
        }

        dia.ElementView.prototype.renderTools.apply(this, arguments);

        $('.add-icon').bind('click touchend', function() {
            self.appendText('events');
        });
    },

    appendText: function(type) {
        this.model.addCollectionElement(type, 'newEvent' + this.model.get(type).length);

        // Exibe o input para o novo valor
        var text = this.$text(type),
            target = text.find('tspan').length > 0 ? text.find('tspan').last()[0] : text[0];

        this.renderTextInput(target);
    },

    removeTextOnFocus: function() {
        var currentTextFocus = this.paper.currentFocus,
            type = currentTextFocus.closest('text').attr('class').split('-')[2],
            pos = 0;
        this.$text(type).find('tspan').each(function(i) {
            if(currentTextFocus[0].id == this.id) pos = i;
        });

        this.model.removeCollectionElement(type, pos);
    },

    pointermove: function(evt, x, y) {
        //
        if (this.paper.tool == 'dragger') {
            // Atualiza pai conforme posição filho, se pai existir
            var parent = this.model.get('parent');

            if(parent) {
                var view = this.paper.findViewByModel(parent);
                view.updateSize();

                var parentPosition = this.paper.model.getCell(parent).get('position'),
                    cellPosition = this.model.get('position'),
                    limitX =  parentPosition.x + 16,
                    limitY = parentPosition.y + 32;

                // Teste os limites para esquerda e para direita
                if((cellPosition.x >= limitX || (x -this._dx) > 0) && (cellPosition.y >= limitY || (y -this._dy) > 0)) {
                    dia.ElementView.prototype.pointermove.apply(this, arguments);
                }
            } else {
                dia.ElementView.prototype.pointermove.apply(this, arguments);
            }

            var self = this;
            _.each(this.model.getEmbeddedCells(), function(cell) {
                if(cell.get('type')== 'uml.State') {
                    cell.toFront();
                    _.each(self.paper.model.getConnectedLinks(cell), function(link){
                        link.toFront();
                    });
                }
            });

            _.each(self.paper.model.getConnectedLinks(this.model), function(link){
                link.toFront();
            });

        } else if(this.paper.isToolLink()){
            this.paper.moveLink(this, x, y);
        }
        this.pointerMoving = true;
    },

    pointerup: function(evt, x, y) {
        //
        if (this.paper.tool == 'dragger') {
            if(this.pointerMoving) {
                this.pointerMoving = false;
                if(!this.model.get("parent") || this.model.get("parent") == null) {
                    var self = this;
                    var views = this.paper.findViewsFromPoint({
                        x: x, y: y
                    });
                    var target = _.find(views, function(view){
                        return view.id != self.id;
                    });
                    if(target) {
                        var parent = target.model;
                        this.model.set('parent', parent.get("id"));
                    }
                }
            } else {
                dia.ElementView.prototype.pointerup.apply(this, arguments);
            }
        } else if(this.paper.tool == uml.Transition) {
            this.unhighlight();
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            this.paper.addLinkToTheTarget(this, target);
        }
    }

});
