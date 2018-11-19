# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# User.destroy_all
# Song.destroy_all

# User.create!(username: "h0wiechan", password: "12345678")
# User.create!(username: "jacksonW", password: "12345678")
# User.create!(username: "mikeschwag", password: "12345678")
# User.create!(username: "rafgarcia", password: "12345678")
# User.create!(username: "dddkinson", password: "12345678")
# User.create!(username: "tandreC", password: "12345678")
# User.create!(username: "kevinZz", password: "12345678")
# User.create!(username: "limingK", password: "12345678")
# User.create!(username: "blakeZ", password: "12345678")
# User.create!(username: "ollie", password: "12345678")
# User.create!(username: "ellebelle", password: "12345678")

# Song.create!(title: "Down", genre: "Electronic",
#              artist_id: User.find_by_username("h0wiechan").id, availability: true,
#              description: "My first song on Nimbus! Enjoy!",
#              audio: File.open("app/assets/audio/Marian Hill - Down.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Marian+Hill+-+Down.mp3",
#              image: File.open("app/assets/images/cat-sad.jpeg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/cat-sad.jpeg")

# Song.create!(title: "Bye Bye", genre: "Pop",
#              artist_id: User.find_by_username("h0wiechan").id, availability: true,
#              description: "You will love this if you are a FIFA fan!",
#              audio: File.open("app/assets/audio/SAFIA - Bye Bye.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/SAFIA+-+Bye+Bye.mp3",
#              image: File.open("app/assets/images/fifa.jpeg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/fifa.jpeg")

# Song.create!(title: "Rebirth of Cool", genre: "Jazz",
#              artist_id: User.find_by_username("h0wiechan").id, availability: true,
#              description: nil,
#              audio: File.open("app/assets/audio/DJ Cam Quartet - Rebirth of Cool.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/DJ+Cam+Quartet+-+Rebirth+of+Cool.mp3",
#              image: File.open("app/assets/images/cat-jazz.jpeg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/cat-jazz.jpeg")

# Song.create!(title: "This Girl", genre: "Pop",
#              artist_id: User.find_by_username("jacksonW").id, availability: true,
#              description: nil,
#              audio: File.open("app/assets/audio/Kungs vs Cookin on 3 Burners - This Girl.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Kungs+vs+Cookin+on+3+Burners+-+This+Girl.mp3",
#              image: File.open("app/assets/images/dog-flirty.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/dog-flirty.jpg")

# Song.create!(title: "Fxxk U", genre: "World",
#              artist_id: User.find_by_username("jacksonW").id, availability: true,
#              description: "Great korean song!",
#              audio: File.open("app/assets/audio/Gain - Fxxk U (Feat. Bumkey).mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Gain+-+Fxxk+U+(Feat.+Bumkey).mp3",
#              image: nil)

# Song.create!(title: "Look Alive", genre: "Hip-hop",
#              artist_id: User.find_by_username("mikeschwag").id, availability: true,
#              description: "Fireeeee",
#              audio: File.open("app/assets/audio/Drake - Look Alive.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Drake+-+Look+Alive.mp3",
#              image: File.open("app/assets/images/dog-hiphop.jpeg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/dog-hiphop.jpeg")

# Song.create!(title: "Bad and Boujee (Remix)", genre: "Electronic",
#              artist_id: User.find_by_username("mikeschwag").id, availability: true,
#              description: "THIS REMIX HAS A SOUL!",
#              audio: File.open("app/assets/audio/Omniboi - Bad And Boujee Remix.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Omniboi+-+Bad+And+Boujee+Remix.mp3",
#              image: File.open("app/assets/images/cat-dj.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/cat-dj.jpg")

# Song.create!(title: "Daft Punk", genre: "Electronic",
#              artist_id: User.find_by_username("rafgarcia").id, availability: true,
#              description: "Amazing acapella remix by Pentatonix!",
#              audio: File.open("app/assets/audio/Pentatonix - Daft Punk.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Pentatonix+-+Daft+Punk.mp3",
#              image: File.open("app/assets/images/dogs.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/dogs.jpg")

# Song.create!(title: "I'm Not Alone", genre: "Dance/EDM",
#              artist_id: User.find_by_username("rafgarcia").id, availability: true,
#              description: "NO SORRY NO",
#              audio: File.open("app/assets/audio/Calvin Harris - Im Not Alone.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Calvin+Harris+-+Im+Not+Alone.mp3",
#              image: nil)

