examples.stateGraph = {
    id: 58,
    type: 'StateMachineDiagram',
    name: 'Máquina de estados',
    elements: [
        {
            id: "39",
            type: 'uml.Start',
            position: { x:20  , y: 20 }
        },
        {
            id: "40",
            type: 'uml.State',
            position: { x:100  , y: 100 },
            name: "state 1",
            events: [{ name:"entry / init()", position: 0 }, {name: "exit / destroy()", position: 1}]
        },
        {
            id: "41",
            type: 'uml.State',
            position: { x:400  , y: 200 },
            name: "state 2",
            events: [{ name: "entry / create()", position: 0 },{ name: "exit / kill()", position: 1 }]
        },
        {
            id: "42",
            type: 'uml.State',
            position: { x:130  , y: 400 },
            name: "state 3",
            events: [{ name: "entry / create()", position: 0 }, { name: "exit / kill()", position: 1}]
        },
        {
            id: "43",
            type: 'uml.State',
            position: { x:530  , y: 400 },
            name: "sub state 4",
            parent: "41",
            events: [{ name: "entry / create()", position: 0}]
        },
        {
            id: "44",
            type: 'uml.End',
            position: { x:750  , y: 550 }
        },
        {
            id: "45",
            type: 'uml.Transition',
            source: { id: '39' }, target: { id: '40'}
        },
        {
            id: "46",
            type: 'uml.Transition',
            source: { id: '40' }, target: { id: '41' }
        },
        {
            id: "47",
            type: 'uml.Transition',
            source: { id: '40' }, target: { id: '42' }
        },
        {
            id: "48",
            type: 'uml.Transition',
            source: { id: '42' }, target: { id: '43' }
        },
        {
            id: "49",
            type: 'uml.Transition',
            source: { id: '41' }, target: { id: '44' }
        }
    ]
}