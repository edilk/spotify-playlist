import { Albums } from "./Albums";
import { Artist } from "./Artist";
import { Songs } from "./Songs";

export const All = ({result}) => {
    return (
        <>
            { result && result.tracks && result.tracks.items ? <Songs tracks={result.tracks.items} /> : <></>}
            { result && result.artists && result.artists.items ? <Artist artists={result.artists.items} /> : <></>}
            { result && result.albums && result.albums.items ? <Albums albums={result.albums.items} /> : <></>}
        </>
    );
}