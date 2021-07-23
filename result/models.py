from django.db import models
from Quizes.models import Quiz
from account.models import User

# Create your models here.


class Result(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    duration = models.IntegerField()
