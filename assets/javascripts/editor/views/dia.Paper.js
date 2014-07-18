dia.Paper = joint.dia.Paper.extend({

    initialize: function() {
        joint.dia.Paper.prototype.initialize.apply(this, arguments);

        this.tool = 'dragger';

        _.bindAll(this, 'findViewByModel', 'findViewsFromPoint'); // Para corrigir erro do joint

        this.scale_size = 1;

        this.currentFocus;
        this.currentElement;
        this.currentLink;
        this._virtualRect = V('<g />')

        this.virtualTarget = new dia.Element({
            size: { width: 0, height: 0 }
        });

        this.virtualSource = new dia.Element({
            size: { width: 0, height: 0 }
        });

        if (this.options.toolbarView) {
            this.toolbar = new this.options.toolbarView();
            this.toolbar.paper = this;
            this.toolbar.render();
        }
        var self = this;

        this.initializeUndo();

        // Eventos
        $(this.svg).mouseenter(function(e) {
           if(e.target.tagName == 'svg') {
               $(self.svg).find('.element-tools').remove();
           }
        });

        // Eventos do teclado
        var self = this;
        $(document).keydown(function (e) {
            if(e.keyCode == 46 && self.currentElement && $(self.currentElement.vTextFocus.node).css('display') == 'inline') {
                self.currentElement.removeTextOnFocus();
            }
        });
    },

    initializeUndo: function(){
        var self = this;
        // undo/redo
        this.undoManager = new Backbone.UndoManager;
        this.undoManager.changeUndoType("remove", {
            "undo": function (collection, model, ignore, options) {
                self.model.addCell(model);
                var view =  self.findViewByModel(model);
                view.model.trigger('change:attrs');
                view.model.trigger('change:size');
            }
        });

        this.undoManager.register(this.model); // Pass any number of arguments
        this.undoManager.startTracking(); // Start observation after instantiation
    },

    scale: function(sx, sy, ox, oy) {
        this.scale_size = sx;
        joint.dia.Paper.prototype.scale.apply(this, arguments);
    },

    isToolLink: function() {
        return   this.tool == uml.Association ||
            this.tool == uml.Aggregation ||
            this.tool == uml.Composition ||
            this.tool == uml.Generalization ||
            this.tool == uml.Implementation ||
            this.tool == uml.Include ||
            this.tool == uml.Extends ||
            this.tool == uml.Message ||
            this.tool == uml.Transition;
    },

    createViewForModel: function(cell) {
        // Todo: Ver maneira de tirar as coisas referentes à uml
        var type = cell.get('type');
        if(type == 'uml.Start' || type == 'uml.End') {
            return new dia.ElementView({ model: cell, interactive: this.options.interactive });
        } else if(cell instanceof dia.Element) {
            var module = type.split('.')[0],
                entity = type.split('.')[1];
            return new window[module][entity + 'View']({ model: cell, interactive: this.options.interactive });
        } else if(type == 'uml.Message') {
            return new uml.MessageView({ model: cell, interactive: this.options.interactive });
        } else if(type == 'uml.Transition' && this.model.get('type') == 'uml.StateMachine') {
            return new uml.StateLinkView({ model: cell, interactive: this.options.interactive });
        } else {
            return joint.dia.Paper.prototype.createViewForModel.apply(this, arguments);
        }
    },

    addLinkToTheTarget: function(el, target) {
        if(target && target.model) {
            var Link = this.tool,
                link = new Link({
                    source: { id: el.model.id },
                    target: { id: target.model.id },
                    age: "new"
                });
            this.model.addCell(link);
        }
        this.removeVirtualTools();
    },

    removeVirtualTools: function() {
        this.virtualSource.remove();
        this.virtualTarget.remove();
        this.currentLink.remove();
    },

    createVirtualLinkConnection: function(el, x, y) {
        this.virtualTarget.position(x,y);
        var Link = this.tool;
        this.currentLink = new Link({
            source: { id: el.model.id },
            target: { id: this.virtualTarget.id }
        });
        this.model.addCells([this.virtualTarget, this.currentLink]);
    },

    moveLink: function(el, x, y) {
        this.virtualTarget.position(x, y);
        var views = this.findViewsFromPoint({x: x, y: y});
        if(views.length > 0) {
            views[0].highlight();
        } else {
            var isNotALink = function(cell) { return !(cell instanceof joint.dia.Link)},
                self = this;

            _.each(this.model.get('cells').filter(isNotALink), function(model){
                if(el.model.id != model.id) {
                    self.findViewByModel(model).unhighlight();
                } else {
                    el.highlight();
                }
            });
        }
    },

    pointerdown:function(evt) {
        this._virtualRect.remove();
        if (this.findView(evt.target)) {
            joint.dia.Paper.prototype.pointerdown.apply(this, arguments);
        } else {
            if($(evt.target).attr('class') != 'resizer' && (evt.target.tagName == 'svg' || $(evt.target).attr('class')== 'background-rect')) { //if not others resizers
                this._virtualRect = V(shapes.rect_select);
                this._rectX = evt.offsetX;
                this._rectY = evt.offsetY;

                V(this.svg).append(this._virtualRect);
                this._pressed = true;
            }
        }
    },

    pointerup:function(evt, x, y) {
        if(this._pressed) {
            if (this.tool == 'uml.CombinedFragment') {
                var box = this._virtualRect.bbox();
                this.model.addCell(
                    new uml.CombinedFragment({
                        type: 'uml.CombinedFragment', //Todo: tirar daqui
                        position: { x: box.x, y: box.y },
                        size: { width: box.width, height: box.height },
                        operator: 'par',
                        age: "new"
                    })
                );
            }
            if (this.tool == 'uml.InteractionUse') {
                var box = this._virtualRect.bbox();
                this.model.addCell(
                    new uml.InteractionUse({
                        type: 'uml.InteractionUse', //Todo: tirar daqui
                        position: { x: box.x, y: box.y },
                        size: { width: box.width, height: box.height },
                        name: "InteractionUse",
                        age: "new"
                    })
                );
            }
            this._virtualRect.remove();
            this._pressed = false;
        } else {
            joint.dia.Paper.prototype.pointerup.apply(this, arguments);
        }
    },

    pointermove:function(evt) {
        if(this._resizer_moving == true) {
            this._resized_element.removeTools();

            if($(evt.target).attr('position')) {
                this._resized_element.pos = $(evt.target).attr('position');
            }

            var box = this._resized_element.model.getBBox(),
                difX = evt.offsetX - box.x,
                difY = evt.offsetY - box.y;

            if(this._resized_element.pos == 'upper-right') {
                this._resized_element.model.setBox({x: box.x, y: evt.offsetY, width: difX, height: box.height - difY });
            } else if(this._resized_element.pos == 'lower-right') {
                this._resized_element.model.setBox({x: box.x, y: box.y, width: difX, height: difY });
            } else if(this._resized_element.pos == 'lower-left') {
                this._resized_element.model.setBox({x: evt.offsetX, y: box.y, width: box.width - difX, height: difY });
            }

            this._resized_element.renderTools();
        } else if(this._pressed) {
            var box = {
                width: evt.offsetX - this._rectX,
                height: evt.offsetY - this._rectY,
                x: this._rectX, y: this._rectY
            }

            if(box.width < 0) {
                box.x += box.width;
                box.width *= -1;
            }
            if(box.height < 0) {
                box.y += box.height;
                box.height *= -1;
            }

            this._virtualRect.attr(box);
        } else {
            joint.dia.Paper.prototype.pointermove.apply(this, arguments);
        }
    }


});