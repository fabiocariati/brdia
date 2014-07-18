class Specification < ActiveRecord::Base
  unloadable
  has_many :concept_models, dependent: :destroy
end
