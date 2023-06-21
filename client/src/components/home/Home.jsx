import { User } from '../user/User';
import './home.css';

export const Home = ({onClick}) => {
    return (
        <section className="home-container">
            <User onClick={onClick} />
        </section>
    );
}