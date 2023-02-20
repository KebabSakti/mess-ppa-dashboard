interface BookingEntity {
  id?: string;
  userId?: string;
  roomId?: string;
  bookingId?: string;
  checkin?: string;
  checkout?: string;
  name?: string;
  picture?: string;
  phone?: string;
  nrp?: string;
  mess?: string;
  location?: string;
  room?: string;
  checkinNote?: string;
  checkoutNote?: string;
  extra?: string;
  note?: string;
  guest?: boolean;
  created?: string;
  updated?: string;
}

export type { BookingEntity };
