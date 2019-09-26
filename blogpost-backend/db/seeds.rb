# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Author.delete_all
Post.delete_all

superk=Author.create(username: "superk")
lennox=Author.create(username: "lennox")

post1=Post.new(title: "Title 1", body: "The messaging body")
post1.author=superk
post1.save
