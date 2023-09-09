import { useState } from 'react'
import { BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom'
import BookForm from './BookForm'
import AuthorForm from './AuthorForm'


function App() {
  
  return (
    <>
      <div>
        <div>
          <h1>Libary Management System</h1>
        </div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link className="a" to="/bookform"><button className='nav-button'>Book Details</button></Link>
                </li>
                <li>
                <Link className="a" to="/authorform"><button className='nav-button'>Author Details</button></Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/bookform" exact Component={BookForm}></Route>
              <Route path="/authorform" exact Component={AuthorForm}></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
