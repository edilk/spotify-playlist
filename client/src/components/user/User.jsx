import { useEffect, useState } from "react";
import { getFollowing, getPlaylists, getUser, } from "../../spotify";
import { FaUserAlt } from "react-icons/fa";
import './user.css';

export const User = ({onClick}) => {

    const [userData, setUserData] = useState({});
    const [followings, setFollowings] = useState(0);
    const [playlist, setPlaylist] = useState(0);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await getUser();
                setUserData(response.data);
            } catch(e) {
                console.log(e);
            }
        };

        async function fetchUserFollowings() {
            try {
                const response = await getFollowing();
                setFollowings(response.data.artists.total);
            } catch(e) {
                console.log(e);
            }
        }

        async function fetchUserPlaylists() {
            try {
                const response = await getPlaylists();
                setPlaylist(response.data.total);
            } catch (e) {
                console.log(e);
            }
        }

        fetchUserData();
        fetchUserFollowings();
        fetchUserPlaylists();
    }, []);

    console.log(playlist);
    return (
        <div className="user">
            <div className="user_avatar">
                {userData && userData.images && userData.images.length ? (
                    <img src={userData.images[0].url} alt={userData.display_name} />
                    ) : (
                    <FaUserAlt className="no_profile_img" />
                    )}
            </div>
            <div>
                <a href={userData.href}><h1>{userData.display_name}</h1></a>
            </div>
            <div className="user_stat-container">
                    <div className="user_stat">
                        <div className="user_stat_numbers">
                            {(userData && userData.followers && userData.followers.total) ? (userData.followers.total) : '0'}</div>
                        <p>Followers</p>
                    </div>
                    <div className="user_stat">
                        <div className="user_stat_numbers">
                            {followings}
                        </div>
                        <p>Following</p>
                    </div>
                    <div className="user_stat">
                        <div className="user_stat_numbers">
                            {playlist}
                        </div>
                        <p>Playlists</p>
                    </div>
                </div>
                <div className="user_logout">
                    <button onClick={onClick}>Logout</button>
                </div>
        </div>
    );
}