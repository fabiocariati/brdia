class JavaClass
  def self.read_class
    f = File.new('gittest/person.java', 'rb')
    content = f.read
    f.close
    class_first_line_regex = /[^\n}]*class[^{]*/
    bodies = content.split(class_first_line_regex).select{|b| !b.empty?}
    class_signs = content.scan class_first_line_regex
    methods = bodies.map{|b| b.scan(/[^\n]*\([^\(\)]*\){/m).map{|m|m.strip} }
    attributes = bodies.map{|b| b.scan(/[^\n;]*;/m).map{|a|a.strip} }
    class_signs.each_with_index.map{|s,i|
      {
        sign: s,
        methods: methods[i],
        attributes: attributes[i]
      }
    }
  end

  def self.generate_code(c, links)
    tab = '    '
    body = ''
    c[:attributes].each{|a|
      if a['name'].include?('-')
        a['name']['-'] = '' unless a['name']['-'].nil?
        mod = 'private'
      else
        a['name']['+'] = '' unless a['name']['+'].nil?
        mod = 'public'
      end
      name = a['name'].strip
      body += tab + mod + ' ' + name.split(':')[1].strip + ' ' + name.split(':')[0] + ";\n";
    }
    c[:methods].each{|m|
      if m['name'].include?('-')
        m['name']['-'] = '' unless  m['name']['-'].nil?
        mod = 'private'
      else
        m['name']['+'] = '' unless  m['name']['+'].nil?
        mod = 'public'
      end
      name = m['name'].strip
      if m['name'].include? ':'
        body += "\n" + tab + mod + ' ' + name.split(':')[1].strip + ' ' + name.split(':')[0].strip + " \{\n\n" + tab + "\}"
      else
        body += "\n" + tab + mod + ' ' + name.strip + " \{\n\n" + tab + "\}"
      end
    }

    source_modifier = links.select{|l| l[:source][:id].to_s == c['id'].to_s }
    extends = ''
    implements = ''

    unless source_modifier.empty?
      source_modifier.each{|s|
        if s[:type] == 'uml.Generalization'
          name = ClassConcept.find(s[:target][:id]).name
          extends = ' extends ' + name
        end

        if s[:type] == 'uml.Implementation'
          name = ClassConcept.find(s[:target][:id]).name
          implements = ' implements ' + name
        end
      }
    end

    modifiers = 'Public'

    modifiers + ' class ' + c['name'] + extends + implements + " \{\n" + body + "\n\}"
  end
end