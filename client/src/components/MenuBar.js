import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar(){
    //Bring in Context
    const {user, logout} = useContext(AuthContext)

    //Line below gets the pathname for us.
    const pathname = window.location.pathname
    //Line below SETS the path for us. 
    //It looks at the string: [pathname === url], and if there's only a "/", it will say its home. Otherwise, it will use pathname.substring(1); to determine whatever is the rest of the word, after the "/", and because there's no second parameter, it will get the full word, like register or login.
    const path = pathname === '/' ? 'home' : pathname.substring(1);
    //Line below is our activeItem STATE.
    const [activeItem, setActiveItem] = useState(path)
    
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item
        name={user.username}
        active
        //onClick
        as={Link}
        to="/"
        />
        <Menu.Menu position='right'>
        <Menu.Item
            name='logout'
            onClick={logout}
        />
        </Menu.Menu>
    </Menu>

    ) : (

    <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
        />
        <Menu.Menu position='right'>
        <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
        />
        <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
        />
        </Menu.Menu>
    </Menu>
    )
    return menuBar
}

export default MenuBar;