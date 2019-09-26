class AuthorsController < ApplicationController
  # controllers for index and show
  def index
    authors = Author.all
    render json: authors
  end
  # controller for show
  def show
    author = Author.find(params[:id])
    render json: author
  end

end
