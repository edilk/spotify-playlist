import { TopArtist } from '../topartist/TopArtist';
import { TopTrack } from '../toptrack/TopTrack';
import { User } from '../user/User';
import './home.css';

export const Home = ({onClick}) => {
    return (
        <section className="home-container">
            <User onClick={onClick} />
            <div className='user_preview'>
                <TopArtist />
                <TopTrack />
            </div>
        </section>
    );
}