examples.sequenceGraph = {
    id: 57,
    type: 'SequenceDiagram',
    name: 'Diagrama de sequência',
    elements: [
        {
            id: "33",
            type: 'uml.Lifeline',
            position: { x: 50 },
            name: 'User',
            subtype: 'Actor'
        },
        {
            id: "34",
            type: 'uml.Lifeline',
            position: { x: 200 },
            name: 'UI'
        },
        {
            id: "35",
            type: 'uml.Lifeline',
            position: { x: 350 },
            name: 'Bar'
        },
        {
            id: "36",
            type: 'uml.Message',
            source: { id: '33' },
            target: { id: '34' },
            linePosition: 200,
            name: 'message1'
        },
        {
            id: "37",
            type: 'uml.Message',
            source: { id: '35' },
            target: { id: '35' },
            linePosition: 200,
            name: 'self message'
        },
        {
            id: "38",
            type: 'uml.CombinedFragment',
            position: { x: 40, y: 150 },
            size: { width: 240, height: 210 },
            operator: 'par',
            operands: new Backbone.Collection([
                { name: '[guard1]', linePosition: 0 },
                { name: '[guard2]', linePosition: 80 }
            ])
        }
    ]
}