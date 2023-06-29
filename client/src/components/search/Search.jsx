import { BiSearch } from 'react-icons/bi';
import './search.css';
import { useState, useEffect } from 'react';
import { search } from '../../spotify';
import { Songs } from './Songs';
import { Artist } from './Artist';
import { Albums } from './Albums';

export const Search = () => {

    const [activeButton, setActiveButton] = useState('All');
    const [searchString, setSearchString] = useState('');
    const [result, setResult] = useState({});

    function handleClick(e) {
        e.preventDefault();
        const value = e.target.value;
        setActiveButton(value);
        console.log(e.target.value);
    }

    useEffect(() => {
        let timeoutId;

        async function fetchSearch() {
            const response = await search(searchString, activeButton);
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
    }, [searchString, activeButton]);
    
    const showSongsComponent = activeButton === 'Songs' && result && result.tracks && result.tracks.items;
    const showArtistComponent = activeButton === 'Artists' && result && result.artists && result.artists.items;
    const showAlbumsComponent = activeButton === 'Albums' && result && result.albums && result.albums.items;
    
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
                        className={`${activeButton === 'All' ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick}
                        value={'Songs'}
                        className={`${activeButton === 'Songs' ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick} 
                        value={'Artists'}
                        className={`${activeButton === 'Artists' ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                    <input 
                        type='button' 
                        onClick={handleClick} 
                        value={'Albums'}
                        className={`${activeButton === 'Albums' ? 'regular_btn active_choice_btn' : 'regular_btn'}`} />
                </div>
            </form>
            <div>
                {showSongsComponent ? <Songs tracks={result.tracks.items} /> : <></>}
                {showArtistComponent ? <Artist artists={result.artists.items} /> : <></>}
                {showAlbumsComponent ? <Albums albums={result.albums.items} /> : <></>}
            </div>
        </section>
    );
}