// Adapter class: the heart of the app...contains functions for getting authors,
// getting posts, posting new posts and rendering authors

class Adapter {
  constructor(url) {
    this.baseUrl = url
    this.postUrl = url + "/posts"
    this.posts = []
    this.mainSection = document.querySelector('main')
  //  let userLabel = document.createElement('p')
    //this.authorForm=document.querySelector('author-form')

    let userLabel= document.querySelector('#user-label')
    userLabel.innerText="User:"
    this.inputSection = document.querySelector('#post-submit');

    this.titleLabel=document.createElement('p');

    this.titleLabel.innerText="Title/Subject:"
    this.titleBox=document.createElement('input')
    this.titleBox.setAttribute('class', 'postTitle')
    //let authorIdBox = document.createElement('input')
    //authorIdBox.setAttribute('class', 'authorInput')
    this.bodyLabel=document.createElement('p')
    this.bodyLabel.innerText="Body:"
    this.textBox=document.createElement('textarea')
    let myBr = document.createElement('br')

    this.submitBtn = document.createElement('button')
  //  this.inputSection.appendChild(submitBtn)
    // let divSection = document.createElement('div')
    // divSection.setAttribute('class', 'display-posts')
    this.postCollection = document.querySelector("#display-posts")
  //  debugger;
    this.submitBtn.setAttribute('class', 'submit-btn')
    this.submitBtn.innerText= 'Submit'
    this.authorSelect = document.querySelector('select')

    this.inputSection.append(this.titleLabel, myBr, this.titleBox, myBr,this.bodyLabel,myBr,this.textBox, myBr, this.submitBtn)
    this.submitBtn.addEventListener('click', this.submitBtnhandler)



  }
  // function for handling submit button events
  submitBtnhandler = (event) => {
    // prevent a refresh (which is the defualt event)
    event.preventDefault()
    // read which author ID is selected
    this.selectElem=document.querySelector('select')
    // set object for posting
    let postObj= {
      title: this.titleBox.value,
      body: this.textBox.value,
      author_id: parseInt(this.selectElem.value)
    }
    // post the post Object
    this.postPost(postObj)
  }

  // fetch the author list from the backend server
  getAuthors()  {
    // created object variable for fetch call
      let fetchObject={
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
      //return the fetch, and use .then to take what was fetched (a list of authors)
      // to render the select menu.
      return fetch(this.baseUrl+"/authors", fetchObject)
        .then(resp => resp.json())
        .then(resp => this.renderAuthors(resp))
    }

  // fetch the posts from the backend server

  getPosts() {
    // set the postUrl by appending /posts suffix to original URL
    let postUrl = `${this.baseUrl}/posts`

    // fetch to get all posts from backend server, use .then to create a new post object
    return fetch(postUrl)
    .then (res => res.json())
    .then (postArray=> postArray.forEach(post=> {
      // create new Post object for each post in array, then push the post onto the this.posts array
        let newPost = new Post(post)
        this.posts.push(newPost)

      }))
    .then(this.renderPosts)

  }
  // post Post to the backend
  postPost(postObj) {
    // create a fetchObject for
    let fetchObject = {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify (postObj)
    }
    fetch(this.postUrl, fetchObject)
      .then (resp => resp.json())
      .then (postObj => this.posts.push(new Post (postObj)))
      .then (this.renderPosts)

  }
  // render Authors into a select menu
  renderAuthors(resp)  {
    var mainSection = document.querySelector('main')
    let selectElem = document.createElement('select')
    //console.log(resp)
    resp.forEach(author => {
        var optionRow=document.createElement("option")
        optionRow.setAttribute('value', author.id)
        optionRow.innerText=author.username

        selectElem.appendChild(optionRow)
    })
    // debugger;
    mainSection.append(selectElem)

  }
  // no argument object function for rendering posts
  renderPosts = () => {
    // initialize the innerHTML property for the section of HTML for displaying posts
    this.postCollection.innerHTML = ``
//    console.log(this.posts)
    // for each post in the posts array, render that post and append the rendered result to the
    // section of the page for displaying posts.
    this.posts.forEach(post => {

      this.postCollection.appendChild(post.render())

    })
      //console.log(this.postCollection)
  }
}

// function renderPostList() {
//   let fetchObject={
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     }
//   }
//   fetch(POSTURL, fetchObject)
//     .then(resp => resp.json())
//     .then(resp => renderPosts(resp))
// }
//
//

// create new instance of Adapter object

let adapter = new Adapter("http://localhost:3000")
// get the Authors (create the select list)
adapter.getAuthors()
// get the posts
adapter.getPosts();
