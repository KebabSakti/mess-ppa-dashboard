import { DeleteAction } from "./delete_action";
import { StoreAction } from "./store_action";
import { UpdateAction } from "./update_action";

abstract class WriteRepository<T>
  implements StoreAction, UpdateAction, DeleteAction
{
  abstract store(option?: { [key: string]: any }): Promise<void>;

  abstract update(option?: { [key: string]: any }): Promise<void>;

  abstract delete(option?: { [key: string]: any }): Promise<void>;
}

export { WriteRepository };
