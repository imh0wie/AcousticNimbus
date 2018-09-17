class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new({
      follower_id: current_user.id,
      following_id: params[:following_id],
    })
    if @follow.save
      render "api/songs/show"
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  def delete
    @follow = Follow.find(params[:id])
    if @follow.destroy
      render "api/songs/show"
    else
      render @follow.errors.full_messages, status: 401
    end
  end
end
