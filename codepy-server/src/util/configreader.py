# -*- coding: utf-8 -*-

import json
import os
home = os.environ['HOME']
current_path = os.path.dirname(__file__)


def get_base_dir():
    with open(current_path + '/../../conf/config.json', 'r', encoding='utf8')as fp:
        json_data = json.load(fp)
        if json_data.get('baseDir'):
            base_dir = json_data['baseDir']
            # 文件夹是否存在
            if os.path.exists(base_dir):
                return base_dir

    # 不存在时取 home 目录
    base_dir = home + '/code.py'
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)
    return base_dir
