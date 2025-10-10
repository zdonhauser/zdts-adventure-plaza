# Contact Form Implementation Plan

**Project:** ZDT's Adventure Plaza Contact Form with reCAPTCHA v3 + AWS SES
**Email Destination:** info@zdtamusement.com
**Status:** Phase 1 & 3 Complete - Awaiting AWS SES Setup (Phase 2)
**Last Updated:** 2025-10-10

---

## Overview

This document tracks the implementation of a production-ready contact form system with:
- ✉️ Email delivery via AWS SES to info@zdtamusement.com
- 🤖 Bot protection via Google reCAPTCHA v3 (invisible, free for 1M requests/month)
- 🎨 Modal-based form UI matching site design system
- 🔒 Server-side validation and rate limiting
- 📱 Mobile-responsive with accessibility features
- 🎢 Special ride inquiry form with park name requirement to filter enthusiasts

---

## Phase 1: Google reCAPTCHA v3 Setup

**Goal:** Register site with Google and obtain reCAPTCHA keys for bot protection

### 1.1 Create/Access Google Account
- [x] Go to https://www.google.com/recaptcha/admin
- [x] Sign in with Google account (or create one if needed)
- [x] Accept Terms of Service if prompted

### 1.2 Register Your Site
- [x] Click "+" button to register a new site
- [x] Enter label: `ZDT's Adventure Plaza - Contact Form`
- [x] Select reCAPTCHA type: **reCAPTCHA v3**
- [x] Add domains:
  - [x] `localhost` (for local development)
  - [x] `zdtamusement.com` (production domain)
  - [x] Your Vercel preview domain if applicable (e.g., `*.vercel.app`)
- [x] Accept reCAPTCHA Terms of Service
- [x] Click "Submit"

### 1.3 Save API Keys
- [x] Copy **Site Key** (public key - goes in frontend code)
- [x] Copy **Secret Key** (private key - goes in backend/env only)
- [x] Store keys temporarily in secure location (password manager)

### 1.4 Add Environment Variables
- [x] Create `.env.local` file in project root if it doesn't exist
- [x] Add the following variables:
  ```bash
  # Google reCAPTCHA v3
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
  RECAPTCHA_SECRET_KEY=your_secret_key_here
  ```
- [x] Verify `.env.local` is in `.gitignore` (should be by default)
- [x] Save the file

### 1.5 Install reCAPTCHA Dependencies
- [x] Run: `yarn add react-google-recaptcha-v3`
- [x] Verify package added to `package.json`

**Phase 1 Complete** ✅

---

## Phase 2: AWS SES Configuration

**Goal:** Set up Amazon Simple Email Service to send emails to info@zdtamusement.com

### 2.1 Create/Access AWS Account
- [ ] Go to https://aws.amazon.com/
- [ ] Sign in or click "Create an AWS Account"
- [ ] If creating new account:
  - [ ] Enter email address and account name
  - [ ] Complete identity verification (credit card required, but SES is pay-as-you-go)
  - [ ] Choose support plan (Basic/Free is fine)

### 2.2 Navigate to SES Console
- [ ] Sign in to AWS Console: https://console.aws.amazon.com/
- [ ] Search for "SES" or "Simple Email Service" in top search bar
- [ ] Click "Simple Email Service"
- [ ] **Select your preferred AWS region** (e.g., us-east-1, us-west-2)
  - Note: Record this region - you'll need it in your code

### 2.3 Verify Sender Email Address (info@zdtamusement.com)
- [ ] In SES Console, click "Verified identities" in left sidebar
- [ ] Click "Create identity"
- [ ] Select **Email address**
- [ ] Enter: `info@zdtamusement.com`
- [ ] Click "Create identity"
- [ ] **Check inbox for info@zdtamusement.com**
- [ ] Click verification link in email from Amazon SES
- [ ] Return to SES Console and verify status shows "Verified"

### 2.4 Verify Domain (Optional but Recommended for Production)
- [ ] In SES Console, click "Verified identities"
- [ ] Click "Create identity"
- [ ] Select **Domain**
- [ ] Enter domain: `zdtamusement.com`
- [ ] Choose identity type: **Easy DKIM**
- [ ] Click "Create identity"
- [ ] Copy the 3 CNAME records shown
- [ ] Add these CNAME records to your DNS provider (e.g., Route 53, Cloudflare, GoDaddy)
- [ ] Wait for DNS propagation (can take up to 48 hours, usually <1 hour)
- [ ] Verify DKIM status shows "Verified" in SES Console

