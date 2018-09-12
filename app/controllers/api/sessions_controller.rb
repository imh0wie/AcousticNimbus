class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def destroy
    @user = current_user
    logout!
    render :root
  end
end
