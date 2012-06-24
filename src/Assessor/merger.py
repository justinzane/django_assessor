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
import json
from models import Question, Choice

def do_merge():
    questions = json.load(open('/home/justin/src/django-assessor/src/Assessor/data/questions.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)
    choices = json.load(open('/home/justin/src/django-assessor/src/Assessor/data/questions-choices.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)
    answers = json.load(open('/home/justin/src/django-assessor/src/Assessor/data/answers.json', 'r'), encoding='utf8', parse_float=True, parse_int=True, parse_constant=True)
    
    ans = 0
    noans = 0
    for question in questions:
        # create question
        #q = Question(text=question['text'])
        #q.save()
        correct = 0
        # set answer to question.explanation and note correct choice
        for answer in answers:
            if int(answer['id']) == int(question['id']):
                #q.explanation = answer['text']
                correct = int(answer['value'])
        if correct == 0:
            noans += 1
        else:
            ans += 1
        print noans, ans
            # create related choices
            #for choice in choices:
            #    if int(choice['question_id']) == int(question['id']):
                    #c = Choice(text=choice['text'],
                    #           is_correct=(int(choice['question_id']) == correct),
                    #           question=q)
                    #c.save()
            
if __name__ == '__main__':
    do_merge()
