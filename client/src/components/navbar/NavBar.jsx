import { NavLink } from "react-router-dom";
import logo from '../../images/spotify-logo.png';
import { GoHome } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';
import { MdQueueMusic } from "react-icons/md";

import { GiMicrophone } from 'react-icons/gi';
import { FaGithub } from 'react-icons/fa';
import { ImMusic } from 'react-icons/im';
import './navbar.css';

export const NavBar = () => {
    return (
        <section className="navigation-bar">
            <div className="nav-logo">
                <NavLink to={'/'}><img src={logo} alt="Spotify logo" /></NavLink>
            </div>
            <ul>
                <li>
                    <NavLink 
                        to={'/'} 
                        className={({isActive}) => isActive ? 'navbar-item navbar-item-active' : 'navbar-item'}>
                            <GoHome className="nav-icon" />
                            <div>Home</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={'/search'} 
                        className={({isActive}) => isActive ? 'navbar-item navbar-item-active' : 'navbar-item'}>
                            <BiSearch className="nav-icon" />
                            <div>Search</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={'/top-artists'} 
                        className={({isActive}) => isActive ? 'navbar-item navbar-item-active' : 'navbar-item'}>
                            <GiMicrophone className="nav-icon"/>
                            <div>Top Artists</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={'/top-tracks'} 
                        className={({isActive}) => isActive ? 'navbar-item navbar-item-active' : 'navbar-item'}>
                            <ImMusic className="nav-icon" />
                            <div>Top Tracks</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={'/playlists'} 
                        className={({isActive}) => isActive ? 'navbar-item navbar-item-active' : 'navbar-item'}>
                            <MdQueueMusic className="nav-icon icon-playlist" />
                            <div>Playlists</div>
                    </NavLink>
                </li>
            </ul>
            <div className="github-link">
                <a href="https://github.com/edilk/spotify-playlist" rel="noreferrer" target="_blank"><FaGithub className="github-icon" /></a>
            </div>
        </section>
    );
}