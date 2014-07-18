uml.LifelineView = dia.ElementView.extend({

    initialize: function() {
        var self = this;
        this.createTextFieldFor('name');
        _.bindAll(this, 'updateSize');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:name', function() {
            self.updateSize();
            self.trigger('change:attrs');
        });

        this.model.on('change:stopline', function() {
            self.updateStopLine();
        });

        this.model.on('change:base', function() {
            log(self.paper)
            var diagrams = _.filter(self.paper.options.specification.get("graphs").models, function(model){return model.get("type") == "ClassDiagram"})
            var cells = _.map(diagrams, function(diagram){return diagram.get("cells").models})
            var classes = _.filter(_.flatten(cells), function(cell){return cell.get("type") == "uml.Class" })

            var baseClass = _.find(classes, function(c) { return c.id == self.model.get("base") })
            self.model.set("name", baseClass.get("name"))
        });
    },

    render: function() {
        var subtype = !_.isUndefined(this.model.get('subtype')) &&  this.model.get('subtype') ?  this.model.get('subtype') : '';

        V(this.el).append(
            V(dia.template(subtype + 'Lifeline', 'markup', { lineY: 40 }))
        );

        if(subtype == 'Actor') {
            this.model.get('attrs').text['ref-y'] = .99
        } else {
            this.model.get('attrs').text['y-alignment'] = 'middle'
        }

        this.update();
        this.updateStopLine();
        this.resize();
        this.translate();

        this.updateSize();

        return this;
    },

    renderTools: function() {
        var self = this;
        dia.app.current_element = this.model;

        this.tools = {
            add_icon:
                '<g class="add-base-class" style="cursor: pointer" title="Set base class">' +
                    '<circle stroke-width="1" stroke="black" cx="18" cy="-4" r="10" fill="white"></circle>' +
//                    '<text style="font-size: 20; font-weight: bold" x="11" y="3">C</text>' +
                    '<text style="font-size: 20; font-weight: bold" x="11" y="3">C</text>' +
                '</g>'
        }

        dia.ElementView.prototype.renderTools.apply(this, arguments);
//        dia.setDialogEventLink();

        $('.add-base-class').click(function() {
            dia.app.navigate("edit_base", {trigger: true});
        });
    },

    update: function() {
        dia.ElementView.prototype.update.apply(this, arguments);
    },

    updateStopLine: function() {
        if(this.model.get("stopline") == true) {
            this.$(".stopline").show();
        } else {
            this.$(".stopline").hide();
        }
    },

    updateSize: function() {
        var width = this.$('text')[0].getBBox().width + 20;
        if(this.model.get('subtype') != 'Actor') {
            this.$('.main-reference').attr('width', width);
            this.$('.lifeline').attr('x1', width/2).attr('x2', width/2);
            this.model.get('attrs')['.uml-lifeline-name'] = {
                'font-size': 14, ref: 'rect','ref-x': .5, 'ref-y': .25, 'font-family': 'Times New Roman', fill: '#000000'
            }
            this.model.trigger('change:attrs')
        }
    },

    pointermove: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
            if(!this.pointerMoving) this.model.toFront();
            this.pointerMoving = true;

            var messages = _.filter(this.paper.model.get('cells').models, function(model) {
                return model.get('type') == 'uml.Message';
            })
            _.each(messages, function(msg) {
                msg.toFront();
            })
        } else if(this.paper.isToolLink()) {
            var disp = this.model.get('subtype') == 'Actor' ? 5 : this.getBBox().width / 2
            this.paper.virtualSource.position(this.model.get('position').x + disp, y);
            this.paper.moveLink(this, x, y);
        }
        this.pointerMoving = true;
    },

    pointerup: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            dia.ElementView.prototype.pointerup.apply(this, arguments);
        } else if(this.paper.isToolLink()) {
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            if(target && target.model.get("type") ==  'uml.Lifeline') {
                log(target.model.get("type"))
                var message = new uml.Message({
                    source: { id: this.model.id },
                    target: { id: target.model.id },
                    linePosition: y,
                    name: 'newMessage',
                    age: 'new'
                });
                this.paper.model.addCell(message);
            } else {
                var message = new uml.Message({
                    source: { id: this.model.id },
                    target: { id: this.model.id },
                    linePosition: y,
                    name: 'newSelfMessage',
                    age: 'new'
                });
                this.paper.model.addCell(message);
            }
            this.paper.removeVirtualTools();
        } else if( this.paper.tool == 'stopline') {
            this.model.set("stopline", true);
        }
    },

    pointerdown: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
        } else if (this.paper.isToolLink()){
            // Cria um link virtual
            this.paper.virtualTarget.position(x, y);

            this.paper.currentLink = new uml.Association({
                source: { id: this.paper.virtualSource.id },
                target: { id: this.paper.virtualTarget.id }
            });
            this.paper.model.addCells([this.paper.virtualSource, this.paper.virtualTarget, this.paper.currentLink]);
            var disp = this.model.get('subtype') == 'Actor' ? 5 : this.getBBox().width / 2
            this.paper.virtualSource.position(this.model.get('position').x + disp, y);
        }
    }
});