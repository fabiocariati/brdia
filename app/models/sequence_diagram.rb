class SequenceDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :lifeline_concepts, class_name: 'LifelineConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :message_concepts, class_name: 'MessageConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :combined_fragment_concepts, class_name: 'CombinedFragmentConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :interaction_use_concepts, class_name: 'InteractionUseConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'Sequence Diagram'
  end
end