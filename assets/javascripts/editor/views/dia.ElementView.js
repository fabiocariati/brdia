dia.ElementView = joint.dia.ElementView.extend({

    events: {
        'mouseenter': 'mouseover',
        'mouseleave': 'mouseleave',
        'touchstart': 'mouseover',
        'touchend': 'pointerdown'
    },

    initialize: function() {
        joint.dia.ElementView.prototype.initialize.apply(this, arguments);

        this.vTextFocus = V(effects.textFocus());
        this.$input = $(tools.inputText);
        this.vTools = V('<g />')

        this.pointerMoving = false;

        _.bindAll(this, 'unrender', 'removeTools', 'updateWidthByText', 'updateParent');

        this.model.on({
            'remove': this.unrender,
            'change:attrs change:position change:size': this.removeTools,
            'change:parent': this.updateParent
        });

        // Convention for template rendering
        var element = this.model.get('type').split('.')[1];
        if(element != 'Action' && element != 'Lifeline') //Todo: ver jeito de tirar isto
            this.model.set('markup', dia.template(element, 'markup',{}))
    },

    unrender: function() {
        this.vTools.remove();
    },

    createTextFieldFor: function(attribute) {
        var model = this.model;

        var type = model.get('type').split('.');
        var module = type[0];
        var entity = type[1];

        if(entity == 'Node') module = 'general';

        var updateFunction = function() {
            model.get('attrs')['.'+module + '-' + entity.toLowerCase() + '-' + attribute].text = model.get(attribute);
            model.trigger('change:attrs');
        }
        this.listenTo(this.model, 'change:'+attribute, updateFunction);

        updateFunction();
    },

    $text: function(type) {
        var typeElement = this.model.get('type').toLowerCase().replace('.', '-');
        return this.$('.'+typeElement+'-'+type+'-text');
    },

    updateWidthByText: function() {
        // Atualização da largura baseado no maior texto
        var largest_of = 120;
        this.$('text').each(function(){
            if(this.getBBox().width > largest_of) largest_of = this.getBBox().width;
        });
        this.model.set('size',{
            width: largest_of+12,
            height: this.model.get('size').height
        });
    },

    updateParent: function() {
        if(this.model.get('parent')) {
            var self = this;
            var model = _.find(this.paper.model.getElements(), function(el){
                return el.get("id") == self.model.get('parent');
            });

            if(model) model.embed(this.model);
        }
    },

    renderTextInput: function(target, dispX) {
        if(!dispX) dispX = 0;

        var self = this,
            $text = $(target).closest('text'),
            offset = this.paper.$el.offset(),
            tSize =  $text.find('tspan').size(),
            type = $text.attr('class').split('-')[2],
            text = this.model.get(type),
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
                    self.setText($(this).val(), type,  pos)
                    self.$input.remove();
                }
            });

        $('svg').bind('click touchend', function(e) {
                var notAddTool = $(e.target).closest('g').attr('class') != 'add-icon';
            if(notAddTool) self.$input.remove();
        });

        this.vTools.remove();
        this.$input.appendTo('body').select();
    },

    renderTools: function() {
        $(this.paper.svg).find('.element-tools').remove();

        var box = this.getBBox(),
            entity = this.model.get('type').split('.')[1];

        if(box.height < 15) {
            box.y = box.y - ((15 - box.height) / 2);
            box.height = 15;
        }
        if(box.width < 15) {
            box.x = box.x - ((15 - box.width) / 2);
            box.width = 15;
        }

        var basicTools = {
            type: entity,
            box: box,
            remove_icon: icons.remove({
                x: -4, y: -4, scale: 1
            }),
            rect_border: shapes.rect_border({
                width: box.width, height: box.height,
                borderWidth: 15
            })
        }

        if(this.tools) {
            this.vTools = V(dia.template(entity, 'tools', _.merge(this.tools, basicTools)));
        } else {
            // Basic tools
            this.vTools = V(dia.template('Element', 'tools', basicTools));
        }

        V(this.paper.svg).append(this.vTools);

        //Events
        var self = this;
        $(this.vTools.node).mouseleave(function(){
            this.remove();
        });

        $('.remove-icon').bind('click touchend', function() {
            self.model.remove();
        });
    },

    removeTools:function() {
        _.each([this.vTools,this.$input,this.vTextFocus], function(t){
            if(t) t.remove();
        })
    },

    renderTextFocus: function(target) {
        $('.element-input-text').remove();
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

        this.vTools.remove();
        V(this.paper.svg).append(this.vTextFocus.node);
    },

    setText: function(val, type, pos) {
        // Todo: colocar no model element
        if(this.model.get(type) instanceof Array) {
            this.model.setCollectionElement(val, type, pos);
        } else {
            this.model.set(type, val);
        }
    },

    removeText: function(type, pos) {
        if(type == 'stereotype') {
            this.model.set(type,'');
        } else if(_.isArray(this.model.get(type))) {
            this.model.removeArrayElement(type, pos);
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

    pointermove: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            joint.dia.ElementView.prototype.pointermove.apply(this, arguments);
        } else if(this.paper.isToolLink()){
            this.paper.moveLink(this, x, y);
        }
        this.pointerMoving = true;
    },

    pointerup: function(evt, x, y) {
        if (this.paper.tool == 'dragger') {
            if(_.isElement($(evt.target).closest('text')[0])) {
                if(!this.pointerMoving) {
                    this.paper.$('.text-focus').remove();
                    this.renderTextFocus(evt.target);
                }
            } else {
                joint.dia.ElementView.prototype.pointerup.apply(this, arguments);
            }
        } else if(this.paper.isToolLink()) {
            var target = this.paper.findViewsFromPoint({x:x, y:y})[0];
            this.paper.addLinkToTheTarget(this, target);
        }
        this.pointerMoving = false;
    },

    pointerdown: function(evt, x, y) {
        // Todo: melhorar
        // Isso é feito para contornar o problema de não atribuir link a um target que está toFront
        var self = this;
//        if(!this.pointerMoving) {
            _.each(this.paper.model.getElements(), function(el) {
                if(el.id != self.model.id) el.toBack();
            })
            this.model.toFront();
//        }
        // Fim todo

        if (this.paper.tool == 'dragger') {
            this.paper.currentElement = this;
            joint.dia.ElementView.prototype.pointerdown.apply(this, arguments);
        } else if(this.paper.isToolLink()){
            this.paper.createVirtualLinkConnection(this, x, y);
        }
    },

    mouseover: function(evt) {
        if(this.paper.tool == 'dragger') {
            this.renderTools();
        }
    }

});