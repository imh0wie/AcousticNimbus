class Api::FollowsController < ApplicationController
  def index
    debugger
    if params[:follower_id]
      @follows = Follow.where(:follower_id => params[:follower_id])
      debugger
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
