import json
import time
import subprocess
import threading

from flask_sockets import Sockets
from gevent import monkey
from flask import Flask, request
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
    environ.headers['Access-Control-Allow-Method'] = '*'
    environ.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
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


@app.route('/projects/', methods=['GET', 'POST'])
def handle_projects():
    if request.method == 'GET':
        return ProjectManager.get_projects()
    else:
        return None


if __name__ == "__main__":
    server = pywsgi.WSGIServer(
        ('192.168.1.106', 3001), app, handler_class=WebSocketHandler)
    print('code.py server start ...')
    server.serve_forever()
