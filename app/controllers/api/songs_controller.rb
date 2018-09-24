class Api::SongsController < ApplicationController
  helper_method :songs_by_release

  def index
    @songs = Song.all
    # @songs_by_release_time = Song.all.reverse.take(30)
    # @songs_by_release_time = Song.by_release_time
    # @songs_by_playback_times = Song.by_playback_times
    render :index
  end

  def songs_by_release(songs)
    by_release_hash = []
    songs.reverse.take(30).each do |song|
      song_hash = {}
      song_hash[id] = song.id
      song_hash[title] = song.title
      song_hash[genre] = song.genre
      song_hash[artist] = song.artist.username
      song_hash[releaseTime] = song.created_at
      song_hash[audioURL] = song.audio_url
      song_hash[imageURL] = song.image_url

      by_release_hash << song_hash
    end
  end

  def show
    @song = Song.find(params[:id])
    render :show
  end

  def create
    @song = Song.new(song_params)
    # @song.artist_id = current_user.id
    if @song.save
      render :show #Show hai json => json: {}
    else
      render json: @song.errors.full_messages, status: 401
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

  def destroy
    @song = Song.find(params[:id])
    if @song.destroy
      render :index
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
