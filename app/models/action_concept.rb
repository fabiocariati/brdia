class ActionConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :activity_diagram

  def attrs
    Dia.attributes(self, 'uml.Action')
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
