import emailjs from '@emailjs/browser';
import { emailjsConfig, isEmailjsConfigured } from '@/config/emailjs';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  if (!isEmailjsConfigured()) {
    throw new Error('EmailJS is not properly configured. Please check your environment variables.');
  }

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'MaHair Team', // You can customize this
    };

    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    );
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};