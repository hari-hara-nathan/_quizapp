from rest_framework import serializers
from .models import *


class SaveQuiz_serializer(serializers.Serializer):
    name=serializers.CharField(validators=[])
    created_by = serializers.CharField(validators=[])
    category=serializers.CharField(validators=[])
    difficulty=serializers.CharField(validators=[])
    pass_percentage=serializers.IntegerField(max_value=100)
    no_of_questions=serializers.IntegerField(max_value=20)
    questions=serializers.ListField(
        child = serializers.JSONField()
    ,max_length=10)

class quiz_id_serializer(serializers.Serializer):
    quiz_id=serializers.IntegerField()
