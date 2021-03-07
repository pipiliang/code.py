/**
 * 回调函数类型定义
 */
type Callback<T, R> = (data: T, ...args: any[]) => R;

/**
 * 简单的事件订阅
 * T: 传递数据的泛型类型
 * R: 返回数据的泛型类型
 */
export class EventHub<T, R> {
    private subjects: { [key: string]: Array<Callback<T, R>> } = {};

    /**
     * 开始监听某个 topic
     * @param topic 监听的主题
     * @param callback 监听到主题的回调函数
     */
    public on(topic: string, callback: Callback<T, R>): void {
        if (!this.subjects[topic]) {
            this.subjects[topic] = [];
        }
        this.subjects[topic].push(callback);
    }

    /**
     * 关闭监听某个 topic
     * @param topic 监听的主题
     * @param callback 监听到主题的回调函数
     */
    public off(topic: string, callback: Callback<T, R>): void {
        if (callback === null) {
            this.subjects[topic] = [];
        } else {
            const index: number = this.subjects[topic].indexOf(callback);
            if (index > -1) {
                this.subjects[topic].splice(index, 1);
            }
        }
    }

    /**
     * 发送数据
     * @param topic 发送的主题
     * @param data 数据内容
     */
    public emit(topic: string, data: T, ...args: any[]): void {
        this.subjects[topic].forEach(callback => {
           const r: R = callback(data, args);
           // 返回值如何使用？过度设计了？
        });
    }
}
