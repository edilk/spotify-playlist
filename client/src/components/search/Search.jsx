import { BiSearch } from 'react-icons/bi';
import './search.css';
import { useState, useEffect } from 'react';
import { search } from '../../spotify';
import { Songs } from './Songs';
import { Artist } from './Artist';

export const Search = () => {

    const [allButton, setAllButton] = useState(true);
    const [artistsButton, setArtistsButton] = useState(false);
    const [songsButton, setSongsButton] = useState(false);
    const [albumButton, setAlbumButton] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [result, setResult] = useState({});

    function handleClick(e) {
        e.preventDefault();
        const value = e.target.value;

        switch(value) {
            case 'All': {
                setAllButton(true);
                setArtistsButton(false);
                setSongsButton(false);
                setAlbumButton(false);
                break;
            }
            case 'Artists': {
                setAllButton(false);
                setArtistsButton(true);
                setSongsButton(false);
                setAlbumButton(false);
                break;
            }
            case 'Songs': {
                setAllButton(false);
                setArtistsButton(false);
                setSongsButton(true);
                setAlbumButton(false);
                break;
            }
            case 'Albums': {
                setAllButton(false);
                setArtistsButton(false);
                setSongsButton(false);
                setAlbumButton(true);
                break;
            }
            default:
                break;
        }
        console.log(e.target.value);
    }

    useEffect(() => {
        let timeoutId;

        async function fetchSearch() {
            const response = await search(searchString, allButton, artistsButton, songsButton, albumButton);
            setResult(response.data);
        }

        if (searchString) {

            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fetchSearch();
            }, 500)
        } else {
            setResult({});
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchString, allButton, artistsButton, songsButton, albumButton]);

    const showSongsComponent = songsButton && result && result.tracks && result.tracks.items;
    const showArtistComponent = artistsButton && result && result.artists;
    
    return (
        <section className="search_page">
            <form>
                <div className='search_input'>
                    <BiSearch className='search_icon' />
                    <input 
                        type="text" 
                        name='search' 
                        id='search' 
                        placeholder="What do you want to listen to?"
                        onChange={(e) => {
                            setSearchString(e.target.value);
                        }} />
                </div>
                <div className='search_coice_buttons'>
                    <input 
                        type='button' 
                        onClick={handleClick} 
                        value={'All'} 
                        className={`${allButton ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick} 
                        value={'Artists'}
                        className={`${artistsButton ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick}
                        value={'Songs'}
                        className={`${songsButton ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick} 
                        value={'Albums'}
                        className={`${albumButton ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                </div>
            </form>
            <div>
                {showSongsComponent ? <Songs tracks={result.tracks.items} /> : <></>}
                {showArtistComponent ? <Artist artists={result.artists} /> : <></>}
            </div>
        </section>
    );
}