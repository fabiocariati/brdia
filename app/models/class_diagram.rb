  class ClassDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :class_concepts, class_name: 'ClassConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'Class Diagram'
  end
end