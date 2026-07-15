from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd

class GameAgeTransformer(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = X.copy()

        X["release_date"] = pd.to_datetime(X["release_date"], format ="mixed")

        current_date = pd.Timestamp.today()

        X["game_age_days"] = (
            current_date - X["release_date"]
        ).dt.days

        return X