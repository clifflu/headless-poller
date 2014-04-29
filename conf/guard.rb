# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload', :grace_period => 2 do
  watch(%r{.+\.(sass|scss|css|js)$})
  watch(%r{.+\.(png|jpg|jpeg|gif|ico|tif|tiff)$})
  watch(%r{.+\.(htm|html)$})
  watch(%r{.+\.(py|php)$})
  watch(%r{.+\.(ini|conf|json)$})
end

guard :compass, configuration_file: 'conf/compass.rb' do
    watch(%r{.+\.(sass|scss)})
end
