import { isAxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

export type ValidationError = Record<string, string>;

export interface ApiErrorResponse {
  message: string;
  errors?: ValidationError;
}

export class AppError extends Error {
  public readonly errors?: ValidationError;
  public readonly statusCode?: number;

  constructor(message: string, errors?: ValidationError, statusCode?: number) {
    super(message);
    this.name = "AppError";
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    const message = data?.message || data?.error || error.message || "An unexpected error occurred";
    const errors = data?.errors; // Expecting backend to send { errors: { field: "message" } }
    
    return {
      message,
      errors,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "An unexpected error occurred" };
};

export function setFormErrors(
  errors: ValidationError | undefined,
  setError: UseFormSetError<any>
) {
  if (!errors) return;

  Object.entries(errors).forEach(([field, message]) => {
    setError(field, {
      type: "manual",
      message: message as string,
    });
  });
}
