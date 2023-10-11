let myLibrary = []; 

function addBookToLibrary(book) {
    myLibrary.push(book)
}

const form = document.getElementById('reader-form');

form.addEventListener('submit', callBackFunction);
    
function callBackFunction(event) {
        event.preventDefault(); 
        const myFormData = new FormData(event.target);
    
        const formDataObj = {}; 
        myFormData.forEach((value, key) => (formDataObj[key] = value));

        addBookToLibrary(formDataObj);
        
        createDisplay();

        form.reset()
}

const Table = document.getElementById("table");

function createDisplay() {
    Table.innerHTML = '';
    
    const Header = document.createElement("tr");
    const Title = document.createElement("th");
    const Author = document.createElement("th");
    const Pages = document.createElement("th");
    const Status = document.createElement("th");
    const Remove = document.createElement("th");

    Header.className = "head";
    
    Title.textContent =  "TITLE";
    Author.textContent = "AUTHOR";
    Pages.textContent = "PAGES";
    Status.textContent = "STATUS";
    Remove.textContent = "REMOVE";

    Header.appendChild(Title);
    Header.appendChild(Author);
    Header.appendChild(Pages);
    Header.appendChild(Status);
    Header.appendChild(Remove);
    Table.appendChild(Header);

    Table.addEventListener("click", respondToClick)
    for (obj of myLibrary) {

        const newRow = document.createElement("tr");
        const tdTitle = document.createElement("td");
        const tdAuthor = document.createElement("td");
        const tdPages = document.createElement("td");
        const tdStatus = document.createElement("td");
        const tdRemove = document.createElement("td");
        const removeButton = document.createElement("button");
        const readUnreadButton = document.createElement("button");

        removeButton.textContent = '🗑️';
        
        readUnreadButton.className = 'read-unread';

        if (obj.read === 'false' || obj.read == false) {
            readUnreadButton.textContent = '❌';
        } else if (obj.read === 'true' || obj.read == true) {
            readUnreadButton.textContent = '✔️';
        }
        
        tdTitle.textContent =  obj.title;
        tdAuthor.textContent = obj.author;
        tdPages.textContent = obj.pages;

        newRow.appendChild(tdTitle);
        newRow.appendChild(tdAuthor);
        newRow.appendChild(tdPages);
        newRow.appendChild(tdStatus);
        newRow.appendChild(tdRemove);
        tdRemove.appendChild(removeButton);
        tdStatus.appendChild(readUnreadButton);
        Table.appendChild(newRow);
    }
};
function respondToClick(e) {
    const targetBook = e.target.parentNode.parentNode.childNodes[0].innerText;

    if (e.target.innerHTML == '🗑️') {
        removeBook(getBookIndex(targetBook));
        createDisplay();
    }
    if (e.target.classList.contains('read-unread')) {
        markReadUnread(getBookIndex(targetBook));
        createDisplay();
    }
}

function getBookIndex(title) {
    if(myLibrary.length === 0 || myLibrary.length === null) {
        return;
    }
    
    for (let book of myLibrary) {
        if (book.title === title) {
            return myLibrary.indexOf(book)
        }
    }
};

function removeBook (index) {
    myLibrary.splice(index, 1); 
};

function markReadUnread(arrayIndex) {
    if (myLibrary[arrayIndex].read == false || myLibrary[arrayIndex].read === 'false') {
        myLibrary[arrayIndex].read = true;
        return;
    } else {
        myLibrary[arrayIndex].read = false;
        return
    }
}