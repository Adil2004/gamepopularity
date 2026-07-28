import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import PredictGame from "./pages/PredictGame"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element = {
                <Home />
             
            }
          />
          <Route 
            path = "/predict-game" 
            element={
                <PredictGame />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App