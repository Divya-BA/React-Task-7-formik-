import React from 'react'
import Card from 'react-bootstrap/Card';



function BookList({book,onDelete,onEdit}) {
    const handleEdit = () => {
        onEdit(book);
        onDelete(book.id);
      };
    const handleDelete = () => {
        
        onDelete(book.id);
      };
  return (
    <Card style={{ width: '20rem' }}>
              <Card.Body>
                <Card.Text>Title:{book.title}</Card.Text>
                <Card.Text>Author:{book.author}</Card.Text>
                <Card.Text>ISBN Number:{book.isbn}</Card.Text>
                <Card.Text>Publication Date:{book.date}</Card.Text>
                <button className='edit'  onClick={handleEdit}>Edit</button>
                <button className='delete'  onClick={handleDelete}>Delete</button>
              </Card.Body>
            </Card>
  )
}

export default BookList