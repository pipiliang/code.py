import { EventHub } from './eventhub';

// 操作类型
export enum OperateType {
    Open = 'Open',
    Close = 'Close',
    Add = 'Add',
    Delete = 'Delete',
    Rename = 'Rename'
}

// 文件操作事件
export interface FileHandleEvent {
    type: OperateType;
    fileName: string;
    filePath: string;
    content: string;
}

const FileEventHub = new EventHub<FileHandleEvent>();

export { FileEventHub };


