# Smart Profitable Trader

Smart Profitable Trader is a Next.js and Supabase-powered trading business platform with:

- Public Smart Profitable Trader funnel pages
- Admin CRM workspace under `/spt/admin`
- Live PostgreSQL storage through Supabase
- Prisma ORM for schema and data access

This project is set up so you can test safely on Vercel first before pointing the final production domain anywhere else.

## What is already included

- Admin login with protected routes
- Dashboard
- Leads management
- Customers management
- Applications management
- Subscriptions management
- Payments management
- Expenses management
- Account progress tracking
- Profit share tracking
- Communication log
- Reminder queue
- Settings page
- Public application form saving into the database

## 1. Create the Supabase project

1. Create a new project in Supabase.
2. Save the database password somewhere safe.
3. Open the project and go to the database connection screen.
4. Copy both connection strings:
   - pooled connection string for `DATABASE_URL`
   - direct/session connection string for `DIRECT_URL`

Recommended format:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:YOUR_DB_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECT_REF:YOUR_DB_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
```

Replace:

- `PROJECT_REF` with your Supabase project reference
- `YOUR_DB_PASSWORD` with your Supabase database password

## 2. Environment variables for Vercel

Add these in Vercel Project Settings > Environment Variables:

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
SENDY_API_KEY=
SENDY_BASE_URL=
SENDY_LIST_ID=
SENDY_TRANSACTIONAL_ENDPOINT=
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
SMS_API_KEY=
SMS_API_URL=
SMS_PROVIDER=
SMS_SENDER_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_PROJECT_ID=
GOOGLE_SHEETS_PRIVATE_KEY_ID=
```

Notes:

- `NEXTAUTH_URL` should be your current Vercel project URL or custom domain.
- `NEXTAUTH_SECRET` should be a long random value.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` are used to bootstrap the first super admin.
- `SENDY_BASE_URL`, `SENDY_API_KEY`, and `SENDY_LIST_ID` power Sendy list subscriptions for application acknowledgements and customer welcome flows.
- `SENDY_TRANSACTIONAL_ENDPOINT` is optional, but recommended when you want direct one-off email sending such as payment acknowledgements.
- `WHATSAPP_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are used for WhatsApp renewal reminders and future WhatsApp outreach flows.
- `SMS_API_URL`, `SMS_API_KEY`, `SMS_PROVIDER`, and `SMS_SENDER_ID` are used for SMS reminders and urgent outbound notifications.
- You can also store Sendy, WhatsApp, and SMS provider values inside `/spt/admin/settings` so your team can manage day-to-day messaging configuration from the admin panel.
- If a provider is not configured yet, the CRM still logs the communication attempt so nothing disappears silently.
- `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`, and `GOOGLE_SHEETS_SPREADSHEET_ID` power the Google Sheets reporting backup. The project ID and private key ID are optional service-account metadata.

## 3. Local setup

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
cp .env.example .env.local
```

Then replace the example values in `.env.local` with your real values.

## 4. Run Prisma generation

If Prisma client needs to be refreshed:

```bash
npm run prisma:generate
```

## 5. Run database migrations

For local database development:

```bash
npx prisma migrate dev --name init
```

If you are syncing this schema into a fresh Supabase database and want Prisma to apply the current schema:

```bash
npx prisma db push
```

## 6. Create the first admin user

The first super admin is created from these environment variables:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Then run:

```bash
npm run db:seed
```

The seed script will:

- create or update the super admin user
- add sample leads
- add sample customers
- add applications
- add payments
- add subscriptions
- add expenses
- add account progress data
- add profit share records
- add message template settings

## 7. Messaging workflows now included

The admin foundation already includes these live workflow paths:

- application acknowledgement after `/spt/apply` is submitted
- customer welcome message when an application or lead is converted into a customer
- payment acknowledgement when a paid customer payment is recorded
- renewal reminder dispatch through the reminder workflow
- seasonal message templates for:
  - birthday
  - christmas
  - new year
  - eid
  - independence day

How delivery works:

- Sendy list subscription is the default reliable path for welcome and acknowledgement flows.
- Sendy transactional sending is used when `SENDY_TRANSACTIONAL_ENDPOINT` is configured.
- WhatsApp and SMS are used by the renewal reminder workflow when those providers are configured.
- Every attempt is written into the communication log with a sent, failed, or pending status.

Birthday and special-day notes:

- Customer birthdays are stored on the Customers page and used for birthday-triggered messaging.
- Christmas, New Year, Eid, and Independence Day dates can be controlled from Settings.
- Eid should be updated manually each year because the date changes.
- The Reminders page now includes manual “send now” actions so you can test or trigger campaigns without waiting for the daily check.

## 8. Google Sheets Sync Setup

Google Sheets is used as a reporting and backup layer only. Supabase remains the main database.

### Create the Google Sheet

1. Open Google Sheets and create a new spreadsheet.
2. Copy the Spreadsheet ID from the URL.
   - In `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`, copy the long value between `/d/` and `/edit`.
3. The app can create the required tabs automatically when the service account has Editor access.
4. If you prefer to create them manually, use these exact tab names:
   - Leads
   - Applications
   - Customers
   - Subscriptions
   - Payments
   - Expenses
   - Account Progress
   - Profit Share
   - Communication Logs
   - Activity Logs

### Create a Google Cloud service account

1. Open Google Cloud Console.
2. Create or select a project.
3. Go to APIs & Services > Library.
4. Enable the Google Sheets API.
5. Go to IAM & Admin > Service Accounts.
6. Create a service account for this app.
7. Open the service account, go to Keys, and create a JSON key.
8. Download the JSON file and keep it private.

### Share the Sheet with the service account

1. Open the downloaded JSON key.
2. Copy the `client_email` value.
3. Open your Google Sheet.
4. Click Share.
5. Add the service account email as an Editor.

### Add Vercel environment variables

Add these in Vercel Project Settings > Environment Variables:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_PROJECT_ID=
GOOGLE_SHEETS_PRIVATE_KEY_ID=
```

