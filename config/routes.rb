Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  resources :songs, only: [:show]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :songs, only:[:index]
    end
    resource :session, only: [:create, :destroy]
    resources :songs, only: [:index, :show, :create, :update, :destroy]
  end
end
