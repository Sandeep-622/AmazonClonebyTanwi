import { GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../images/logo.png";
import { FcGoogle } from "react-icons/fc";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface SignInProps {
  providers: Record<string, Provider>;
}

export default function SignIn({ providers }: SignInProps) {
  const router = useRouter();

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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Continue shopping on Amazon Clone
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amazon_blue hover:bg-amazon_blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon_blue transition-colors duration-200"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => router.push("/")}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon_blue transition-colors duration-200"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers: providers ?? {},
    },
  };
};
