abstract class UpdateAction {
  abstract update(option?: { [key: string]: any }): Promise<void>;
}

export { UpdateAction };
