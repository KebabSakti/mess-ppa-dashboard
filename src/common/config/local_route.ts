class LocalRoute {
  static root = "/";
  static dashboard = "/dashboard";

  static booking = `${this.dashboard}/booking`;
  static bookingDetail = `${this.booking}/detail`;
  static bookingAdd = `${this.booking}/add`;
  static bookingEdit = `${this.booking}/edit`;

  static mess = `${this.dashboard}/mess`;
  static messAdd = `${this.mess}/add`;
  static messEdit = `${this.mess}/edit`;

  static location = `${this.dashboard}/lokasi`;
  static locationAdd = `${this.location}/add`;
  static locationEdit = `${this.location}/edit`;

  static room = `${this.dashboard}/kamar`;
  static roomAdd = `${this.room}/add`;
  static roomEdit = `${this.room}/edit`;

  static employee = `${this.dashboard}/karyawan`;
  static employeeAdd = `${this.employee}/add`;
  static employeeEdit = `${this.employee}/edit`;

  static guest = `${this.dashboard}/tamu`;
  static roster = `${this.dashboard}/roster`;
  static voucher = `${this.dashboard}/voucher`;

  static config = `${this.dashboard}/setting`;
  static configEdit = `${this.config}/edit`;
}

export { LocalRoute };
