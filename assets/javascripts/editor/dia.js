log = function() {
    return console.log.apply( console, arguments );
};

dia = {
    start: function() {
//        /* alias away the sync method */
//        Backbone._sync = Backbone.sync;
//
//        /* define a new sync method */
//        Backbone.sync = function(method, model, success, error) {
//            /* only need a token for non-get requests */
//            if (method == 'create' || method == 'update' || method == 'delete') {
//                /* grab the token from the meta tag rails embeds */
//                var auth_options = {};
//                auth_options[$("meta[name='csrf-param']").attr('content')] =
//                    $("meta[name='csrf-token']").attr('content');
//                /* set it as a model attribute without triggering events */
//                model.set(auth_options, {silent: true});
//            }
//            /* proxy the call to the old sync method */
//            return Backbone._sync(method, model, success, error);
//        }
        // Override Backbone.sync to add CSRF-TOKEN HEADER
        Backbone.sync = (function(original) {
            return function(method, model, options) {
                // Differents urls
                if (model.methodUrl && model.methodUrl[method.toLowerCase()]) {
                    options = options || {};
                    options.url = model.methodUrl[method.toLowerCase()];
                }

                options.beforeSend = function(xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
                };
                original(method, model, options);
            };
        })(Backbone.sync);
    },

    graph: function(g) {
        var graph = new dia.Graph(g);

        if(g.elements) {
            _.each(g.elements, function(el) {
                var module = el.type.split('.')[0], entity = el.type.split('.')[1];
                graph.addCell(new window[module][entity](el));
            })
        }

        return graph;
    },

    graphs: function(gs) {
        return _.map(gs, function(g){
            return dia.graph(g);
        });
    },

    template: function(element, item, attributes) {
        return templates[element][item](attributes)
    },

    setDialogEventLink: function() {
        $("a.dialog-link").click(function() {
            var id = this.href.split("#")[1]
            $(".general-modal").attr("id", id)
            return true;
        });
    },

    getIcon: function(name) {
        return _.template('<i class="fa <%= name %>"></i>')({name: name})
    }
}

uml = {}

general = {}

examples = {}


