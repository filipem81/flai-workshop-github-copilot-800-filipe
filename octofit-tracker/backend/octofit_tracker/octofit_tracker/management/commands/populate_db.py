from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Cleared existing data.')

        # Create users (superheroes)
        users_data = [
            {'username': 'ironman', 'email': 'ironman@avengers.com', 'password': 'ironman123'},
            {'username': 'spiderman', 'email': 'spiderman@avengers.com', 'password': 'spidey123'},
            {'username': 'thor', 'email': 'thor@avengers.com', 'password': 'thor123'},
            {'username': 'batman', 'email': 'batman@dc.com', 'password': 'batman123'},
            {'username': 'superman', 'email': 'superman@dc.com', 'password': 'superman123'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'password': 'ww123'},
        ]

        users = {}
        for data in users_data:
            user = User(username=data['username'], email=data['email'], password=data['password'])
            user.save()
            users[data['username']] = user
            self.stdout.write(f"Created user: {user.username}")

        # Create teams
        marvel_team = Team(name='Team Marvel')
        marvel_team.save()
        marvel_team.members.add(users['ironman'], users['spiderman'], users['thor'])
        marvel_team.save()
        self.stdout.write(f"Created team: {marvel_team.name}")

        dc_team = Team(name='Team DC')
        dc_team.save()
        dc_team.members.add(users['batman'], users['superman'], users['wonderwoman'])
        dc_team.save()
        self.stdout.write(f"Created team: {dc_team.name}")

        # Create activities
        activities_data = [
            {'username': 'ironman', 'type': 'Running', 'duration': 30.0, 'date': date(2024, 1, 1)},
            {'username': 'spiderman', 'type': 'Cycling', 'duration': 45.0, 'date': date(2024, 1, 2)},
            {'username': 'thor', 'type': 'Swimming', 'duration': 60.0, 'date': date(2024, 1, 3)},
            {'username': 'batman', 'type': 'Running', 'duration': 50.0, 'date': date(2024, 1, 4)},
            {'username': 'superman', 'type': 'Flying', 'duration': 20.0, 'date': date(2024, 1, 5)},
            {'username': 'wonderwoman', 'type': 'Combat Training', 'duration': 90.0, 'date': date(2024, 1, 6)},
        ]

        for data in activities_data:
            activity = Activity(
                user=users[data['username']],
                type=data['type'],
                duration=data['duration'],
                date=data['date']
            )
            activity.save()
            self.stdout.write(f"Created activity: {activity.type} for {data['username']}")

        # Create leaderboard entries
        leaderboard_data = [
            {'username': 'ironman', 'score': 150},
            {'username': 'spiderman', 'score': 200},
            {'username': 'thor', 'score': 250},
            {'username': 'batman', 'score': 300},
            {'username': 'superman', 'score': 350},
            {'username': 'wonderwoman', 'score': 400},
        ]

        for data in leaderboard_data:
            entry = Leaderboard(user=users[data['username']], score=data['score'])
            entry.save()
            self.stdout.write(f"Created leaderboard entry: {data['username']} - {data['score']}")

        # Create workouts
        workouts_data = [
            {
                'name': 'Iron Man Suit Up',
                'description': 'High intensity interval training to suit up faster',
                'duration': 30
            },
            {
                'name': 'Spider-Web Swing',
                'description': 'Upper body strength training for web-slinging',
                'duration': 45
            },
            {
                'name': 'Asgardian Thunder',
                'description': 'Full body power workout inspired by Thor',
                'duration': 60
            },
            {
                'name': 'Bat Cave Circuit',
                'description': 'Stealth and agility circuit training',
                'duration': 50
            },
            {
                'name': 'Man of Steel',
                'description': 'Endurance and strength training like Superman',
                'duration': 75
            },
            {
                'name': 'Amazonian Warrior',
                'description': 'Combat and flexibility training from Themyscira',
                'duration': 90
            },
        ]

        for data in workouts_data:
            workout = Workout(
                name=data['name'],
                description=data['description'],
                duration=data['duration']
            )
            workout.save()
            self.stdout.write(f"Created workout: {workout.name}")

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with test data!'))
