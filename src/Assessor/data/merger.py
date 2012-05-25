'''
Created on May 25, 2012
@author: justin
@license:  GPLv3
    This file is part of .

     is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

     is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with .  If not, see <http://www.gnu.org/licenses/>.
'''
import json, os, re

if __name__ == '__main__':
    questions = json.load(open('questions.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)
    choices = json.load(open('questions-choices.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)
    answers = json.load(open('answers.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)

    for question in questions:
        print question['text']
        qid = int(question['id'])
        for choice in choices:
            if int(choice['question_id']) == qid:
                print "\t" + choice['text']
        