### 2.5 Request Production Access (Move Out of Sandbox)
**Important:** By default, SES is in "Sandbox mode" and can only send to verified addresses. For production, you need to request production access.

- [ ] In SES Console, look for banner about "Sandbox" or navigate to "Account dashboard"
- [ ] Click "Request production access" or similar button
- [ ] Fill out the form:
  - [ ] **Mail Type:** Transactional
  - [ ] **Website URL:** https://zdtamusement.com (or current URL)
  - [ ] **Use case description:**
    ```
    We are implementing a contact form on our business website (ZDT's Adventure Plaza)
    to receive leasing inquiries and general contact requests. Expected volume:
    50-200 emails per month. All emails are user-initiated contact form submissions
    sent to info@zdtamusement.com. We have implemented reCAPTCHA v3 to prevent spam.
    ```
  - [ ] **Process for handling bounces/complaints:**
    ```
    We will monitor the SES console for bounces and complaints. Our contact form
    only sends to our own business email (info@zdtamusement.com), so we have full
    control over the recipient.
    ```
  - [ ] Agree to AWS policies
  - [ ] Submit request
- [ ] Wait for approval (usually within 24 hours, check email)
- [ ] Verify account status changed from "Sandbox" to "Production"

**Note:** While waiting for production access, you can still develop and test by verifying additional test email addresses in Step 2.3.

### 2.6 Create IAM User with SES Permissions
- [ ] In AWS Console, search for "IAM" and open IAM console
- [ ] Click "Users" in left sidebar
- [ ] Click "Create user"
- [ ] Enter username: `ses-smtp-user-zdts`
- [ ] Click "Next"
- [ ] Select "Attach policies directly"
- [ ] Search for and select: **AmazonSESFullAccess** (or create custom policy with only ses:SendEmail)
- [ ] Click "Next"
- [ ] Click "Create user"

