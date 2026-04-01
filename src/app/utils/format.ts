// Format utility functions

export function formatTimeDifference(hours: number, minutes: number): string {
  const absHours = Math.abs(hours);
  const absMinutes = Math.abs(minutes);
  const sign = hours >= 0 ? '+' : '-';
  
  if (absMinutes === 0) {
    return `${sign}${absHours} hour${absHours !== 1 ? 's' : ''}`;
  }
  
  return `${sign}${absHours}:${String(absMinutes).padStart(2, '0')} hours`;
}

export function formatDayDifference(dayDiff: number): string {
  if (dayDiff === 0) return 'Same calendar day';
  if (dayDiff === 1) return '+1 calendar day';
  if (dayDiff === -1) return '-1 calendar day';
  return `${dayDiff > 0 ? '+' : ''}${dayDiff} calendar days`;
}

export function copyToClipboard(text: string): Promise<void> {
  // Try modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      // Fallback to older method if Clipboard API fails
      return fallbackCopyToClipboard(text);
    });
  }
  
  // Use fallback method if Clipboard API is not available
  return fallbackCopyToClipboard(text);
}

function fallbackCopyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        resolve();
      } else {
        reject(new Error('Copy command failed'));
      }
    } catch (err) {
      document.body.removeChild(textArea);
      reject(err);
    }
  });
}

export function formatUnixTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

export function parseUnixTime(input: string): number | null {
  const num = parseInt(input, 10);
  if (isNaN(num)) return null;
  return num;
}