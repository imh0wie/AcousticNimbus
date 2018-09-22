# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Song.destroy_all

users = [
         {username: "h0wiechan", password: "12345678"},
         {username: "jacksonW", password: "12345678"},
         {username: "mikeschwag", password: "12345678"},
         {username: "rafgarcis", password: "12345678"},
         {username: "dddkinson", password: "12345678"},
         {username: "tandreC", password: "12345678"},
         {username: "kevinZ", password: "12345678"},
         {username: "limingk", password: "12345678"},
         {username: "blakeZ", password: "12345678"},
         {username: "olliec", password: "12345678"}
        ]
#
# songs = [
#          {title: "Down", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Bad & Boujee Remix", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Alive", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "This Girl", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Digital Love", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Bye Bye", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "We Got U", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Fxxk U", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Location", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Walking On A Dream", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Longing", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Conquerors", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Home Alone", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Beautiful", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Sorry I Like You", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Rebirth of Cool", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Psychosocial", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#          {title: "Wake Me Up", genre: "Electronic", description: "You have to love this song", availability: true, artist_id:},
#         ]
#
# users.each do |user|
#   User.create!(username: user.username, password: user.password)
# end

User.create!(username: "h0wiechan", password: "12345678")
User.create!(username: "jacksonW", password: "12345678")
User.create!(username: "mikeschwag", password: "12345678")
User.create!(username: "rafgarcia", password: "12345678")
User.create!(username: "dddkinson", password: "12345678")
User.create!(username: "tandreC", password: "12345678")
User.create!(username: "kevinZz", password: "12345678")
User.create!(username: "limingK", password: "12345678")
User.create!(username: "blakeZ", password: "12345678")
User.create!(username: "ollie", password: "12345678")
User.create!(username: "ellebelle", password: "12345678")

Song.create!()
