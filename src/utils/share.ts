export interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export async function shareInvitation(options: ShareOptions): Promise<{ success: boolean; method: 'share' | 'copy' | 'error' }> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
        url: options.url,
      });
      return { success: true, method: 'share' };
    } catch (err) {
      // If user cancels, we don't treat it as a hard failure requiring copy, but if there's a hard error we fallback.
      if (err instanceof Error && err.name === 'AbortError') {
        return { success: false, method: 'share' }; // Cancelled by user
      }
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(options.url);
    return { success: true, method: 'copy' };
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return { success: false, method: 'error' };
  }
}
