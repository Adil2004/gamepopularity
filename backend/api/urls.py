from django.urls import path
from .views import predict, DashboardView, GameListCreateView, LanguageListView, PlatformListView

urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("games/", GameListCreateView.as_view(), name="game-list-create"),
    path("languages/", LanguageListView.as_view(), name="language-list-create"),
    path("platforms/", PlatformListView.as_view(), name="platform-list-create"),
    path("predict/", predict, name="predict"),
]