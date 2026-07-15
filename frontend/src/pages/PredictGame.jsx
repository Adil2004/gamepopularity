import {useState, useEffect} from "react"
import api from "../api"
import Game from "../components/Game"
import {useNavigate} from "react-router-dom"

function PredictGame() {
    const [game, setGames] = useState([]);
    const [name, setName] = useState("");
    const [release_date, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [supported_platforms, setSupportedPlatforms] = useState([]);
    const [age_restriction, setAgeRestriction] = useState(0);
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getGames();
        getLanguages();
        getPlatforms();
        setUsername(localStorage.getItem("username"));
    }, [])

    const getLanguages = () => {
    api.get("/api/languages/")
        .then(res => setAvailableLanguages(res.data))
        .catch(err => console.log(err));
    };

    const getPlatforms = () => {
    api.get("/api/platforms/")
        .then(res => setAvailablePlatforms(res.data))
        .catch(err => console.log(err));
    };

    const getGames = () => {
        api
            .get("/api/games/")
            .then((res) => res.data)
            .then((data) => { setGames(data); console.log(data); })
            .catch((err) => alert(err));
    };

    const deleteGame = (id) => {
        api.delete(`/api/games/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("game deleted");
            else alert("Failed to delete game");
            getGames();
        }).catch((error) => alert(error));
    };

    const PredictGame = async (e) => {
        e.preventDefault();
        const supportedOS = availablePlatforms
        .filter(platform => supported_platforms.includes(platform.id))
        .map(platform => platform.name)
        .join(",");
        const supportedLanguages = availableLanguages
        .filter(language => languages.includes(language.id))
        .map(language => language.name)
        .join(",");
        const game = {
            Genres: genre,
            release_date: release_date,
            developer: developer,
            supported_os: supportedOS,
            supported_languages: supportedLanguages,
            price: price,
            age_restriction: age_restriction,
            Publishers: publisher
        };

        try {
            const response = await api.post("/api/predict/", game);

            console.log(response.data);

            alert(
                response.data.prediction === 1
                    ? "Popular Game!"
                    : "Not Popular"
            );

        } catch (err) {
            console.error(err);
        }
    }

    const [editingGameId, setEditingGameId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editReleaseDate, setEditReleaseDate] = useState("");
    const [editGenre, setEditGenre] = useState("");
    const [editDeveloper, setEditDeveloper] = useState("");
    const [editPublisher, setEditPublisher] = useState("");
    const [editSupportedPlatforms, setEditSupportedPlatforms] = useState([]);
    const [editAgeRestriction, setEditAgeRestriction] = useState(0);
    const [editLanguages, setEditLanguages] = useState([]);
    const [availableLanguages, setAvailableLanguages] = useState([]);

    const editGame = (game) => {
        setEditingGameId(game.id);
        setEditName(game.name);
        setEditReleaseDate(game.release_date);
        setEditGenre(game.genre);
        setEditDeveloper(game.developer);
        setEditPublisher(game.publisher);
        setEditSupportedPlatforms(game.supported_platforms_id);
        setEditAgeRestriction(game.age_restriction);
        setEditLanguages(game.language_ids);
    };

    const [username, setUsername] = useState("");



    return (
        <div>
            <ul className="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/predict-game/">Predict Game</a></li>
                <li className = "navbar-logout-li">
                    <a href="/logout/">Logout</a>
                </li>
            </ul>   

            <h1>Game Manager</h1>
            <h2>Welcome, @{username} ! This is the page for predicting game popularity</h2>

            <h2>Predict Game Popularity</h2>
            <form onSubmit = {PredictGame}>
                
                <label htmlFor = "game_name">Game Name</label>
                <br/>
                <input 
                    type = "text" 
                    id = "game_name" 
                    name = "game_name" 
                    required 
                    onChange = {(e) => setName(e.target.value)}
                    value={name}
                />
                <label htmlFor = "genre">Genre</label>
                <br/>
                <input
                    type = "text"
                    id = "genre"
                    name = "genre"
                    required
                    onChange = {(e) => setGenre(e.target.value)}
                    value={genre}
                />
                <br/>
                <label htmlFor = "time">Release Date</label>
                <br/>
                <input
                    type = "date"
                    id = "time"
                    name = "time"
                    required
                    onChange = {(e) => setReleaseDate(e.target.value)}
                    value={release_date}
                />
                <br/>
                <label htmlFor = "developer">Developer</label>
                <br/>
                <input
                    type = "text"
                    id = "developer"
                    name = "developer"
                    required
                    onChange = {(e) => setDeveloper(e.target.value)}
                    value={developer}
                />
                <br/>
                <label htmlFor = "publisher">Publisher</label>
                <br/>
                <input
                    type = "text"
                    id = "publisher"
                    name = "publisher"
                    required
                    onChange = {(e) => setPublisher(e.target.value)}
                    value={publisher}
                />
                <br/>
                <label htmlFor = "age_restriction">Age Restriction</label>
                <br/>
                <input
                    type = "text"
                    id = "age_restriction"
                    name = "age_restriction"
                    required
                    onChange = {(e) => setAgeRestriction(e.target.value)}
                    value={age_restriction}
                />
                <br/>
                <label htmlFor = "supported_platforms">Supported Platforms</label>
                <br/>
               <select
                    multiple
                    value={supported_platforms}
                    onChange={(e) => {
                        const values = Array.from(
                            e.target.selectedOptions,
                            option => Number(option.value)
                        );
                        setSupportedPlatforms(values);
                    }}
                >
                    {availablePlatforms.map(platform => (
                        <option key={platform.id} value={platform.id}>
                            {platform.name}
                        </option>
                    ))}
                </select>
                <br/>
                <label htmlFor = "languages">Languages</label>
                <br/>
                <select
                    multiple
                    value={languages}
                    onChange={(e) => {
                        const values = Array.from(
                            e.target.selectedOptions,
                            option => Number(option.value)
                        );
                        setLanguages(values);
                    }}
                >
                    {availableLanguages.map(language => (
                        <option key={language.id} value={language.id}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor = "price">Price</label>
                <br/>
                <input
                    type = "number"
                    id = "price"
                    name = "price"
                    required
                    onChange = {(e) => setPrice(parseFloat(e.target.value))}
                    value={price}
                    step="0.01"
                    min="0"
                />
                <br/>
                <input
                    type="submit"
                    value={"Submit"}
                    href="/"
                />
            </form>
        </div>
    );
}

export default PredictGame;
