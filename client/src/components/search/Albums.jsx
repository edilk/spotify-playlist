export const Albums = ({albums}) => {

    console.log(albums);
    return (
        <div className="albums-container">
            <h1>Albums</h1>
            <div className="albums">
                {
                    albums.map((item, i) => {
                        return (
                            <div key={i} className="album-details">
                                <img src={item.images[1].url} alt={item.name} />
                                <div className="albums_name">
                                    <span>{item.name}</span>
                                </div>
                                <div className="albums_releasedate">
                                    <span>{item.release_date.substring(0, 4)} 
                                        &nbsp;·&nbsp;&nbsp;
                                        {item.artists[0].name}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}