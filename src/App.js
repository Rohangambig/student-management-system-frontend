import React from 'react';
import { BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import Home from './Page/Home';
import AddStudent from './Page/AddStudent'
import Update from './Page/Update';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/add' element={<AddStudent></AddStudent>}></Route>
        <Route path='/edit/:id' element={<Update></Update>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
