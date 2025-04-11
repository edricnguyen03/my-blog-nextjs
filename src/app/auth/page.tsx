import { notFound } from "next/navigation";
import Login from "./login";
import SignUp from "./sign-up";
import Logout from "./logout";

const Auth = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    if (searchParams?.page === "login") return <Login />;
    if (searchParams?.page === "sign-up") return <SignUp />;
    if (searchParams?.page === "logout") return <Logout />;
    return notFound();
};

export default Auth;