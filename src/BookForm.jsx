import React,{ useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import BookList from './BookList';




const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length > 10) {
      errors.title = 'Must be 15 characters or less';
    }
  
    if (!values.author) {
      errors.author = 'Required';
    } else if (values.author.length > 20) {
      errors.author = 'Must be 20 characters or less';
    }

    if (!values.isbn) {
        errors.isbn = 'Required';
      } else if (values.isbn.length > 10) {
        errors.isbn = 'Must be 10 characters or less';
      }

      if (!values.date) {
        errors.date = 'Required';
      } else if (values.date.length > 10) {
        errors.date = 'Must be 10 characters ';
      }
  
    
  
    return errors;
  };
function BookForm() {
    const formik = useFormik({
        initialValues: {
          title: '',
          author: '',
          isbn: '',
          date:''
        },
        validate,
        onSubmit: async (values) => {
            try {
             
              const response = await axios.post('http://localhost:4000/books', values);
              const newBook = response.data;
      
             
              setBookDetails((prevBookDetails) => [...prevBookDetails, newBook]);
            } catch (error) {
              console.error('Error creating book:', error);
            }
            formik.resetForm();
          },
      });
      useEffect(()=>{
        const get=async()=>{
          const response = await axios.get('http://localhost:4000/books');
              const newBook = response.data;
              console.log(newBook);
              setBookDetails(newBook);
        }
        get();
      },[])
      const [bookDetails, setBookDetails] = useState([]);
      //delete
      const handleDeleteBook = (bookId) => {
       
        setBookDetails((prevBookDetails) =>
          prevBookDetails.filter((book) => book.id !== bookId) 
        );
      };


      const [editMode, setEditMode] = useState(false); 
      const [editedBook, setEditedBook] = useState(null);
      //edit
      const handleEditBook = (book) => {
        setEditMode(true);
        setEditedBook(book);
    
       
        formik.setValues({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          date: book.date,
        });
      };

    

      
  return (
    <>
    <div className="content">
    <form onSubmit={formik.handleSubmit}>
        <div className='form'>
       <label htmlFor="title">Title:</label>
       <input
         id="title"
         name="title"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.title}
       />
       {formik.errors.title ? <div>{formik.errors.title}</div> : null}
       </div>
       <div className='form'>
       <label htmlFor="author">Author:</label>
       <input
         id="author"
         name="author"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.author}
       />
       {formik.errors.author ? <div>{formik.errors.author}</div> : null}
       </div>
       <div className='form'>
       <label htmlFor="isbn">ISBN Number:</label>
       <input
         id="isbn"
         name="isbn"
         type="tel"
         onChange={formik.handleChange}
         value={formik.values.isbn}
       />
       {formik.errors.isbn ? <div>{formik.errors.isbn}</div> : null}
       </div>
       <div className='form'>
       <label htmlFor="date">Publication Date:</label>
       <input
         id="date"
         name="date"
         type="date"
         onChange={formik.handleChange}
         value={formik.values.date}
       />
       {formik.errors.date ? <div>{formik.errors.date}</div> : null}
       </div>
       <div className='submit' >
       <button type="submit" className='submit-button'>Submit</button>
          
       </div>
     </form>
     </div>
     <div className='flex'>
     {Array.isArray(bookDetails) &&
        bookDetails.map((book, index) => (
          <BookList key={index} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook}/>
        ))} 
    </div>
    </>
  )
}

export default BookForm