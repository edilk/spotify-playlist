import './login.css';

export const Login = () => {

    console.log('LOGIN_URL:' + process.env.LOGIN_URL);

    return (
        <section className="login">
            <h1>Spotify Playlist</h1>
            <a href={`https://spotify-playlist-edil.netlify.app/login`}>Log in to spotify</a>
        </section>
    );
}