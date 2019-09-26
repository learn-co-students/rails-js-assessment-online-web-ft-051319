class Post {
  constructor({id, title, body, author}) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.div = document.createElement('div')
    this.div.className = "post"
    this.author = author;
    this.favorite = false;
  }

  render() {

    this.div.innerText=`Author Username: ${this.author.username}\nTitle: ${this.title}\nBody: ${this.body}\nFavorite: ${this.favorite}\n`
    this.favoriteBtn = document.createElement('button')
    this.favoriteBtn.setAttribute('class', 'fav-btn')
    this.favoriteBtn.innerText = "Favorite?"
    this.favoriteBtn.addEventListener('click',this.favBtnHandler)
    let pSeparator=document.createElement('p')
    this.div.append(this.favoriteBtn, pSeparator)
    return this.div
  }
  favBtnHandler = (event) => {
    event.preventDefault()
    this.favorite = !this.favorite
    this.render()
  }
}
