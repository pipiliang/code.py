
interface Publisher<T> {
    subscriber: string;
    data: T;
}

interface EventChannel<T> {
    on: (subscriber: string, callback: () => void) => void;
    off: (subscriber: string, callback: () => void) => void;
    emit: (subscriber: string, data: T) => void;
}

interface Subscriber {
    subscriber: string;
    callback: () => void;
}


export class EventHub<T> implements EventChannel<T> {

    private subjects: { [key: string]: Array<Function> } = {};

    public on(subscriber: string, callback: () => void): void {
        console.log(`收到订阅信息，订阅事件：${subscriber}`);
        if (!this.subjects[subscriber]) {
            this.subjects[subscriber] = [];
        }
        this.subjects[subscriber].push(callback);
    }

    public off(subscriber: string, callback: () => void): void {
        console.log(`收到取消订阅请求，需要取消的订阅事件：${subscriber}`);
        if (callback === null) {
            this.subjects[subscriber] = [];
        } else {
            const index: number = this.subjects[subscriber].indexOf(callback);
            if (index > -1) {
                this.subjects[subscriber].splice(index, 1);
            }
        }
    }

    public emit(subscriber: string, data: T): void {
        console.log(`收到发布者信息，执行订阅事件：${subscriber}`);
        this.subjects[subscriber].forEach(item => item(data));
    }
}
