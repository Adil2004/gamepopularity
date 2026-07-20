import joblib
import pandas as pd
import os
from api.ml.transformers import GameAgeTransformer

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, "game_prediction_pipeline.pkl")

def predict_game(game):
    model = joblib.load(MODEL_PATH)

    data_frame = pd.DataFrame([game])

    df = GameAgeTransformer().fit_transform(data_frame)
    df["age_restriction"] = df["age_restriction"].astype(int)

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df)[0]

    return {
        "prediction": int(prediction),
        "probability": float(max(probability))
    }