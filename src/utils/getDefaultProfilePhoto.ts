import { DEFAULT_AVATARS } from "@/constants/defaultAvatars";
import { UserRole } from "@/types/api/user";

/**
 * Returns the profile photo path for a user based on their role and custom photo path.
 * If a custom photo path is provided, it will be returned. Otherwise, returns the default
 * avatar based on the user's role.
 * 
 * @param userRole - The role of the user ('admin' or 'user')
 * @param customPhotoPath - Optional custom photo path for the user
 * @returns The path to either the custom photo or the default role-based avatar
 */
export function getDefaultProfilePhoto(userRole: UserRole = UserRole.User, customPhotoPath?: string | null) {
  if (customPhotoPath) {
    return customPhotoPath;
  }

  return DEFAULT_AVATARS[userRole as keyof typeof DEFAULT_AVATARS];
}