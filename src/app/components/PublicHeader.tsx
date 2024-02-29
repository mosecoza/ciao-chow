import React, { PropsWithChildren } from "react";

interface Props {
  auth?: boolean;
}

const PublicHeader = ({ auth, children }: PropsWithChildren<Props>) => (
  <section className={`public-header${auth ? "-auth" : ""}`}>
    <div className=" container">{children}</div>
  </section>
);

export default PublicHeader;
146;
