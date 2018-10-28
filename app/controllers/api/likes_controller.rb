class Api::LikesController < ApplicationController
  def index
    @likes = Like.all
    render :index
  end
  
  def create
    @like = Like.new(like_params)
    # @like = Like.new(like_params)
    if @like.save
      @likes = Like.all
      render :index
    else
      render @like.errors.full_messages, status: 401
    end
  end

  def delete
    @like = Like.find(params[:id])
    if @like.destroy
      @likes = Like.all
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
