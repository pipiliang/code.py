import { EventHub } from './eventhub';

// 操作类型
enum FileTreeOperateType {
    Open = 'Open',
    Close = 'Close',
    Add = 'Add',
    Delete = 'Delete',
    Rename = 'Rename'
}

// 文件操作事件
interface FileTreeOperateEvent {
    type: FileTreeOperateType;
    name: string;
    path: string;
    projectName: string;
}

const FileEventHub = new EventHub<FileTreeOperateEvent, void>();
const FileTreeOperateTopic = 'FileTreeOperateTopic';

export { FileEventHub, FileTreeOperateTopic, FileTreeOperateType, FileTreeOperateEvent };


