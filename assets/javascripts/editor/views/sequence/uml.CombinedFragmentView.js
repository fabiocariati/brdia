uml.CombinedFragmentView = dia.ElementView.extend({
    initialize: function() {
        this.createTextFieldFor('operator');

        dia.ElementView.prototype.initialize.apply(this, arguments);

        this.listenTo(this.model, 'change:size', this.updateRect);

        this.updateRect();
    },

    update: function() {
        dia.ElementView.prototype.update.apply(this, arguments);

        this.updateOperands();

        this.updateLifellines();
    },

    updateLifellines: function() {
        var models = this.paper.model.get('cells').models,
            lifelines = _.filter(models, function(el){ return el.get('type') == 'uml.Lifeline'}),
            limit = this.model.get('size').height + this.model.get('position').y - 40,
            self = this;

        if(limit > 300) {
            _.each(lifelines, function(lifeline){
                self.paper.findViewByModel(lifeline).$('.lifeline').attr('y2', limit)
            })
        }
    },

    renderTools: function() {
        var self = this;

        this.tools = {
            add_icon: icons.add({
                x: 15,
                y: -10,
                type: 'operand'
            })
        }

        dia.ElementView.prototype.renderTools.apply(this, arguments);

        $('.add-icon').bind('click touchend', function() {
            var lastOperand = _.max(self.model.get('operands').models, function(o){ return o.get('linePosition') }),
                size = self.model.get('size'),
                dif = size.height - lastOperand.get('linePosition');

            if(dif < 100) {
                self.model.set('size', {width: size.width, height: size.height + 100 - dif })
            }
            self.model.get('operands').add({name: '[guard]', linePosition: lastOperand.get('linePosition') + 40 })

            self.model.trigger('change:attrs')
        });

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

    updateOperands: function() {
        var body = '';
        var size = this.model.get('size')
        _.each(this.model.get('operands').models, function(op){
            body += '<text class="uml-sequence-name" y="' + op.get('linePosition') + '">' + op.get('name') + '</text>';
            if(op.get('linePosition') != 0) {
                var y = (op.get('linePosition') - 10);
                var line = '<line class="div-line" opid="' + op.cid + '" x1="0" y1="'+ y +'" x2="'+ size.width +'" y2="'+ y +'" style="stroke-dasharray: 5, 2.5; stroke: black; stroke-width: .5;"/>';
                var virtualline = '<line class="div-virtual-line" opid="' + op.cid + '" x1="0" y1="'+ y +'" x2="'+ size.width +'" y2="'+ y +'" style="stroke: white; stroke-width: 8;stroke-opacity: 0;"/>';
                body += line + virtualline;
            }
        })
        this.$('.uml-combinedfragment-operands').html(body);

        $('.div-virtual-line').css('cursor', 'row-resize')
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