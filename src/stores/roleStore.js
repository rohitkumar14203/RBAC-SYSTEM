import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePermissionStore } from "./permissionStore";

const initialRoles = [
  {
    id: 1,
    name: "admin",
    permissions: [
      "read",
      "write",
      "delete",
      "manage_users",
      "manage_roles",
      "manage_permissions",
    ],
  },
  { id: 2, name: "editor", permissions: ["read", "write"] },
  { id: 3, name: "viewer", permissions: ["read"] },
];

export const useRoleStore = create(
  persist(
    (set, get) => ({
      roles: initialRoles,
      addRole: (role) =>
        set((state) => ({
          roles: [...state.roles, { ...role, id: Date.now() }],
        })),
      updateRole: (updatedRole) =>
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === updatedRole.id ? updatedRole : role
          ),
        })),
      deleteRole: (roleId) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== roleId),
        })),
      // New method to sync role permissions with available permissions
      syncRolePermissions: () => {
        const availablePermissions = usePermissionStore
          .getState()
          .permissions.map((p) => p.name);
        set((state) => ({
          roles: state.roles.map((role) => ({
            ...role,
            permissions: role.permissions.filter((p) =>
              availablePermissions.includes(p)
            ),
          })),
        }));
      },
    }),
    {
      name: "role-storage",
    }
  )
);
