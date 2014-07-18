class StateMachineDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :state_concepts, class_name: 'StateConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :start_concepts, class_name: 'StartConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :end_concepts, class_name: 'EndConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'State Machine Diagram'
  end
end