import Container from "./container";

const Footer = () => {
    return (
        <footer className="mt-auto bg-slate-950 py-6 text-slate-50">
            <Container classNames="flex justify-center items-center">
                <p className="text-base lg:text-base">
                    Copyright &copy; {new Date().getFullYear()} Code with Edric | All rights
                    reserved
                </p>
            </Container>
        </footer>
    );
}

export default Footer;