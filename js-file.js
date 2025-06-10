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
    img.classList.add('book-image')
    let info = document.createElement('div');
    info.classList.add('info');
    let options = document.createElement('div');
    let toggle = document.createElement('button');
    toggle.textContent = 'Toggle Read';
    toggle.classList.add('toggle');
    options.appendChild(toggle);
    options.classList.add('options');

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

    const wishList = document.getElementById('want-cards');
    const readList = document.getElementById('read-cards');
    toggle.addEventListener('click', () => {
        const card = toggle.closest('.card');
        if (wishList.contains(card)) {
            readList.appendChild(card);
        } else {
            wishList.appendChild(card);
        }
    })
})

const trash = document.querySelectorAll('.trash');
trash.forEach(can => {
    can.addEventListener('click', function() {
        const card = this.closest('.card');
        card.remove();
    })
})

const toggle = document.querySelectorAll('.toggle');
const wish = document.getElementById('want-cards');
const read = document.getElementById('read-cards');
toggle.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        if (wish.contains(card)) {
            read.appendChild(card);
        } else {
            wish.appendChild(card);
        }
    })
})




