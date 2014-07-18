function toolbarIcon(title, classIcon, shape) {
    return _.template(
        '<g class="' + classIcon + '" transform="translate(<%= x %>, <%= y %>)">' +
            '<title>' + title + '</title>'+
            shapes.bar_rect_icon +
            shape +
        '</g>'
    );
}

icons = {
    add: _.template([
        '<g class="add-icon" type="<%= type %>" transform="translate(<%= x %>, <%= y %>)">',
            '<circle r="9" stroke="green" style="fill: white" cx="5" cy="5"></circle>',
            shapes.plus({ color: 'green' }),
            "<title>Add <%= type %></title>",
        '</g>',
    ].join('')),

    settings: _.template([
        '<g class="settings-icon" transform="translate(<%= x %>, <%= y %>)">',
            '<circle r="9.5" transform="translate(22.5)"/>',
            shapes.settings,
            '<title>Settings</title>',
        '</g>',
    ].join('')),

    remove: _.template([
        '<g class="remove-icon" transform="translate(<%= x %>, <%= y %>) scale(<%= scale %>)">',
            '<circle r="11" style="fill:red;" />',
            shapes.remove({ color: 'white' }),
            '<title>Remove.</title>',
        '</g>',
    ].join('')),

    save: toolbarIcon('Save', 'save-icon', shapes.save),

    undo: toolbarIcon('Undo', 'undo-icon', shapes.undo),

    redo: toolbarIcon('Redo', 'redo-icon', shapes.redo),

    zoomin: toolbarIcon('Zoom in', 'zoomin-icon', shapes.zoomin),

    zoomout: toolbarIcon('Zoom out', 'zoomout-icon', shapes.zoomout),

    cursor: toolbarIcon('Select', 'cursor-icon selectable', shapes.cursor),

    note: toolbarIcon('Add Note', 'note-icon', shapes.note),

    // Class Diagramm

    class: toolbarIcon('Add Class', 'class-icon',
        '<rect width="15" height="5" x="3" y="3" style="fill:white;stroke:black;" />' +
        '<rect width="15" height="5" x="3" y="8" style="fill:white;stroke:black;" />' +
        '<rect width="15" height="5" x="3" y="13" style="fill:white;stroke:black;" />'
    ),

    association: toolbarIcon('Association', 'association-icon selectable',
        '<line x1="2" y1="10" x2="18" y2="10" style="stroke:black;stroke-width:: 1.3em;"/>'
    ),
    generalization: toolbarIcon('Generalization', 'generalization-icon selectable',
        '<line x1="0" y1="10" x2="7.5" y2="10" style="stroke:black;stroke-width:.7"/>' +
         shapes.arrowhead

    ),
    implementation: toolbarIcon('Implementation', 'implementation-icon selectable',
        '<line x1="0" y1="10" x2="8" y2="10" style="stroke-dasharray: 2, 1; stroke: black; stroke-width:.8" />' +
        shapes.arrowhead
    ),
    aggregation: toolbarIcon('Aggregation', 'aggregation-icon selectable',
        '<line x1="0" y1="10" x2="7" y2="10" style="stroke:black;stroke-width:.7"/>' +
        shapes.headlozenge({ color: 'white'})
    ),
    composition: toolbarIcon('Composition', 'composition-icon selectable',
        '<line x1="0" y1="10" x2="7" y2="10" style="stroke:black;stroke-width:.7"/>' +
        shapes.headlozenge
    ),

    // State machine diagram
    startstate: toolbarIcon('Add Start State', 'startstate-icon', shapes.startnode),

    state: toolbarIcon('Add State', 'state-icon',
        '<rect width="16.4" height="12" x="2" y="4.5" rx="3" ry="3" style="fill:white;stroke:black;stroke-width:1" />'
    ),

    endstate: toolbarIcon('Add End State', 'endstate-icon', shapes.endnode),

    transition: toolbarIcon('Transition', 'transition-icon selectable', shapes.arrow({ scale: .04 })),

    // UseCaseDiagram
    actor: toolbarIcon('Add Actor', 'actor-icon',
        '<g transform="scale(.28) translate(15,3)">' +
            '<circle cx="20" cy="13" r="13" stroke="black" stroke-width="4" fill="white"/>' +
            '<line x1="20" y1="27" x2="20" y2="48" style="stroke:black;stroke-width:4"/>' +
            '<line x1="5" y1="34" x2="35" y2="34" style="stroke:black;stroke-width:4"/>' +
            '<line x1="20" y1="48" x2="35" y2="68" style="stroke:black;stroke-width:4"/>' +
            '<line x1="20" y1="48" x2="5" y2="68" style="stroke:black;stroke-width:4"/>' +
        '</g>'
    ),

    usecase: toolbarIcon('Add Use Case', 'usecase-icon',
        '<ellipse cx="10" cy="10" rx="9" ry="5" style="stroke:black;stroke-width:1; fill:white;" />'
    ),

    include: toolbarIcon('Include', 'include-icon selectable',
        '<text x="5" y="8" font-weight="bold" font-size="10">I</text>' +
         shapes.arrow({ scale: .04 })
    ),

    extends: toolbarIcon('Extends', 'extends-icon selectable',
        '<text x="3" y="8" font-weight="bold" font-size="10">E</text>' +
        shapes.arrow({ scale: .04 })
    ),

    // Sequence diagram

    lifeline: toolbarIcon('Life Line', 'lifeline-icon selectable',
        '<rect width="10" height="6" x="5" y="3" style="fill:white;stroke:black; stroke-width: 1.2;" />' +
        '<line x1="10" y1="10" x2="10" y2="20" style="stroke-dasharray: 2, 1; stroke: black; stroke-width: 1.2;"/>'
    ),

    actorlifeline: toolbarIcon('Life Line (Actor)', 'actorlifeline-icon selectable',
        '<g transform="scale(.17) translate(40,9)">' +
            '<circle cx="20" cy="15" r="14" stroke="black" stroke-width="6" fill="white"/>' +
            '<line x1="20" y1="27" x2="20" y2="48" style="stroke:black;stroke-width:6"/>' +
            '<line x1="1" y1="36" x2="39" y2="36" style="stroke:black;stroke-width:6"/>' +
            '<line x1="20" y1="48" x2="38" y2="68" style="stroke:black;stroke-width:6"/>' +
            '<line x1="20" y1="48" x2="2" y2="68" style="stroke:black;stroke-width:6"/>' +
            '<line x1="20" y1="70" x2="20" y2="105" style="stroke-dasharray: 10, 5; stroke: black; stroke-width: 5;"/>' +
        '</g>'
    ),

    message: toolbarIcon('Message', 'message-icon selectable', shapes.arrow({scale:.04})),

    combinedfragment: toolbarIcon('Combined Fragment', 'combinedfragment-icon selectable',
        shapes.fragment +
        '<line x1="2" y1="11.5" x2="20" y2="11.5" style="stroke-dasharray: 2, 1; stroke: black; stroke-width: .7;"/>'
    ),

    interactionuse: toolbarIcon('Interaction Use', 'interactionuse-icon selectable', shapes.fragment),

    // Activity diagram
    initialnode: toolbarIcon('Initial Node', 'initialnode-icon', shapes.startnode),

    finalnode: toolbarIcon('Final Node', 'finalnode-icon', shapes.endnode),

    decisionandmerge: toolbarIcon('Decision or Merge Node', 'decisionandmerge-icon',
        '<g transform="translate(10,3)">' +
            '<g transform="rotate(45)" >' +
                '<rect width="10" height="10" style="fill:white;stroke:black;stroke-width:1.5" />' +
            '</g>' +
        '</g>'
    ),

    forkandjoinbar: toolbarIcon('Fork or Join Bar', 'forkandjoinbar-icon',
        '<rect width="16" height="3" x="2" y="9" />'
    ),

    action: toolbarIcon('Action', 'action-icon',
        '<rect width="16.4" height="12" x="2" y="4.5" rx="3" ry="3" style="fill:white;stroke:black;stroke-width:1" />'
    ),

    objectnode: toolbarIcon('Object Node', 'objectnode-icon',
        '<rect width="16.4" height="12" x="2" y="4.5" style="fill:white;stroke:black;stroke-width:1" />'
    ),

    sendsignal: toolbarIcon('Send Signal', 'sendsignal-icon',
        '<g transform="scale(.28) translate(5,22)">' +
            _.template(shapes.sendsignal)({width: 35, stroke: 1/.28}) +
        '</g>'
    ),

        acceptevent: toolbarIcon('Accept Event', 'acceptevent-icon',
        '<g transform="scale(.28) translate(10,22)">' +
            _.template(shapes.acceptevent)({width: 35, stroke: 1/.28}) +
        '</g>'
    ),

    accepttime: toolbarIcon('Accept Time Event', 'accepttime-icon',
        '<g transform="scale(.28) translate(20,22)">' +
            _.template(shapes.accepttime)({width: 35, stroke: 1/.28}) +
        '</g>'
    ),

    commit: toolbarIcon('Commit to repository', 'commit-icon',
        '<g transform="scale(.04) translate(20,22)">' +
            shapes.sendrepo +
        '</g>'
    ),

    node: toolbarIcon('Add Node', 'node-icon',
        '<g transform="translate(10,10)">' +
            '<circle r="7" stroke="black" stroke-width="1.5" fill="white"/>' +
        '</g>'
    ),

    stopline: toolbarIcon('Stop', 'stopline-icon selectable',
        '<g transform="translate(4,8) scale(.025)">' +
            '<polygon id="x-mark-icon" points="438.393,374.595 319.757,255.977 438.378,137.348 374.595,73.607 255.995,192.225 137.375,73.622 73.607,137.352 192.246,255.983 73.622,374.625 137.352,438.393 256.002,319.734 374.652,438.378 "></polygon>' +
         '</g>' +
         '<g transform="scale(.20   )">' +
            '<line x1="50" y1="10" x2="50" y2="50" style="stroke-dasharray: 10, 5; stroke: black; stroke-width: 5;"/>' +
         '</g>'
    )




}
