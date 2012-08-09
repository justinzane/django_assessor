from django.contrib import auth
from django.http import HttpResponse
import json


def login(request):
    ''' This login method is tailored to produce json responses based on the
        needs of ExtJS 4.1/ '''
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
