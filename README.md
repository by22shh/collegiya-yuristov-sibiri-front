This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Production VPS

The site is hosted at https://colus.ru and https://www.colus.ru on `13.143.175.15`.

- Application: `/srv/colus/current`, running as the `colus` system user.
- Process: `colus.service`, listening on `127.0.0.1:3000`, with automatic restart and startup at boot.
- Reverse proxy: `/etc/nginx/sites-available/colus`.
- HTTPS: Let's Encrypt, renewed automatically by `certbot.timer`.
- Credentials: `/srv/colus/shared/.env.local`, readable only by the application user. Local `.env.local` files are excluded from Git.

To inspect the service, use `ssh root@13.143.175.15 'systemctl status colus --no-pager'`.
After updating the shared environment file, restart it with `systemctl restart colus`.

For a code update, upload the source to a new directory under `/srv/colus/releases`, link its `.env.local` to the shared file, and build as `colus` using `npx --yes bun@1.4.2 install --frozen-lockfile` followed by `NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=1536 npm run build`. Switch `/srv/colus/current` to the new release only after a successful build, then restart the service and check the site. GitHub pushes do not automatically deploy to this VPS; the existing Netlify project remains connected to GitHub.

The contact form requires a valid SMTP application password. Delivery failures return HTTP 503 so visitors are not told that an undelivered message was received.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
