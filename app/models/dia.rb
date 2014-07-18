module Dia
  def self.attr(model, attrs)
    names = model.attribute_names
    filtered = attrs.select{|k, v|
      names.include?(k)
    }

    if attrs[:position] && attrs[:position].class != Fixnum
      filtered['x'] = attrs[:position][:x]
      filtered['y'] = attrs[:position][:y]
    end

    if (names.include? 'width') && (attrs[:size].class != Fixnum)
      filtered['width'] = attrs[:size][:width]
      filtered['height'] = attrs[:size][:height]
    end

    filtered
  end

  def self.attributes(model, mod)
    #Todo: colocar versão completa
    if model.class.method_defined? :width
      model.attributes.merge({type: mod})
      .merge({position: {x: model.x, y: model.y}})
      .merge({size: { width: model.width, height: model.height }})
    else
      model.attributes.merge({type: mod})
      .merge({position: {x: model.x, y: model.y}})
    end
  end

  def self.save_childs(model, child_classes, attrs)
    child_classes.each{ |c|
      unless attrs[c[0].to_sym].nil?
        attrs[c[0].to_sym].each{|m|
          if m[:id] && c[1].find(m[:id])
            child = c[1].find(m[:id])
          else
            child = model.send(c[1].table_name).build
          end
          child.attributes = Dia.attr(child, m)
          child.save
          m['id'] = child.id
        }
      end
    }
    if model.methods.include? :childs
      model.childs.each{|child|
        unless attrs[child[:types][0]].nil?
          if attrs[child[:types][0]].select{|a| a['id'] == child['id']}.empty?
            child[:types][1].find(child['id']).destroy
          end
        else
          model.send(child[:types][1].table_name).each{|c| c.destroy}
        end
      }
    end
  end
end