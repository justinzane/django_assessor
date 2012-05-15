from django.db import models
#from django.contrib.auth.models import User

class Question(models.Model):
    text = models.TextField()

class Choice(models.Model):
    question = models.ForeignKey(Question)
    text = models.TextField()
    is_correct = models.BooleanField()
    
class Quiz(models.Model):
#    user = models.ForeignKey(User)
    num_questions = models.IntegerField()
    num_correct = models.IntegerField()
    
class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz)
    question = models.ForeignKey(Question)

