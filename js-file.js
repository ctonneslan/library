class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }
}

class Book {
    constructor(title, author, cover='', haveRead) {
        this.title = title;
        this.author = author;
        this.cover = cover;
        this.haveRead = haveRead;
        this.id = crypto.randomUUID();
    }
}

function screenRenderer() {
    // build up the card and content elements
    const wishList = document.getElementById('want-cards');
    const readList = document.getElementById('read-cards');
    wishList.innerHTML = '';
    readList.innerHTML = '';
    
    library.library.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('card')
        let img = document.createElement('img');
        img.classList.add('book-image')
        let info = document.createElement('div');
        info.classList.add('info');
        let options = document.createElement('div');
        let toggle = document.createElement('button');
        toggle.textContent = 'Toggle Read';
        toggle.classList.add('toggle');
        options.appendChild(toggle);
        options.classList.add('options');
    
        let titleChild = document.createElement('p')
        let authorChild = document.createElement('p')
        titleChild.textContent = book.title;
        authorChild.textContent = book.author;
        info.appendChild(titleChild);
        info.appendChild(authorChild);
        
        img.src = book.cover;
        img.alt = 'Book cover'; 

        card.appendChild(img);
        card.appendChild(info);

        if (book.haveRead) {
            const haveRead = document.getElementById('read-cards');
            haveRead.appendChild(card);
        } else {
            const wantToRead = document.getElementById('want-cards');
            wantToRead.appendChild(card);
        }

        const trash = document.createElement('img');
        trash.classList.add('trash');
        trash.src = 'images/trash.jpg';
        trash.alt = 'Trash Can';
        trash.addEventListener('click', function() {
            const card = this.closest('.card');
            card.remove();
        });
        options.appendChild(trash);
        card.append(options);

        toggle.addEventListener('click', () => {
            const card = toggle.closest('.card');
            if (wishList.contains(card)) {
                readList.appendChild(card);
            } else {
                wishList.appendChild(card);
            }
        })
    })
}

const form = document.getElementById('form');
const library = new Library();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // retrieve input information
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const cover = document.getElementById('cover');
    const read = document.getElementById('yes');
    const haveRead = read.checked ? true : false;
    let newBook;
    // make the new book object and add it to the global array library
    if (cover.files && cover.files[0]) {
        newBook = new Book(title.value, author.value, URL.createObjectURL(cover.files[0]), haveRead);
    } else {
        newBook = new Book(title.value, author.value, 'images/books.webp', haveRead);
    }
    library.addBookToLibrary(newBook);
    screenRenderer();
})

let theRoad = new Book('The Road', 'Cormac McCarthy', 'images/The-road.jpg', false);
let annaKarenina = new Book('Anna Karenina', 'Leo Tolstoy', 'images/anna-karenina-292.jpg', false);
let grapesOfWrath = new Book('The Grapes of Wrath', 'John Steinbeck', 'images/grapes.jpg', true);
let catsCradle = new Book(`Cat's Cradle`, 'Kurt Vonnegut', `images/Cat's_Cradle.jpg`, true);
let bealeStreet = new Book('If Beale Street Could Talk', 'James Baldwin', 'images/IfBealeStreetCouldTalk.jpeg', true);
library.library.push(...[theRoad, annaKarenina, grapesOfWrath, catsCradle, bealeStreet]);
screenRenderer();







