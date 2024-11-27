import React from 'react';
import DashboardStats from './DashboardStats';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Overview</h2>
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <p className="text-gray-600">• Manage users and their permissions</p>
            <p className="text-gray-600">• Configure roles and access levels</p>
            <p className="text-gray-600">• Monitor system activities</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-2">
            <p className="text-gray-600">• All systems operational</p>
            <p className="text-gray-600">• User authentication active</p>
            <p className="text-gray-600">• Permissions synced</p>
          </div>
        </div>
      </div>
    </div>
  );
}