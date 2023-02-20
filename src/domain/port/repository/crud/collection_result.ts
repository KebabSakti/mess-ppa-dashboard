abstract class CollectionResult<T> {
  abstract collections(option?: { [key: string]: any }): Promise<T[]>;
}

export { CollectionResult };
