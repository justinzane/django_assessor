from django.conf.urls import patterns, include, url
from django.contrib import admin
from tastypie.api import Api
from Assessor.api import (AnswerResource, ChoiceResource, QuestionResource,
                          UserResource)
#from django.contrib.staticfiles.urls import staticfiles_urlpatterns
import settings

v1_api = Api(api_name='v1')
v1_api.register(QuestionResource())
v1_api.register(ChoiceResource())
v1_api.register(AnswerResource())
v1_api.register(UserResource())

admin.autodiscover()

urlpatterns = patterns('',
    (r'^api/', include(v1_api.urls)),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    (r'^auth/login\/?$', 'Assessor.views.login'),
    (r'^auth/logout\/?$', 'Assessor.views.logout'),
    (r'^json/histogram\/?$', 'Assessor.views.histogram'),
    (r'^json/per_cat_results\/?$', 'Assessor.views.per_cat_results'),
    (r'^util/reportbogus\/?$', 'Assessor.views.report_bogus'),
)
#urlpatterns += staticfiles_urlpatterns()
if settings.DEBUG:
    static_pattern = r'^%s(?P<path>.*)$' % (settings.STATIC_URL[1:],)
    urlpatterns += patterns('django.contrib.staticfiles.views',
        url(static_pattern, 'serve', {'show_indexes': True}),
    )
