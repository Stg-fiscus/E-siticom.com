import { Logo } from "@components/Logo/Logo";
import { Button } from "antd";



interface IErrorHandleProps {
  error: any;
  resetErrorBoundary: () => void;
}

export const ErrorHandle = ({
  error,
  resetErrorBoundary,
}: IErrorHandleProps) => {
  const isNotProd = !(import.meta as any).env.PROD;

  return (
    <div className="relative flex h-screen w-screen items-center justify-center text-6xl text-slate-700">
      <div>
        <div className="absolute inset-4 w-10">
          <Logo />
        </div>
        <div>
          {error?.response?.status && isNotProd ? (
            <p>{error?.response?.status} | </p>
          ) : null}
          <p>{isNotProd && error.message}</p>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="h-10 text-base" onClick={resetErrorBoundary}>
            <Button>Дахин ачаалах</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