Required:

- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_SPREADSHEET_ID`

Optional:

- `GOOGLE_SHEETS_PROJECT_ID`
- `GOOGLE_SHEETS_PRIVATE_KEY_ID`

For `GOOGLE_SHEETS_PRIVATE_KEY`, copy the full private key from the JSON file. In Vercel, keep the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. If you paste it with `\n` line breaks, the app will convert them safely at runtime.

### Test and sync

1. Deploy the app after adding the environment variables.
2. Open `/spt/admin/settings`.
3. Find the Google Sheets integration section.
4. Confirm Sync enabled is checked.
5. Click Test Google Sheets Connection.
6. Click Sync All Data to Google Sheets to send existing database records.

After setup, new and updated records are copied to the matching sheet tab. If Google Sheets fails, the Supabase save still succeeds and the error is logged in the `SyncLog` table.

## 9. Test that data is saving

Start the app locally:

```bash
npm run dev
```

Then test:

1. Open `/spt/apply`
2. Submit a sample application
3. Open `/spt/admin/login`
4. Sign in with the admin email and password
5. Check:
   - Applications
   - Leads
   - Customers
   - Payments
   - Expenses
   - Settings

The application should appear in the Applications page and activity should be logged in the database.

To test messaging too:

1. Submit a sample application at `/spt/apply?service=copy-trading`
2. Check `/spt/admin/applications`
3. Check `/spt/admin/communications`
4. Confirm an acknowledgement log entry was created
5. Convert an application or lead into a customer
6. Confirm a welcome message log entry was created
7. Record a paid payment for a customer
8. Confirm a payment acknowledgement log entry was created

## 10. Deploy to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables listed above.
4. Trigger a deploy.
5. After deploy, test:
   - `/spt/home`
   - `/spt/apply`
   - `/spt/admin/login`
   - `/spt/admin/communications`
   - `/spt/admin/settings`

## 11. Custom domain later

When you are ready to connect a custom domain:

1. Add the domain in Vercel Project Settings > Domains.
2. Copy the DNS records Vercel gives you.
3. Add those records at your domain registrar or DNS provider.
4. Wait for DNS propagation.
5. Update:

```env
NEXTAUTH_URL=https://your-domain.com
```

Then redeploy.

## 12. Production readiness checklist

Before using this with real clients:

- Confirm all Vercel environment variables are real
- Confirm Supabase database connection works
- Run the seed once
- Test admin login
- Test a real application form submission
- Test a payment record save
- Test a subscription save
- Confirm Sendy provider status is ready in `/spt/admin/settings`
- Confirm acknowledgement and welcome logs appear in `/spt/admin/communications`
- Confirm reminder dates show correctly
- Confirm Google Sheets connection test passes in `/spt/admin/settings`
- Run Sync All Data to Google Sheets once after setup
- Confirm your custom domain resolves to the active Vercel project

## Admin URLs

- Login: `/spt/admin/login`
- Dashboard: `/spt/admin/dashboard`
- Leads: `/spt/admin/leads`
- Customers: `/spt/admin/customers`
- Applications: `/spt/admin/applications`
- Subscriptions: `/spt/admin/subscriptions`
- Payments: `/spt/admin/payments`
- Expenses: `/spt/admin/expenses`
- Account progress: `/spt/admin/account-progress`
- Settings: `/spt/admin/settings`
