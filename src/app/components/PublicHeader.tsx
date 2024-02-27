import React, { PropsWithChildren } from "react";

const PublicHeader = ({ children }: PropsWithChildren) => (
  <section className="public-header">
    <div className=" container">{children}</div>
  </section>
);

export default PublicHeader;
146;
