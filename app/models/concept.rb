class Concept < ActiveRecord::Base
  #unloadable
  self.abstract_class = true

  def attrs_filter(attrs)
    Dia.attr(self, attrs)
  end
end