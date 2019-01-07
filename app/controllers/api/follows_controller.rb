class Api::FollowsController < ApplicationController
  def index
    if params[:follower_id]
      @follows = Follow.where(:follower_id => params[:follower_id])
    else
      @follows = Follow.all
    end
    render :index
  end
  
  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      # @followed_users = User.joins(:attentions)
      #                       .select('user.*')
      #                       .where.('follows.follower_id = ?', params[:current_user_id])
      #                       .group('users.id')
      #                       .order('RANDOM()')
      # @followers = User.joins(:interests)
      #                  .select('user.*')
      #                  .where.('follows.followed_user_id = ?', params[:current_user_id])
      #                  .group('users.id')
      #                  .order('RANDOM()')
      @interests = Follow.select(:id, :followed_user_id, :follower_id)
                         .where('follower_id = ?', params[:current_user_id])
      @attentions = Follow.select(:id, :followed_user_id, :follower_id)
                          .where('followed_user_id = ?', params[:current_user_id])
      render :show
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    if @follow.destroy
      @interests = Follow.select(:id, :followed_user_id, :follower_id)
                         .where('follower_id = ?', params[:current_user_id])
      # @attentions = Follow.select(:id, :followed_user_id, :follower_id)
      #                     .where('followed_user_id = ?', params[:current_user_id])
      render :show
    else
      render @follow.errors.full_messages, status: 401
    end
  end

  private

  def follow_params
    params.require(:follow).permit(:followed_user_id, :follower_id)
  end
end
