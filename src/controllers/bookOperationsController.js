const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Issue a book
exports.bookIssue = async(req, res) => {
    try {
        const { email, bookId } = req.body;
        // find book
        const book = await Book.findOne({bookId});
        if(!book || !book.available) {
            return res.status(400).json({message: 'Book is not available'});
        }
        // find user
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }

        // book issue operations
        book.issuedTo = user._id;
        book.available = false;
        book.dueDate = new Date(Date.now() + 14*24*60*60*1000);
        user.issuedBooks.push(book._id);

        // update the book and user
        await book.save();
        await user.save();

        res.status(200).json({message: 'Book issued successfully'})
        
    } catch (err) {
        res.status(400).send(err);
    }
}


// Return Book
exports.bookReturn = async (req, res) => {
    try {
        const {email, bookId} = req.body;
        const book = await Book.findOne({ bookId });
        const user = await User.findOne({ email });

        if (!user || String(book.issuedTo) !== String(user._id)) {
            return res.status(400).json({ message: 'Book was not issued to this member' });
        }

        book.issuedTo = null;
        book.available = true;
        book.dueDate = null;
        user.issuedBooks = user.issuedBooks.filter(id => String(id) !== String(book._id));

        await book.save();
        await user.save();

        return res.status(200).json({ message: 'Book Return successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
}

// Book Renew
exports.bookRenew = async(req, res) => {
    try {
        const { email, bookId } = req.body;
        const book = await Book.findOne({bookId});
        const user = await User.findOne({email});

        if (!user || String(book.issuedTo) !== String(user._id)) {
            return res.status(400).json({ message: 'Book was not issued to this member' });
        }

        book.dueDate = new Date(Date.now() + 14*24*60*60*1000);

        await book.save();

        res.status(200).json({message: 'Book re-issued successfully'})
        
    } catch (err) {
        res.status(400).send(err);
    }
}

// Reserve a book
exports.bookReserve = async (req, res) => {
    try {
        const { email, bookId } = req.body;
        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // find book availeble to reserve
        const book = await Book.findOne({ bookId });
        if (!book.available && book.issuedTo && String(book.issuedTo) === String(user._id)) {
            return res.status(400).json({ message: 'Book is already issued to this member' });
        }

        if (book.reservedBy.includes(user._id)) {
            return res.status(400).json({ message: 'Book is already reserved by this member' });
        }

        book.reservedBy.push(user._id);
        user.reservedBooks.push(book._id);

        await book.save();
        await user.save();

        res.status(200).json({ message: 'Book reserved successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
}