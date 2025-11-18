let cameraDataCache = null;

/**
 * Parses CSV text into an array of objects
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(',').map(h => h.trim());

  // Parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    data.push(row);
  }

  return data;
}

/**
 * Parses a CSV line handling quoted values with commas
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim()); // Push last value

  return result;
}

/**
 * Extracts camera number from URL (e.g., cam0451 -> CAM0451)
 */
export function extractCameraNumberFromUrl(url) {
  const match = url.match(/cam(\d+)/i);
  if (match) {
    return `CAM${match[1].padStart(4, '0')}`;
  }
  return null;
}

/**
 * Loads and parses the CSV file, caching the result
 */
export async function loadCameraData() {
  if (cameraDataCache) {
    return cameraDataCache;
  }

  try {
    const response = await fetch('/cameras_rows.csv');
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    const data = parseCSV(csvText);

    // Create a map indexed by camera_number
    cameraDataCache = new Map();
    data.forEach((camera) => {
      cameraDataCache.set(camera.camera_number, camera);
    });

    return cameraDataCache;
  } catch (error) {
    console.error('Error loading camera data:', error);
    return new Map();
  }
}

/**
 * Gets camera data by camera number
 */
export async function getCameraDataByNumber(cameraNumber) {
  const dataMap = await loadCameraData();
  return dataMap.get(cameraNumber) || null;
}

/**
 * Gets camera data by URL (extracts camera number from URL)
 */
export async function getCameraDataByUrl(url) {
  const cameraNumber = extractCameraNumberFromUrl(url);
  if (!cameraNumber) return null;
  return getCameraDataByNumber(cameraNumber);
}

