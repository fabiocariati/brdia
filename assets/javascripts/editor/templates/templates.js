templates = {
    State: {
        markup: _.template(
            '<g class="scalable">' +
                '<rect/>' +
            '</g>' +
            '<path/><text class="uml-state-name"/><text class="uml-state-events-text"/>' 
        ),
        tools: _.template(
            '<g class="uml-state-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<%= settings_icon %>' +
                '<%= add_icon %>' +
            '</g>' 
        )
    },
    Element: {
        markup: _.template(
            '<g class="rotatable"><g class="scalable"></g></g>' 
        ),
        tools: _.template(
            '<g class="uml-<%= type %>-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
            '</g>' 
        )
    },
    Start: {
        markup: _.template(
            '<g class="rotatable"><g class="scalable"><circle/></g><text/></g>' 
        )
    },
    End: {
        markup: _.template(
            '<g class="rotatable"><g class="scalable"><circle class="outer"/><circle class="inner"/></g></g>' 
        )
    },
    Specification: {
        sidebar: _.template(
            '<div id="sidebar_<%= id %>" class="sidebar">' +
                '<div class="treeview hover">' +
                    '<ul>' +
                        '<li>' +
                            '<input type="checkbox" id="cb-1">' +
                            '<label for="cb-1">' +
                                '<span><%= name %></span>' +
                            '</label>' +
                            '<ul>' +
                                '<% _.each(graphs, function(graph){ %>' +
                                    '<li>' +
                                        '<div class="row row-focus" graph="<%= graph.get("id") %>" style="display: none;">' +
                                            '<table  style="width:100%">' +
                                                '<tr style="display:table-row;">' +
                                                    '<td>' +
                                                        '<div class="ellipsis-text" style="width:110px;">' +
                                                            '<a href="#graph/<%= id %>/<%= graph.get("id") %>"><%= graph.get("name") %></a>' +
                                                        '</div>' +
                                                    '</td>' +
                                                    '<td style="float: right"><%= dia.template("Utils", "basic_tools", { editUrl: "edit_diagram/" + graph.get("id")}) %></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
                                        '<div class="row row-simple ellipsis-text" graph="<%= graph.get("id") %>" style="width:180px;">' +
                                            '<a href="#graph/<%= id %>/<%= graph.get("id") %>"><%= graph.get("name") %></a>' +
                                        '</div>' +
                                    '</li>' +
                                '<% }); %>' +
                                '<br />' +
                                '<li style="float: right;"><a class="dialog-link " href="#new_diagram"><b>New Diagram</b> <%= dia.getIcon("fa-plus") %></a></li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>' 
        ),
        show: _.template(
            '<div class="custom-modal-dialog">' +
                '<a href="#" style="float: right;">X</a>' +
                '<h3 style="text-align: center;">Specifications</h3>' +
                '<table  style="width:100%">' +
                    '<% _.each(specifications, function(specification){ %>' +
                        '<tr specification="<%= specification.get("id") %>" style="display:table-row;">' +
                            '<td>' +
                                '<div class="ellipsis-text" style="width:300px;border-bottom: 1px dashed #BFCFFF;">' +
                                    '<a href="#edit/<%= specification.get("id") %>"><%= specification.get("name") %></a>' +
                                '</div>' +
                            '</td>' +
                            '<td style="float: right"><%= dia.template("Utils", "basic_tools", { editUrl: "edit_specification/" + specification.get("id")}) %></td>' +
                        '</tr>' +
                    '<% }); %>' +
                '</table>' +
            '</div>' 
        ),
        edit: _.template(
            '<div class="custom-modal-dialog" id="save_specification">' +
                '<a href="#" style="float: right;">X</a>' +
                '<h3 style="text-align: center;"><%= type %> Specification</h3>' +
                '<p>Type:' +
                    '<select name="type" style="margin-left: 27px;">' +
                        '<option value="ObjectOriented">Object Oriented</option>' +
                        '<option value="General">General</option>' +
                    '</select>' +
                '</p>' +
                '<p>Name: <input name="name" style="width: 300px; float: right;" value="<%= specification.name %>" /></p>' +
                '<p>Repository(SSH): <input name="repository" style="width: 260px; float: right;" value="<%= specification.repository %>" /></p>' +
                '<p>User Name: <input name="repository_user" style="width: 280px; float: right;" value="<%= specification.repository_user %>" /></p>' +
                '<div style="float: right">' +
                    '<a href="#" id="save_specification_buttom" class="btn btn-primary">Save</a>' +
                '</div>' +
            '</div>' 
        ),
        edit_diagram: _.template(
                '<div class="custom-modal-dialog" id="save_diagram">' +
                '<a href="#" style="float: right;">X</a>' +
                '<h3 style="text-align: center;">New Diagram</h3>' +
                '<p>Type:' +
                    '<select name="type" style="margin-left: 27px;">' +
                        '<% _.each(types, function(type) { %>' +
                            '<option value="<%= type %>"><%= type %></option>' +
                        '<% }); %>' +
                    '</select>' +
                '</p>' +
                '<p>Name: <input name="name" style="width: 300px; float: right;" value="<%= graph.name %>" /></p>' +
                '<% if(true) { %>' +
                    '<div style="border: 1px solid darkgray; padding: 2px;">' +
                        '<div style="text-align: center;">GIT (SSH)</div>' +
                        '<p style="margin-top: 3px;">Repository Type:' +
                            '<select name="repository_type">' +
                                '<% _.each(repository_types, function(type) { %>' +
                                '<option value="<%= type %>"><%= type %></option>graph.name' +
                                '<% }); %>' +
                            '</select>' +
                            'Path: <input name="repository_path" style="width: 135px; float: right;" value="<%= repository_path %>" />' +
                        '</p>' +
                    '</div>' +
                '<% } %>' +
                '<div style="float: right">' +
                    '<a href="#" id="save_diagram_buttom" class="btn btn-primary">Save</a>' +
                '</div>' +
            '</div>' 
        )
    },
    Node: {
        markup: _.template(
            '<circle r="20" stroke="black" stroke-width="2" fill="white"/>' +
            '<text class="general-node-name" />' 
        )
    },
    UseCase: {
        markup: _.template(
            '<g class="scalable">' +
                '<circle r="30" stroke="black" stroke-width="2" fill="white"/>' +
            '</g>' +
            '<text class="uml-usecase-name" />' 
        )
    },
    Actor: {
        markup: _.template(
            '<circle r="13" stroke="black" stroke-width="2" fill="white"/>' +
            '<line x1="20" y1="33" x2="20" y2="55" style="stroke:black;stroke-width:2"/>' +
            '<line x1="5" y1="40" x2="35" y2="40" style="stroke:black;stroke-width:2"/>' +
            '<line x1="20" y1="55" x2="35" y2="75" style="stroke:black;stroke-width:2"/>' +
            '<line x1="20" y1="55" x2="5" y2="75" style="stroke:black;stroke-width:2"/>' +
            '<text class="uml-actor-name" />' 
        )
    },
    Utils: {
        basic_tools: _.template(
            '<a class="btn btn-default btn-sm dialog-link" href="#<%= editUrl %>"><%= dia.getIcon("fa-wrench") %></a>' +
            '<a style="margin-left: 2px;" class="btn btn-danger btn-sm"><%= dia.getIcon("fa-trash-o fa-inverse") %></a>' 
        )
    },
    Link: {
        markup: _.template(
            '<path class="connection" stroke="black"/>' +
            '<path class="marker-source" fill="black" stroke="black" />' +
            '<path class="marker-target" fill="black" stroke="black" />' +
            '<path class="connection-wrap"/>' +
            '<g class="labels" />' +
            '<g class="link-tools" />' 
        )
    },
    BaseClass: {
        edit: _.template(
            '<div class="custom-modal-dialog">' +
                '<p>Select Base Class</p>' +
                '<div style="overflow: auto; width:365px; height:200px;">' +
                    '<% _.each(classes, function(c){ %>' +
                        '<a class="class-item" id="<%= c.id %>"><%= c.get("name") %></a><br>' +
                    '<% }) %>' +
                '</div>' +
            '</div>' 
        )
    },
    BaseMethod: {
        edit: _.template(
            '<div class="custom-modal-dialog">' +
                '<p>Select Base Method</p>' +
                '<div style="overflow: auto; width:365px; height:200px;">' +
                    '<% _.each(methods, function(m){ %>' +
                        '<a class="method-item" id="<%= m.id %>"><%= m.name %></a><br>' +
                    '<% }) %>' +
                '</div>' +
            '</div>' 
        )
    },
    Action: {
        markup: _.template(
            '<rect class="main-reference" rx="10" style="fill:white;stroke:black;stroke-width:1" />' +
            '<text class="uml-action-name" />' 
        )
    },
    SendSignalAction: {
        markup: _.template(
            '<g class="main-reference">' +
                shapes.sendsignal +
            '</g>' +
            '<text class="uml-action-name" />' 
        )
    },
    AcceptEventAction: {
        markup: _.template(
            '<g class="main-reference">' +
                shapes.acceptevent +
            '</g>' +
            '<text class="uml-action-name" />' 
        )
    },
    AcceptTimeEventAction: {
        markup: _.template(
                '<g class="main-reference">' +
                    shapes.accepttime +
                '</g>' +
                '<text class="uml-action-name" />' 
        )
    },
    ObjectNode: {
        markup: _.template(
            '<rect width="80" height="30" style="fill:white;stroke:black;stroke-width:1" />' +
            '<text class="uml-objectnode-name" />' 
        )
    },
    DecisionAndMerge: {
        markup: _.template(
            '<g transform="rotate(45)">' +
                '<rect width="25" height="25" style="fill:white;stroke:black;stroke-width:1.5" />' +
            '</g>' 
        )
    },
    ForkAndJoinBar: {
        markup: _.template(
            '<g class="rotatable">' +
                '<rect width="50" height="7" style="fill:black;" />' +
            '</g>' 
        ),
        tools: _.template(
            '<g class="uml-forkandjoinbar-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<g class="orientation-icon" transform="translate(<%= box.width - 5 %>,-10)">' +
                    '<%= orientation_icon %>' +
                '</g>' +
            '</g>' 
        )
    },
    Class: {
        markup: _.template(
            '<g class="scalable">' +
                '<rect class="uml-class-name-rect"/><rect class="uml-class-attributes-rect"></rect><rect class="uml-class-methods-rect"/>' +
            '</g>' +
            '<text class="uml-class-stereotype-text"/><text class="uml-class-name-text"/><text class="uml-class-attributes-text"/><text class="uml-class-methods-text"/>' 
        ),
        tools: _.template(
            '<g class="uml-class-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<% _.each(add_icons, function(icon){ %>' +
                    '<%= icon %>' +
                '<% }); %>' +
            '</g>' 
        )
    },
    Editor: {
        body: _.template(
            '<ul id="menu-bar">' +
                '<li><a href="#">Specification</a>' +
                    '<ul>' +
                        '<li class="sub1"><a class="dialog-link" href="#new_specification">New</a></li>' +
                        '<li class="sub1"><a class="dialog-link" href="#show_specifications">Load</a></li>' +
                    '</ul>' +
                '</li>' +
                '<li><a href="#">Help</a>' +
                    '<ul>' +
                        '<li class="sub1"><a href="#">About</a></li>' +
                        '<li class="sub1"><a href="#edit/specification_example">Examples</a></li>' +
                    '</ul>' +
                '</li>' +
            '</ul>' +
            '<div class="general-modal custom-modal" aria-hidden="true"></div>' +
            '<div class="edit-base-modal custom-modal" id="edit_base" aria-hidden="true"></div>' +
            '<div class="edit-method-base-modal custom-modal" id="edit_method_base" aria-hidden="true"></div>' 
        )
    },
    Lifeline: {
        markup: _.template(
            '<rect class="main-reference" width="70" height="35" style="stroke-width:1; stroke:black; fill: white" />' +
            '<text class="uml-lifeline-name" />' +
            '<path class="connection-wrap" d="M 35 <%= lineY %> 35 <%= lineY + 260 %>" />' +
            '<line class="lifeline" y1="<%= lineY %>" y2="<%= lineY + 260 %>" style="stroke-dasharray: 10, 5; stroke: black; stroke-width: 1;"/>' +
            '<g class="stopline" style="display:none">' +
                '<line y1="295" y2="315" x1="31" x2="57" style="stroke: black; stroke-width: 1;"  />' +
                '<line y1="315" y2="295" x1="31" x2="57" style="stroke: black; stroke-width: 1;"  />' +
            '</g>' 
        ),
        tools: _.template(
            '<g class="uml-lifeline-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<%= add_icon %>' +
            '</g>' 
        )
    },
    ActorLifeline: {
        markup: _.template(
            '<g class="main-reference" transform="scale(2) translate(-3.75,-15)">' +
                '<circle cy="13" cx="6" r="3.5" stroke="black" stroke-width="2" fill="white"/>' +
                '<line x1="6" y1="16" x2="6" y2="23" style="stroke:black;stroke-width:2"/>' +
                '<line x1="0" y1="19" x2="12" y2="19" style="stroke:black;stroke-width:2"/>' +
                '<line x1="6" y1="23" x2="11" y2="28" style="stroke:black;stroke-width:2"/>' +
                '<line x1="6" y1="23" x2="1" y2="28" style="stroke:black;stroke-width:2"/>' +
            '</g>' +
            '<text class="uml-lifeline-name" />' +
            '<path class="connection-wrap" d="M 6 <%= lineY %> 6 <%= lineY + 260 %>" />' +
            '<line class="lifeline" x1="6" y1="<%= lineY %>" x2="6" y2="<%= lineY + 260 %>" style="stroke-dasharray: 10, 5; stroke: black; stroke-width: 1;"/>' 
        )
    },
    CombinedFragment: {
        markup: _.template(
            '<rect style="stroke-width:1; stroke:black;" />' +
            '<polygon points="0,0 45,0 45,10 35,20 0,20" style="fill:white;stroke:black;stroke-width:1" />' +
            '<text class="uml-combinedfragment-operator"/>' +
            '<g class="uml-combinedfragment-operands"/>' 
        ),
        tools: _.template(
            '<g class="uml-combinedfragment-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<%= add_icon %>' +
                '<circle class="resizer" position="upper-right" cy="0" cx="<%= box.width %>" r="4" stroke="black" stroke-width="1" fill="white"/>' +
                '<circle class="resizer" position="lower-right" cy="<%= box.height %>" cx="<%= box.width %>" r="4" stroke="black" stroke-width="1" fill="white"/>' +
                '<circle class="resizer" position="lower-left" cy="<%= box.height %>" cx="0" r="4" stroke="black" stroke-width="1" fill="white"/>' +
            '</g>' 
        )
    },
    InteractionUse: {
        markup: _.template(
            '<rect style="stroke-width:1; stroke:black; fill:white;" />' +
            '<polygon points="0,0 45,0 45,10 35,20 0,20" style="fill:white;stroke:black;stroke-width:1" />' +
            '<text class="uml-interactionuse-name" />' +
            '<text class="uml-interactionuse-ref">ref</text>' 
        ),
        tools: _.template(
            '<g class="uml-interactionuse-tools element-tools" transform="translate(<%= box.x %>, <%= box.y %>)">' +
                '<%= rect_border %>' +
                '<%= remove_icon %>' +
                '<circle class="resizer" position="upper-right" cy="0" cx="<%= box.width %>" r="4" stroke="black" stroke-width="1" fill="white"/>' +
                '<circle class="resizer" position="lower-right" cy="<%= box.height %>" cx="<%= box.width %>" r="4" stroke="black" stroke-width="1" fill="white"/>' +
                '<circle class="resizer" position="lower-left" cy="<%= box.height %>" cx="0" r="4" stroke="black" stroke-width="1" fill="white"/>' +
            '</g>' 
        )
    },
    Message: {
        markup: _.template(
            '<path class="connection" stroke="black"/>' +
            '<path class="marker-source" fill="black" stroke="black" />' +
            '<path class="marker-target" fill="black" stroke="black" />' +
            '<rect class="life-rect-source" style="fill: white; stroke: black" />' +
            '<rect class="life-rect-target" style="fill: white; stroke: black" />' +
            '<path class="connection-wrap"/>' +
            '<g class="labels" />' +
            '<g class="link-tools" />' 
        )
    },
    Toolbar: {
        toolbar: _.template(
            '<g class="uml-toolbar" id="<%= id %>" transform="translate(<%= x %>, <%= y %>)">' +
                '<rect width="<%= rect.width %>" height="28" style="fill:#EDF4F7;" x="<%= rect.x %>" y="<%= rect.y %>" rx="5" ry="5"  />' +
                '<% _.each(icons, function(icon){ %>' +
                    '<%= icon %>' +
                '<% }); %>' +
            '</g>' 
        )
    },
}