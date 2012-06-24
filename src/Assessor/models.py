from django.db import models
import json, hashlib

class Question(models.Model):
    text = models.TextField()
    explanation = models.TextField()
    
    def __unicode__(self):
        return (json.dumps({'id':self.pk,
                            'text':self.text,
                            'explanation':self.explanation}, indent=4))
    
class Choice(models.Model):
    text = models.TextField()
    is_correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question)
    
    def __unicode__(self):
        return (json.dumps({'id':self.pk,
                            'text':self.text,
                            'is_correct':self.is_correct,
                            'question':self.question.pk}, indent=4))
