"use client";

import { Link, useRouter } from "@/i18n/navigation";
import axios from "axios";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  const isUnauthorized = error.message.toLowerCase().includes("unauthorized");
  const loginNavigationHandler = () => {
    axios.get("/api/logout"); //TODO:fix it
    router.push("/");
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl border border-red-200 rounded-2xl p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-4">
          {isUnauthorized ? "Unauthorized" : "Something went wrong"}
        </h1>

        <p className="text-gray-700 dark:text-gray-800 mb-8 text-sm md:text-base">
          {error.message || "An unexpected error occurred."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isUnauthorized ? (
            <Link
              href="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
            >
              Go to Login
            </Link>
          ) : (
            <>
              <button
                onClick={reset}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
              >
                Try Again
              </button>
              <button
                onClick={loginNavigationHandler}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition duration-200"
              >
                Go Home
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
