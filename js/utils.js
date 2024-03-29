// Utility class
class Utils {
  constructor() {}
  static convertTime(duration) {
    let hours = Math.floor(duration / 60)
      .toString()
      .padStart(2, "0");
    let minutes = (duration % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
