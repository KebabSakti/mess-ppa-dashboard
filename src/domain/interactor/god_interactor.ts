import { AxiosHttp } from "../../common/helper/axios_http";
import { ErrorHandler } from "../../common/helper/error_handler";
import { InnEntity } from "../entity/inn_entity";
import { LocationEntity } from "../entity/location_entity";
import { RoomEntity } from "../entity/room_entity";

const axios = new AxiosHttp();

class InnInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<InnEntity> {
    try {
      const request = await axios.client().get(`admin/inns/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<InnEntity[]> {
    const request = await axios.client().get(`admin/inns`);
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();
    form.append("name", option!.name);
    form.append("denah", option!.denah);
    form.append("picture", option!.picture);

    await axios.client().post("admin/inns", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().put(`admin/inns/${option!.id}`, { data: option });
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/inns/${option!.id}`);
  }
}

class LocationInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<LocationEntity> {
    try {
      const request = await axios.client().get(`admin/locations/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<LocationEntity[]> {
    const request = await axios.client().get(`admin/locations`);
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().post("admin/locations", { data: option });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().put(`admin/locations/${option!.id}`, { data: option });
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/locations/${option!.id}`);
  }
}

class RoomInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<RoomEntity> {
    try {
      const request = await axios.client().get(`admin/rooms/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<RoomEntity[]> {
    const request = await axios.client().get(`admin/rooms`);
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().post("admin/rooms", { data: option });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().put(`admin/rooms/${option!.id}`, { data: option });
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/rooms/${option!.id}`);
  }
}

export { InnInteractor, LocationInteractor, RoomInteractor };
