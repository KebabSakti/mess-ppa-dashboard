//"https://amm-cottage.com/"; http://192.168.3.126:1001/
class RemoteApi {
  static url = "https://amm-cottage.com/";
  static base = this.url + "rest/";

  static auth = "auth/admin";
  static bookings = "admin/bookings";
}

export { RemoteApi };
