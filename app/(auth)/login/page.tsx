import { UserAuthForm } from "./_components/user-auth-form";

const LoginPage = () => {
  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl font-medium text-center">Welcome</h1>
      </div>
      <div className="mt-4">
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
