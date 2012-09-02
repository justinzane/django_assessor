#!/usr/bin/env python
'''
Assessor.auth
@updated: on Aug 10, 2012
@author: justin
@license:  AGPLv3
    Copyright (C) 2012  Justin Chudgar,
    5040 Saddlehorn Rd, Weed, CA 96094
    <justin@justinzane.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
'''
from tastypie.authentication import Authentication
from django.contrib.auth import authenticate
from django.contrib.auth.models import AnonymousUser


class HeaderAuthentication(Authentication):
    def is_authenticated(self, request, **kwargs):
        try:
            un = request.META['HTTP_X_USERNAME']
            pw = request.META['HTTP_X_PASSWORD']
            user = authenticate(username=un, password=pw)
            if user:
                return True
            else:
                return False
        except:
            return False

    # Optional but recommended
    def get_identifier(self, request):
        try:
            return request.META['HTTP_X_USERNAME']
        except:
            return AnonymousUser.username
