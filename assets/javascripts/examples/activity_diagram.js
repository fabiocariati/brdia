examples.activityGraph = {
    id: 55,
    type: 'ActivityDiagram',
    name: 'Diagrama de atividade',
    elements: [
        {
            id: "12",
            type: 'uml.Start',
            position: { x:100, y: 150 }
        },
        {
            id: "13",
            type: 'uml.Action',
            name: 'action1',
            position: { x:350, y: 80 }
        },
        {
            id: "14",
            type: 'uml.Action',
            name: 'action1.5',
            position: { x:350, y: 270 }
        },
        {
            id: "15",
            type: 'uml.Action',
            name: 'action2',
            position: { x:650, y: 300 }
        },
        {
            id: "16",
            type: 'uml.Action',
            name: 'send_signal',
            subtype: 'SendSignal',
            position: { x:20, y: 60 }
        },
        {
            id: "17",
            type: 'uml.Action',
            name: 'accept_event',
            subtype: 'AcceptEvent',
            position: { x:20, y: 100 }
        },
        {
            id: "18",
            type: 'uml.Action',
            name: 'time',
            subtype: 'AcceptTimeEvent',
            position: { x:20, y: 140 }
        },
        {
            id: "19",
            type: 'uml.ObjectNode',
            name: 'object',
            position: { x:20, y: 20 }
        },
        {
            id: "20",
            type: 'uml.End',
            position: { x:800, y: 150 }
        },
        {
            id: "21",
            type: 'uml.DecisionAndMerge',
            position: { x: 650, y: 150}
        },
        {
            id: "22",
            type: 'uml.DecisionAndMerge',
            position: { x: 250, y: 150}
        },
        {
            id: "23",
            type: 'uml.ForkAndJoinBar',
            position: { x: 500, y:150 },
            angle: 90
        },
        {
            id: "24",
            type: 'uml.Transition',
            source: { id: '12' },
            target: {id: '22'}
        },
        {
            id: "25",
            type: 'uml.Transition',
            source: {id: '13'},
            target: {id: '23'}
        },
        {
            id: "26",
            type: 'uml.Transition',
            source: {id: '21'},
            target: { id: '20' }
        },
        {
            id: "27",
            type: 'uml.Transition',
            source: {id: '21'},
            target: {id: '15'}
        },
        {
            id: "28",
            type: 'uml.Transition',
            source: {id: '15'},
            target: { id: '20' }
        },
        {
            id: "29",
            type: 'uml.Transition',
            source: {id: '22'},
            target: {id: '13'}
        },
        {
            id: "30",
            type: 'uml.Transition',
            source: {id: '22'},
            target: {id: '14'}
        },
        {
            id: "31",
            type: 'uml.Transition',
            source: {id: '14'},
            target: {id: '23'}
        },
        {
            id: "32",
            type: 'uml.Transition',
            source: {id: '23'},
            target: {id: '21'}
        }
    ]
}
