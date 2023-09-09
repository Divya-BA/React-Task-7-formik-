import React from 'react'
import Card from 'react-bootstrap/Card';



function AuthorList({author,onDelete,onEdit}) {
  const handleEdit = () => {
    onEdit(author);
    onDelete(author.id);
  };
    const handleDelete = () => {
        
        onDelete(author.id);
      };
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Text>Author Name:{author.authorname}</Card.Text>
        <Card.Text>Birth Date:{author.dob}</Card.Text>
        <Card.Text>Short Biography:{author.biography}</Card.Text>
        <button className='edit'  onClick={handleEdit}>Edit</button>
        <button className='delete'  onClick={handleDelete}>Delete</button>
      </Card.Body>
    </Card>
  )
}

export default AuthorList