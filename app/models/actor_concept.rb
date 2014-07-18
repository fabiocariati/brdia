class ActorConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :use_case_diagram

  def attrs
    Dia.attributes(self, 'uml.Actor')
  end

  def childs
    []
  end

  def save_childs(cell)
    Dia.save_childs(self, {}, cell)
  end

  def attrs_filter(attrs)
    Dia.attr(self, attrs)
  end
end
