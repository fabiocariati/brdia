class AttributeConcept < ActiveRecord::Base
  unloadable
  belongs_to :class_concept
end
