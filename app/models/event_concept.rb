class EventConcept < ActiveRecord::Base
  unloadable
  belongs_to :state_concept
end
