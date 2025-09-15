// Form validation utilities
export interface ValidationRule<T = any> {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	min?: number;
	max?: number;
	custom?: (value: T) => string | null;
}

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

export const validateField = (
	value: any,
	rules: ValidationRule
): string | null => {
	if (
		rules.required &&
		(!value || (typeof value === "string" && value.trim() === ""))
	) {
		return "This field is required";
	}

	if (!value && !rules.required) {
		return null; // Field is optional and empty
	}

	if (typeof value === "string") {
		if (rules.minLength && value.length < rules.minLength) {
			return `Minimum length is ${rules.minLength} characters`;
		}

		if (rules.maxLength && value.length > rules.maxLength) {
			return `Maximum length is ${rules.maxLength} characters`;
		}

		if (rules.pattern && !rules.pattern.test(value)) {
			return "Invalid format";
		}
	}

	if (typeof value === "number") {
		if (rules.min !== undefined && value < rules.min) {
			return `Minimum value is ${rules.min}`;
		}

		if (rules.max !== undefined && value > rules.max) {
			return `Maximum value is ${rules.max}`;
		}
	}

	if (rules.custom) {
		return rules.custom(value);
	}

	return null;
};

export const validateForm = <T extends Record<string, any>>(
	data: T,
	rules: Record<keyof T, ValidationRule>
): ValidationResult => {
	const errors: Record<string, string> = {};

	for (const [field, fieldRules] of Object.entries(rules)) {
		const error = validateField(data[field], fieldRules);
		if (error) {
			errors[field] = error;
		}
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};

// Specific validation rules for booking form
export const createBookingValidationRules = () => ({
	spaceId: {
		required: true,
	} as ValidationRule,

	clientEmail: {
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		custom: (value: string) => {
			if (!value) return null;
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				return "Please enter a valid email address";
			}
			return null;
		},
	} as ValidationRule<string>,

	startTime: {
		required: true,
		custom: (value: string) => {
			if (!value) return null;
			const startDate = new Date(value);
			const now = new Date();

			if (startDate <= now) {
				return "Start time must be in the future";
			}

			return null;
		},
	} as ValidationRule<string>,

	endTime: {
		required: true,
		custom: (value: string) => {
			if (!value) return null;

			// Note: This validation will be enhanced in the form component
			// where we have access to the full form data
			return null;
		},
	} as ValidationRule<string>,
});

// Helper function to format datetime for input
export const formatDateTimeForInput = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Helper function to get minimum datetime (now + 1 hour)
export const getMinDateTime = (): string => {
	const now = new Date();
	now.setHours(now.getHours() + 1); // Minimum 1 hour from now
	now.setMinutes(0); // Round to nearest hour
	now.setSeconds(0);
	return formatDateTimeForInput(now);
};
