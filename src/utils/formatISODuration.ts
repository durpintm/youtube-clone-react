export function formatISODuration(duration: string): string {
  // Extend the regex to include hours
  const durationRegex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = duration.match(durationRegex);

  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  if (matches) {
    // If there are hours, remove the 'H' and ensure it's two digits
    if (matches[1]) {
      hours = matches[1].replace("H", "").padStart(2, "0");
    }
    // If there are minutes, remove the 'M' and ensure it's two digits
    if (matches[2]) {
      minutes = matches[2].replace("M", "").padStart(2, "0");
    }
    // If there are seconds, remove the 'S' and ensure it's two digits
    if (matches[3]) {
      seconds = matches[3].replace("S", "").padStart(2, "0");
    }
  }

  return `${hours}:${minutes}:${seconds}`;
}

// Example Usage
const duration = "PT1H11M56S";
console.log(formatISODuration(duration)); // Output: "01:11:56"
