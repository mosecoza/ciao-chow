import { PropsWithChildren } from "react";

interface Props {
  UIClass?: string;
}

const AppLayout = ({ children, UIClass }: PropsWithChildren<Props>) => (
  <main
    style={{ height: "100vh" }}
    className={`max-h-screen flex justify-between flex-col ${UIClass ?? ""}`}
  >
    {children}
  </main>
);

export default AppLayout;
