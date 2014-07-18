class LifelineConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :concept_model

  def attrs
    Dia.attributes(self, 'uml.Lifeline')
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
