class Api::UsersController < ApplicationController
  def index
    followed_users = Follow.where(follower_id: params[:current_user_id]).select(:followed_user_id)
    @recommended_users = User.where.not(id: followed_users)
                             .where.not(id: params[:current_user_id])
                             .shuffle
                            #  .first(3)
    # debugger
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render json: @user # /stream?
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
