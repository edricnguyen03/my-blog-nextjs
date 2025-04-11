const Container = ({
    children,
    classNames
}: {
    children: React.ReactNode,
    classNames?: string
}) => {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 ${classNames}`}>
            {children}
        </div>
    );
}

export default Container;