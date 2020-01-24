import requests
import json

with open('/Users/jotsarupsingh/sample_node/trainer-dashboard-backend-scratch/api/scripts/workouts/workouts.json') as f:
    data = json.load(f)
    unique_data = []

    for exercise in data:
        if exercise.get('text') not in unique_data:
            unique_data.append(exercise.get('text'))
            input = { "name": exercise.get('text') }

            resp = requests.post('http://localhost:3000/workouts/exercise',
                                data=input)
            print resp

