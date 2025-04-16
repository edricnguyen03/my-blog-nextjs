const ClientMessageForm = () => {
    return (
        <form
            className="flex w-full max-w-xl flex-col gap-4"
        >
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                    className="rounded-md border-2 border-slate-400 px-3 py-3 mt-1"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Code Dusting"
                    aria-required
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                    className="rounded-md border-2 border-slate-400 px-3 py-3 mt-1"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="codedusting@gmail.com"
                    aria-required
                    required
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="message">Message</label>
                <textarea className="rounded-md border-2 border-slate-400 px-3 py-3 mt-1" name="message" id="message" rows={4}></textarea>
            </div>
            <div className="flex flex-col">
                <label htmlFor="attachment" className="mb-2">Attachments</label>
                <input type="file" name="attachment" id="attachment" />
            </div>
            <div className="flex flex-col">
                <button
                    type="submit"
                    className="rounded-md bg-slate-950 px-4 py-3 text-slate-50 "
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default ClientMessageForm;