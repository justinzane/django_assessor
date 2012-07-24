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
from models import Question, Choice, Answer
from django.contrib.auth.models import User


class UserResource(ModelResource):
    class Meta:
        allowed_methods = ['get']
        queryset = User.objects.all()
        resource_name = 'user'


class QuestionResource(ModelResource):
    #choices = fields.ToManyField('Assessor.api.ChoiceResource', 'choice_set', full='id', related_name='choice')
    class Meta:
        allowed_methods = ['get']
        queryset = Question.objects.all().order_by('?')
        resource_name = 'question'
        filtering = {'id': ALL}


#
# http://localhost:8000/api/v1/choice/?filter=%5B%7B%22property%22%3A%22question_id%22%2C%22value%22%3A2%7D%5D
# http://localhost:8000/api/v1/choice/?filter=[{"property":"question_id","value":2}]
#
class ChoiceResource(ModelResource):
    question_id = fields.ToOneField('Assessor.api.QuestionResource',
                                    'question',
                                    full='id',
                                    related_name='question')

    class Meta:
        allowed_methods = ['get']
        queryset = Choice.objects.all()
        resource_name = 'choice'
        filtering = {'question_id': ALL_WITH_RELATIONS, 'id': ALL}


class AnswerResource(ModelResource):
    question_uri = fields.ToOneField('Assessor.api.QuestionResource',
                                    'question',
                                    full=True,
                                    related_name='question')
    choice_uri = fields.ToOneField('Assessor.api.ChoiceResource',
                                  'choice',
                                  full=True,
                                  related_name='choice')

    class Meta:
        authentication = Authentication()
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'put']
        queryset = Answer.objects.all()
        resource_name = 'answer'
        filtering = {'question_uri': ALL_WITH_RELATIONS,
                     'choice_uri': ALL_WITH_RELATIONS,
                     'id': ALL}
