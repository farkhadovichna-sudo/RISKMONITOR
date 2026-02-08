// ============================================
// COLOR UTILITIES - Static Tailwind Class Mappings
// For CDN compatibility (dynamic class strings don't compile)
// ============================================

/**
 * Static color class mappings for Tailwind CDN
 * Usage: COLOR_CLASSES.red.bg instead of `bg-${color}-500`
 */
const COLOR_CLASSES = {
  red: {
    bg: 'bg-red-500',
    bgLight: 'bg-red-500/10',
    bgPill: 'bg-red-500/90',
    text: 'text-red-500',
    textLight: 'text-red-400',
    border: 'border-red-500/20',
    borderMedium: 'border-red-500/30',
    borderStrong: 'border-red-500/50'
  },
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-500/10',
    bgPill: 'bg-orange-500/90',
    text: 'text-orange-500',
    textLight: 'text-orange-400',
    border: 'border-orange-500/20',
    borderMedium: 'border-orange-500/30',
    borderStrong: 'border-orange-500/50'
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgLight: 'bg-yellow-500/10',
    bgPill: 'bg-yellow-500/90',
    text: 'text-yellow-500',
    textLight: 'text-yellow-400',
    border: 'border-yellow-500/20',
    borderMedium: 'border-yellow-500/30',
    borderStrong: 'border-yellow-500/50'
  },
  green: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-500/10',
    bgPill: 'bg-green-500/90',
    text: 'text-green-500',
    textLight: 'text-green-400',
    border: 'border-green-500/20',
    borderMedium: 'border-green-500/30',
    borderStrong: 'border-green-500/50'
  },
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    bgPill: 'bg-blue-500/90',
    text: 'text-blue-500',
    textLight: 'text-blue-400',
    border: 'border-blue-500/20',
    borderMedium: 'border-blue-500/30',
    borderStrong: 'border-blue-500/50'
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-500/10',
    bgPill: 'bg-purple-500/90',
    text: 'text-purple-500',
    textLight: 'text-purple-400',
    border: 'border-purple-500/20',
    borderMedium: 'border-purple-500/30',
    borderStrong: 'border-purple-500/50'
  },
  gray: {
    bg: 'bg-gray-500',
    bgLight: 'bg-gray-500/10',
    bgPill: 'bg-gray-500/90',
    text: 'text-gray-500',
    textLight: 'text-gray-400',
    border: 'border-gray-500/20',
    borderMedium: 'border-gray-500/30',
    borderStrong: 'border-gray-500/50'
  }
};

/**
 * Get color classes for a risk band
 * @param {string} band - 'high', 'medium', or 'low'
 * @returns {object} Color classes object
 */
function getRiskColorClasses(band) {
  const riskColors = {
    high: COLOR_CLASSES.red,
    medium: COLOR_CLASSES.orange,
    low: COLOR_CLASSES.green
  };
  return riskColors[band] || COLOR_CLASSES.gray;
}

/**
 * Get color classes for a status
 * @param {string} status - 'new', 'in_review', 'closed'
 * @returns {object} Color classes object
 */
function getStatusColorClasses(status) {
  const statusColors = {
    new: COLOR_CLASSES.blue,
    in_review: COLOR_CLASSES.yellow,
    closed: COLOR_CLASSES.green
  };
  return statusColors[status] || COLOR_CLASSES.gray;
}

// Export
window.COLOR_CLASSES = COLOR_CLASSES;
window.getRiskColorClasses = getRiskColorClasses;
window.getStatusColorClasses = getStatusColorClasses;
