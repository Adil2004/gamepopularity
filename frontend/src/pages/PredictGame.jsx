import {useState, useEffect} from "react"
import api from "../api"
import Game from "../components/Game"
import {useNavigate} from "react-router-dom"
import "../styles/Game.css"

function PredictGame() {
    const [game, setGames] = useState([]);
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [developer, setDeveloper] = useState("");
    const [publisher, setPublisher] = useState("");
    const [supported_platforms, setSupportedPlatforms] = useState([]);
    const [age_restriction, setAgeRestriction] = useState(0);
    const [availablePlatforms, setAvailablePlatforms] = useState([]);
    const [languages, setLanguages] = useState("");
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        getPlatforms();
    }, [])

    const getPlatforms = () => {
    api.get("/api/platforms/")
        .then(res => setAvailablePlatforms(res.data))
        .catch(err => console.log(err));
    };

    const PredictGame = async (e) => {
        e.preventDefault();
        const supportedOS = availablePlatforms
        .filter(platform => supported_platforms.includes(platform.id))
        .map(platform => platform.name)
        .join(",");
        const supportedLanguages = languages
        .split(",")
        .map(language => language.trim())
        .join(",");

        const game = {
            Genres: genre,
            developer: developer,
            supported_os: supportedOS,
            supported_languages: supportedLanguages,
            price: price,
            age_restriction: age_restriction,
            Publishers: publisher
        };

        try {
            const response = await api.post("/api/predict/", game);
            setPrediction(response.data);

            

        } catch (err) {
            console.error(err);
        }
    }

    const [editingGameId, setEditingGameId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editGenre, setEditGenre] = useState("");
    const [editDeveloper, setEditDeveloper] = useState("");
    const [editPublisher, setEditPublisher] = useState("");
    const [editSupportedPlatforms, setEditSupportedPlatforms] = useState([]);
    const [editAgeRestriction, setEditAgeRestriction] = useState(0);
    const [editLanguages, setEditLanguages] = useState([]);

    const editGame = (game) => {
        setEditingGameId(game.id);
        setEditName(game.name);
        setEditGenre(game.genre);
        setEditDeveloper(game.developer);
        setEditPublisher(game.publisher);
        setEditSupportedPlatforms(game.supported_platforms_id);
        setEditAgeRestriction(game.age_restriction);
        setEditLanguages(game.language_ids);
    };



    return (
        <div>
            <ul className="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/predict-game/">Predict Game</a></li>
            </ul>   

            <div className="prediction-container">
                <div className="form-section">
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
                            id = "game_genre"
                            name = "game_genre"
                            required
                            onChange = {(e) => setGenre(e.target.value)}
                            value={genre}
                        />
                        <br/>
                        <label htmlFor = "developer">Developer</label>
                        <br/>
                        <input
                            type = "text"
                            id = "game_developer"
                            name = "game_developer"
                            required
                            onChange = {(e) => setDeveloper(e.target.value)}
                            value={developer}
                        />
                        <br/>
                        <label htmlFor = "publisher">Publisher</label>
                        <br/>
                        <input
                            type = "text"
                            id = "game_publisher"
                            name = "game_publisher"
                            required
                            onChange = {(e) => setPublisher(e.target.value)}
                            value={publisher}
                        />
                        <br/>
                        <label htmlFor = "age_restriction">Age Restriction</label>
                        <br/>
                        <input
                            type = "text"
                            id = "game_age_restriction"
                            name = "game_age_restriction"
                            required
                            onChange = {(e) => setAgeRestriction(e.target.value)}
                            value={age_restriction}
                        />
                        <br/>
                        <label htmlFor = "supported_platforms">Supported Platforms</label>
                        <br/>
                        <div className="selection">
                            {availablePlatforms.map(platform => {
                                const isSelected = supported_platforms.includes(platform.id);
                                return (
                                    <button
                                        type="button"
                                        key={platform.id}
                                        className={`option ${isSelected ? "option-selected" : ""}`}
                                        onClick={() => {
                                            setSupportedPlatforms(previous_platforms =>
                                                previous_platforms.includes(platform.id)
                                                    ? previous_platforms.filter(id => id !== platform.id)
                                                    : [...previous_platforms, platform.id]
                                            );
                                        }}
                                    >
                                        {platform.name}
                                    </button>
                                );
                            })}
                        </div>
                        <br/>
                        <label htmlFor = "languages">Languages</label>
                        <br/>
                        <div className="selection">
                            <input
                                required
                                type="text"
                                id="languages"
                                name="languages"
                                placeholder="e.g. English, German, Spanish"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                            />
                        </div>
                        <br/>
                        <br/>
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
                            id="submit_button"
                            value={"Submit"}
                            href="/"
                        />
                    </form>
                </div>
                <div className = "result-section">
                    <h2>Prediction Result</h2>
                    {prediction ? (
                        <>
                            <h3>
                                {prediction.prediction === 1
                                    ? "Will be Popular Game"
                                    : "Will not be Popular Game"}
                            </h3>

                            <p>
                                <strong>Confidence:</strong>{" "}
                                {(prediction.probability * 100).toFixed(2)}%
                            </p>
                        </>
                    ) : (
                        <>
                            <p>
                                After submitting the game details, the prediction result will
                                be displayed here.
                            </p>

                            <p>
                                Note: The prediction is based on a Random Forest algorithm using 50 decision trees.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PredictGame;
