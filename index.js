
// selectors
const titleInput = document.getElementById("title");
const autherInput = document.getElementById("auther");
const isbnInput = document.getElementById("isbn");
const addNewBookBtn = document.querySelector(".btn");
// classes
class UI{
// add new book - create to DOM - delete book - update book 
constructor(){
addNewBookBtn.addEventListener("click",(e)=>this.addNewBook(e));
this.books = [];
}
addNewBook(e){
e.preventDefault();
const newBook={
    id:new Date().getTime(),
    title:titleInput.value,
    auther:autherInput.value,
    isbn:isbnInput.value,
    
}
this.books.push(newBook);
Storage.saveBook(newBook);
this.createBookListHtml();

}
setApp(){
    this.books = Storage.getAllBooks();
    this.createBookListHtml();
}
createBookListHtml(){
    let result = "";
    this.books.forEach((item)=>{
     result += `<div class="book--item">
     <p>${item.title}</p>
     <p>${item.auther}</p>
     <p>${item.isbn}</p>
     <span class="close" 
       ><img src="./icons/close-box.svg" data-id=${item.id} alt="close icon"
     /></span>
   </div>`;
    });
    const bookList = document.querySelector(".book--items");
    bookList.innerHTML = result;
    titleInput.value = "";
    autherInput.value = "";
    isbnInput.value = "";

    const removeBtns = document.querySelectorAll(".close");
    removeBtns.forEach((btn)=>{
        btn.addEventListener("click",(e)=>this.removeBook(e));
    })
}
removeBook(e){
    const id = Number(e.target.dataset.id);
    Storage.deleteBook(id);
    this.books = Storage.getAllBooks();
    this.createBookListHtml()
}
}

class Storage{
// save book - get all boks - delete book 
static getAllBooks(){
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    return savedBooks;
}
static saveBook(book){
    const savedBooks = [...Storage.getAllBooks()];
    savedBooks.push(book);
    localStorage.setItem("books",JSON.stringify(savedBooks));
}
static deleteBook(id){
    const savedBooks = Storage.getAllBooks();
    const filteredBooks = savedBooks.filter((item)=>item.id != id);
    localStorage.setItem("books",JSON.stringify(filteredBooks));

}
}

document.addEventListener("DOMContentLoaded",()=>{
const ui = new UI();
ui.setApp();
})