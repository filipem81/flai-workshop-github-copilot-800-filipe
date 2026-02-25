from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='ironman',
            email='ironman@avengers.com',
            password='ironman123'
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'ironman')
        self.assertEqual(self.user.email, 'ironman@avengers.com')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'ironman')


class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='spiderman',
            email='spiderman@avengers.com',
            password='spidey123'
        )
        self.team = Team.objects.create(name='Team Marvel')
        self.team.members.add(self.user)

    def tearDown(self):
        Team.objects.all().delete()
        User.objects.all().delete()

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Marvel')

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='thor',
            email='thor@avengers.com',
            password='thor123'
        )
        self.activity = Activity.objects.create(
            user=self.user,
            type='Running',
            duration=30.0,
            date=date(2024, 1, 1)
        )

    def tearDown(self):
        Activity.objects.all().delete()
        User.objects.all().delete()

    def test_activity_creation(self):
        self.assertEqual(self.activity.type, 'Running')
        self.assertEqual(self.activity.duration, 30.0)

    def test_activity_str(self):
        self.assertIn('thor', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='batman',
            email='batman@dc.com',
            password='batman123'
        )
        self.entry = Leaderboard.objects.create(user=self.user, score=300)

    def tearDown(self):
        Leaderboard.objects.all().delete()
        User.objects.all().delete()

    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.score, 300)

    def test_leaderboard_str(self):
        self.assertIn('batman', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Bat Cave Circuit',
            description='Stealth and agility circuit training',
            duration=50
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Bat Cave Circuit')
        self.assertEqual(self.workout.duration, 50)

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Bat Cave Circuit')


class APIEndpointTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='superman',
            email='superman@dc.com',
            password='superman123'
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_users_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_teams_list(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activities_list(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_leaderboard_list(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_workouts_list(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
