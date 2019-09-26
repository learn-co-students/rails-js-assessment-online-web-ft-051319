class Post {
  constructor({id, title, body, author}) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.div = document.createElement('div')
    this.div.className = "post"
    this.author = author;
  }

  render() {

    this.div.innerText=`Author Username: ${this.author.username}\nTitle: ${this.title}\nBody: ${this.body}\n\n`

    return this.div
  }
}
