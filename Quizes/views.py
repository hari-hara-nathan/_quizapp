from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from account.models import *
from .serializers import *
import random


class SaveQuiz(APIView):
    serializer_class = SaveQuiz_serializer

    def post(self, request, format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            name = serialized.data.get('name')
            author = serialized.data.get('created_by')
            category = serialized.data.get('category')
            difficulty = serialized.data.get('difficulty')
            pass_percentage = serialized.data.get('pass_percentage')
            no_of_questions = serialized.data.get('no_of_questions')

            if Quiz.objects.filter(name=name).exists():
                return Response({'msg': 'This is quiz already taken'}, status=status.HTTP_226_IM_USED)

            quiz = Quiz(name=name, created_by=author, category=category,
                        difficulty=difficulty, pass_percentage=pass_percentage, no_of_questions=no_of_questions)
            quiz.save()
            for question in serialized.data.get('questions'):
                question_ins = Question(quiz=quiz, text=question.get('question'), correct_answer=question.get(
                    'correct_answer'), incorrect_answers=question.get('incorrect_answers'))
                question_ins.save()

            return Response({'msg': 'Quiz was created'}, status=status.HTTP_200_OK)

        return Response({'msg': serialized.errors}, status=status.HTTP_400_BAD_REQUEST)


class TakeQuiz(APIView):
    serializer_class = quiz_id_serializer

    def post(self, request, format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            response = model_to_dict(quiz, fields=[
                                     'name', 'created_by', 'quiz_id', 'category', 'difficulty', 'pass_percentage','no_of_questions'])
            response['questions'] = []
            questions_instance = quiz.get_questions()

            for question in questions_instance:
                dict = model_to_dict(
                    question, fields=['text', 'correct_answer', 'incorrect_answers'])
                incorrect_answers = dict.get('incorrect_answers')
                correct_answer = dict.get('correct_answer')
                incorrect_answers.insert(1, correct_answer)
                random.shuffle(incorrect_answers)
                dict['options'] = incorrect_answers
                dict.pop('incorrect_answers')
                response['questions'].append(dict)

            return Response(response, status=status.HTTP_200_OK)

        return Response({'msg': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class GetQuizes(APIView):
    def get(self, request, format=None):
        response = []
        quizes = Quiz.objects.all()

        if quizes.exists():
            for quiz in quizes:
                dict = model_to_dict(quiz, fields=[
                                     'name', 'created_by', 'no_of_questions', 'quiz_id', 'category', 'difficulty', 'pass_percentage'])
                dict['submissions'] = quiz.get_results().count()
                response.append(dict)

        return Response(response, status=status.HTTP_200_OK)


class GetResult(APIView):

    serializer_class = quiz_id_serializer

    def post(self, request, format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            results = quiz.get_results()
            response = []
            for result in results:
                dict = model_to_dict(result, fields=['score', 'duration'])
                dict['username'] = result.user.username
                response.append(dict)

            return Response(response, status=status.HTTP_200_OK)

        return Response({'msg': 'Invalid request'}, status=status.HTTP_204_NO_CONTENT)


class DeleteQuiz(APIView):
    serializer_class = quiz_id_serializer

    def post(self, request, format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            quiz.delete()
            return Response({'msg': 'quiz was deleted successfully'}, status=status.HTTP_200_OK)

        return Response({'msg': serialized.errors}, status=status.HTTP_400_BAD_REQUEST)
