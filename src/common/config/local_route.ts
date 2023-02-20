class LocalRoute {
  static root = "/";
  static dashboard = "/dashboard";
  static booking = `${this.dashboard}/booking`;
  static mess = `${this.dashboard}/mess`;
  static location = `${this.dashboard}/location`;
  static room = `${this.dashboard}/room`;
  static voucher = `${this.dashboard}/voucher`;
  static roster = `${this.dashboard}/roster`;
  static user = `${this.dashboard}/user`;
}

export { LocalRoute };
