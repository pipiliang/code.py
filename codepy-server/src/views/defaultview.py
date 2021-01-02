# -*- coding: utf-8 -*-

from flask.views import MethodView
from services.projectservice import ProjectService


class DefaultAPI(MethodView):

    def get(self):
        return 'Hello, This is code.py server!'
