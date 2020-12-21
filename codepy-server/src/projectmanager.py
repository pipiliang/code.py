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
                'description': 'not implement...'
            })
        return json.dumps(names)

    @staticmethod
    def create_project(request):
        if not request.data:  # 检测是否有数据
            return ('fail')
        project = json.loads(request.data)
        name = project.get('name')
        full_path = os.path.join(base_dir, name)
        if os.path.exists(full_path):
            resp = Response("project already exist!", status=300)
            abort(resp)
        else:
            os.makedirs(full_path)
            return json.dumps(project)

    @staticmethod
    def delete_project(projectname):
        full_path = os.path.join(base_dir, projectname)
        if os.path.exists(full_path):
            os.removedirs(full_path)
            res = Response("OK", status=200)
            # res.headers['Access-Control-Allow-Origin'] = '*'
            # res.headers['Access-Control-Allow-Method'] = '*'
            # res.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
            return res
        else:
            resp = Response("project not exist!", status=404)
            abort(resp)
