# -*- coding: utf-8 -*-

import util.configreader as cr
import os
base_dir = cr.get_base_dir()


class PathUtil:

    @staticmethod
    def get_base_dir():

        return base_dir

    @staticmethod
    def get_project_dir(project_name):
        '''
        base_dir
           |-- project1
           |-- project2
        '''

        return os.path.join(base_dir, project_name)

    @staticmethod
    def get_project_json(project_name):
        '''
        base_dir
           |-- project1
                |-- .codepy
                     |-- project.json
           |-- project2
        '''

        return PathUtil.get_file_path(project_name, '.codepy/project.json')

    @staticmethod
    def get_file_path(project_name, related_path):
        return os.path.join(base_dir, project_name, related_path)
