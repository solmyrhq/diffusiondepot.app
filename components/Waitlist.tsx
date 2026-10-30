import React, {useState} from "react";

type WaitlistStatus = "idle" | "submitting" | "submitted" | "failed";

export default function Waitlist() {
    const [email, setEmail] = useState<string>("");
    const [status, setStatus] = useState<WaitlistStatus>("idle");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const response = await fetch('https://28hours.org/email.php', {
                method: 'POST',
                body: new URLSearchParams({
                    'email': email,
                }),
            });
            setStatus(response.ok ? "submitted" : "failed");
        } catch {
            setStatus("failed");
        }
    }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return <div className="flex-grow">
        {status === "submitted" && <p className="mb-2 -mt-10 sm:text-lg sm:leading-8 text-purple-200">
            Thanks for joining the waitlist! <span className="whitespace-nowrap">I'll be in touch soon.</span>
        </p>}
        {status === "failed" && <p role="alert" className="mb-2 -mt-10 sm:text-lg sm:leading-8 text-red-munsell-200">
            I couldn't add you to the waitlist. <span className="whitespace-nowrap">Please try again.</span>
        </p>}
        <form onSubmit={onSubmit} className="mx-auto sm:flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
                Email address
            </label>
            <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onInput={onInput}
                autoComplete="email"
                required
                className="min-w-0 w-full mb-4 sm:mb-0 sm:w-auto flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
            />
            <button
                type="submit"
                disabled={status === "submitting"}
                className="flex-none w-full sm:w-36 rounded-md bg-red-munsell-600 px-3.5 py-2.5 text-sm font-semibold text-red-munsell-50 shadow-sm hover:bg-red-munsell-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-75"
            >
                {status === "submitting" ? "Submitting..." : status === "submitted" ? "Submitted!" : "Join the waitlist"}
            </button>
        </form>
    </div>
}