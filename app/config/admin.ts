/**
 * Admin Configuration
 *
 * Admin-related settings and permissions
 */

export const adminConfig = {
  // Admin wallet addresses (loaded from environment)
  addresses: (process.env.ADMIN_ADDRESSES || '')
    .toLowerCase()
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean),

  // Admin panel settings
  panel: {
    postsPerPage: 20,
    allowPostDrafts: true,
    allowScheduledPosts: false,
  },

  // Content restrictions
  content: {
    maxPostTitleLength: 200,
    maxPostSlugLength: 100,
    maxCommentLength: 2000,
  },

  // Default post settings
  defaultPost: {
    published: true,
    coverImage: null,
  },
} as const;

export type AdminConfig = typeof adminConfig;

// Helper function to check if an address is an admin
export function isAdminAddress(address: string): boolean {
  return adminConfig.addresses.includes(address.toLowerCase());
}
