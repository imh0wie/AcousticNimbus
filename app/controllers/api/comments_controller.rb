class Api::CommentsController < ApplicationController
  def index
    @song_id = params[:song_id]
    @comments_of_specific_song = Comment.where(song_id: @song_id).select('*')
    render :index
  end
  
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      @song_id = params[:song_id]
      @comments_of_specific_song = Comment.where(song_id: @song_id).select('*')
      render :index
    else
      render @comment.errors.full_messages, status: 401
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      @song_id = params[:song_id]
      @comments_of_specific_song = Comment.where(song_id: @song_id).select('*')
      render :index
    else
      render @comment.errors.full_messages, status: 401
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :song_id, :song_progress, :commenter_id)
  end
end
  