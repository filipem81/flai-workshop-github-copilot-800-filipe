from rest_framework import serializers
from bson import ObjectId
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'password']


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

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    def get_user(self, obj):
        return str(obj.user_id) if obj.user_id else None

    class Meta:
        model = Leaderboard
        fields = ['_id', 'user', 'score']


class WorkoutSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField()

    def get__id(self, obj):
        return str(obj._id) if obj._id else None

    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'duration']
