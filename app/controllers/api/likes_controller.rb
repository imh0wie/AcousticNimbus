class Api::LikesController < ApplicationController
  def index
    @likes = Like.all
    render "api/likes/index"
  end
  
  def create
    @like = current_user.likes.new(like_params)
    if @like.save
      render "api/likes/show"
    else
      render @like.errors.full_messages, status: 401
    end
  end

  def delete
    @like = Like.find(params[:id])
    if @like.destroy
      render "api/likes/show"
    else
      render @like.errors.full_messages, status: 401
    end
  end

  private

  def like_params
    params.require(:like).permit(:likeable_id, :likeable_type)
  end
end
