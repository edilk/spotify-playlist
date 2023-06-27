import './search.css';
import '../toptrack/toptrack.css';
import { formatDuration } from '../../utils';

export const Songs = ({tracks}) => {

    return (
        <div className='searched_songs'>
            <h1>Songs</h1>
            <div>
                <ul>
                    {
                        tracks.map((item, i) => {
                            return (
                                <li key={i}>
                                    <div className='album_img'>
                                        <img src={item.album.images[2].url} alt={item.album.name} />
                                    </div>
                                    <div className=''>
                                        <span className='track_name'>{item.name}</span>
                                        <div className='track_artist'>
                                            <span>{item.artists[0].name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span>{item.album.name}</span>
                                    </div>
                                    <div className="track_duration">
                                        {formatDuration(item.duration_ms)}
                                    </div>
                                    <button className='addBtn'>Add</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}