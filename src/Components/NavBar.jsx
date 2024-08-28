import * as React from 'react';
import AuthProfile from "./AuthProfile.jsx";
import ProfileButton from "./ProfileButton.jsx";
import { Link, useLocation } from 'react-router-dom';
import HomeImage from '../img/home.png'
import "../Style/NavBar.css";
import ShuffleButton from './ShuffleButton.jsx';

//NavBar with login button and profile button.
export default function NavBar() {
    //Define ProfileButto to navigates to the profile page.
    const content = [
        { name: <ProfileButton/>, href: "./Profile", type: "link" },
        { name: 'Badmovies', href: "./BadMovies", type: "button", className: "navbarbutton" },
        // { name: <ShuffleButton/>, type: "div"},
    ];
    // Get the current location
     const location = useLocation();
    return (
        <div id="body">
            <div className='nav-section'>
                <div className='nav-section'>
                <div className="nav-links">
                    {content && content.map(item => (
                      <div key={item.name} className={'nav-item'}>
                      {item.type === "link" ? (
                          <a href={item.href}>{item.name}</a>
                      ) : (
                          <button className={item.className} onClick={() => window.location.href = item.href}>{item.name}</button>
                      )}
                  </div>
                    ))}
                    <div className="nav-item">
                        <ShuffleButton/>
                    </div>
                </div>
            </div>
        </div>

        {/* Check if current location matches '/Profile and implements a frontpage button on the profile page'*/}

            <div id="page" className='nav-section'>
                {location.pathname !== '/Frontpage' && (
                    <div className="nav-item">
                        <Link to="/Frontpage">
                                <button ><img src={HomeImage} alt="Home" className="home-img" /></button>
                        </Link>
                    </div>
                )}

            </div>
            <div className='nav-item'>
                <AuthProfile/>
            </div>
        </div>
    );
}
