module SpecificationsHelper
  def plugin_script_tag
    files = Dir.chdir(File.join(Rails.root,'public/plugin_assets/modeling/javascripts/editor')){ |d| Dir.glob("**/*.js") }
    files.map{|f| javascript_include_tag('editor/'+f, plugin: 'modeling') }.join('\n').html_safe
  end
end
