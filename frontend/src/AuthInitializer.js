import { useGetCurrentUserQuery } from "../src/features/api/authQuery";

const AuthInitializer = ({ children }) => {
  useGetCurrentUserQuery();
  return children;
};

export default AuthInitializer;
