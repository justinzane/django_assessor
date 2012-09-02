from django.db import models
from django.contrib.auth.models import User
import json


class Category(models.Model):
    '''
    The category of assessment question.
    '''

    name = models.CharField(max_length=24, blank=False)
    desc = models.TextField(default='No description provided')
    created_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='category_creator',
                                   on_delete=models.SET_NULL)
    updated_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='category_editor',
                                   on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        if not self.created_at:
            ca = " None               "
        else:
            ca = self.created_at.isoformat()
        if not self.created_by:
            cb = "None"
        else:
            cb = self.created_by.username
        if not self.updated_by:
            ub = "None"
        else:
            ub = self.updated_by.username
        if not self.updated_at:
            ua = " None               "
        else:
            ua = self.updated_at.isoformat()
        return (json.dumps({'id': self.pk,
                            'text': self.name,
                            'desc': self.desc,
                            'created_by': cb,
                            'updated_by': ub,
                            'created_at': ca,
                            'updated_at': ua,
                            }, indent=4))


class Question(models.Model):
    '''
    An assessment question.
    text: The actual question presented to the user.
          E.g. "The sky is which color?"
    explanation: An explanation of why the logic behind the question.
                 E.g. "Blue light is scattered by the air."
    '''

    text = models.TextField()
    explanation = models.TextField()
    category = models.ForeignKey(Category,
                                 blank=True,
                                 null=True,
                                 related_name='question_category',
                                 on_delete=models.SET_NULL)
    created_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='question_creator',
                                   on_delete=models.SET_NULL)
    updated_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='question_editor',
                                   on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True,
                                   blank=True,
                                   null=True)
    updated_at = models.DateTimeField(auto_now=True,
                                   blank=True,
                                   null=True)

    def __unicode__(self):
        if not self.created_at:
            ca = " None               "
        else:
            ca = self.created_at.isoformat()
        if not self.created_by:
            cb = "None"
        else:
            cb = self.created_by.username
        if not self.updated_by:
            ub = "None"
        else:
            ub = self.updated_by.username
        if not self.updated_at:
            ua = " None               "
        else:
            ua = self.updated_at.isoformat()
        return (json.dumps({'id': self.pk,
                            'text': self.text,
                            'explanation': self.explanation,
                            'created_by': cb,
                            'updated_by': ub,
                            'created_at': ca,
                            'updated_at': ua,
                            }, indent=4))


class Choice(models.Model):
    '''
    A possible choice (answer) presented to the user.
    text: The choice. E.g. "Blue"
    is_correct: Duh. E.g. True
    question: The question that this choice is related to.
    '''

    text = models.TextField()
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question)
    created_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='choice_creator',
                                   on_delete=models.SET_NULL)
    updated_by = models.ForeignKey(User,
                                   blank=True,
                                   null=True,
                                   related_name='choice_editor',
                                   on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True,
                                   blank=True,
                                   null=True)
    updated_at = models.DateTimeField(auto_now=True,
                                   blank=True,
                                   null=True)

    def __unicode__(self):
        if not self.created_at:
            ca = " None               "
        else:
            ca = self.created_at.isoformat()
        if not self.created_by:
            cb = "None"
        else:
            cb = self.created_by.username
        if not self.updated_by:
            ub = "None"
        else:
            ub = self.updated_by.username
        if not self.updated_at:
            ua = " None               "
        else:
            ua = self.updated_at.isoformat()
        return (json.dumps({'id': self.pk,
                            'text': self.text,
                            'is_correct': self.is_correct,
                            'question': self.question.pk,
                            'created_by': cb,
                            'updated_by': ub,
                            'created_at': ca,
                            'updated_at': ua,
                            }, indent=4))


class Answer(models.Model):
    '''
    An instance of a user-answer from an assessment.
    '''
    user = models.ForeignKey(User)
    question = models.ForeignKey(Question)
    choice = models.ForeignKey(Choice)
    created_at = models.DateTimeField(auto_now_add=True,
                                   blank=True,
                                   null=True)

    @classmethod
    def question_counts(cls):
        counts = {}
        for q in Question.objects.all():
            counts[q.pk] = cls.objects.filter(question__id=q.pk).count()
        return counts

    def __unicode__(self):
        if not self.created_at:
            ca = " None               "
        else:
            ca = self.created_at.isoformat()
        return(json.dumps({'id': self.pk,
                           'user_id': self.question.pk,
                           'question_id': self.question.pk,
                           'choice_id': self.choice.pk,
                           'created_at': ca,
                           }, indent=4))
