import { URLs } from '../common/const';
import { listen } from 'vscode-ws-jsonrpc';
import { MessageConnection } from 'vscode-jsonrpc';
import {
    MonacoLanguageClient,
    CloseAction,
    ErrorAction,
    MonacoServices,
    createConnection
} from "monaco-languageclient";

const ReconnectingWebSocket = require('reconnecting-websocket');

export class LSPClient {

    public static connect(editor: any, name: string) {
        let url = '';
        if (name.toLowerCase().endsWith(".py")) {
            url = URLs.PYTHON_WS;
        } else {
            // 其他不支持
            return;
        }

        MonacoServices.install(editor);
        const webSocket = this.createWebSocket(url);
        listen({
            webSocket,
            onConnection: (connection: MessageConnection) => {
                const languageClient = this.createLanguageClient(connection);
                const disposable = languageClient.start();
                connection.onClose(() => disposable.dispose());
            }
        });
    }

    private static createLanguageClient(connection: MessageConnection): MonacoLanguageClient {
        return new MonacoLanguageClient({
            name: `python Client`,
            clientOptions: {
                documentSelector: ['python'],
                errorHandler: {
                    error: () => ErrorAction.Continue,
                    closed: () => CloseAction.DoNotRestart
                }
            },

            connectionProvider: {
                get: (errorHandler, closeHandler) => {
                    return Promise.resolve(createConnection(<any>connection, errorHandler, closeHandler));
                }
            }
        });
    }

    private static createWebSocket(socketUrl: string): WebSocket {
        const socketOptions = {
            maxReconnectionDelay: 10000,
            minReconnectionDelay: 1000,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 10000,
            maxRetries: Infinity,
            debug: false
        };
        return new ReconnectingWebSocket.default(socketUrl, [], socketOptions);
    }

}