### 2.7 Generate SMTP Credentials
- [ ] In SES Console, click "SMTP settings" in left sidebar
- [ ] Click "Create SMTP credentials"
- [ ] Enter IAM User Name: `ses-smtp-user-zdts`
- [ ] Click "Create"
- [ ] **IMPORTANT:** Download or copy credentials:
  - [ ] Copy **SMTP Username**
  - [ ] Copy **SMTP Password**
  - [ ] Save in secure location (you can't view password again)
- [ ] Note the SMTP endpoint shown (e.g., `email-smtp.us-east-1.amazonaws.com`)

### 2.8 Add AWS Credentials to Environment Variables
- [ ] Open `.env.local` file
- [ ] Add AWS SES configuration:
  ```bash
  # AWS SES Configuration
  AWS_SES_REGION=us-east-1  # Your selected region
  AWS_SES_SMTP_HOST=email-smtp.us-east-1.amazonaws.com  # Your SMTP endpoint
  AWS_SES_SMTP_PORT=465
  AWS_SES_SMTP_USERNAME=your_smtp_username_here
  AWS_SES_SMTP_PASSWORD=your_smtp_password_here
  AWS_SES_FROM_EMAIL=info@zdtamusement.com
  AWS_SES_TO_EMAIL=info@zdtamusement.com
  ```
- [ ] Replace placeholder values with your actual credentials
- [ ] Save the file

### 2.9 Install Email Dependencies
- [ ] Run: `yarn add nodemailer`
- [ ] Run: `yarn add -D @types/nodemailer`
- [ ] Verify packages added to `package.json`

**Phase 2 Complete** ✅

---

## Phase 3: Form Component Development

**Goal:** Build the contact form UI with validation and reCAPTCHA integration

### 3.1 Create Form Data Types
- [x] Create/update `src/data/types.ts`
- [x] Add `ContactFormData` interface with fields:
  - `name: string`
  - `email: string`
  - `phone: string`
  - `message: string`
  - `spaceInterest?: string` (optional - pre-filled from space cards)
  - `parkName?: string` (optional - for ride inquiries)
  - `inquiryType: 'space' | 'general' | 'tour' | 'ride'`

### 3.2 Create ContactForm Component
- [x] Create new file: `src/components/contact/ContactForm.tsx`
- [x] Set up form state with React hooks
- [x] Add form fields:
  - [x] Name input (required)
  - [x] Email input (required, with email validation)
  - [x] Phone input (optional, with phone format validation)
  - [x] Message textarea (required)
  - [x] Park name field (required for ride inquiries)
- [x] Style form matching site design system (black/white/gray, bold typography)
- [x] Add accessible labels and ARIA attributes
- [x] Make form mobile-responsive

### 3.3 Add Client-Side Validation
- [x] Create validation helper functions
- [x] Add real-time validation on blur:
  - [x] Name: minimum 2 characters
  - [x] Email: valid email format with regex
  - [x] Phone: valid US phone format (optional field)
  - [x] Message: minimum 10 characters
  - [x] Park name: minimum 3 characters (for ride inquiries)
- [x] Display inline error messages below fields
- [x] Prevent submission if validation fails
- [x] Add loading state during submission

### 3.4 Integrate reCAPTCHA v3
- [x] Wrap app with `GoogleReCaptchaProvider` in `src/app/layout.tsx`
- [x] Import and use `useGoogleReCaptcha` hook in ContactForm
- [x] Execute reCAPTCHA on form submission (action: 'submit_contact_form')
- [x] Include reCAPTCHA token in form submission data
- [x] Add reCAPTCHA badge CSS to hide/position badge (optional)

### 3.5 Create Form Modal/Drawer Component
- [x] Create `src/components/contact/ContactFormModal.tsx`
- [x] Add modal overlay with backdrop
- [x] Add close button (X) in top corner
- [x] Add smooth open/close animations
- [x] Handle escape key to close modal
- [x] Prevent body scroll when modal open
- [x] Make modal stack above all other content (high z-index)

### 3.6 Create Form Context/State Management
- [x] Create `src/context/ContactFormContext.tsx` (optional but recommended)
- [x] Add state for:
  - `isOpen: boolean` (modal visibility)
  - `inquiryType: InquiryType` (form type)
  - `spaceInterest?: string` (for pre-populating space info)
- [x] Export `useContactForm` hook
- [x] Export `ContactFormProvider` to wrap app

### 3.7 Update Space Cards to Open Form
- [x] Update `src/components/spaces/SpaceCard.tsx`
- [x] Replace anchor link `<a href="#contact">` with button
- [x] On click, open contact form modal
- [x] Pre-populate form with space address/title
- [x] Track click event with Google Analytics

### 3.8 Update Ride Section Button
- [x] Update `src/components/rides/FeaturedRide.tsx`
- [x] Change "Inquire Now" to open contact form with ride type
- [x] Pre-populate with ride name
- [x] Track click event with Google Analytics

### 3.9 Update Contact Section Buttons
- [x] Update `src/components/contact/ContactSection.tsx`
- [x] Replace multiple buttons with single "Contact Us" button
- [x] Opens contact form modal for general inquiries
- [x] Style consistently with other CTAs

**Phase 3 Complete** ✅

---

## Phase 4: Backend API Route

**Goal:** Create secure server-side endpoint for form submission with email sending

### 4.1 Create API Route Structure
- [ ] Create file: `src/app/api/contact/route.ts`
- [ ] Set up POST handler with Next.js 15 App Router syntax
- [ ] Add proper TypeScript types for request/response
- [ ] Add CORS headers if needed (probably not for same-origin)

### 4.2 Implement Request Validation
- [ ] Parse and validate request body
- [ ] Check all required fields present
- [ ] Validate email format server-side
- [ ] Validate phone format server-side (if provided)
- [ ] Sanitize inputs to prevent XSS
- [ ] Return 400 error for invalid data with specific error messages

### 4.3 Implement reCAPTCHA Server-Side Verification
- [ ] Extract reCAPTCHA token from request body
- [ ] Make POST request to Google reCAPTCHA verification API:
  - URL: `https://www.google.com/recaptcha/api/siteverify`
  - Parameters: `secret`, `response` (token)
- [ ] Check response success and score:
  - Score >= 0.5: Likely human, allow submission
  - Score < 0.5: Likely bot, reject with 403 error
- [ ] Log score for monitoring (optional)
- [ ] Return descriptive error if verification fails

### 4.4 Create Email Template Builder
- [ ] Create helper function: `buildContactEmail(formData)`
- [ ] Build HTML email template with:
  - [ ] Clear subject line: "New Contact Form Submission - ZDT's Adventure Plaza"
  - [ ] Formatted message body with all form fields
  - [ ] Space interest highlighted if present
  - [ ] Sender contact info (name, email, phone)
  - [ ] Timestamp of submission
  - [ ] User's message clearly displayed
- [ ] Build plain text fallback version
- [ ] Include reCAPTCHA score in email footer (for monitoring)

### 4.5 Implement AWS SES Email Sending
- [ ] Create Nodemailer transporter with AWS SES SMTP config
- [ ] Use credentials from environment variables
- [ ] Set up mail options:
  - `from`: info@zdtamusement.com (verified sender)
  - `to`: info@zdtamusement.com (recipient)
  - `replyTo`: User's submitted email address
  - `subject`: Dynamic based on inquiry type
  - `html`: HTML email template
  - `text`: Plain text fallback
- [ ] Send email with error handling
- [ ] Log success/failure (without exposing sensitive data)

### 4.6 Add Rate Limiting
- [ ] Create simple in-memory rate limiter (or use library like `rate-limiter-flexible`)
- [ ] Limit by IP address: max 5 submissions per hour
- [ ] Return 429 error if rate limit exceeded
- [ ] Add descriptive error message: "Too many requests. Please try again later."
- [ ] Consider Redis-based rate limiting for production (optional)

### 4.7 Add Error Handling and Logging
- [ ] Wrap all operations in try-catch
- [ ] Handle specific error types:
  - [ ] Network errors (reCAPTCHA API down)
  - [ ] AWS SES errors (authentication, quota exceeded)
  - [ ] Validation errors
- [ ] Log errors to console (or external service like Sentry)
- [ ] Return user-friendly error messages (don't expose internal details)
- [ ] Return 500 error for unexpected failures

### 4.8 Return Success Response
- [ ] Return 200 status code on success
- [ ] Return JSON with success message: `{ success: true, message: "Thank you! Your message has been sent." }`
- [ ] Include submission ID or timestamp (optional)

**Phase 4 Complete** ✅

---

## Phase 5: Testing & Deployment

**Goal:** Thoroughly test all integrations before production deployment

### 5.1 Local Development Testing
- [ ] Start dev server: `yarn dev`
- [ ] Test form opens from all buttons:
  - [ ] Hero "Join Our Community" button
  - [ ] Space card "Request Information" buttons
  - [ ] Contact section "Send Message" button
- [ ] Test form validation:
  - [ ] Submit with empty fields (should show errors)
  - [ ] Submit with invalid email (should show error)
  - [ ] Submit with invalid phone (should show error)
- [ ] Test form submission:
  - [ ] Fill form with valid data
  - [ ] Submit and verify success message
  - [ ] Check email received at info@zdtamusement.com
  - [ ] Verify reply-to address is user's email
- [ ] Test reCAPTCHA:
  - [ ] Verify reCAPTCHA badge appears
  - [ ] Submit form and check server logs for reCAPTCHA score
- [ ] Test rate limiting:
  - [ ] Submit form 5+ times rapidly
  - [ ] Verify 6th submission blocked with 429 error

### 5.2 Mobile Responsiveness Testing
- [ ] Test on mobile device or Chrome DevTools mobile view
- [ ] Verify form modal scales correctly
- [ ] Test form fields are touch-friendly
- [ ] Test keyboard behavior on mobile
- [ ] Verify form scrolls correctly in modal
- [ ] Test close button is accessible on mobile

### 5.3 Accessibility Testing
- [ ] Navigate form with keyboard only (Tab, Enter, Escape)
- [ ] Test with screen reader (VoiceOver, NVDA, or JAWS)
- [ ] Verify all inputs have labels
- [ ] Verify error messages are announced
- [ ] Check color contrast meets WCAG AA standards
- [ ] Test with browser zoom at 200%

### 5.4 Browser Compatibility Testing
- [ ] Test in Chrome/Edge
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in mobile Safari (iOS)
- [ ] Test in mobile Chrome (Android)

### 5.5 AWS SES Production Verification
- [ ] Verify SES account out of sandbox mode
- [ ] Test sending from production domain
- [ ] Check SES sending statistics in AWS Console
- [ ] Verify no bounces or complaints
- [ ] Monitor SES quotas (daily sending limit)

### 5.6 Environment Variables for Vercel/Production
- [ ] In Vercel dashboard, go to project settings
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - [ ] `RECAPTCHA_SECRET_KEY`
  - [ ] `AWS_SES_REGION`
  - [ ] `AWS_SES_SMTP_HOST`
  - [ ] `AWS_SES_SMTP_PORT`
  - [ ] `AWS_SES_SMTP_USERNAME`
  - [ ] `AWS_SES_SMTP_PASSWORD`
  - [ ] `AWS_SES_FROM_EMAIL`
  - [ ] `AWS_SES_TO_EMAIL`
- [ ] Mark sensitive variables as "Sensitive" in Vercel
- [ ] Verify variables apply to Production, Preview, and Development environments

### 5.7 Deploy to Vercel Staging
- [ ] Push code to feature branch
- [ ] Wait for Vercel preview deployment
- [ ] Test full flow on preview URL
- [ ] Verify emails send successfully
- [ ] Check for console errors in browser
- [ ] Test form submission multiple times

### 5.8 Production Deployment
- [ ] Merge feature branch to main
- [ ] Wait for production deployment
- [ ] Test contact form on production domain
- [ ] Submit test inquiry and verify email received
- [ ] Monitor first few hours for errors
- [ ] Check AWS SES metrics for deliverability

### 5.9 Post-Launch Monitoring
- [ ] Set up AWS CloudWatch alerts for SES bounces/complaints (optional)
- [ ] Monitor Google Analytics for form submission events
- [ ] Check info@zdtamusement.com inbox regularly
- [ ] Monitor reCAPTCHA admin console for bot detection stats
- [ ] Review form submissions weekly for spam attempts

**Phase 5 Complete** ✅

---

## Future Enhancements (Optional)

- [ ] Add email confirmation to user after submission
- [ ] Create admin dashboard to view submissions
- [ ] Add file upload for attachments (floor plans, etc.)
- [ ] Implement honeypot field for additional spam protection
- [ ] Add success page redirect after submission
- [ ] Integrate with CRM (HubSpot, Salesforce, etc.)
- [ ] Add Slack/Discord notification when form submitted
- [ ] A/B test different form layouts for conversions

---

## Notes & Troubleshooting

### Common Issues

**Issue:** reCAPTCHA badge not showing
**Solution:** Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set and starts with `NEXT_PUBLIC_`

**Issue:** Emails not sending from local development
**Solution:** Check AWS SES sandbox mode - verify recipient email or request production access

**Issue:** "Invalid login" error from AWS SES
**Solution:** Verify SMTP username/password are correct. Regenerate if needed.

**Issue:** Form submission fails silently
**Solution:** Check browser console for errors. Verify API route returns proper error messages.

**Issue:** Rate limiting blocks legitimate users
**Solution:** Increase rate limit threshold or implement more sophisticated rate limiting (e.g., by user session)

### AWS Cost Monitoring

- **AWS SES Pricing:** $0.10 per 1,000 emails (after free tier)
- **Free Tier:** First 62,000 emails/month are FREE when sent from EC2 or Elastic Beanstalk
- **Expected Cost:** For 200 emails/month = $0.02/month (essentially free)

### reCAPTCHA Score Guidelines

- **1.0:** Very likely a good interaction
- **0.9 - 0.7:** Probably legitimate
- **0.7 - 0.5:** Neutral (still likely human)
- **0.5 - 0.3:** Suspicious
- **0.3 - 0.0:** Very likely a bot

**Recommended threshold:** 0.5 (adjust based on monitoring)

---

## Migration to AWS (Future)

When you're ready to move hosting from Vercel to AWS:

### AWS Hosting Options
1. **AWS Amplify** - Easiest, similar to Vercel
2. **AWS App Runner** - Container-based, auto-scaling
3. **AWS ECS + Fargate** - More control, Docker containers
4. **AWS EC2 + Load Balancer** - Full control, manual management

### Migration Checklist
- [ ] Choose AWS hosting service
- [ ] Set up Next.js build pipeline
- [ ] Configure environment variables in AWS
- [ ] Update DNS to point to AWS
- [ ] Verify contact form still works
- [ ] (Optional) Switch to AWS SES SDK instead of SMTP for better performance

**The contact form code will work without changes** on AWS because we're using standard Next.js API routes and SMTP (not Vercel-specific features).

---

**End of Implementation Plan**
