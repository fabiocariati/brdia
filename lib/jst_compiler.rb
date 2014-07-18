class Compiler
  def self.compile_jst
    require 'nokogiri'
    require 'htmlentities'

    files = Dir.new('plugins/modeling/assets/javascripts/editor/templates').select {|file| file if file.include? '.jst' }

    exclude_strings = Dir.new('plugins/modeling/assets/javascripts/editor/templates/lib').select {|file|
      file.include? '.js'
    }
    exclude_strings = exclude_strings.map{|s| s.sub('.js', '')}

    final = ''
    contents = "templates = {\n"
    files.each{|f|
      file = File.open("plugins/modeling/assets/javascripts/editor/templates/" + f.to_s)

      names = /(\w)*\.(jst\.html)/.match(file.path.to_s).to_s.split('.')

      path = file.path
      path[names.join('.')] = ''
      file.each{|l|
        node = Nokogiri::XML(l).children
        if node.empty? || (node.attr('class').to_s != 'jst-template' && node.attr('class').to_s != 'item')
          if l == "    </div>\n"
            contents << "        ),\n"
          elsif l == "</div>\n"
            contents << "    },\n"
          else
            unless l.to_s.gsub(/\s+/, "").empty?
              test = exclude_strings.select{|str| str if l.to_s.include?(str + '.')  }
              if test[0].to_s.empty?
                contents << "    \'#{l.gsub(/\n/, "")}\' +\n"
              else
                contents << "    #{l.gsub(/\n/, "")} +\n"
              end
            end
          end
        else
          if node.attr('class').to_s == 'jst-template'
            contents << "    #{node.attr('name')}: {\n"
          elsif node.attr('class').to_s == 'item'
            contents << "        #{node.attr('name')}: _.template(\n"
          end
        end
        unless contents[/(\+)(\s)*\n        \)/].nil?
          contents[/(\+)(\s)*\n        \)/] = "\n        )"
        end
        clear = lambda{ |str|
          unless str['\'    '].nil?
            str['\'    '] = '    \''
            clear.call(str)
          end
        }
        clear.call(contents)

        contents["\n    \'</div>\' +"] = "\n    }" unless contents["\n    \'</div>\' +"].nil?

        contents[/,(\s)*\n    }/] = "\n    }" unless contents[/,(\s)*\n    }/].nil?
      }
      contents["}\n"] = "},\n" unless contents["}\n"].nil?
    }

    contents[-1] = "\n}"

    aFile = File.new("plugins/modeling/assets/javascripts/editor/templates/templates.js", "w")
    aFile.write(contents)
    aFile.close
  end

end