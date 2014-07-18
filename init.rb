Redmine::Plugin.register :modeling do
  name 'Modeling plugin'
  author 'Author name'
  description 'This is a plugin for Redmine'
  version '0.0.1'
  url 'http://example.com/path/to/plugin'
  author_url 'http://example.com/about'

  permission :specifications, { :specifications => [:index, :create] }, :public => false
  menu :project_menu, :specifications, { :controller => 'specifications', :action => 'index' }, :caption => 'Modeling', :after => :activity, :param => :project_id
end

require 'jst_compiler'
Compiler.compile_jst
