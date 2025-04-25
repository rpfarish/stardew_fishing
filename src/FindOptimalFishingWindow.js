/**
 * Find the minimum time window where each fish has at least one FULL hour within the window.
 * The day goes from 0 (midnight) to 23 (11pm), with times like 24, 25, 26 representing
 * hours after midnight on the next day.
 * @param {Array<Array<number>>} availabilityTimes - List of [start, end] pairs in military time
 *                                e.g., [6, 13] is 6am-1pm, [18, 26] is 6pm-2am
 * @returns {Array<number>} - [startHour, endHour] of optimal window
 */
function findOptimalFishingWindow(availabilityTimes) {
  // First, preprocess the availability times
  // Sort by ending time
  const sortedTimes = [...availabilityTimes].sort((a, b) => a[1] - b[1]);

  // Merge overlapping intervals as described
  const mergedTimes = [];
  for (const time of sortedTimes) {
    // If this is the first interval or there's no overlap with the previous one
    if (
      mergedTimes.length === 0 ||
      time[0] >= mergedTimes[mergedTimes.length - 1][1]
    ) {
      mergedTimes.push([...time]);
    } else {
      // Handle overlap: if current start is before previous end
      // Set current start to previous end
      const newInterval = [mergedTimes[mergedTimes.length - 1][1], time[1]];
      // Only add if start and end aren't equal
      if (newInterval[0] !== newInterval[1]) {
        mergedTimes.push(newInterval);
      }
    }
  }

  // For each hour of the day (0-23) + next day (24-47), determine which fish are available
  const hoursAvailable = Array(48)
    .fill()
    .map(() => new Set());

  // Process each fish's availability
  mergedTimes.forEach((time, fishId) => {
    const [start, end] = time;
    // Mark each full hour this fish is available
    for (let hour = start; hour < end; hour++) {
      hoursAvailable[hour].add(fishId);
    }
  });

  const totalFish = mergedTimes.length;
  let bestWindow = null;

  // Try every possible start hour (within 24-hour window)
  for (let startHour = 0; startHour < 24; startHour++) {
    // Try every possible window length
    for (let length = 1; length <= 24; length++) {
      // Calculate which fish are covered in this window
      const fishCovered = new Set();
      for (let offset = 0; offset < length; offset++) {
        const hour = startHour + offset;
        if (hour < 48) {
          // Stay within our 48-hour range
          hoursAvailable[hour].forEach((fishId) => fishCovered.add(fishId));
        }
      }

      // If all fish are covered, we have a valid window
      if (fishCovered.size === totalFish) {
        const fishing_window = [startHour, startHour + length];
        // Update if this is the first or better window
        if (bestWindow === null || length < bestWindow[1] - bestWindow[0]) {
          bestWindow = fishing_window;
        }
        break; // No need to try longer windows from this start
      }
    }
  }

  return bestWindow;
}

export default findOptimalFishingWindow;
