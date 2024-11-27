# Role-Based Access Control (RBAC) System

## Overview

A comprehensive Role-Based Access Control system built with React, featuring user management, role management, and permission-based access control. The application provides different dashboards for admin, editor, and viewer roles, with granular permission controls.

## Features

- 🔐 User Authentication
- 👥 User Management
- 🎭 Role Management
- 🔑 Permission Management
- 📊 Role-specific Dashboards
- 💾 Persistent Storage
- 🎨 Responsive UI with Tailwind CSS

## Tech Stack

- React
- Zustand (State Management)
- React Router
- Tailwind CSS
- Vite

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

### Authentication

- Navigate to `/login`
- Use provided default credentials to log in
- System will redirect to appropriate dashboard based on role

### Role-Specific Features

#### Admin

- Full system access
- Manage users, roles, and permissions
- View system statistics
- Cannot be deleted or deactivated

#### Editor

- Create and edit content
- Manage viewer users
- View active users
- Limited permission management

#### Viewer

- Read-only access
- View personal profile
- View system statistics

## State Management

The application uses Zustand for state management with three main stores:

### AuthStore

- User authentication
- User management
- Permission checking

### RoleStore

- Role management
- Permission assignment
- Role synchronization

### PermissionStore

- Permission management
- Permission tracking
- System-wide permission sync

## Security Features

- Protected routes
- Role-based access control
- Permission-based feature access
- Inactive user detection
- Admin account protection
