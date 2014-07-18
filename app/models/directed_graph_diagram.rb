class DirectedGraphDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :node_concepts, class_name: 'NodeConcept',
           foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'Directed Graph'
  end
end