import requests
import json 

def get_testcase(task_id: int):
    url = "http://localhost:3001/graphql"
    body = 'query { getTestcases(task_id: %s) { id input output } }' % (str(task_id))
    response = requests.post(url=url, json={"query": body})
    results = []
    if response.status_code == 200:
        results = json.loads(response.content.decode())['data']['getTestcases']
    inputs, outputs = [{'id': i['id'], 'input': i['input']} for i in results], [{'id': i['id'], 'output': i['output']} for i in results]
    return inputs, outputs
    
print(get_testcase(task_id=3))