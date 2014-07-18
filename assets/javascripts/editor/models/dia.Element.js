dia.Element = joint.dia.Element.extend({

    defaults: joint.util.deepSupplement({

        size: { width: 0, height: 0 },

        type: 'dia.Element',
        attrs: {
//            '.': { filter: { name: 'dropShadow', args: { dx: 1, dy: 1, blur: 2 } } }
        }

    }, joint.dia.Element.prototype.defaults),

    setBox: function(box) {
        this.set('position', {x: box.x, y:box.y});
        this.set('size', {width: box.width, height :box.height});
        this.trigger('change:attrs');
    },

    addCollectionElement: function(key, value) {
        // Todo: Para superar a limitação do backbone(e javascript) de não disparar o evento ao mudar array
        var array = this.get(key),
            newObject = { name: value, position: array.length };

        array.push(newObject);

        var sortedVals = _.sortBy(array, function(obj){
            return obj.position;
        });
        this.set(key, sortedVals);

        this.trigger('change:'+key);
        this.trigger('change:attrs');
    },

    setCollectionElement: function(val, type, pos) {
        var models = this.get(type);
        var others = _.filter(models, function(val) { return val.position != pos; });

        var model = _.filter(models, function(val) { return val.position == pos; })[0];

        var params = { name:val, position:pos };

        if(model.id) params.id = model.id;

        var arr = (_.sortBy(
            _.union([params], others), function(el){
                return el.position;
            }))

        this.set(type, arr)

        this.trigger("change:attrs")
    },

    removeCollectionElement: function(type, pos) {
        var others = _.filter(this.get(type), function(val) {
            return val.position != pos;
        });

        var elements = _.sortBy( others, function(el){ return el.position } );

        _.each(elements, function(el, i){
           el.position = i;
        })

        this.set(type, elements);
    }

});

basic = {};

basic.Circle = dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Circle',
        size: { width: 60, height: 60 },
        attrs: {
            'circle': { fill: '#FFFFFF', stroke: 'black', r: 30, transform: 'translate(30, 30)' },
            'text': { 'font-size': 14, text: '', 'text-anchor': 'middle', 'ref-x': .5, 'ref-y': .5, ref: 'circle', 'y-alignment': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
        }
    }, dia.Element.prototype.defaults)
});
