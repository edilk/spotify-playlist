import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtistsLong } from '../../spotify';
import './artist.css';

export const TopArtist = () => {

    const [artistAllTime, setArtistAllTime] = useState([]);

    useEffect(() => {
        async function fetchArtistAllTime() {
            try {
                const response = await getTopArtistsLong();
                setArtistAllTime(response.data.items);
            } catch (e) {
                console.log(e);
            }
        }
        
        fetchArtistAllTime();
    }, []);

    console.log(artistAllTime);
    return (
        <section className="top_artist_and_track_preview">
            <div className="user_preview_heading">
                <h3>Top Artists of All Time</h3>
                <Link to={'artists'} className='see_more_link'>See More</Link>
            </div>
            <div className='top_artist'>
                <ul>
                    {
                        artistAllTime.map((item, i) => {
                            console.log(item);
                            return (
                                <li key={i}>
                                    <Link to={`artist/${item.id}`}>
                                        <img src={item.images[2].url} alt={item.name} />
                                    </Link>
                                    <Link to={`artist/${item.id}`} className='artist_name'>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
    );
}