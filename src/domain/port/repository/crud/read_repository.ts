import { SingleResult } from "./single_result";
import { CollectionResult } from "./collection_result";

abstract class ReadRepository<T>
  implements SingleResult<T>, CollectionResult<T>
{
  abstract single(option?: { [key: string]: any } | undefined): Promise<T>;
  abstract collections(
    option?: { [key: string]: any } | undefined
  ): Promise<T[]>;
}

export { ReadRepository };
