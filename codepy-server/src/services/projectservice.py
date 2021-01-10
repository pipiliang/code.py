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
            project_json = ProjectService._read_project_json(f)
            projects.append(project_json)
        return json.dumps(projects)

    @staticmethod
    def get_project_by_name(project_name):
        # 工程基本信息
        project = ProjectService._read_project_json(project_name)
        file_tree_json = FileWorker().get_tree_json(
            os.path.join(base_dir, project_name))
        project_file_tree = {
            'project': project,
            'files': file_tree_json
        }
        return json.dumps(project_file_tree)

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
        path = os.path.join(base_dir, project_dir, '.codepy/project.json')
        with open(path, "w") as fp:
            fp.write(json.dumps(project_json, indent=4))


class FileWorker():

    def get_tree_json(self, path):
        data = self._path_to_json(path)
        if data['children']:
            return data['children']
        else:
            return []

    def _path_to_json(self, path):
        name = os.path.basename(path)
        json_data = {'title': name, 'key': name}
        if os.path.isdir(path):
            json_data['isLeaf'] = False
            files = os.listdir(path)
            files.sort()
            json_data['children'] = [self._path_to_json(
                os.path.join(path, x)) for x in files]
        else:
            json_data['isLeaf'] = True
        return json_data
