// General

dia.Link = joint.dia.Link.extend({

    initialize: function() {
        joint.dia.Link.prototype.initialize.apply(this, arguments);
        this.attributes.superType = 'Link';
    }
});


uml.Association = dia.Link.extend({
    defaults: { type: 'uml.Association' }
});

// Class diagram

uml.Generalization = dia.Link.extend({
    defaults: {
        type: 'uml.Generalization',
        attrs: { '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' }}
    }
});

uml.Implementation = dia.Link.extend({
    defaults: {
        type: 'uml.Implementation',
        attrs: {
            '.marker-target': { d: 'M 20 0 L 0 10 L 20 20 z', fill: 'white' },
            '.connection': { 'stroke-dasharray': '3,3' }
        }
    }
});

uml.Aggregation = dia.Link.extend({
    defaults: {
        type: 'uml.Aggregation',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'white' }}
    }
});

uml.Composition = dia.Link.extend({
    defaults: {
        type: 'uml.Composition',
        attrs: { '.marker-target': { d: 'M 40 10 L 20 20 L 0 10 L 20 0 z', fill: 'black' }}
    }
});

// State Machine diagram

uml.Transition = dia.Link.extend({
    toolMarkup: [
        '<g class="link-tool">',
        '<g class="tool-remove" event="remove">',
        '<circle r="11" />',
        '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
        '<title>Remove link.</title>',
        '</g>',
        '<g class="add-text" event="link:options">',
            '<path transform="scale(.04) translate(220,-230)" d="M423.368,50h-0.023H88.632v92.549h35.289c0-19.659,15.938-35.597,35.598-35.597h55.938v284.451c0,19.659-15.938,35.597-35.598,35.597h-12.258v35h175.596v-35H332.7c-19.658,0-35.596-15.938-35.596-35.597V106.952h55.645c19.658,0,35.596,15.938,35.596,35.597h35L423.368,50z"/>',
            '<title>Add text</title>',
        '</g>',
        '</g>'
    ].join(''),
    defaults: {
        type: 'uml.Transition',
        labels: [
            { position: .5, attrs: { text: { text: '' } } }
        ],
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        }
    }
});

// Use case Diagram

uml.Include = dia.Link.extend({
    defaults: {
        type: 'uml.Include',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50', 'stroke-dasharray': '5 2' }
        },
        labels: [
            { position: .5, attrs: { text: { text: '<<include>>' } } }
        ]
    }
});

uml.Extends = dia.Link.extend({
    defaults: {
        type: 'uml.Extends',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50', 'stroke-dasharray': '5 2' }
        },
        labels: [
            { position: .5, attrs: { text: { text: '<<extend>>' } } }
        ]
    }
});

// Sequence Diagram

uml.Message = dia.Link.extend({
    toolMarkup: [
        '<g class="link-tool">',
            '<g class="tool-remove" event="remove">',
                '<circle r="11" />',
                '<path transform="scale(.8) translate(-16, -16)" d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z"/>',
                '<title>Remove link.</title>',
            '</g>',
            '<g class="tool-method" event="link:options">',
                '<circle r="11" transform="translate(25)"/>',
                '<text class="text-icon" x="18" y="5" style="fill:white;font-size: 16px;">M</text>',
                '<title>Method</title>',
            '</g>',
        '</g>'
    ].join(''),

    defaults: {
        type: 'uml.Message',
        subType: 'MessageConcept',
        attrs: {
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z', fill: '#34495e', stroke: '#2c3e50' },
            '.connection': { stroke: '#2c3e50' }
        },
        linePosition: 100,
        name:''
    }
});


