function createBook (titulo, autor, genero, isbn) {
    const timestamp = Date.now();
    return {
        id: timestamp,
        titulo,
        autor,
        genero,
        isbn,
        isAvailable: true,
        borrowedBy: null,
        borrowedAt: null,
        dueDate: null,
        createAt: new Date()

    };
}

function addBookToLibrary(libros, titulo, autor, genero, isbn){
    const nlibro = createBook(titulo, autor, genero, isbn);
    libros.push(nlibro);
    return nlibro;
}

function removeBookFromLibrary(libros, id) {
    const index = libros.findIndex(libros => libros.id === id);
    if (index === -1) return null;
    const removed = libros.splice(index, 1)[0];
    return removed;
}
function borrowBook(libros, borrowedBooks, librosId, borrowerName, dia = 14){
    const libro = libros.find(b = b.id === librosId);

    if (!libro) {
        return { success: false, message: "libro no encontrado", libro: null};

    }

    if (!libro.isAvailable) {
        return { success: false, messege: "libro no disponible", libro};

    }

    const now = new Date ();
    const dueDate = new Date(now.getTime() + dia * 24 * 60 * 60 * 1000 );

    libro.isAvailable = false;
    libro.borrowedBy = borrowerName;
    libro.borrowedAt = now;
    libro.dueDate = dueDate;

    borrowedBooks.set(librosId, libro);

    return {success: true, message: "libro prestado con éxito", libro, dueDate};

}
function returnBook(libros, borrowBooks, librosId){
    const libro = libros.find(b => b.id === librosId);

    if (!libro || borrowBook.isAvailable) {
        return {success: false, massage: "el libro está prestado", finr: 0 };

    }

    const now = new Date();
    const fine = calculateFine(libro.dueDate, 0.5);

    libro.isAvailable = true;
    libro.borrowedBy = null;
    libro.borrowedAt = null;
    libro.dueDate = null;

    borrowedBooks.delete(librosId);
    
    return { success: true, message: "libro devuelto", fine};

}

function calculateFine(dueDate, fineRate = 0.5){
    const now = new Date();
    const latedia = Math.ceil((now - dueDate) / (1000 * 60 * 60 * 24));
    return latedia > 0 ? latedia * fineRate : 0;
}

function searchbook(libros, criteria){
    const lower = criteria.tolewerCase();
    return libros.filter(libro =>
        libro.titulo.tolowerCase().includes(lower)||
        libro.autor.tolowerCase().includes(lower)||
        libro.genero.tolewerCase().includes(lower)

    );
}

function getBooksByGenre(libros, genero) {
    return libros.filter(libro => libro.genero.tolewerCase() === genero.tolewerCase());
}

function getOverDueBooks (borrowedBooks, fineRate = 0.5) {
    const now = new Date();
    const overdue = [];

    borrowedBooks.forEach(libro => {
        if (libro.dueDate && Book.dueDate < now) {
        overdue.push({
            ...book,
            fine: calculateFine(book.dueDate, fineRate)
        });
      }
    });
    return overdue;
}

function generateLibraryReport(libros, borrowedBooks){
    const totalBook = book.length;
    const borrroed = Array.from(borrowedBooks.values());
    const totalFines = overdue.reduce((sum, b) => sum + calculateFine (b.dueDate, 0.5), 0);

    return {
        totalBooks,
        borrowedBooks: borrowedBooks.length,
        availableBooks: totalBooks - borrowedBooks.length,
        getOverDueBooks: overdue.length,
        totalFines
    
    };
}