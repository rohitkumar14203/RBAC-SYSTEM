import React, { useState } from "react";
import { useRoleStore } from "../stores/roleStore";
import { usePermissionStore } from "../stores/permissionStore";
import { useAuthStore } from "../stores/authStore";

export default function RoleManagement() {
  const { roles, addRole, updateRole, deleteRole } = useRoleStore();
  const { permissions } = usePermissionStore();
  const { currentUser } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      updateRole({ ...editingRole, ...formData });
    } else {
      addRole({ ...formData, id: Date.now() });
    }
    setIsModalOpen(false);
    setEditingRole(null);
    setFormData({ name: "", permissions: [] });
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      permissions: role.permissions,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (roleId) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      deleteRole(roleId);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Role Management
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Add Role
        </button>
      </div>

      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {role.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openEditModal(role)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  {currentUser?.permissions.includes("manage_roles") &&
                    role.name !== "admin" && (
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingRole ? "Edit Role" : "Add Role"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Permissions
                  </label>
                  <div className="mt-2 space-y-2">
                    {permissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(
                            permission.name
                          )}
                          onChange={(e) => {
                            const newPermissions = e.target.checked
                              ? [...formData.permissions, permission.name]
                              : formData.permissions.filter(
                                  (p) => p !== permission.name
                                );
                            setFormData({
                              ...formData,
                              permissions: newPermissions,
                            });
                          }}
                          className="rounded border border-gray-900 shadow-sm focus:border-blue-700 focus:ring-blue-700"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {permission.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingRole(null);
                    setFormData({ name: "", permissions: [] });
                  }}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  {editingRole ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
