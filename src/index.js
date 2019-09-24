const POSTURL = "http://localhost:3000/posts"
const AUTHORURL= "http://localhost:3000/authors"



let mainSection = document.querySelector('main')
let userLabel = document.createElement('p')
  userLabel.setAttribute('class','user-label')
  userLabel.innerText="User:"
let inputSection = document.createElement('p');
  //var   selectElem=document.createElement("select")
  buildAuthorList()
/*let postTitle=document.createElement('h3');
*/
let titleLabel=document.createElement('p')
titleLabel.innerText="Title/Subject:"
let titleBox=document.createElement('input')
titleBox.setAttribute('class', 'postTitle')
//let authorIdBox = document.createElement('input')
//authorIdBox.setAttribute('class', 'authorInput')
let bodyLabel=document.createElement('p')
bodyLabel.innerText="Body:"
let textBox=document.createElement('textarea')
let myBr = document.createElement('br')

let submitBtn = document.createElement('button')
let divSection = document.createElement('div')
divSection.setAttribute('class', 'display-posts')
submitBtn.setAttribute('class', 'submit-btn')
submitBtn.innerText= 'Submit'

inputSection.append(titleLabel, myBr, titleBox, myBr, bodyLabel,myBr,textBox, myBr)
mainSection.append(userLabel, inputSection, submitBtn, divSection)
renderPostList()
// let selectElem = document.querySelector('select')

//
// let username = "superk"

submitBtn.addEventListener('click',function(e)  {
  e.preventDefault();
  let selectResult=document.querySelector('select')
  var authorId=parseInt(selectResult.value);

  var subject = titleBox.value;
  var boxContents = textBox.value;
  postBlog(authorId,subject, boxContents)
  titleBox.value = ""
  textBox.value=""
})

function postBlog (authorId, subject, boxContents) {
  let fetchObject = {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify ({
    "author_id": authorId,
    "title": subject,
    "body": boxContents })
  }
  fetch(POSTURL, fetchObject)
    .then (resp => resp.json())
    .then (post => {
      let displaySection=document.querySelector('div.display-posts')
      let postLi=document.createElement('p')
      postLi.innerText=`Author Username: ${post.author.username}\nTitle: ${post.title}\nBody: ${post.body}`
      displaySection.append(postLi)
    })
}


function buildAuthorList() {
  let fetchObject={
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  fetch(AUTHORURL, fetchObject)
    .then(resp => resp.json())
    .then(resp => renderAuthors(resp))
}

function renderAuthors(resp) {
  var mainSection = document.querySelector('main')
  let selectElem = document.createElement('select')

  resp.forEach(author => {
      optionRow=document.createElement("option")
      optionRow.setAttribute('value', author.id)

      optionRow.innerText=author.username

      selectElem.appendChild(optionRow)
  })
  // debugger;
  mainSection.append(selectElem)

}

function renderPostList() {
  let fetchObject={
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
  fetch(POSTURL, fetchObject)
    .then(resp => resp.json())
    .then(resp => renderPosts(resp))
}

function renderPosts(postArray) {
  /*
  let ul=document.createElement('ul')
  */

  postArray.forEach(post=> {
    let displaySection=document.querySelector('div.display-posts')

    let postP=document.createElement('p')

    postP.innerText=`Author Username: ${post.author.username}\nTitle: ${post.title}\nBody: ${post.body}\n\n`

    displaySection.append(postP)
  })



}
