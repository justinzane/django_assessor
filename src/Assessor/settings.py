import os, sys

BASE_DIR = os.path.abspath(os.path.curdir)
DEBUG = True
TEMPLATE_DEBUG = DEBUG
ADMINS = (('Justin Chudgar', 'justin@justinzane.com'),)
MANAGERS = ADMINS
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR + '/Assessor.db',
        'USER': '', 'PASSWORD': '', 'HOST': '', 'PORT': '',
    }
}
TIME_ZONE = None
LANGUAGE_CODE = 'en-us'
SITE_ID = 1
USE_I18N = True
USE_L10N = True
USE_TZ = True

MEDIA_ROOT = ''
MEDIA_URL = ''

STATIC_ROOT = BASE_DIR + '/deploy-static/'
STATIC_URL = '/static/'
STATICFILES_DIRS = ()
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

SECRET_KEY = 'xosuyg!f^ef4w_)3nz2uvm$^)#8*owd!1g$c4q636mizhoj1ah'

LOGIN_URL = '/auth/login'

PASSWORD_HASHERS = (
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
    'django.contrib.auth.hashers.SHA1PasswordHasher',
    'django.contrib.auth.hashers.MD5PasswordHasher',
    'django.contrib.auth.hashers.CryptPasswordHasher',
)

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
#    'django.contrib.auth.backends.RemoteUserBackend',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#    'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
#    'django.middleware.gzip.GZipMiddleware',
    'django.middleware.http.ConditionalGetMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
#   'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

CONTEXT_PROCESSORS = (
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
)

ROOT_URLCONF = 'Assessor.urls'
WSGI_APPLICATION = 'Assessor.wsgi.application'
TEMPLATE_DIRS = ()
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'django.contrib.admindocs',
    'tastypie',
    'Assessor',
)

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
#EMAIL_FILE_PATH = directory used by file email backend to store output files.
EMAIL_HOST = 'tiny.justinzane.com'
EMAIL_HOST_PASSWORD = ''
EMAIL_HOST_USER = ''        # If empty, Django won't attempt authentication.
EMAIL_PORT = 25
EMAIL_SUBJECT_PREFIX = '[assessor.justinzane.com] '
EMAIL_USE_TLS = True

SESSION_COOKIE_AGE = 14400
SESSION_COOKIE_DOMAIN = '.justinzane.com'
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_PATH = '/'
SESSION_COOKIE_SECURE = True
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
#    'django.contrib.sessions.backends.file'
#    'django.contrib.sessions.backends.cache'
#    'django.contrib.sessions.backends.cached_db'
#    'django.contrib.sessions.backends.signed_cookies'
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_FILE_PATH = None
SESSION_SAVE_EVERY_REQUEST = False

#SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')
CSRF_COOKIE_SECURE = True

API_LIMIT_PER_PAGE = 0
USE_ETAGS = True
FIXTURE_DIRS = os.path.join(BASE_DIR, 'fixtures')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(asctime)s %(levelname)s %(module)s %(process)d \
%(thread)d\n\t%(message)s\n'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'filters': {
            'require_debug_false': {'()': 'django.utils.log.RequireDebugFalse'}
    },
    'handlers': {
                 'mail_admins': {'level': 'ERROR',
                                 'filters': ['require_debug_false'],
                                 'class': 'django.utils.log.AdminEmailHandler'
                                 },
                 'file': {'level': 'DEBUG',
                          'class': 'logging.FileHandler',
                          'formatter': 'verbose',
                          'filename': 'Assessor.log'},
                 },
    'loggers': {
        'django': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'django_debug': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    }
}
