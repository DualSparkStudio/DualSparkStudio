import { CONTACT_INFO } from '@/lib/constants';
import { FiPhone, FiMail, FiGlobe, FiMessageCircle, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

const ContactButtons = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Extract phone numbers (remove spaces and + for tel/whatsapp links)
  const phoneNumbers = CONTACT_INFO.phone.split(' / ').map(num => 
    num.replace(/\s+/g, '').replace('+', '')
  );
  const primaryPhone = phoneNumbers[0];
  const secondaryPhone = phoneNumbers[1] || primaryPhone;

  // WhatsApp link format: https://wa.me/919270269875
  const whatsappLink = `https://wa.me/${primaryPhone}`;
  
  // Call link - tel: link for phone calls
  // On mobile devices, this will trigger the phone dialer
  // On desktop, opens in new tab but may not work (expected behavior)
  const callLink = `tel:+${primaryPhone}`;
  
  // Website link (home page)
  const websiteLink = '/';

  // Copy email to clipboard
  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setEmailCopied(true);
      toast.success('Email copied to clipboard!', {
        duration: 2000,
      });
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy email');
    }
  };

  // Open in new tab handler
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          {!logoError ? (
            <img 
              src="/logo.png" 
              alt="DualSpark Studio" 
              className="h-20 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="text-4xl font-bold">
              <span className="text-primary">Dual</span>
              <span className="text-accent">Spark</span>
              <span className="text-cyan-400">Studio</span>
            </div>
          )}
        </motion.div>

        <div className="max-w-md mx-auto space-y-8">
          {/* Call */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => openInNewTab(callLink)}
            className="flex items-center justify-center gap-4 cursor-pointer group"
          >
            <FiPhone className="text-primary" size={32} />
            <span className="text-foreground text-xl font-medium">Call</span>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => openInNewTab(whatsappLink)}
            className="flex items-center justify-center gap-4 cursor-pointer group"
          >
            <FiMessageCircle className="text-[#25D366]" size={32} />
            <span className="text-foreground text-xl font-medium">WhatsApp</span>
          </motion.div>

          {/* Website */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={() => openInNewTab(websiteLink)}
            className="flex items-center justify-center gap-4 cursor-pointer group"
          >
            <FiGlobe className="text-accent" size={32} />
            <span className="text-foreground text-xl font-medium">Website</span>
          </motion.div>

          {/* Email */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={handleEmailCopy}
            className="flex items-center justify-center gap-4 cursor-pointer group"
          >
            {emailCopied ? (
              <FiCheck className="text-[#10b981]" size={32} />
            ) : (
              <FiMail className="text-secondary-foreground" size={32} />
            )}
            <span className="text-foreground text-xl font-medium">
              {emailCopied ? 'Copied!' : 'Email'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactButtons;