# Song.create!(title: "I'm Yours", genre: "Acoustic",
#              artist_id: User.find_by_username("dddkinson").id, availability: true,
#              description: "Uke classic!",
#              audio: File.open("app/assets/audio/Jason Mraz - I'm Yours (Acoustic).mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Jason+Mraz+-+I'm+Yours+(Acoustic).mp3",
#              image: File.open("app/assets/images/cat-acoustic.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/cat-acoustic.jpg")

# Song.create!(title: "Conquerors", genre: "Dance/EDM",
#              artist_id: User.find_by_username("tandreC").id, availability: true,
#              description: "Dance RIGHT NOW",
#              audio: File.open("app/assets/audio/Conquerors.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Conquerors.mp3",
#              image: File.open("app/assets/images/partying.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/partying.jpg")

# Song.create!(title: "Send Them Off!", genre: "Pop",
#             artist_id: User.find_by_username("tandreC").id, availability: true,
#             description: "Another favorite of FIFA fans!",
#             audio: File.open("app/assets/audio/Bastille - Send Them Off!.mp3"),
#             audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Bastille+-+Send+Them+Off!.mp3",
#             image: File.open("app/assets/images/fifa.jpeg"),
#             image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/fifa.jpeg")


# Song.create!(title: "Home Alone", genre: "Electronic",
#              description: "I don't wanna go hoooooooommmmmmme",
#              artist_id: User.find_by_username("kevinZz").id, availability: true,
#              audio: File.open("app/assets/audio/Marian Hill - Down.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Ansel+Elgort+-+Home+Alone.mp3",
#              image: nil)


# Song.create!(title: "Wake Me Up", genre: "Electronic",
#              artist_id: User.find_by_username("kevinZz").id, availability: true,
#              description: "Tribute to Avicii",
#              audio: File.open("app/assets/audio/AVICII - Wake Me Up.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/AVICII+-+Wake+Me+Up.mp3",
#              image: File.open("app/assets/images/avicii.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/avicii.jpg")

# Song.create!(title: "Sorry I Like You", genre: "Soul",
#              artist_id: User.find_by_username("limingK").id, availability: true,
#              description: "",
#              audio: File.open("app/assets/audio/Burbank - Sorry I Like You.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Burbank+-+Sorry+I+Like+You.mp3",
#              image: File.open("app/assets/images/cats-inlove.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/cats-inlove.jpg")

# Song.create!(title: "Beautiful", genre: "Pop",
#             artist_id: User.find_by_username("limingK").id, availability: true,
#             description: "",
#             audio: File.open("app/assets/audio/Said The Sky - Beautiful (ft. Diamond Eyes).mp3"),
#             audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Said+The+Sky+-+Beautiful+(ft.+Diamond+Eyes).mp3",
#             image: nil)

# Song.create!(title: "Digital Love", genre: "Electronic",
#              artist_id: User.find_by_username("blakeZ").id, availability: true,
#              description: "Daft Punk's classic!",
#              audio: File.open("app/assets/audio/Daft Punk - Digital Love.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Daft+Punk+-+Digital+Love.mp3",
#              image: File.open("app/assets/images/daftpunk.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/daftpunk.jpg")

# Song.create!(title: "Walking On A Dream", genre: "Electronic",
#              artist_id: User.find_by_username("blakeZ").id, availability: true,
#              description: "NO SORRY NO",
#              audio: File.open("app/assets/audio/Empire of The Sun - Walking On A Dream.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Empire+Of+The+Sun+-+Walking+On+A+Dream.mp3",
#              image: nil)

# Song.create!(title: "Longing", genre: "Soul",
#              artist_id: User.find_by_username("ollie").id, availability: true,
#              description: "^___^",
#              audio: File.open("app/assets/audio/Kasey Andre - Longing.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Kasey+Andre+-+Longing.mp3",
#              image: File.open("app/assets/images/dog-happy.jpg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/dog-happy.jpg")

# Song.create!(title: "Location", genre: "Pop",
#              artist_id: User.find_by_username("ollie").id, availability: true,
#              description: nil,
#              audio: File.open("app/assets/audio/Khalid - Location.mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Khalid+-+Location.mp3",
#              image: nil)

# Song.create!(title: "We Got U", genre: "Pop",
#              artist_id: User.find_by_username("ollie").id, availability: true,
#              description: "Side track from FIFA!",
#              audio: File.open("app/assets/audio/Lemaitre - We Got U (ft. The Knocks).mp3"),
#              audio_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/Lemaitre+-+We+Got+U+(ft.+The+Knocks).mp3",
#              image: File.open("app/assets/images/fifa.jpeg"),
#              image_url: "https://s3.amazonaws.com/acoustic-nimbus-fileupload-dev/fifa.jpeg")
