import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => (
	<main className="contrast-container">{children}</main>
);

export default Layout;
