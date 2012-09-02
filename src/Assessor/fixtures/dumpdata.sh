#!/bin/sh
cd ../../
python manage.py dumpdata 'auth' 'Assessor' 'emailconfirmation' --format=json --indent=4 > Assessor/fixtures/fixtures.json