class ClassConcept < Concept
  #unloadable
  self.table_name =  "class_concepts"
  include Dia

  belongs_to :class_diagram
  has_many  :method_concepts
  has_many :attribute_concepts

  def attrs
    Dia.attributes(self, 'uml.Class')
      .merge({methods: self.method_concepts.map{|m| m.attributes }})
      .merge({attributes: self.attribute_concepts.map{|a| a.attributes }})
  end

  def childs
    self.method_concepts.map{|m| m.attributes.merge(types: ['methods', MethodConcept]) } +
        self.attribute_concepts.map{|a| a.attributes.merge(types: ['attributes', AttributeConcept]) }
  end

  def save_childs(cell)
    Dia.save_childs(self, { methods: MethodConcept, attributes: AttributeConcept }, cell)
  end
end
