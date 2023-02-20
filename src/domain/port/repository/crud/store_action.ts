abstract class StoreAction {
  abstract store(option?: { [key: string]: any }): Promise<void>;
}

export { StoreAction };
