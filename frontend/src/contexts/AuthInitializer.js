import { useGetCurrentUserQuery } from "../features/api/authQuery";
import { useGetCartQuery } from "../features/api/cartQuery";

const AuthInitializer = ({ children }) => {
  const { data: user } = useGetCurrentUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useGetCartQuery(undefined, {
    skip: !user,
  });

  return children;
};

export default AuthInitializer;
