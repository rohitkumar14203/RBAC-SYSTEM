import React from "react";
import DashboardStats from "./DashboardStats";
import { useAuthStore } from "../../stores/authStore";
import { useRoleStore } from "../../stores/roleStore";

export default function ViewerDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const roles = useRoleStore((state) => state.roles);

  // Get viewer role permissions
  const viewerPermissions =
    roles.find((role) => role.name === "viewer")?.permissions || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Viewer Overview</h2>
      <DashboardStats />

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Role
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser?.role}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Your Permissions
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {viewerPermissions.map((permission) => (
                <span
                  key={permission}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                >
                  {permission}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
