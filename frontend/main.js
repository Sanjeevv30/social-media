document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');

    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookName = document.getElementById('bookName').value;

        try {
            const response = await axios.post('/add-book', { bookName });
            console.log(response.data);
            displayBooks();
        } catch (error) {
            console.error(error);
        }
    });

    async function displayBooks() {
        try {
            const response = await axios.get('/books');
            const books = response.data;
            bookList.innerHTML = '';
            books.forEach((book) => {
                const li = document.createElement('li');
                li.textContent = `${book.name} - Due: ${book.dueDate}`;
                bookList.appendChild(li);
            });
        } catch (error) {
            console.error(error);
        }
    }

    displayBooks();
});
