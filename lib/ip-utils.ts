/**
 * Utility functions for IP address handling and validation
 */

/**
 * Validates if a string is a valid IPv4 address
 */
export function isValidIPv4(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}

/**
 * Validates if a string is a valid IPv6 address
 */
export function isValidIPv6(ip: string): boolean {
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::|^([0-9a-fA-F]{1,4}:){1,7}:$|^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$|^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$|^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$|^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$|^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$/;
  return ipv6Regex.test(ip);
}

/**
 * Validates if a string is a valid IP address (IPv4 or IPv6)
 */
export function isValidIP(ip: string): boolean {
  return isValidIPv4(ip) || isValidIPv6(ip);
}

/**
 * Sanitizes and validates an IP address
 * Returns the cleaned IP or 'unknown' if invalid
 */
export function sanitizeIP(ip: string | null | undefined): string {
  if (!ip || typeof ip !== 'string') {
    return 'unknown';
  }

  // Remove any quotes and trim whitespace
  const cleanedIP = ip.replace(/['"]/g, '').trim();

  // Check if it's a valid IP
  if (isValidIP(cleanedIP)) {
    return cleanedIP;
  }

  return 'unknown';
}

/**
 * Extracts IP from x-forwarded-for header which may contain multiple IPs
 */
export function extractIPFromForwarded(forwardedHeader: string): string {
  if (!forwardedHeader) {
    return 'unknown';
  }

  // Split by comma and take the first IP (client IP)
  const ips = forwardedHeader.split(',');
  const firstIP = ips[0]?.trim();

  return sanitizeIP(firstIP);
}

/**
 * Checks if an IP is a private/internal IP address
 */
export function isPrivateIP(ip: string): boolean {
  if (!isValidIPv4(ip)) {
    return false;
  }

  const parts = ip.split('.').map(Number);
  
  // 10.0.0.0/8
  if (parts[0] === 10) {
    return true;
  }
  
  // 172.16.0.0/12
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
    return true;
  }
  
  // 192.168.0.0/16
  if (parts[0] === 192 && parts[1] === 168) {
    return true;
  }
  
  // 127.0.0.0/8 (localhost)
  if (parts[0] === 127) {
    return true;
  }

  return false;
}

/**
 * Gets a human-readable description of IP detection status
 */
export function getIPStatus(ip: string): string {
  if (ip === 'unknown') {
    return 'IP could not be determined';
  }
  
  if (!isValidIP(ip)) {
    return 'Invalid IP format';
  }
  
  if (isPrivateIP(ip)) {
    return 'Private/Internal IP detected';
  }
  
  return 'Public IP detected';
}
