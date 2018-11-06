Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :customers, only: [:index, :create, :update, :show, :destroy]
      resources :jobs, only: [:index, :create, :update, :destroy]
      resources :weather, only: :index

    end
  end
  get "/", to: "homes#index"
  get "/customers", to: "homes#index"
end
