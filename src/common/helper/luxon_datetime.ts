import { DateTime } from "luxon";

class LuxonDatetime {
  static toHuman(dt: string): string {
    const date = DateTime.fromISO(dt)
      .setLocale("id")
      .setZone("Asia/Kuala_Lumpur")
      .toLocaleString(DateTime.DATETIME_SHORT);

    return date;
  }

  static startGTEnd(start: string, end: string): boolean {
    const dtStart = DateTime.fromISO(start);
    const dtEnd = DateTime.fromISO(end);
    const results = dtStart > dtEnd;

    return results;
  }
}

export { LuxonDatetime };
