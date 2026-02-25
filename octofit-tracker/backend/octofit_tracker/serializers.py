from rest_framework import serializers
from bson import ObjectId
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    class Meta:
        model = User
        fields = ['_id', 'name', 'username', 'email', 'password']


class TeamSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    class Meta:
        model = Team
        fields = ['_id', 'name', 'members']


class ActivitySerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    def get_user(self, obj):
        return str(obj.user_id) if obj.user_id else None

    class Meta:
        model = Activity
        fields = ['_id', 'user', 'type', 'duration', 'date']


class LeaderboardSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    total_calories = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    def get_user(self, obj):
        return str(obj.user_id) if obj.user_id else None

    def get_username(self, obj):
        try:
            return obj.user.username
        except Exception:
            return None

    def get_name(self, obj):
        try:
            return obj.user.name
        except Exception:
            return None

    def get_team(self, obj):
        try:
            user_id = obj.user_id
            team = Team.objects.filter(members=user_id).first()
            return team.name if team else None
        except Exception:
            return None

    def get_total_calories(self, obj):
        try:
            activities = Activity.objects.filter(user=obj.user_id)
            total_duration = sum(a.duration for a in activities)
            # Estimate: 10 calories per minute of activity
            return round(total_duration * 10)
        except Exception:
            return 0

    class Meta:
        model = Leaderboard
        fields = ['_id', 'user', 'username', 'name', 'team', 'score', 'total_calories']


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'duration']
