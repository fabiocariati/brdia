examples.classGraph =  {
    id: 56,
    type: 'ClassDiagram',
    name: 'Diagrama de classe',
    elements: [
        {
            id: "1",
            type: 'uml.Class',
            position: { x: 300, y: 50 },
            stereotype: 'Interface',
            name: 'Mammal',
            attributes: [ { name:'dob: Date', position: 0 } ],
            methods: [{name:'+ setDateOfBirth(dob: Date): Void', position: 0}, {name:'+ getAgeAsDays(): Numeric', position: 1}]
        },
        {
            id: "2",
            type: 'uml.Class',
            position: { x: 300, y: 300 },
            stereotype: 'Abstract',
            name: 'Person',
            attributes: [{name:'firstName: String', position: 0}, {name:'lastName: String', position:1}],
            methods: [{name:'+ setName(first: String, last: String): Void', position: 0}, {name:'+ getName(): String', position: 1}]
        },
        {
            id: "3",
            type: 'uml.Class',
            position: { x: 20, y: 190 },
            stereotype: 'Abstract',
            name: 'BloodGroup',
            attributes: [{name:'bloodGroup: String', position: 0}],
            methods: [{name: '+ isCompatible(bG: String): Boolean', position:   1}]
        },
        {
            id: "4",
            type: 'uml.Class',
            position: { x: 630, y: 190 },
            name: 'Address',
            attributes: [{name: 'houseNumber: Integer', position: 0}, {name: 'streetName: String', position:1}, {name: 'town: String', position:2}, {name:'postcode: String',position:3}]
        },
        {
            id: "5",
            type: 'uml.Class',
            position: { x: 200, y: 500 },
            name: 'Man'
        },
        {
            id: "6",
            type: 'uml.Class',
            position: { x: 450, y: 500 },
            name: 'Woman',
            methods: [{name: '+ giveABrith(): Person []', position:0 }]
        },
        {
            id: "7",
            type: 'uml.Generalization',
            source: { id: '5' }, target: { id: '2' }
        },
        {
            id: "8",
            type: 'uml.Generalization',
            source: { id: '6' }, target: { id: '2' }
        },
        {
            id: "9",
            type: 'uml.Implementation',
            source: { id: '2' }, target: { id: '1' }
        },
        {
            id: "10",
            type: 'uml.Aggregation',
            source: { id: '2' }, target: { id: '4' }
        },
        {
            id: "11",
            type: 'uml.Composition',
            source: { id: '2' }, target: { id: '3' }
        }

    ]
}
