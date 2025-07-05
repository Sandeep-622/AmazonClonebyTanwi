import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../images/logo.png";
import { useEffect, useState } from "react";

export default function AuthError() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      switch (error) {
        case "Configuration":
          setError("There is a problem with the server configuration.");
          break;
        case "AccessDenied":
          setError("You do not have permission to sign in.");
          break;
        case "Verification":
          setError("The verification link has expired.");
          break;
        default:
          setError("An unknown error occurred.");
      }
    }
  }, [router.query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            className="h-12 w-auto"
            src={logo}
            alt="Amazon Clone"
            width={150}
            height={50}
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Authentication Error
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Authentication failed
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/auth/signin")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amazon_blue hover:bg-amazon_blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon_blue transition-colors duration-200"
            >
              Try Again
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => router.push("/")}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon_blue transition-colors duration-200"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
