class UseCaseDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :actor_concepts, class_name: 'ActorConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :use_case_concepts, class_name: 'UseCaseConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'Use Case Diagram'
  end
end