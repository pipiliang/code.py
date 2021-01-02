# -*- coding: utf-8 -*-

from flask import abort, Response
import util.configreader as cr
import json
import os
import shutil
base_dir = cr.get_base_dir()


class ProjectService():

    @staticmethod
    def get_projects():
        projects = []
        for f in os.listdir(base_dir):
            # 读取 ./.codepy/project.json
            # project_json_path = os.path.join(
            #     base_dir, f, '.codepy/project.json')
            # if os.path.exists(project_json_path):
            #     with open(project_json_path, 'r', encoding='utf8') as fp:
            #         json_data = json.load(fp)
            #         projects.append(json_data)
            # else:
            #     projects.append({
            #         'name': f,
            #         'description': '--'
            #     })
            project_json = ProjectService._read_project_json(f)
            projects.append(project_json)
        return json.dumps(projects)

    @staticmethod
    def create_project(request):
        '''
        创建工程
        '''
        if not request.data:  # 检测是否有数据
            return ('fail')
        project = json.loads(request.data)
        name = project.get('name')
        full_path = os.path.join(base_dir, name)
        if os.path.exists(full_path):
            abort(Response("project already exist!", status=300))
        else:
            os.makedirs(os.path.join(full_path, '.codepy'))
            # 写入信息到 ./.codepy/project.json
            # project_json_path = os.path.join(full_path, '.codepy/project.json')
            # with open(project_json_path, "w") as fp:
            #     fp.write(json.dumps(project, indent=4))
            ProjectService._write_project_json(name, project)
            return json.dumps(project)

    @staticmethod
    def delete_project(projectname):
        full_path = os.path.join(base_dir, projectname)
        if os.path.exists(full_path):
            shutil.rmtree(full_path)

            project = {
                'name': projectname,
                'description': ''
            }
            return Response(json.dumps(project), status=200)
        else:
            resp = Response("project not exist!", status=404)
            abort(resp)

    @staticmethod
    def _read_project_json(project_dir):
        path = os.path.join(base_dir, project_dir, '.codepy/project.json')
        if os.path.exists(path):
            with open(path, 'r', encoding='utf8') as fp:
                return json.load(fp)
        else:
            return {'name': project_dir, 'description': '--'}

    @staticmethod
    def _write_project_json(project_dir, project_json):
        # 写入信息到 ./.codepy/project.json
        path = os.path.join(base_dir, project_dir, '.codepy/project.json')
        with open(path, "w") as fp:
            fp.write(json.dumps(project_json, indent=4))
