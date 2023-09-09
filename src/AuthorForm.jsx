import React ,{ useEffect, useState }from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import AuthorList from './AuthorList';



const validate = values => {
    const errors = {};
    if (!values.authorname) {
      errors.authorname = 'Required';
    } else if (values.authorname.length > 15) {
      errors.authorname = 'Must be 15 characters or less';
    }
  
    if (!values.dob) {
      errors.dob = 'Required';
    } else if (values.dob.length > 10) {
      errors.dob = 'Must be 10 characters or less';
    }

    if (!values.biography) {
        errors.biography = 'Required';
      } else if (values.biography.length > 40) {
        errors.biography = 'Must be 40 characters or less';
      }

    return errors;
  };

function AuthorForm() {
    const formik = useFormik({
        initialValues: {
          authorname: '',
          dob: '',
          biography: '',
        },
        validate,
        onSubmit: async (values) => {
            try {
              
              const response = await axios.post('http://localhost:4000/authors', values);
              const newAuthor = response.data;
      
              setAuthorDetails((prevAuthorDetails) => [...prevAuthorDetails, newAuthor]);
            } catch (error) {
              console.error('Error creating book:', error);
            }
            formik.resetForm();
          },
      });
      useEffect(()=>{
        const get=async()=>{
          const response = await axios.get('http://localhost:4000/authors');
              const newAuthor = response.data;
              console.log(newAuthor);
              setAuthorDetails(newAuthor);
        }
        get();
      },[])
      const [authorDetails, setAuthorDetails] = useState([]);
      //delete
      const handleDeleteAuthor = (authorId) => {
        
        setAuthorDetails((prevAuthorDetails) =>
          prevAuthorDetails.filter((author) => author.id !== authorId) 
        );
      };

      const [editMode, setEditMode] = useState(false); 
      const [editedAuthor, setEditedAuthor] = useState(null);
      //edit
      const handleEditAuthor = (author) => {
        setEditMode(true);
        setEditedAuthor(author);
    
       
        formik.setValues({
          authorname:author.authorname ,
          dob: author.dob,
          biography:author.biography ,
          
        });
      };


  return (
    <>
    <div className="content">
    <form onSubmit={formik.handleSubmit}>
        <div className='form'>
       <label htmlFor="authorname">Author Name:</label>
       <input
         id="authorname"
         name="authorname"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.authorname}
       />
       {formik.errors.authorname ? <div>{formik.errors.authorname}</div> : null}
       </div>
       <div className='form'>
       <label htmlFor="dob">Birth Date:</label>
       <input
         id="dob"
         name="dob"
         type="date"
         onChange={formik.handleChange}
         value={formik.values.dob}
       />
       {formik.errors.dob ? <div>{formik.errors.dob}</div> : null}
       </div>
       <div className='form'>
       <label htmlFor="biography">Biography:</label>
       <input
         id="biography"
         name="biography"
         type="textarea"
         onChange={formik.handleChange}
         value={formik.values.biography}
       />
       {formik.errors.biography ? <div>{formik.errors.biography}</div> : null}
       </div>  
       <div className='submit'>
       <button type="submit" className='submit-button'>Submit</button>
       </div>
     </form>
     </div>
     <div className='flex'>
        {Array.isArray(authorDetails) &&
        authorDetails.map((author, index) => (
          <AuthorList key={index} author={author} onEdit={handleEditAuthor} onDelete={handleDeleteAuthor} />
        ))}

     </div>
     </>
  )
}

export default AuthorForm