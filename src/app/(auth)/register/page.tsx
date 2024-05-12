import RegistrationForm from "@/components/login/registrationForm/registrationForm";

const RegisterPage = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-lg bg-gray-800 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600 sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700">
        <div className="w-full rounded-lg bg-gray-800 shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600 sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Register
            </h1>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
