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
