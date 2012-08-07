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
from tastypie.authorization import DjangoAuthorization, Authorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from models import Question, Choice, Answer
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.auth import authenticate
import logging


class HeaderAuthentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        logger = logging.getLogger('django')
        try:
            un = request.META['HTTP_X_USERNAME']
            pw = request.META['HTTP_X_PASSWORD']
            logger.debug('\nHeaderAuthentication.is_authenticated\n\t%s:%s\n' % (un, pw))
            user = authenticate(username=un, password=pw)
            if user:
                logger.debug('\nHeaderAuthentication.is_authenticated\n\tuser exists, returning True\n')
                return True
            else:
                logger.debug('\nHeaderAuthentication.is_authenticated\n\tuser is None, returning False\n')
                return False
        except:
            logger.debug('\nHeaderAuthentication.is_authenticated\n\tException, returning False\n')
            return False

    # Optional but recommended
    def get_identifier(self, request):
        logger = logging.getLogger('django')
        try:
            logger.debug('HeaderAuthentication.get_identifier\n\tReturning %s\n' % (request.META['HTTP_X_USERNAME']))
            return request.META['HTTP_X_USERNAME']
        except:
            logger.debug('HeaderAuthentication.get_identifier\n\tReturning %s\n' % (AnonymousUser.username))
            return AnonymousUser.username


class UserResource(ModelResource):
    def obj_create(self, bundle, request=None, **kwargs):
        logger = logging.getLogger('django')
        logger.debug('\nUserResource.obj_create\n\tuser: %s\n' % (str(request.user.username)))
        return super(UserResource, self).obj_create(bundle,
                                                    request,
                                                    user=request.user)

    def apply_authorization_limits(self, request, object_list):
        #logger = logging.getLogger('django')
        #logger.debug('UserResource.apply_auth_limits\n\trequest.user: %s' % (str(request.user.username)))
        #return object_list.filter(pk=request.user.pk)
        un = request.META['HTTP_X_USERNAME']
        return object_list.filter(username=un)

    class Meta:
        authentication = HeaderAuthentication()
        authorization = DjangoAuthorization()
        allowed_methods = ['get']
        queryset = User.objects.all()
        resource_name = 'user'


class QuestionResource(ModelResource):
    #choices = fields.ToManyField('Assessor.api.ChoiceResource', 'choice_set',
    #    full='id', related_name='choice')
    class Meta:
        authentication = HeaderAuthentication()
        authorization = DjangoAuthorization()
        allowed_methods = ['get']
        queryset = Question.objects.all().order_by('?')
        resource_name = 'question'
        filtering = {'id': ALL}


#
# http://localhost:8000/api/v1/choice/?
#    filter=%5B%7B%22property%22%3A%22question_id%22%2C%22value%22%3A2%7D%5D
# http://localhost:8000/api/v1/choice/?
#    filter=[{"property":"question_id","value":2}]
#
class ChoiceResource(ModelResource):
    question_id = fields.ToOneField('Assessor.api.QuestionResource',
                                    'question',
                                    full='id',
                                    related_name='question')

    class Meta:
        authentication = HeaderAuthentication()
        authorization = DjangoAuthorization()
        allowed_methods = ['get']
        queryset = Choice.objects.all()
        resource_name = 'choice'
        filtering = {'question_id': ALL_WITH_RELATIONS, 'id': ALL}


class AnswerResource(ModelResource):
    user_id = fields.ToOneField('Assessor.api.UserResource',
                                 'user',
                                 full='id',
                                 related_name='user')
    question_id = fields.ToOneField('Assessor.api.QuestionResource',
                                     'question',
                                     full='id',
                                     related_name='question')
    choice_id = fields.ToOneField('Assessor.api.ChoiceResource',
                                   'choice',
                                   full='id',
                                   related_name='choice')

    def obj_create(self, bundle, request=None, **kwargs):
        un = request.META['HTTP_X_USERNAME']
        user = User.objects.get_by_natural_key(un)
        logger = logging.getLogger('django')
        logger.debug('\nAnswerResource.obj_create\n\tuser: %s\n' % (str(user)))
        logger.debug('\n---------------\n%s\n---------------\n' % (str(request)))
        return super(AnswerResource, self).obj_create(bundle,
                                                      request,
                                                      user=user)

    def apply_authorization_limits(self, request, object_list):
        un = request.META['HTTP_X_USERNAME']
        user = User.objects.get_by_natural_key(un)
        return object_list.filter(user=user)

    class Meta:
        authentication = HeaderAuthentication()
        authorization = Authorization()
        allowed_methods = ['get', 'post', 'put']
        queryset = Answer.objects.all()
        resource_name = 'answer'
#        filtering = {'user_id': ALL_WITH_RELATIONS,
#                     'question_id': ALL_WITH_RELATIONS,
#                     'choice_id': ALL_WITH_RELATIONS,
#                     'id': ALL}
