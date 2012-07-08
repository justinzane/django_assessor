# -*- coding: utf8 -*-
'''
Created on May 29, 2012
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
import re, Levenshtein, json, os

def strip_bogus_lines(arg_lines):
    re_blank = re.compile(r'^\s$')
    re_page_left = re.compile(r'^\s*Page [0-9]+')
    re_page_right = re.compile(r'Page [0-9]+\s*$')
    berk_string = 'BERKELEY TRAINING ASSOCIATES © 2009\n'
    mft_string = 'MFT PRACTICE EXAMINATIONS'

    lines = []
    for line in arg_lines:
        bogosity = 0.0
        if re_blank.search(line):
            bogosity += 1.0
        if re_page_left.search(line):
            bogosity += 0.5
        if re_page_right.search(line):
            bogosity += 0.5
        l = Levenshtein.distance(line[-(len(mft_string)):], mft_string)
        if l < 5:
            bogosity += (5 - l) / 5.0
        l = Levenshtein.distance(line[:len(mft_string)], mft_string)
        if l < 5:
            bogosity += (5 - l) / 5.0
        l = Levenshtein.distance(line, berk_string)
        if l < 5:
            bogosity += (5 - l) / 5.0
        if bogosity < 0.25:
            lines.append(line)
    return lines

def parse_questions(lines, path):
    questions = []
    choices = []
    text = ''

    re_quest = re.compile(r'^(?P<num>[0-9]+)[\*\'\"]\.[ ]+(?P<text>[A-Z“”\"].+)')
    re_choice = re.compile(r'^(?P<num>[a-d])[. ]+(?P<text>.+)')

    current = None
    cur_quest_num = None
    for line in lines:
        q = re_quest.search(line)
        c = re_choice.search(line)
        if q:
            current = 'question'
            cur_quest_num = q.group('num')
            questions.append({'num': q.group('num'),
                              'text': q.group('text').rstrip() + ' '})
        elif c:
            current = 'choice'
            choices.append({'num': c.group('num'),
                            'text': c.group('text').rstrip() + ' ',
                            'question_id': cur_quest_num})
        elif current == 'question':
            cq = questions.pop()
            cq['text'] += line.rstrip() + ' '
            questions.append(cq)
        elif current == 'choice':
            cc = choices.pop()
            cc['text'] += line.rstrip() + ' '
            choices.append(cc)
    json.dump(questions, open(path + 'questions.json', 'w'), indent=4)
    json.dump(choices, open(path + 'choices.json', 'w'), indent=4)


if __name__ == '__main__':
    filename = '../quiz3/questions.txt'
    lines = open(filename, 'r').readlines()
    lines = strip_bogus_lines(lines)
    parse_questions(lines, '../quiz3/')
