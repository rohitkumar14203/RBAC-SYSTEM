import { create } from "zustand";
import { persist } from "zustand/middleware";

const adminUser = {
  id: 1,
  email: "admin@example.com",
  password: "admin",
  name: "Admin User",
  role: "admin",
  status: "active",
  permissions: [
    "read",
    "write",
    "delete",
    "manage_users",
    "manage_roles",
    "manage_permissions",
  ],
};

const initialUsers = [
  adminUser,
  {
    id: 2,
    email: "editor@example.com",
    password: "editor",
    name: "Editor User",
    role: "editor",
    status: "active",
    permissions: ["read", "write"],
  },
  {
    id: 3,
    email: "viewer@example.com",
    password: "viewer",
    name: "Viewer User",
    role: "viewer",
    status: "active",
    permissions: ["read"],
  },
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      users: initialUsers,
      currentUser: null,

      login: (credentials) => {
        const { users } = get();
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          return false;
        }

        if (user.id !== 1 && user.status === "inactive") {
          return "inactive";
        }

        const { password, ...userWithoutPassword } = user;
        set({ currentUser: userWithoutPassword });
        return true;
      },

      updateUser: (updatedUser) =>
        set((state) => {
          const currentUser = state.currentUser;

          if (
            currentUser?.role === "admin" &&
            currentUser?.id === updatedUser.id
          ) {
            return {
              users: state.users.map((user) => {
                if (user.id === updatedUser.id) {
                  return {
                    ...user,
                    ...updatedUser,
                    role: "admin",
                    status: "active",
                    permissions: [
                      "read",
                      "write",
                      "delete",
                      "manage_users",
                      "manage_roles",
                      "manage_permissions",
                    ],
                    password: updatedUser.password || user.password,
                  };
                }
                return user;
              }),
              currentUser: state.currentUser,
            };
          }

          const newUsers = state.users.map((user) => {
            if (user.id === updatedUser.id) {
              if (currentUser?.role === "admin") {
                return {
                  ...user,
                  ...updatedUser,
                  password: updatedUser.password || user.password,
                };
              }
              return {
                ...user,
                ...updatedUser,
                role: user.role,
                permissions: user.permissions,
                password: user.password,
              };
            }
            return user;
          });

          const newCurrentUser =
            state.currentUser?.id === updatedUser.id
              ? { ...state.currentUser, ...updatedUser }
              : state.currentUser;

          return {
            users: newUsers,
            currentUser: newCurrentUser,
          };
        }),

      addUser: (userData) =>
        set((state) => ({
          users: [
            ...state.users,
            {
              ...userData,
              id: Date.now(),
              permissions:
                userData.role === "admin"
                  ? [
                      "read",
                      "write",
                      "delete",
                      "manage_users",
                      "manage_roles",
                      "manage_permissions",
                    ]
                  : userData.permissions,
            },
          ],
        })),
      deleteUser: (userId) =>
        set((state) => {
          if (userId === 1) {
            return state;
          }

          return {
            users: state.users.filter((user) => user.id !== userId),
            currentUser:
              state.currentUser?.id === userId ? null : state.currentUser,
          };
        }),
      logout: () => set({ currentUser: null }),
      hasPermission: (permission) => {
        const { currentUser } = get();
        return currentUser?.permissions.includes(permission);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        users: state.users.map((user) => ({
          ...user,
          status: user.id === 1 ? "active" : user.status,
        })),
        currentUser: state.currentUser,
      }),
    }
  )
);
