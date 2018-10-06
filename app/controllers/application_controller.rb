class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?, :songs_by_release, :songs_by_playback_count

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
    @current_user = user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  # songs filtering methods

  # def songs_by_release(songs, n)
  #   by_release_hashes = []
  #   songs.reverse.take(n).each do |song|
  #     song_hash = {}
  #     song_hash[id] = song.id
  #     song_hash[title] = song.title
  #     song_hash[genre] = song.genre
  #     song_hash[artist] = song.artist.username
  #     song_hash[releaseTime] = song.created_at
  #     song_hash[audioURL] = song.audio_url
  #     song_hash[imageURL] = song.image_url

  #     by_release_hashes << song_hash
  #   end

  #   return by_release_hashes
  # end

  # def songs_by_playback_count(songs, n)
  #   by_playback_hashes = []

  #   songs.sort_by! { |song| song[:playback_count] }.take(n).each do |song|
  #     song_hash = {}
  #     song_hash[id] = song.id
  #     song_hash[title] = song.title
  #     song_hash[genre] = song.genre
  #     song_hash[artist] = song.artist.username
  #     song_hash[releaseTime] = song.created_at
  #     song_hash[audioURL] = song.audio_url
  #     song_hash[imageURL] = song.image_url

  #     by_playback_hashes.unsihft(song_hash)
  #   end

  #   return by_playback_hashes
  # end

  private

  def require_login
    render json: ["Please log in first!"] unless current_user # render errors?
  end
end
