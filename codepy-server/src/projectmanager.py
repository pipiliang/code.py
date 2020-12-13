from flask import abort, Response
import configreader as cr
import json
import os
base_dir = cr.get_base_dir()


class ProjectManager():

    @staticmethod
    def get_projects():
        names = []
        for f in os.listdir(base_dir):
            names.append({
                'name': f,
                'description': 'tesest'
            })
        return json.dumps(names)

    @staticmethod
    def create_project(name, description):
        full_path = os.path.join(base_dir, name)
        if os.path.exists(full_path):
            resp = Response("project already exist!", status=300) 
            abort(resp)
        else:
            os.makedirs(full_path)
            return json.dumps({
                'name': name,
                'description': description
            })


a = ProjectManager.get_projects()
print(a)

# a = ProjectManager.create_project("Test", "sadfsffsf")
# print(a)


