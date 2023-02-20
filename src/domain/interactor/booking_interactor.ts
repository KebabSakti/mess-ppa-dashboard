import { BookingEntity } from "../entity/booking_entity";
import { BookingRepository } from "../port/repository/booking_repository";

class BookingInteractor {
  private bookingRepository: BookingRepository;

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity> {
    const results = await this.bookingRepository.single(option);
    return results;
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity[]> {
    const results = await this.bookingRepository.collections(option);
    return results;
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await this.bookingRepository.delete(option);
  }
}

export { BookingInteractor };
