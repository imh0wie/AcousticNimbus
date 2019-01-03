class Api::LikesController < ApplicationController
  def index
    @likes = Like.all
    render :index
  end
  
  def create
    @like = Like.new(like_params)
    if @like.save
      # @current_user = User.find(params[:like][:liker_id])
      @current_likes = Like.where(liker_id: params[:like][:liker_id])
      render :index
    else
      render @like.errors.full_messages, status: 401
    end
  end

  def destroy
    @like = Like.find(params[:like][:id])
    if @like.destroy
      # @current_user = User.find(params[:like][:liker_id])
      @current_likes = Like.where(liker_id: params[:like][:liker_id])
      render :index
    else
      render @like.errors.full_messages, status: 401
    end
  end

  private

  def like_params
    params.require(:like).permit(:likeable_type, :likeable_id, :liker_id)
  end
end
