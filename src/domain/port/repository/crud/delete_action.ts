abstract class DeleteAction {
  abstract delete(option?: { [key: string]: any }): Promise<void>;
}

export { DeleteAction };
