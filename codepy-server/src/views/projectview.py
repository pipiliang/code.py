# -*- coding: utf-8 -*-

from flask import request, Response
from flask.views import MethodView
from services.projectservice import ProjectService


class ProjectAPI(MethodView):

    def get(self, projectname=None):
        if projectname is None:
            return ProjectService.get_projects()
        else:
            return ProjectService.get_project_by_name(projectname)

    def post(self):
        return ProjectService.create_project(request)

    def delete(self, projectname):
        return ProjectService.delete_project(projectname)

    def options(self):
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
        }
        return Response('Options OK', 202, headers)
