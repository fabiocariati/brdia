class NodeConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :directed_graph_diagram

  def attrs
    Dia.attributes(self, 'general.Node')
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
