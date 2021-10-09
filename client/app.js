// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static async displayBooks() {
    const books = await Store.getBooks();
    books[0].forEach(book => {
      UI.addBookToList(book)
    })
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Vanish in 3 second
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }
}

// Store Class: Handles Storage
class Store {
  static async getBooks() {
    //GET request to add books to array for UI
    const books = await fetch('/api/getBooks', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());
    return books;
  }

  static async addBook(book) {
    //POST request to add book to database
    await fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        isbn: book.isbn
        // user_id: user_id
      }),
    })
    .then(res => res.json());
  }

  static async removeBook(isbn) {
    await fetch('api/deleteBook', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isbn: isbn })
    })
  }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', e => {
  e.preventDefault();
  //Get input values for title, author, and isbn
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  
  //Validate user input
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger')
  } else {
    
  
      const book = new Book(title, author, isbn)

      //Add book to table in UI
      UI.addBookToList(book);

      //Add book to database
      const newBook = Store.addBook(book);  

      if(newBook) {
      //Show success alert
      UI.showAlert('Book added', 'success');

      //Clear input fields
      UI.clearFields();

      } else {
      UI.showAlert('An error occurred', 'danger');
      }
  }
});

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //Remove book from UI
  UI.deleteBook(e.target);

  //Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show success alert
  UI.showAlert('Book removed', 'success');
});