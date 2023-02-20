abstract class SingleResult<T> {
  abstract single(option?: { [key: string]: any }): Promise<T>;
}

export { SingleResult };
