import { UserRole } from "~/types/user";

type Resource = "travels" | "tours";
type Action = "read" | "write" | "delete";

interface Permissions {
  [resource: string]: {
    [role in UserRole]?: Action[];
  };
}

export function hasPermission(
  userRole: UserRole | undefined,
  resource: Resource,
  action: Action,
): boolean {
  const permissions: Permissions = {
    travels: {
      [UserRole.USER]: ["read"],
      [UserRole.ADMIN]: ["read", "write", "delete"],
    },
    tours: {
      [UserRole.USER]: ["read"],
      [UserRole.ADMIN]: ["read", "write", "delete"],
    },
  };

  if (!userRole) {
    return false;
  }

  if (!permissions[resource] || !permissions[resource][userRole]) {
    return false;
  }

  return permissions[resource][userRole]?.includes(action) ?? false;
}
