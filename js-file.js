const library = [];

function Book(title, author, haveRead) {
    if (!new.target) {
        throw Error('Must use new keyword when using constructor.');
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.haveRead = haveRead;
    this.show = () => {
        if (this.haveRead) {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, has been read.`)
        } else {
            console.log(`${this.title} by ${this.author}, ${this.pages} pages, has NOT been read.`)
        }
    }
}

function addBookToLibrary(title, author, pages, hasRead) {
    library.push(new Book(title, author, pages, hasRead));
}

function displayLibrary() {
    library.forEach(book => {
        book.show();
    })
}

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // build up the card and content elements
    let card = document.createElement('div');
    card.classList.add('card')
    let img = document.createElement('img');
    let info = document.createElement('div');
    info.classList.add('info')

    // retrieve input information
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const cover = document.getElementById('cover');
    const read = document.getElementById('yes');
    const haveRead = read.checked ? true : false;
    // make the new book object and add it to the global array library
    const newBook = new Book(title.value, author.value, haveRead);
    library.push(newBook);
    
    let titleChild = document.createElement('p')
    let authorChild = document.createElement('p')
    titleChild.textContent = title.value;
    authorChild.textContent = author.value;
    info.appendChild(titleChild);
    info.appendChild(authorChild);

    if (cover.files && cover.files[0]) { // Check if a file was actually selected
        const file = cover.files[0];
        const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
        img.src = imageUrl;
        img.alt = title + ' Cover'; 
    } else {
        img.src = 'images/books.webp';
        img.alt = 'No cover image available';
    }

    card.appendChild(img);
    card.appendChild(info);

    if (haveRead) {
        const haveRead = document.getElementById('read-cards');
        haveRead.appendChild(card);
    } else {
        const wantToRead = document.getElementById('want-cards');
        wantToRead.appendChild(card);
    }
})




