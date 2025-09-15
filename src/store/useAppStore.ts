import { create } from "zustand";

// Notification/Alert types
export interface Notification {
	id: string;
	type: "success" | "error" | "warning" | "info";
	title: string;
	message?: string;
	duration?: number;
}

// App configuration
export interface AppConfig {
	apiBaseUrl: string;
	apiKey: string;
	appName: string;
	version: string;
	enableDevTools: boolean;
}

// App Store State
interface AppState {
	// Configuration
	config: AppConfig;

	// UI State
	isLoading: boolean;
	notifications: Notification[];

	// Actions
	setLoading: (loading: boolean) => void;
	addNotification: (notification: Omit<Notification, "id">) => void;
	removeNotification: (id: string) => void;
	clearNotifications: () => void;
}

// Default configuration from environment variables
const defaultConfig: AppConfig = {
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
	apiKey:
		import.meta.env.VITE_API_KEY || "default-api-key-change-in-production",
	appName: import.meta.env.VITE_APP_NAME || "Workspace Booking System",
	version: import.meta.env.VITE_APP_VERSION || "1.0.0",
	enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === "true",
};

// Create the store
export const useAppStore = create<AppState>((set, get) => ({
	// Initial state
	config: defaultConfig,
	isLoading: false,
	notifications: [],

	// Actions
	setLoading: (loading: boolean) => {
		set({ isLoading: loading });
	},

	addNotification: (notification: Omit<Notification, "id">) => {
		const id = `notification-${Date.now()}-${Math.random()}`;
		const newNotification: Notification = {
			id,
			duration: 5000, // 5 seconds default
			...notification,
		};

		set((state) => ({
			notifications: [...state.notifications, newNotification],
		}));

		// Auto-remove notification after duration
		if (newNotification.duration && newNotification.duration > 0) {
			setTimeout(() => {
				get().removeNotification(id);
			}, newNotification.duration);
		}
	},

	removeNotification: (id: string) => {
		set((state) => ({
			notifications: state.notifications.filter((n) => n.id !== id),
		}));
	},

	clearNotifications: () => {
		set({ notifications: [] });
	},
}));

// Convenience hooks for common operations
export const useNotifications = () => {
	const notifications = useAppStore((state) => state.notifications);
	const addNotification = useAppStore((state) => state.addNotification);
	const removeNotification = useAppStore((state) => state.removeNotification);
	const clearNotifications = useAppStore((state) => state.clearNotifications);

	return {
		notifications,
		addNotification,
		removeNotification,
		clearNotifications,
	};
};

export const useLoading = () => {
	const isLoading = useAppStore((state) => state.isLoading);
	const setLoading = useAppStore((state) => state.setLoading);

	return {
		isLoading,
		setLoading,
	};
};

export const useAppConfig = () => {
	return useAppStore((state) => state.config);
};
