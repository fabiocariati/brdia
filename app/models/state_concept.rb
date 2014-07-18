class StateConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :state_machine_diagram
  has_many  :event_concepts

  def attrs
    Dia.attributes(self, 'uml.State').merge({events: self.event_concepts.map{|m| m.attributes }})
  end

  def childs
    self.event_concepts.map{|m| m.attributes.merge(types: ['events', EventConcept]) }
  end

  def save_childs(cell)
    Dia.save_childs(self, { events: EventConcept }, cell)
  end

  def attrs_filter(attrs)
    Dia.attr(self, attrs)
  end
end
