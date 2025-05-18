// Get API URL from environment variable or use relative path as fallback
export const API_URL = String(window.location.origin).includes("jose")
  ? "https://api.joserizal.devbitapp.be/api"
  : "http://localhost:8000/";

// Helper function to construct image URLs
export function getImageUrl(path) {
  if (!path) return null;

  // If the path already has the /api prefix or starts with http, return it as is
  if (path.startsWith("/api/") || path.startsWith("http")) {
    return path;
  }

  // Ensure the path starts with a slash for proper URL construction
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL.replace(".be/api", ".be")}${formattedPath}`;
}

// Create a wrapper for fetch that includes authorization and common headers
export async function apiRequest(endpoint, options = {}) {
  const token = getCookie("access_token");

  // Ensure headers object exists
  options.headers = options.headers || {};

  // Only set Content-Type if we're not sending FormData
  // For FormData, let the browser set the content type automatically
  if (!(options.body instanceof FormData)) {
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  } else {
    // For FormData, we should NOT set Content-Type
    // Let the browser handle it (it will set multipart/form-data with boundary)
    options.headers = {
      ...options.headers,
    };
  }

  // Add authorization if token exists
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  // Build the full URL (handle both absolute and relative endpoints)
  // For relative endpoints, ensure they work with the API_URL that already includes '/api'
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (window.location.protocol === "https:") {
    // If the current protocol is HTTPS, ensure the request is also made over HTTPS
    url = url.replace("http://", "https://");
  }

  // Make the request
  return fetch(url, options);
}

// Helper function to get cookies (duplicated from various components)
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
