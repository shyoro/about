/**
 * Message interface for filtering
 */
export interface FilterableMessage {
  id?: string;
  role: string;
  content: string;
}

/**
 * Filters messages to remove assistant responses and initial greeting
 * Returns only user messages for clean contact extraction context
 * @param messages - Array of messages to filter
 * @returns Filtered array containing only user messages
 */
export function filterMessagesForExtraction(messages: FilterableMessage[]): Array<{ role: string; content: string }> {
  return messages
    .filter((msg) => {
      // Remove all assistant messages
      if (msg.role === 'assistant') {
        return false;
      }

      // Remove initial greeting message
      if (msg.id === 'initial') {
        return false;
      }

      // Keep only user messages
      return msg.role === 'user';
    })
    .map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
}

