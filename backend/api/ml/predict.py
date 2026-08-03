import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, "game_prediction_pipeline.pkl")

def predict_game(game):
    model = joblib.load(MODEL_PATH)

    data_frame = pd.DataFrame([game])

    data_frame["age_restriction"] = data_frame["age_restriction"].astype(int)

    prediction = model.predict(data_frame)[0]

    probability = model.predict_proba(data_frame)[0]

    return {
        "prediction": int(prediction),
        "probability": float(max(probability))
    }