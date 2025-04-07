This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# API
<html>
    <table>
        <tr>
            <th>Route</th>
            <th>Path</th>
        </tr>
        <tr>
            <td>Register</td>
            <td><code>POST /api/register</code></td>
        </tr>
        <tr>
            <td>Login</td>
            <td><code>POST /api/login</code></td>
        </tr>
        <tr>
            <td>Logout</td>
            <td><code>POST /api/logout</code></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center"><b>Users for admin</b></td>
        </tr>
        <tr>
            <td>Get Users</td>
            <td><code>GET /api/users</code></td>
        </tr>
        <tr>
            <td>Get Users specsific ID</td>
            <td><code>GET /api/users/{id}</code></td>
        </tr>
        <tr>
            <td>Add Users</td>
            <td><code>POST /api/users</code></td>
        </tr>
        <tr>
            <td>Update Users</td>
            <td><code>PUT /api/users/{id}</code></td>
        </tr>
        <tr>
            <td>Delete Users</td>
            <td><code>DELETE /api/users/{id}</code></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center"><b>Users</b></td>
        </tr>
        <tr>
            <td>reset password</td>
            <td><code>GET /api/resetpass</code></td>
        </tr>
        <tr>
            <td>change email</td>
            <td><code>GET /api/change_email</code></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align: center"><b>login logs</b></td>
        </tr>
        <tr>
            <td>logs all users</td>
            <td><code>GET /api/logs</code></td>
        </tr>
        <tr>
            <td>change email</td>
            <td><code>GET /api/logs/{id_user}</code></td>
        </tr>
    </table>
</html>