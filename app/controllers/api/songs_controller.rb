class Api::SongsController < ApplicationController
  def index
    if params[:current_user_id]
      if params[:fetching_followed_songs]
        followings = Follow.where(follower_id: params[:current_user_id]).select(:followed_user_id)
        @followed_songs = Song.where(artist_id: followings)
      end
      if params[:fetching_liked_songs]
        likes = Like.where(liker_id: params[:current_user_id]).select(:likeable_id)
        @liked_songs = Song.where(id: likes).select('*')
        @likes = Like.where(liker_id: params[:current_user_id]).select(:id)
        # @liked_songs = Song.includes(:likes)
        #                    .where(likes: { liker_id: params[:current_user_id] })
        #                    .select('songs.*, likes.id AS like_id')
      end
    elsif params[:user_id]
      if params[:fetching_likes]
        ids = Like.where(liker_id: params[:user_id]).select(:likeable_id)
        @liked_songs_of_specific_user = Song.where(id: ids).select('*')
      else
        @songs_of_specific_user = Song.where(artist_id: params[:user_id]).select('*')
      end
    end
    render :index
  end
  
  def show
    @song = Song.find(params[:id])
    render :show
  end
  
  def create
    @song = Song.new(song_params)
    # @song.artist_id = current_user.id
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 401
    end
  end

  def destroy
    @song = Song.find(params[:id])
    if @song.destroy
      @songs = Song.all
      render :index
    else
      render @song.errors.full_messages, status: 401
    end
  end  
  
  def update
    @song = Song.find(params[:id])
    if @song.update(song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 401
    end
  end
  
  private
  
  def song_params
    params.require(:song).permit(:title, :genre, :description, :availability, :audio, :audio_url, :image, :image_url, :artist_id)
  end
end

# @songs_by_release_time = Song.all.reverse.take(30)
# @songs_by_release_time = Song.by_release_time
# @songs_by_playback_times = Song.by_playback_times