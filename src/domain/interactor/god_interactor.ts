import { AxiosHttp } from "../../common/helper/axios_http";
import { ErrorHandler } from "../../common/helper/error_handler";
import { ConfigEntity } from "../entity/config_entity";
import { GuestEntity } from "../entity/guest_entity";
import { InnEntity } from "../entity/inn_entity";
import { LocationEntity } from "../entity/location_entity";
import { RoomEntity } from "../entity/room_entity";
import { RosterEntity } from "../entity/roster_entity";
import { SummaryEntity } from "../entity/summary_entity";

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
    const request = await axios.client().get(`admin/inns`, { params: option });
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();
    form.append("name", option!.name);
    form.append("denah", option!.denah);
    form.append("picture", option!.picture);
    form.append("active", option!.active);

    await axios.client().post("admin/inns", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();

    form.append("name", option!.name);
    form.append("active", option!.active);

    if (option?.denah) form.append("denah", option!.denah);
    if (option?.picture) form.append("picture", option!.picture);

    await axios.client().put(`admin/inns/${option!.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    const request = await axios
      .client()
      .get(`admin/locations`, { params: option });
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();
    form.append("innId", option!.innId);
    form.append("inn", option!.inn);
    form.append("name", option!.name);
    form.append("denah", option!.denah);
    form.append("active", option!.active);

    await axios.client().post("admin/locations", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();

    form.append("innId", option!.innId);
    form.append("inn", option!.inn);
    form.append("name", option!.name);
    form.append("active", option!.active);

    if (option?.denah) form.append("denah", option!.denah);

    await axios.client().put(`admin/locations/${option!.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    const request = await axios.client().get(`admin/rooms`, { params: option });
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();

    form.append("innId", option!.innId);
    form.append("locationId", option!.locationId);
    form.append("inn", option!.inn);
    form.append("location", option!.location);
    form.append("name", option!.name);
    form.append("capacity", option!.capacity);
    form.append("picture", option!.picture);
    form.append("active", option!.active);

    await axios.client().post("admin/rooms", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();

    form.append("name", option!.name);
    form.append("capacity", option!.capacity);
    form.append("active", option!.active);

    if (option?.picture) form.append("picture", option!.picture);

    await axios.client().put(`admin/rooms/${option!.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/rooms/${option!.id}`);
  }
}

class EmployeeInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<RoomEntity> {
    try {
      const request = await axios.client().get(`admin/employees/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<RoomEntity[]> {
    const request = await axios
      .client()
      .get(`admin/employees`, { params: option });
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().post("admin/employees", { data: option });
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().put(`admin/employees/${option!.id}`, { data: option });
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/employees/${option!.id}`);
  }
}

class GuestInteractor {
  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<GuestEntity[]> {
    const request = await axios
      .client()
      .get(`admin/guests`, { params: option });
    const results = request.data;
    return results;
  }

  async delete(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().delete(`admin/guests/${option!.id}`);
  }
}

class RosterInteractor {
  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<RosterEntity[]> {
    const request = await axios
      .client()
      .get(`admin/rosters`, { params: option });
    const results = request.data;
    return results;
  }

  async store(option?: { [key: string]: any } | undefined): Promise<void> {
    const form = new FormData();
    form.append("roster", option!.roster);

    await axios.client().post(`admin/rosters`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

class VoucherInteractor {
  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<GuestEntity[]> {
    const request = await axios
      .client()
      .get(`admin/vouchers`, { params: option });
    const results = request.data;
    return results;
  }
}

class ConfigInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<ConfigEntity> {
    try {
      const request = await axios.client().get(`admin/configs/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<ConfigEntity[]> {
    const request = await axios
      .client()
      .get(`admin/configs`, { params: option });
    const results = request.data;
    return results;
  }

  async update(option?: { [key: string]: any } | undefined): Promise<void> {
    await axios.client().put(`admin/configs/${option!.id}`, { data: option });
  }
}

class SummaryInteractor {
  async single(
    option?: { [key: string]: any } | undefined
  ): Promise<SummaryEntity> {
    try {
      const request = await axios.client().get(`admin/summaries/${option!.id}`);
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }

  async collections(
    option?: { [key: string]: any } | undefined
  ): Promise<SummaryEntity[]> {
    try {
      const request = await axios
        .client()
        .get(`admin/summaries`, { params: option });
      const results = request.data;
      return results;
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }
}

class ExportInteractor {
  async single(option?: { [key: string]: any } | undefined): Promise<void> {
    try {
      await axios.client().get(`admin/exports/${option!.id}`);
    } catch (error: any) {
      throw ErrorHandler.read(error);
    }
  }
}

export {
  InnInteractor,
  LocationInteractor,
  RoomInteractor,
  EmployeeInteractor,
  RosterInteractor,
  GuestInteractor,
  VoucherInteractor,
  ConfigInteractor,
  SummaryInteractor,
  ExportInteractor,
};
