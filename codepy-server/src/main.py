# -*- coding: utf-8 -*-

import json
import time
import subprocess
import threading

from flask_sockets import Sockets
from gevent import monkey
from flask import Flask
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from pyls_jsonrpc import streams
from views.projectview import ProjectAPI
from views.defaultview import DefaultAPI

monkey.patch_all()

app = Flask(__name__)
app.debug = True
sockets = Sockets(app)
now = time.strftime('%Y-%m-%d-%H-%M-%S', time.localtime(time.time()))
writer = None


@app.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin'] = '*'
    environ.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    environ.headers['Access-Control-Allow-Headers'] = '*'
    return environ


@sockets.route('/python')  # 指定路由
def echo_socket(ws):

    print('connect ...')

    pyls_process = subprocess.Popen(
        ['pyls', '-v'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

    writer = streams.JsonRpcStreamWriter(pyls_process.stdin)

    def consume():
        reader = streams.JsonRpcStreamReader(pyls_process.stdout)
        reader.listen(lambda msg: ws.send(json.dumps(msg)))

    thread = threading.Thread(target=consume)
    thread.daemon = True
    thread.start()

    while not ws.closed:
        message = ws.receive()  # 接收到消息
        if message is not None:
            print("%s receive msg==> " % now, str(json.dumps(message)))
            writer.write(json.loads(message))
        else:
            print(now, "no receive")


# Add url rules
app.add_url_rule('/', view_func=DefaultAPI.as_view('default_api'))

projects_view = ProjectAPI.as_view('projects_api')
app.add_url_rule('/projects/', view_func=projects_view)
app.add_url_rule('/projects/<projectname>',
                 view_func=projects_view, methods=['GET', 'DELETE'])

if __name__ == "__main__":
    server = pywsgi.WSGIServer(
        ('0.0.0.0', 4201), app, handler_class=WebSocketHandler)
    print('code.py server start ...')
    server.serve_forever()
