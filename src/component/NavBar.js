import '../Styles/NavBar.css';
import {Link} from 'react-router-dom'

function Index() {
    return (
       <ul className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/add'>Add</Link>
            {/* < */}
       </ul>
    )
}

export default Index;