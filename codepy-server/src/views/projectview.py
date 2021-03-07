# -*- coding: utf-8 -*-

import json
from flask import request, Response
from flask.views import MethodView
from services.projectservice import ProjectService, FileService


# todo 参数校验未处理
class ProjectAPI(MethodView):

    def get(self, projectname=None):
        if projectname is None:
            return ProjectService.get_projects()
        else:
            return ProjectService.get_project_by_name(projectname)

    def post(self):
        # 检测是否有数据
        if not request.data:
            return ('fail')
        return ProjectService.create_project(request.data)

    def delete(self, projectname):
        return ProjectService.delete_project(projectname)

    def options(self):
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
        }
        return Response('Options OK', 202, headers)


class FileAPI(MethodView):

    def post(self):
        if not request.data:
            return ('fail')
        
        data_json = json.loads(request.data)
        print(data_json)
        type = data_json.get("type")
        print(type)
        if type == 'Open':
            return FileService.get_file(data_json)
        if type is 'Add':
            return
