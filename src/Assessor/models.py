from django.db import models
import json, hashlib

class Question(models.Model):
    '''
    An assessment question.
    text: The actual question presented to the user. E.g. "The sky is which color?"
    explanation: An explanation of why the logic behind the question.
                 E.g. "Blue light is scattered by the air."
    '''

    text = models.TextField()
    explanation = models.TextField()

    def __unicode__(self):
        return (json.dumps({'id': self.pk,
                            'text': self.text,
                            'explanation': self.explanation}, indent=4))


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

    def __unicode__(self):
        return (json.dumps({'id': self.pk,
                            'text': self.text,
                            'is_correct': self.is_correct,
                            'question': self.question.pk}, indent=4))


class Answer(models.Model):
    '''
    An instance of a user-answer from an assessment.
    '''
    question = models.ForeignKey(Question)
    choice = models.ForeignKey(Choice)

    @classmethod
    def question_counts(cls):
        counts = {}
        for q in Question.objects.all():
            counts[q.pk] = cls.objects.filter(question__id=q.pk).count()
        return counts

    def __unicode__(self):
        return(json.dumps({'id': self.pk,
                           'question_id': self.question.pk,
                           'choice_id': self.choice.pk}, indent=4))
