// ============================================
// SANITIZE UTILITIES - XSS Prevention
// ============================================

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Untrusted text to escape
 * @returns {string} Safe HTML-escaped string
 */
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return String(text);
  }
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Creates a text node safely (for DOM insertion)
 * @param {string} text - Text content
 * @returns {Text} Text node
 */
function safeText(text) {
  return document.createTextNode(text);
}

/**
 * Safely sets text content on an element
 * @param {HTMLElement} element - Target element
 * @param {string} text - Text content
 */
function setTextContent(element, text) {
  if (element) {
    element.textContent = text;
  }
}

// Export
window.escapeHtml = escapeHtml;
window.safeText = safeText;
window.setTextContent = setTextContent;
