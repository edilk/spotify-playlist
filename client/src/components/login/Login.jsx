import './login.css';

export const Login = () => {

    console.log('LOGIN_URL:' + process.env.LOGIN_URL);

    return (
        <section className="login">
            <h1>Spotify Playlist</h1>
            <a href={`http://localhost:8888/login`}>Log in to spotify</a>
        </section>
    );
}