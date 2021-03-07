# -*- coding: utf-8 -*-

import json
import os
import shutil

from flask import Response, abort
from util import PathUtil


class ProjectService():

    @staticmethod
    def get_projects():
        projects = []
        base_dir = PathUtil.get_base_dir()
        for project_dir in os.listdir(base_dir):
            # 读取 ./.codepy/project.json
            project_json = ProjectService._read_project_json(project_dir)
            projects.append(project_json)
        return json.dumps(projects)

    @staticmethod
    def get_project_by_name(project_name):
        # 工程基本信息
        project = ProjectService._read_project_json(project_name)
        file_tree_json = FileWorker().get_tree_json(
            PathUtil.get_project_dir(project_name))
        project_file_tree = {
            'project': project,
            'files': file_tree_json
        }
        return json.dumps(project_file_tree)

    @staticmethod
    def create_project(data):
        '''
        创建工程
        '''
        project = json.loads(data)
        name = project.get('name')
        full_path = PathUtil.get_project_dir(name)
        if os.path.exists(full_path):
            abort(Response("project already exist!", status=300))
        else:
            os.makedirs(os.path.join(full_path, '.codepy'))
            # 写入信息到 ./.codepy/project.json
            ProjectService._write_project_json(name, project)
            return json.dumps(project)

    @staticmethod
    def delete_project(project_name):
        full_path = PathUtil.get_project_dir(project_name)
        if os.path.exists(full_path):
            shutil.rmtree(full_path)
            project = {
                'name': project_name,
                'description': ''
            }
            return Response(json.dumps(project), status=200)
        else:
            resp = Response("project not exist!", status=404)
            abort(resp)

    @staticmethod
    def _read_project_json(project_name):
        path = PathUtil.get_project_json(project_name)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf8') as fp:
                return json.load(fp)
        else:
            return {'name': project_name, 'description': '--'}

    @staticmethod
    def _write_project_json(project_name, project_json):
        path = PathUtil.get_project_json(project_name)
        with open(path, "w") as fp:
            fp.write(json.dumps(project_json, indent=4))


class FileWorker():

    def get_tree_json(self, project_dir):
        '''
        project_dir: 当前工程绝对路径
        '''
        data = self._path_to_json(project_dir, '')
        if data['children']:
            return data['children']
        else:
            return []

    def _path_to_json(self, path, related_path):
        name = os.path.basename(path)
        json_data = {'title': name, 'key': name, 'path': related_path}
        if os.path.isdir(path):
            json_data['isLeaf'] = False
            files = os.listdir(path)
            files.sort()
            json_data['children'] = [self._path_to_json(
                os.path.join(path, x),
                os.path.join(related_path, x)) for x in files]
        else:
            json_data['isLeaf'] = True
        return json_data


class FileService:
    '''
    doc
    '''

    @staticmethod
    def get_file(data):
        project_name = data.get("projectName")
        related_path = data.get("path")
        file_path = PathUtil.get_file_path(project_name, related_path)

        content = ''
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf8') as fp:
                content = fp.read()
        
        result = {
            'projectName' : project_name,
            'path' : related_path,
            "content" : content
        }

        return json.dumps(result)
