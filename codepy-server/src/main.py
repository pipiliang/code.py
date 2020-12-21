import json
import time
import subprocess
import threading

from flask_sockets import Sockets
from gevent import monkey
from flask import Flask, request, jsonify
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from pyls_jsonrpc import streams
from projectmanager import ProjectManager

monkey.patch_all()

app = Flask(__name__)
sockets = Sockets(app)
now = time.strftime('%Y-%m-%d-%H-%M-%S', time.localtime(time.time()))


writer = None


@app.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin'] = '*'
    environ.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    environ.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
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


@app.route('/')
def hello():
    return 'Hello, This is code.py server!'


@app.route('/projects/', methods=['GET'])
def get_all_projects():
    return ProjectManager.get_projects()


@app.route('/project/', methods=['POST'])
def create_project():
    return ProjectManager.create_project(request)


@app.route('/project/<projectname>/', methods=['GET', 'DELETE', 'OPTIONS'])
def handle_project(projectname):
    if request.method == 'DELETE':
        return ProjectManager.delete_project(projectname)
    else:
        return jsonify({"GET": "Nice Get Request"})


if __name__ == "__main__":
    server = pywsgi.WSGIServer(
        ('192.168.1.106', 4201), app, handler_class=WebSocketHandler)
    print('code.py server start ...')
    server.serve_forever()
