import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { useAudio } from '@/lib/stores/useAudio';
import emailjs from '@emailjs/browser';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const Contact = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const titleRef = useRef(null);
  const { playHit, playSuccess } = useAudio();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animation for the title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playHit();

    try {
      const templateParams = {
        to_name: 'DualSpark Studio',
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(
        'service_ueg2zqv',
        'template_p8esb6l',
        templateParams,
        'zjYHYLKT7SmXI-SId'
      );

      playSuccess();
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialClick = useCallback((url: string) => {
    playHit();
    window.open(url, '_blank');
  }, [playHit]);

  return (
    <section id="contact" className="relative py-24 bg-background/80 backdrop-blur-md">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
      </div>
      
      <div className="container px-6 mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16" ref={titleRef}>
          <motion.p 
            className="text-primary text-lg font-medium mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            Get in Touch
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
            }}
          >
            Let's <span className="text-gradient">Talk</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
            }}
          >
            Have a project in mind or want to know more about our services? We'd love to hear from you.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Information */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border/50 h-full">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${CONTACT_INFO.email}`} 
                      className="text-foreground hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        playHit();
                        window.location.href = `mailto:${CONTACT_INFO.email}`;
                      }}
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <FiPhone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a 
                      href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} 
                      className="text-foreground hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        playHit();
                        window.location.href = `tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`;
                      }}
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <address className="not-italic text-foreground">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}<br />
                      {CONTACT_INFO.address.country}
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium mb-4">Connect with us</h4>
                <div className="flex space-x-4">
                  <div className="gradient-border rounded-full bg-background">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full relative z-10"
                      onClick={() => handleSocialClick(SOCIAL_LINKS.linkedin)}
                      title="LinkedIn"
                    >
                      <FiLinkedin size={18} />
                    </Button>
                  </div>
                  
                  <div className="gradient-border rounded-full bg-background">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full relative z-10"
                      onClick={() => handleSocialClick(SOCIAL_LINKS.github)}
                      title="GitHub"
                    >
                      <FiGithub size={18} />
                    </Button>
                  </div>
                  
                  <div className="gradient-border rounded-full bg-background">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full relative z-10"
                      onClick={() => handleSocialClick(SOCIAL_LINKS.instagram)}
                      title="Instagram"
                    >
                      <FiInstagram size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
            }}
          >
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border/50">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-background/50"
                      onClick={() => playHit()}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-background/50"
                      onClick={() => playHit()}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="w-full bg-background/50"
                    onClick={() => playHit()}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    required
                    rows={6}
                    className="w-full bg-background/50"
                    onClick={() => playHit()}
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto btn-hover-effect"
                    disabled={isSubmitting}
                    onClick={() => !isSubmitting && playHit()}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FiSend className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                  
                  <p className="mt-4 text-sm text-muted-foreground">
                    By submitting this form, you agree to our <Button variant="link" className="p-0 h-auto font-normal" onClick={() => {
                      playHit();
                      toast.info("Privacy Policy would open in a real implementation");
                    }}>Privacy Policy</Button>.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
