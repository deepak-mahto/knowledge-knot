import { Navbar, AuthLogin } from "../components";
import { useEffect, useState } from "react";

export const Login = () => {
  const [route, setRoute] = useState();

  useEffect(() => {
    setRoute("login");
  }, [route]);
  return (
    <>
      <Navbar route={route} />
      <AuthLogin />
    </>
  );
};
