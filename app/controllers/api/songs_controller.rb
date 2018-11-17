class Api::SongsController < ApplicationController

  def index
    @songs = Song.all
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
  
  def show
    @song = Song.find(params[:id])
    render :show
  end
  
  private
  
  def song_params
    params.require(:song).permit(:title, :genre, :description, :availability, :audio, :audio_url, :image, :image_url, :artist_id)
  end
end

# @songs_by_release_time = Song.all.reverse.take(30)
# @songs_by_release_time = Song.by_release_time
# @songs_by_playback_times = Song.by_playback_times