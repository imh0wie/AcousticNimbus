class Api::LikesController < ApplicationController
  def create
    @like = Like.new({
      liker_id: current_user.id,
      likeable_id: params[:likeable_id],
      likeable_type: params[:likeable_type]
    })
    if @like.save
      render "api/songs/show"
    else
      render @like.errors.full_messages, status: 401
    end
  end

  def delete
    @like = Like.find(params[:id])
    if @like.destroy
      render "api/songs/show"
    else
      render @like.errors.full_messages, status: 401
    end
  end
end
