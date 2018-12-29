class Api::FollowsController < ApplicationController
  def index
    if params[:followerId]
      @follows = Follow.where(:follower_id => params[:followerId])
    else
      @follows = Follow.all
    end
    render :index
  end
  
  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      @follows = Follow.all
      render :index
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    if @follow.destroy
      @follows = Follow.all
      render :index
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  private

  def follow_params
    params.require(:follow).permit(:followed_user_id, :follower_id)
  end
end
