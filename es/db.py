import mysql.connector
import os 
from datetime import datetime

def get_cnx():
    return mysql.connector.connect(user='root', password='Luyendkdk1',
        host='localhost',
        database='cses')
def execute_get(cmd, params):
    cnx = get_cnx()
    cursor = cnx.cursor()
    cursor.execute(cmd, params=params)
    results = cursor.fetchall()
    cnx.close()
    return results
def execute_update(cmd, params):
    cnx = get_cnx()
    cursor = cnx.cursor()
    cursor.execute(cmd, params=params)
    results = cursor.rowcount
    cnx.commit()
    cnx.close()
    return results
def get_inputs(task_id):
    return execute_get('select id, input from test_cases where task_id = %s', (task_id,))

def get_outputs(task_id):
    return execute_get('select id, output from test_cases where task_id = %s', (task_id,))


def create_test_result(submission_id, testcase_id, user_output, verdict, code_time, code_size):
    cmd = 'insert into results (submission_id, testcase_id, user_output, verdict, code_time, code_size, createdAt, updatedAt) values(%s, %s, %s, %s, %s, %s, %s, %s)'
    params =  (submission_id, testcase_id, user_output, verdict, code_time, code_size, datetime.utcnow(), datetime.utcnow(), )
    results = execute_update(cmd, params)
    if results>0:
        print(' [v] saved Result')
    else:
        print(' [x] cannot create new Result')

def update_test_result(submission_id, testcase_id, user_output, verdict, code_time, code_size):
    cmd = 'update results set user_output=%s, verdict=%s, code_time=%s, code_size=%s, updatedAt=%s where submission_id=%s and testcase_id=%s;'
    params = (user_output, verdict, code_time, code_size, datetime.utcnow(), submission_id, testcase_id, )
    results = execute_update(cmd, params)
    if results>0:
        print(f' [v] updated Result with verdict {verdict}')
    else:
        print(' [x] cannot update Result')