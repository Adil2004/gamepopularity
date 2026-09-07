import {useState, useEffect} from "react"
import api from "../api"
import Game from "../components/Game"
import "../styles/Home.css"
import {useNavigate} from "react-router-dom"

function Home() {
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [release_date, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const [developer, setDeveloper] = useState("");
    const navigate = useNavigate();

    const createGame = (e) => {
        e.preventDefault();
        api.post("/api/games/", { 
            name, 
            release_date, 
            genre, 
            developer }).then((res) => {
            if (res.status === 201) {
                alert("game created!");
                navigate("/");
            } else {
                console.log(err.response.status);
                console.log(err.response.data);
            }
            getGames();
        }).catch((err) => alert(err));
    }

    const [editingGameId, setEditingGameId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editReleaseDate, setEditReleaseDate] = useState("");
    const [editGenre, setEditGenre] = useState("");
    const [editDeveloper, setEditDeveloper] = useState("");

    const editGame = (game) => {
        setEditingGameId(game.id);
        setEditName(game.name);
        setEditReleaseDate(game.release_date);
        setEditGenre(game.genre);
        setEditDeveloper(game.developer);
    };


    return (
        <div>
            <ul className ="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/predict-game/">Predict Game</a></li>
            </ul>   

            <h1>Game Manager</h1>
            <h2>Welcome! This is the page for predicting the game popularity. </h2>
            <br />
            <h2>In this website, you can enter the game details, such as developer and publisher, genre, language, and more.</h2>
            <h2>After entering the details, the website can predict the game's popularity according to random forest algorithm.</h2>
        </div>
    );
}

export default Home;