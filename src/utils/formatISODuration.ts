export function formatISODuration(duration: string): string {
  // Extend the regex to include hours
  const durationRegex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = duration.match(durationRegex);

  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  if (matches) {
    if (matches[1]) {
      hours = matches[1].replace("H", "").padStart(2, "0");
    }
    if (matches[2]) {
      minutes = matches[2].replace("M", "").padStart(2, "0");
    }
    if (matches[3]) {
      seconds = matches[3].replace("S", "").padStart(2, "0");
    }
  }

  return hours != "00"
    ? `${hours}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
}
