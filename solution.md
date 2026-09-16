# How to fix Resend emails

1. Go to the [Resend Dashboard](https://resend.com/domains) and add domain `andriga.com`.
2. Resend will give you a list of DNS records to add. Go to your GoDaddy DNS settings and add them.
3. Return to Resend and click Verify. Once verified, emails will work in production from `contact@andriga.com`. 

No code changes are needed! The API is already set up to send via `contact@andriga.com`.
