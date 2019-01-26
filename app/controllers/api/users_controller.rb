class Api::UsersController < ApplicationController
  def index
    if params[:current_user_id]
      followed_user_ids = Follow.where(follower_id: params[:current_user_id]).select(:followed_user_id)
      @recommended_users = User.where.not(id: followed_user_ids)
                               .where.not(id: params[:current_user_id])
                               .order("RANDOM()")
                               .limit(3)
    elsif params[:song_id]
      liker_ids = Like.where(likeable_id: params[:song_id]).select(:liker_id)
      @likers_of_specific_song = User.where(id: liker_ids).select('*')
    elsif params[:user_id]
      follower_ids = Follow.where(followed_user_id: params[:user_id]).select(:follower_id)
      @followers_of_specific_user = User.where(id: follower_ids).select('*')
    end
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
    likeable_ids = Like.where(liker_id: params[:id]).select(:likeable_id)
    @liked_songs_of_user = Song.where(id: likeable_ids).select('*')
    # @user_attentions = Follow.select('*').where(followed_user_id: params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
