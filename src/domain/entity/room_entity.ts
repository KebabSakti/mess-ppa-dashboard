interface RoomEntity {
  id?: string;
  innId?: string;
  locationId?: string;
  mess?: string;
  location?: string;
  name?: string;
  picture?: string;
  capacity?: number;
  user?: number;
  full?: boolean;
  active?: boolean;
  created?: string;
  updated?: string;
}

export type { RoomEntity };
