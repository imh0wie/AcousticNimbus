class Api::FollowsController < ApplicationController
  def index
    @follows = Follow.all
    render :index
  end
  
  def create
    @follow = Follow.new(follow_params)
    debugger
    if @follow.save
      debugger
      @follows = Follow.all
      debugger
      render :index
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    debugger
    if @follow.destroy
      debugger
      @follows = Follow.all
      debugger
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
