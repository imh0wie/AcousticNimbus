class Api::UsersController < ApplicationController
  def index
    @users = User.all
    @random_three_users = User.joins(:attentions)
                              .select('users.*')
                              .where.not('follows.follower_id = ?', params[:current_user_id])
                              .group('users.id')
                              .order('RANDOM()')
                              .first(3)
                              .shuffle
    @current_user = params[:current_user_id]
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
