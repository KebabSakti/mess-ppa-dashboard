//"https://amm-cottage.com/rest/"; http://192.168.3.126:1001/
class RemoteApi {
  static url = "http://192.168.3.126:1001/";
  static base = this.url + "rest/";

  static auth = "auth/admin";
  static bookings = "admin/bookings";
}

export { RemoteApi };
