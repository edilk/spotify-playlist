const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const CLIENT_ID = '181842b370ba40c4b78c6ebb9ddad7fa';
const CLIENT_SECRET = 'df2e6789eee248d0ab89ed99669fa8d3';
const REDIRECT_URI = 'http://localhost:8888/callback';
const FRONTEND_URI = 'http://localhost:3000';

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', (req, res) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // application requests authorization
    const scope =  'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';
    
    res.redirect(
        `https://accounts.spotify.com/authorize?${querystring.stringify({
          response_type: 'code',
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
          state: state,
        })}`,
    );
});

app.get('/callback', (req, res) => {

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token;
                const refresh_token = body.refresh_token;

                res.redirect(
                    `${FRONTEND_URI}/#${querystring.stringify({
                      access_token,
                      refresh_token,
                    })}`,
                  );
            } else {

                res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
            }
        })
    }
});

app.get('/refresh_token', (req, res) => {

    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
              'base64',
            )}`,
          },
        form: {
            grant_type: 'refresh_token',
            refresh_token,
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(8888, () => {console.log('Listening on port 8888')});