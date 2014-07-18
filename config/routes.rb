# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

get 'specifications', :to => 'specifications#index'
post 'specification', :to => 'specifications#create'
put 'specification/:id', :to => 'specifications#update'
delete 'specification/:id', :to => 'specifications#destroy'

post 'concept_model', :to => 'concept_models#create'
put 'concept_model/:id', :to => 'concept_models#save'
delete 'concept_model/:id', :to => 'concept_models#destroy'

get 'concept_models/:specification_id', :to => 'concept_models#show'
