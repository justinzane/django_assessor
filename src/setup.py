#!/usr/bin/env python

'''
setup
@updated: on Jul 18, 2012
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

from distutils.core import setup
import os, sys


def get_data_files(sources):
    target_list = []
    for (target, source) in sources:
        if os.path.isdir(source):
            dirs = [source]
            for d in dirs:
                files = []
                for f in os.listdir(d):
                    if os.path.isdir(os.path.join(d, f)):
                        dirs.append(os.path.join(d, f))
                    else:
                        files.append(os.path.join(d, f))
                target_list.append((os.path.join(target,
                                                 d.replace('Assessor/', '')),
                                    files))
        else:
            target_list.append((target, [source]))
    return target_list

data_files_sources = [('Assessor/www/', 'Assessor/static/index.html'),
                      ('Assessor/www/', 'Assessor/static/app-min.js'),
                      ('Assessor/www/', 'Assessor/static/extjs/ext.js'),
                      ('Assessor/www/', 'Assessor/static/resources/css'),
                      ('Assessor/www/',
                       'Assessor/static/resources/images/default'),
                      ('Assessor/www/',
                       'Assessor/static/resources/images/a_icon01_opt.svg'),
                      ('Assessor/www/',
                       'Assessor/static/resources/images/assessor01.svg'),
                      ('Assessor/fixtures/',
                       'Assessor/fixtures/fixture5.json'),
                      ('Assessor/', 'Assessor.db'),
                      ('Assessor/', 'uwsgi.ini')]

setup(name='Assessor',
      version='0.2.11',
      author='Justin Chudgar',
      author_email='justin@justinzane.com',
      classifiers=[
          'Development Status :: 3 - Alpha',
          'Environment :: Web Environment',
          'Framework :: Django',
          'Intended Audience :: Developers',
          'Intended Audience :: Education',
          'Intended Audience :: End Users/Desktop',
          'License :: OSI Approved :: GNU Affero General Public License v3',
          'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
          'Natural Language :: English',
          'Operating System :: POSIX :: Linux',
          'Operating System :: OS Independent',
          'Programming Language :: Python',
          'Programming Language :: JavaScript',
          ],
      description='Django Assessment App',
      maintainer='Justin Chudgar',
      url='http://www.justinzane.com/',
      scripts=['manage.py'],
      packages=['Assessor', 'tastypie'],
      #
      data_files=get_data_files(data_files_sources),
      install_requires=["Django", "uWSGI", ],
      )
