from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
import json, random

class Question(models.Model):
    text = models.TextField()
    
    def __unicode__(self):
        return (json.dumps({'id':self.pk,
                            'text':self.text}, indent=4))
            
class Choice(models.Model):
    text = models.TextField()
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question)
    
    def __unicode__(self):
        return (json.dumps({'id':self.pk,
                            'text':self.text,
                            'is_correct':self.is_correct,
                            'question':self.question.pk}, indent=4))

class Quiz(models.Model):
    user = models.ForeignKey(User)
    num_questions = models.PositiveIntegerField()
    num_correct = models.PositiveIntegerField(default=0)
    
    def __unicode__(self):
        return(json.dumps({'id': self.pk,
                           'user': self.user.pk,
                           'num_questions':self.num_questions,
                           'num_correct':self.num_correct}, indent=4))
    
class QuizQuestion(models.Model):
    quiz = models.ForeignKey(Quiz)
    question = models.ForeignKey(Question)
    
    def __unicode__(self):
        return(json.dumps({'id':self.pk,
                           'quiz':self.quiz.pk,
                           'question': self.question.pk}))
    
def create_quiz_questions(**kwargs):
    instance = kwargs['instance']
    num = instance.num_questions
    if num > Question.objects.count():
        num = Question.objects.count()
    
    rand_questions = Question.objects.order_by('?')[:num]
    
    for ques in rand_questions:
        qq = QuizQuestion(quiz=instance, question=ques)
        qq.save()

post_save.connect(create_quiz_questions, sender=Quiz)
