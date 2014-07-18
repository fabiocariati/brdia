examples.userCaseGraph =  {
    id: 59,
    type: 'UseCaseDiagram',
    name: 'Diagrama de caso de uso',
    elements: [
        {
            id: "50",
            type: 'uml.Actor',
            position: { x: 200, y: 200 },
            name: 'User'
        },
        {
            id: "51",
            type: 'uml.Actor',
            position: { x: 700, y: 200 },
            name: 'Admin'
        },
        {
            id: "52",
            type: 'uml.UseCase',
            position: { x: 390, y: 150 },
            size: {width: 120, height: 45},
            name: 'Authenticate'
        },
        {
            id: "53",
            type: 'uml.Association',
            source: { id: '50' }, target: { id: '52' }
        },
        {
            id: "54",
            type: 'uml.Association',
            source: { id: '51' }, target: { id: '52' }
        }
    ]
}