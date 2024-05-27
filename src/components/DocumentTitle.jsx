import { Helmet } from "react-helmet";

export default function DocumentTitle({ children }) {
  return (
    <title>{children}</title>
  );
}