class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts, include: [:author]

  end

  def show
    post = Post.find(params[:id])
    render json:post, include: [:author]
  end

  def create
    post = Post.new(author_id: params[:author_id], title: params[:title], body: params[:body])

    post.save
    render json:post, include: [:author]
  end

end
