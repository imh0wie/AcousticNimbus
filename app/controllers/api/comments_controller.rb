class Api::CommentsController < ApplicationController
  def index
    @comments_of_specific_song = Comment.where(song_id: params[:song_id]).select('*') 
    render :index
  end
  
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      @comments_of_specific_song = Comment.where(song_id: params[:song_id]).select('*')
      render :index
    else
      render @comment.errors.full_messages, status: 401
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      @comments_of_specific_song = Comment.where(song_id: params[:song_id]).select('*')
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
  