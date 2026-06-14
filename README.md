# Smart Profitable Trader

Smart Profitable Trader is a Next.js website section for the Laptop Lifestyle Income brand.

The Smart Profitable Trader public website lives under:

```text
/spt
```

Main page:

```text
/spt/home
```

Short route:

```text
/spt
```

The short route automatically redirects to `/spt/home`.

## What This Project Includes

- Next.js with TypeScript
- Tailwind CSS styling
- Smart Profitable Trader brand assets
- Responsive landing page under `/spt/home`
- Funnel placeholder pages for:
  - `/spt/vip-signals`
  - `/spt/copy-trading`
  - `/spt/instant-funded`
  - `/spt/evaluation`
- Application page at `/spt/apply`
- Thank-you page at `/spt/thank-you`
- Contact page at `/spt/contact`
- Risk disclaimer page at `/spt/risk-disclaimer`
- Admin/CRM app structure still available for later development

## Important Deployment Workflow

Use this safe workflow:

1. Make changes in a separate Git branch.
2. Push the branch to GitHub.
3. Open a Pull Request.
4. Vercel creates a Preview Deployment for that Pull Request.
5. Review the Vercel preview link.
6. Only merge the Pull Request after you approve the preview.
7. Production updates only happen after approval and merge.

This keeps unfinished work away from the live site.

## How To Run The Site Locally

Open Terminal and go into the project folder:

```bash
cd "/Users/slushdeemac/Documents/Smart Profitable Trader Software"
```

Install the project files:

```bash
npm install
```

Start the local preview:

```bash
npm run dev
```

If port `3000` is busy, use:

```bash
npm run dev -- --port 3001
```

Then open:

```text
http://localhost:3000/spt/home
```

or, if using port `3001`:

```text
http://localhost:3001/spt/home
```

Keep Terminal open while previewing. If you close Terminal, the local preview stops.

## How To Create The GitHub Repository

1. Go to [GitHub](https://github.com).
2. Click the `+` button in the top-right corner.
3. Click `New repository`.
4. Repository name:

```text
smart-profitable-trader
```

5. Choose `Private` or `Public`.
   - `Private` is recommended while building.
6. Do not add a README, `.gitignore`, or license on GitHub.
   - This project already has those files locally.
7. Click `Create repository`.

GitHub will then show you commands for pushing an existing project.

## How To Push This Project To GitHub

In Terminal, inside this project folder, run:

```bash
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/smart-profitable-trader.git
git branch -M main
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your real GitHub username.

Example:

```bash
git remote add origin https://github.com/solomondavid/smart-profitable-trader.git
git branch -M main
git push -u origin main
```

## How To Create A Pull Request For Updates

Never work directly on the live `main` branch after setup. Use a new branch for each update.

Create a new branch:

```bash
git checkout -b update-homepage-copy
```

Make your edits.

Save the changes:

```bash
git add .
git commit -m "Update Smart Profitable Trader homepage copy"
```

Push the branch to GitHub:

```bash
git push -u origin update-homepage-copy
```

Then:

1. Open the repository on GitHub.
2. GitHub will show a button called `Compare & pull request`.
3. Click it.
4. Add a short title and description.
5. Click `Create pull request`.

## How To Connect The Project To Vercel

1. Go to [Vercel](https://vercel.com).
2. Sign in with your GitHub account.
3. Click `Add New`.
4. Click `Project`.
5. Choose the `smart-profitable-trader` repository.
6. Keep the framework as `Next.js`.
7. Keep the build command as:

```bash
npm run build
```

8. Keep the output settings as the default.
9. Click `Deploy`.

Vercel will create the first deployment.

## How Preview Deployments Work

Every Pull Request gets its own preview link.

Example:

```text
https://smart-profitable-trader-git-update-homepage-copy-yourname.vercel.app
```

Use that preview link to check the website before approving the change.

Do not merge the Pull Request until you are happy with the preview.

## How To Deploy Updates Safely

For every future change:

1. Create a new branch.
2. Make edits.
3. Commit changes.
4. Push the branch to GitHub.
5. Open a Pull Request.
6. Check the Vercel preview link.
7. Approve the work.
8. Merge the Pull Request.

After merging, Vercel will update the production deployment.

## How To Connect A Custom Domain Later

You can later connect:

```text
laptoplifestyleincome.com
```

or a subdomain such as:

```text
spt.laptoplifestyleincome.com
```

Inside Vercel:

1. Open the project.
2. Go to `Settings`.
3. Click `Domains`.
4. Add your domain or subdomain.
5. Vercel will show DNS records.
6. Go to your domain provider.
7. Add the DNS records exactly as Vercel shows them.
8. Wait for Vercel to verify the domain.

For the requested path structure, the site pages are already built under:

```text
/spt/home
```

So when the domain is connected, the page can be reached at:

```text
https://laptoplifestyleincome.com/spt/home
```

## Environment Variables

The public SPT website can run without most environment variables.

For future admin/CRM features, copy the example file:

```bash
cp .env.example .env.local
```

Then update the values as needed.

Never upload real passwords, API keys, or secrets to GitHub.

## Useful Commands

Run local preview:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Run database seed later:

```bash
npm run db:seed
```

## Main Website Routes

```text
/spt/home
/spt/vip-signals
/spt/copy-trading
/spt/instant-funded
/spt/evaluation
/spt/apply
/spt/thank-you
/spt/contact
/spt/risk-disclaimer
```

## Risk Notice

Trading involves risk. Results are not guaranteed. Smart Profitable Trader should not be presented as risk-free or guaranteed income.
