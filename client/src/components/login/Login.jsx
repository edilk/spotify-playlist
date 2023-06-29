import './login.css';

export const Login = () => {

    return (
        <section className="login">
            <h1>Spotify Playlist</h1>
            <a href={`${process.env.LOGIN_URL}`}>Log in to spotify</a>
        </section>
    );
}