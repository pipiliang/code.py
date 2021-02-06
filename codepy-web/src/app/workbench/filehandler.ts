/**
 * 文件处理类型
 */
export enum FileHandleType {
    Open = 'Open',
    Close = 'Close',
    Add = 'Add',
    Delete = 'Delete',
    Rename = 'Rename'
}

export interface FileHandleEvent {
    type: FileHandleType;
    fileName: string;
    filePath: string;
    content: string;
}
