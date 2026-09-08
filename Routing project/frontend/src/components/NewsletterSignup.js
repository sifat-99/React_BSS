import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import { useFetcher } from 'react-router-dom'

function NewsletterSignup() {
    const fetcher = useFetcher()
    const { data, state } = fetcher
    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message)
        }
    }, [data, state])
    return (
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                name="email"
                required
            />
            <button disabled={state === 'submitting'}>{state === 'submitting' ? 'Submitting...' : 'Sign up'}</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;