import { BookingEntity } from "../../entity/booking_entity";
import { DeleteAction } from "./crud/delete_action";
import { ReadRepository } from "./crud/read_repository";

abstract class BookingRepository
  implements ReadRepository<BookingEntity>, DeleteAction
{
  abstract single(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity>;

  abstract collections(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity[]>;

  abstract delete(option?: { [key: string]: any } | undefined): Promise<void>;
}

export { BookingRepository };
