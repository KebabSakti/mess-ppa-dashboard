import { RemoteApi } from "../../common/config/remote_api";
import { AxiosHttp } from "../../common/helper/axios_http";
import { ErrorHandler } from "../../common/helper/error_handler";
import { BookingEntity } from "../../domain/entity/booking_entity";
import { BookingRepository } from "../../domain/port/repository/booking_repository";

class BookingRemote implements BookingRepository {
  private client = AxiosHttp.client();

  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity> {
    try {
      const request = await this.client.get(
        `${RemoteApi.bookings}/${option!.id}`
      );

      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<BookingEntity[]> {
    try {
      const request = await this.client.get(RemoteApi.bookings, {
        params: option!,
      });

      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    try {
      await this.client.delete(`${RemoteApi.bookings}/${option!.id}`);
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }
}

export { BookingRemote };
