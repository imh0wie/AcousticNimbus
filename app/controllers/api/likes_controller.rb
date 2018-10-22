class Api::LikesController < ApplicationController
  def index
    @likes = Like.all
    render :index
  end
  
  def create
    debugger
    @like = Like.new(like_params)
    debugger
    if @like.save
      @likes = Like.all
      debugger
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
