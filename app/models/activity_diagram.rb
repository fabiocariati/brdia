class ActivityDiagram < ConceptModel
  belongs_to :object_oriented_specification
  has_many :action_concepts, class_name: 'ActionConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :start_concepts, class_name: 'StartConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :end_concepts, class_name: 'EndConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :object_node_concepts, class_name: 'ObjectNodeConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :fork_and_join_bar_concepts, class_name: 'ForkAndJoinBarConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :decision_and_merge_concepts, class_name: 'DecisionAndMergeConcept', foreign_key: :concept_model_id, dependent: :destroy
  has_many :links, class_name: 'Link', foreign_key: :concept_model_id, dependent: :destroy

  def self.description
    'Activity Diagram'
  end
end