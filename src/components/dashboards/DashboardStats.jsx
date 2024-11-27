import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useRoleStore } from '../../stores/roleStore';
import { usePermissionStore } from '../../stores/permissionStore';

export default function DashboardStats() {
  const { users } = useAuthStore();
  const { roles } = useRoleStore();
  const { permissions } = usePermissionStore();

  const stats = [
    { name: 'Total Users', value: users.length },
    { name: 'Active Users', value: users.filter(u => u.status === 'active').length },
    { name: 'Total Roles', value: roles.length },
    { name: 'Total Permissions', value: permissions.length },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.value}
            </dd>
          </div>
        </div>
      ))}
    </div>
  );
}