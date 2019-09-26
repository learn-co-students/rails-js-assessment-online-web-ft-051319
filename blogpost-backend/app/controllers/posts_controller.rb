class PostsController < ApplicationController
  # controller for displaying all posts
  def index
    posts = Post.all
    render json: posts, include: [:author]

  end
  #controller for displaying single post

  def show
    post = Post.find(params[:id])
    render json:post, include: [:author]
  end
  # controller for POSTing new post to the server
  def create
    post = Post.new(author_id: params[:author_id], title: params[:title], body: params[:body])

    post.save
    render json:post, include: [:author]
  end

end
