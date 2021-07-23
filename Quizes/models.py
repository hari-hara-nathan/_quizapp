from django.db import models
import random

def unique_code_generator():
    while True:
        code = random.randint(a=100000,b=999999)
        if Quiz.objects.filter(quiz_id=code).count() == 0:
            break
    return code

# Create your models here.
class Quiz(models.Model):
    quiz_id = models.IntegerField(default=unique_code_generator)
    name = models.CharField(max_length=30)
    created_by =models.CharField(max_length=30)
    category = models.CharField(max_length=40)
    difficulty = models.CharField(max_length=6,default='easy')
    pass_percentage = models.IntegerField(default=35)
    no_of_questions = models.IntegerField(default=10)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_questions(self):
        return self.question_set.all()

    def get_results(self):
        return self.result_set.all()

class Question(models.Model):
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    text = models.CharField(max_length=160)
    correct_answer = models.CharField(max_length=50) 
    incorrect_answers = models.JSONField()

    def __str__(self):
        return self.text
