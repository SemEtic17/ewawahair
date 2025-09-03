// EmailJS Configuration
// These environment variables should be set with VITE_ prefix for Vite to access them
// Example: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

// Validation function to check if all required config is present
export const isEmailjsConfigured = (): boolean => {
  return !!(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);
};