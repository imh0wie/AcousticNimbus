# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Song.destroy_all

user1 = User.create!(username: "h0wiechan", password: "88888888")
user2 = User.create!(username: "jacksonW", password: "88888888")
user3 = User.create!(username: "mikeschwag", password: "88888888")
user4 = User.create!(username: "rafgarcia", password: "88888888")
user5 = User.create!(username: "dddkinson", password: "88888888")
user6 = User.create!(username: "tandreC", password: "88888888")
user7 = User.create!(username: "kevinZ", password: "88888888")
user8 = User.create!(username: "limingk", password: "88888888")
user9 = User.create!(username: "dddkinson", password: "88888888")
use10 = User.create!(username: "olliec", password: "88888888")

s1 = Song.create!()
