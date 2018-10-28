class Api::FollowsController < ApplicationController
  def index
    @follows = Follow.all
    render :index
  end
  
  def create
    @follow = Follow.new(like_params)
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

  def like_params
    params.require(:follow).permit(:likeable_type, :likeable_id, :liker_id)
  end
end
