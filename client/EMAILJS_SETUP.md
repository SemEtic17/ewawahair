# EmailJS Setup Guide

Follow these steps to configure EmailJS for the contact form:

## 1. Create EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service

1. Click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions for your provider
4. Note down your **Service ID**

## 3. Create Email Template

1. Go to "Email Templates" section
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent through the MaHair contact form.
```

4. Note down your **Template ID**

## 4. Get Public Key

1. Go to "Account" > "General"
2. Find your **Public Key** (also called User ID)

## 5. Set Environment Variables

Create a `.env.local` file in your project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Template Variables

Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_name}}` - Recipient name (set to "MaHair Team")

## 7. Test the Setup

1. Restart your development server
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Security Notes

- The environment variables are prefixed with `VITE_` so they're available in the browser
- These are **public** environment variables - don't put sensitive data here
- EmailJS public keys are safe to expose in frontend code
- Consider implementing rate limiting and spam protection for production use

## Troubleshooting

- Check browser console for error messages
- Verify all environment variables are set correctly
- Ensure EmailJS service and template are active
- Check EmailJS dashboard for usage limits and quotas