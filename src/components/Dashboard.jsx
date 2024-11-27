import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import AdminDashboard from './dashboards/AdminDashboard';
import EditorDashboard from './dashboards/EditorDashboard';
import ViewerDashboard from './dashboards/ViewerDashboard';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';
import ActiveUsers from './editor/ActiveUsers';
import EditorPermissions from './editor/EditorPermissions';

export default function Dashboard() {
  const { currentUser, logout } = useAuthStore();
  const [activeView, setActiveView] = useState('dashboard');

  // Define navigation items based on user role and permissions
  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', name: 'Dashboard', permission: 'read' }
    ];

    const editorItems = [
      { id: 'active-users', name: 'Active Users', permission: 'read' },
      { id: 'editor-permissions', name: 'Manage Permissions', permission: 'write' }
    ];

    const adminItems = [
      { id: 'users', name: 'User Management', permission: 'manage_users' },
      { id: 'roles', name: 'Role Management', permission: 'manage_roles' },
      { id: 'permissions', name: 'Permission Management', permission: 'manage_roles' }
    ];

    if (currentUser?.role === 'admin') {
      return [...commonItems, ...adminItems];
    } else if (currentUser?.role === 'editor') {
      return [...commonItems, ...editorItems];
    }
    return commonItems;
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        switch (currentUser?.role) {
          case 'admin':
            return <AdminDashboard />;
          case 'editor':
            return <EditorDashboard />;
          case 'viewer':
            return <ViewerDashboard />;
          default:
            return <div>Access Denied</div>;
        }
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleManagement />;
      case 'permissions':
        return <PermissionManagement />;
      case 'active-users':
        return <ActiveUsers />;
      case 'editor-permissions':
        return <EditorPermissions />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">RBAC Dashboard</h1>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-gray-700">Welcome, {currentUser?.name}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {currentUser?.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {getNavigationItems().map((item) => {
                // Only show items the user has permission to see
                if (!currentUser?.permissions.includes(item.permission)) {
                  return null;
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      activeView === item.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}