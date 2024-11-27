import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRoleStore } from './roleStore';

const initialPermissions = [
  { id: 1, name: 'read', description: 'Can read data' },
  { id: 2, name: 'write', description: 'Can create and edit data' },
  { id: 3, name: 'delete', description: 'Can delete data' },
  { id: 4, name: 'manage_users', description: 'Can manage users' },
  { id: 5, name: 'manage_roles', description: 'Can manage roles' }
];

export const usePermissionStore = create(
  persist(
    (set) => ({
      permissions: initialPermissions,
      addPermission: (permission) => {
        set((state) => ({
          permissions: [...state.permissions, { ...permission, id: Date.now() }]
        }));
      },
      updatePermission: (updatedPermission) => {
        set((state) => ({
          permissions: state.permissions.map(permission =>
            permission.id === updatedPermission.id ? updatedPermission : permission
          )
        }));
      },
      deletePermission: (permissionId) => {
        set((state) => {
          const newPermissions = state.permissions.filter(permission => permission.id !== permissionId);
          // After deleting a permission, sync roles
          setTimeout(() => useRoleStore.getState().syncRolePermissions(), 0);
          return { permissions: newPermissions };
        });
      }
    }),
    {
      name: 'permission-storage'
    }
  )
);