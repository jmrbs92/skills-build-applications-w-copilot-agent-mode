from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models


from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create teams
        teams = [
            {'name': 'Marvel', 'description': 'Team Marvel Superheroes'},
            {'name': 'DC', 'description': 'Team DC Superheroes'}
        ]
        db.teams.insert_many(teams)

        # Create users
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'}
        ]
        db.users.insert_many(users)
        db.users.create_index([('email', 1)], unique=True)

        # Create activities
        activities = [
            {'user': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user': 'batman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user': 'wonderwoman@dc.com', 'activity': 'Yoga', 'duration': 50}
        ]
        db.activities.insert_many(activities)

        # Create leaderboard
        leaderboard = [
            {'user': 'spiderman@marvel.com', 'points': 100},
            {'user': 'ironman@marvel.com', 'points': 90},
            {'user': 'batman@dc.com', 'points': 95},
            {'user': 'wonderwoman@dc.com', 'points': 98}
        ]
        db.leaderboard.insert_many(leaderboard)

        # Create workouts
        workouts = [
            {'user': 'spiderman@marvel.com', 'workout': 'Pushups', 'reps': 50},
            {'user': 'ironman@marvel.com', 'workout': 'Situps', 'reps': 40},
            {'user': 'batman@dc.com', 'workout': 'Pullups', 'reps': 30},
            {'user': 'wonderwoman@dc.com', 'workout': 'Squats', 'reps': 60}
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
