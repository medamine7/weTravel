import { UserRole } from "~/types/user";

type Resource = "travels";
type Action = "read" | "write" | "delete";

interface Permissions {
  [resource: string]: {
    [role in UserRole]?: Action[];
  };
}

export function hasPermission(
  userRole: UserRole,
  resource: Resource,
  action: Action,
): boolean {
  const permissions: Permissions = {
    travels: {
      [UserRole.USER]: ["read"],
      [UserRole.ADMIN]: ["read", "write", "delete"],
    },
  };

  if (!permissions[resource] || !permissions[resource][userRole]) {
    return false;
  }

  return permissions[resource][userRole]?.includes(action) ?? false;
}
