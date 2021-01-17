export enum FileHandleType {
    Open = "OpenFile",
    Close = "CloseFile",
    Rename = "RenameFile"
}

export interface FileHandleEvent {

    type: FileHandleType;
    fileName: string;
    filePath: string;
    content: string;

}