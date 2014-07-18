dia.ToolbarView = Backbone.View.extend({
    initialize: function(){
        this.icons = ['save', 'undo', 'redo', 'cursor', 'zoomin', 'zoomout'];
        this.aftericons = ['note'];
    },

    render: function() {
        var self = this,
            countX = 0,
            dist = 30,
            width = this.icons.length,
            rectWidth = (this.icons.length - 1) * dist + (dist/2);

        this.vToolbar = V(dia.template('Toolbar', 'toolbar', {
            id: self.paper.model.cid + '_toolbar',
            x: (this.paper.options.width / 2) - (((width * dist) + (dist/2)) / 2) - (dist/2),
            y: 10,
            rect: {
                width: rectWidth + dist / 2 + 3 ,
                x: dist - dist / 4 + 1,
                y: -3.5
            },
            icons: _.map(this.icons, function(icon) {
                countX += dist;
                return icons[icon](
                    { x: countX, y: 0 }
                );
            })
        }));

        V(this.paper.svg).append(this.vToolbar);

        //Initial select
        $('#'+self.paper.model.cid + '_toolbar').find('.cursor-icon').find('.icon-select').show();

        // Events
        _.each(this.icons, function(icon){
            $('#'+self.paper.model.cid + '_toolbar').find('.'+icon+'-icon').bind('click touchend', function(){
                var selectable = false;
                _.each( $(this).attr('class').split(' '), function(c){
                   if(c == 'selectable') selectable = true;
                });
                if(selectable) {
                    $('.icon-select').hide();
                    $(this).find('.icon-select').show();
                }
                self[icon]();
            }).mouseenter(function() {
                $(this).find('.icon-focus').show();
            }).mouseleave(function() {
                $(this).find('.icon-focus').hide();
            });
        });
    },

    save: function() {
       var  graph = this.paper.model
        graph.save(null, {
           success: function (model, resp) {
               //Todo resolver as duplicações
//               _.each(resp.cells, function(c){
//                   var m = _.where(graph.get("cells").models, function(i){
//                       return i.get("id") == c.id;
//                   })[0];
//                   if(!m) {
//                       log("test")
//                   }
//               })
//               console.log("success");
           },
           error: function (model, response) {
//               console.log("error");
           }
       });
    },

    undo: function() {
        this.paper.undoManager.undo();
    },

    redo: function() {
        this.paper.undoManager.redo();
    },

    cursor: function() {
        this.paper.tool = 'dragger';
    },

    zoomin: function() {
        var scale = this.paper.scale_size + .1
        if(scale > 0) this.paper.scale(scale);
    },

    zoomout: function() {
        var scale = this.paper.scale_size - .1
        if(scale > 0) this.paper.scale(scale);
    },

    note: function() {

    }

});
