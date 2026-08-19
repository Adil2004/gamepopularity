from django.test import TestCase
from .models import Game, Platforms

# Test case for platform model
class PlatformsModelTest(TestCase):

    def test_create_platform(self):
        platform = Platforms.objects.create(name="Windows")

        self.assertEqual(platform.name, "Windows")
        self.assertEqual(str(platform), "Windows")

    def test_platform_name_is_unique(self):
        Platforms.objects.create(name="Windows")

# Test case for game model
class GameModelTest(TestCase):

    def setUp(self):
        self.windows = Platforms.objects.create(name="Windows")
        self.mac = Platforms.objects.create(name="Mac")

        self.game = Game.objects.create(
            name="test_name",
            genre="test_genre",
            developer="test_developer",
            publisher="test_publisher",
            age_restriction=18,
            languages="English, Spanish",
            price=30
        )

        self.game.supported_platforms.add(
            self.windows,
            self.mac
        )

    def test_game_creation(self):
        self.assertEqual(self.game.name, "test_name")
        self.assertEqual(self.game.genre, "test_genre")
        self.assertEqual(self.game.developer, "test_developer")
        self.assertEqual(self.game.publisher, "test_publisher")
        self.assertEqual(self.game.age_restriction, 18)
        self.assertEqual(self.game.languages, "English, Spanish")
        self.assertEqual(self.game.price, 30)

    def test_game_string(self):
        self.assertEqual(str(self.game), "test_name")

    def test_game_platforms(self):
        platforms = self.game.supported_platforms.all()

        self.assertEqual(platforms.count(), 2)
        self.assertIn(self.windows, platforms)
        self.assertIn(self.mac, platforms)

    def test_game_can_have_multiple_platforms(self):
        self.assertEqual(self.game.supported_platforms.count(), 2)

        linux = Platforms.objects.create(name="Linux")
        self.game.supported_platforms.add(linux)

        self.assertEqual(self.game.supported_platforms.count(), 3)

    def test_price(self):
        self.assertEqual(self.game.price, 30)

    def test_age_restriction(self):
        self.assertEqual(self.game.age_restriction, 18)
