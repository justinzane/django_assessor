'''
Assessor.api
@updated: on May 14, 2012
@author: justin
@license:  AGPLv3
    Copyright (C) 2012  Justin Chudgar,
    5040 Saddlehorn Rd, Weed, CA 96094
    <justin@justinzane.com>

     is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

     is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.    
'''
from tastypie.resources import ModelResource
from tastypie import fields
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS
#from extendedmodelresource import ExtendedModelResource
from models import *
from django.contrib.auth.models import User

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'

class QuestionResource(ModelResource):
    #choices = fields.ToManyField('Assessor.api.ChoiceResource', 'choice_set', full='id', related_name='choice')
    class Meta:
        queryset = Question.objects.all()
        resource_name = 'question'
        filtering = {'id': ALL}

#
# http://localhost:8000/api/v1/choice/?filter=%5B%7B%22property%22%3A%22question_id%22%2C%22value%22%3A2%7D%5D
# http://localhost:8000/api/v1/choice/?filter=[{"property":"question_id","value":2}]
#
class ChoiceResource(ModelResource):
    question_id = fields.ToOneField('Assessor.api.QuestionResource', 'question', full='id', related_name='question')
    class Meta:
        queryset = Choice.objects.all()
        resource_name = 'choice'
        filtering = {'question_id': ALL_WITH_RELATIONS, 'id':ALL}

class QuizResource(ModelResource):
    #user = fields.ToOneField('Assessor.api.UserResource', 'user', full='id', related_name='user')
    class Meta:
        queryset = Quiz.objects.all()
        resource_name = 'quiz'

class QuizQuestionResource(ModelResource):
    quiz_id = fields.ToOneField('Assessor.api.QuizResource', 'quiz', full='id', related_name='quiz')
    question_id = fields.ToOneField('Assessor.api.QuestionResource', 'question', full='id', related_name='question')
    
    class Meta:
        queryset = QuizQuestion.objects.all()
        resource_name = 'quizquestion'


