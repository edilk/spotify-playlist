import { FaUserAlt } from "react-icons/fa";

export const Artist = ({artists}) => {

    console.log(artists);

    return (
        <div className="artists-container">
            <h1>Artists</h1>
            <div className="artists">
                {
                    artists === null || artists === undefined ? 
                    <div>
                        <h2>Not found</h2>
                    </div> :
                    artists.map((item, i) => {
                        return (
                            <div className="artist-item">
                                <div>
                                { item.images[2] === null || item.images[2] === undefined ?
                                <FaUserAlt className="no-artist-img"/> :
                                
                                <img src={item.images[2].url} alt={item.name} /> }
                                </div>
                                <h2>{item.name}</h2>
                                <button>Follow</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}