from django.contrib import auth
from django.contrib.auth.models import User
from django.http import (HttpResponse,
                         HttpResponseForbidden,
                         HttpResponseBadRequest)
from django.core import mail
import json
import logging
from models import Answer, Choice, Question, Category
from auth import HeaderAuthentication


def report_bogus(request):
    ''' Sends an email to the admin about a bogus question or choice. '''
    ha = HeaderAuthentication()
    if not ha.is_authenticated(request):
        return HttpResponseForbidden()

    username = request.META['HTTP_X_USERNAME']
    if 'question_id' in request.POST.keys():
        question_id = request.POST['question_id']
    else:
        question_id = None
    if 'choice_id' in request.POST.keys():
        choice_id = request.POST['choice_id']
    else:
        choice_id = None
    if 'reason' in request.POST.keys():
        reason = request.POST['reason']
    else:
        reason = None

    #TODO: Validate submission data
    if question_id == None:
        return HttpResponseBadRequest()

    message = 'Bogus Notification\n'
    message += 'Question: %s\n' % (str(Question.objects.get(id=question_id)))
    if choice_id:
        message += "Choice: %s\n" % (str(Choice.objects.get(id=choice_id)))
    if reason:
        message += 'Reason: %s\n' % (reason)
    message += 'User: %s\n' % (str(User.objects.get_by_natural_key(username)))

    mail.mail_admins("Bogus Question/Choice Notification",
                     message,
                     fail_silently=False)


def per_cat_results(request):
    ''' Returns json data representing the sum of correct and incorrect
        choices per category throughout the user's history.
        {'id':<int>,
         'category':<name>,
         'correct':count<int>,
         'incorrect':count<int>}
        '''
    ha = HeaderAuthentication()
    if not ha.is_authenticated(request):
        return HttpResponseForbidden()

    results = []
    user = User.objects.get_by_natural_key(request.META['HTTP_X_USERNAME'])
    cats = Category.objects.all()
    for cat in cats:
        right = Answer.objects.filter(user=user,
                                      question__category=cat,
                                      choice__is_correct=True).count()
        wrong = Answer.objects.filter(user=user,
                                      question__category=cat,
                                      choice__is_correct=False).count()
        total = float(right + wrong)
        right = 100.0 * float(right) / total
        wrong = 100.0 * float(wrong) / total
        results.append({'id': cat.pk,
                        'category': cat.name,
                        'correct': right,
                        'incorrect': wrong})
    return HttpResponse(json.dumps(results), mimetype='application/json')


def histogram(request):
    ''' Returns json data representing a histogram of correct and incorrect
        choices throughout the user's history.
        {'question_id':<int>,'correct':count<int>, 'incorrect':count<int>
        '''
    logger = logging.getLogger('debug')
    ha = HeaderAuthentication()
    if not ha.is_authenticated(request):
        logger.debug('Authentication Failed!')
        return HttpResponseForbidden()
    logger.debug('Authentication Succeeded.')
    un = request.META['HTTP_X_USERNAME']
    histogram = []
    for i in Question.objects.values('id'):
        histogram.append({'question_id': i['id'],
                          'correct':
                          Answer.objects.filter(question__id=i['id'],
                                user__username=un,
                                choice__is_correct=True).count(),
                          'incorrect':
                          Answer.objects.filter(question__id=i['id'],
                               user__username=un,
                               choice__is_correct=False).count()})
    return HttpResponse(json.dumps(histogram), mimetype='application/json')


def login(request):
    ''' This login method is tailored to produce json responses based on the
        needs of ExtJS 4.1/ '''
    logger = logging.getLogger('debug')
    logstring = ""
    logstring += "Host  \t%s\n" % (request.get_host())
    for m in request.META:
        logstring += "(Header) %s : %s | " % (m, request.META[m])
    logstring += "\n"
    for p in request.POST:
        logstring += "(Post) %s : %s | " % (p, request.POST[p])
    logstring += "\n"
    logger.debug(logstring)
    result = {}
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            result['success'] = True
            return HttpResponse(json.dumps(result),
                                mimetype='application/json')
        else:
            result['success'] = False
            result['errors'] = {'message': 'Invalid username.'}
            return HttpResponse(json.dumps(result),
                                mimetype='application/json')
    else:
        result['success'] = False
        result['errors'] = {'message': 'Invalid password.'}
        return HttpResponse(json.dumps(result),
                            mimetype='application/json')


def logout(request):
    auth.logout(request)
    result = {}
    result['success'] = True
    return HttpResponse(json.dumps(result), mimetype='application/json')
