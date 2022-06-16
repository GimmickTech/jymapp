import {NavLink} from 'react-router-dom'
const Navbar=()=>{
return(
    <div>
        <ul>
            <NavLink to='/about'>
                About
            </NavLink>
            <NavLink to='/profile'>
                Profile
            </NavLink>
        </ul>
    </div>
)
}
export default Navbar