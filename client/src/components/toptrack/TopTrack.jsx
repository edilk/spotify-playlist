import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopTracksLong } from "../../spotify";
import './toptrack.css';
import { formatDuration } from "../../utils";


export const TopTrack = () => {

    const [topTrack, setTopTrack] = useState([]);

    useEffect(() => {
        async function fetchTracksAllTime() {

            try {
                const response = await getTopTracksLong();
                setTopTrack(response.data.items);
            } catch (e) {
                console.log(e);
            }
        }

        fetchTracksAllTime();
    }, []);

    console.log(topTrack);

    return (
        <section className="top_artist_and_track_preview">
            <div className="user_preview_heading">
                <h3>Top Tracks of All Time</h3>
                <Link to={'/tracks'} className="see_more_link">See more</Link>
            </div>
            <div className="top_tracks">
                <ul>
                    {
                        topTrack.map((item, i) => {
                            return (
                                <li key={i}>
                                    <div className="album_img">
                                        <img src={item.album.images[2].url} alt={item.album.name} />
                                    </div>
                                    <div className="track_details">
                                        <div>
                                            <span className="track_name overflow-text">{item.name}</span>
                                            <div className="track_artist_album">
                                                <span className="overflow-text">
                                                    {item.artists[0].name} 
                                                    &nbsp;·&nbsp;&nbsp;
                                                    {item.album.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="track_duration">
                                            {formatDuration(item.duration_ms)}
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}