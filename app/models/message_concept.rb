class MessageConcept < ActiveRecord::Base
  unloadable
  include Dia

  belongs_to :use_case_diagram

  def attrs
    {
        type: self.link_type,
        linePosition: self.linePosition,
        concept_model_id: self.concept_model_id,
        name: self.name,
        source: {id: self.source.to_s},
        target: {id: self.target.to_s},
        superType: 'Link',
        'id' => self.id
    }
  end

  def self.normalize_attrs(c)
    {
        name: c[:name],
        linePosition: c[:linePosition],
        link_type: c[:type],
        source: c[:source][:id],
        target: c[:target][:id],
    }
  end

end
