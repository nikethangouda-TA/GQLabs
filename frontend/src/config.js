// Centralized config — update contact details here
const SITE_CONFIG = {
  companyName: "Glide Quantum Labs",
  tagline: "We Build Software That Grows Your Business",
  whatsappNumber: "919032247068",
  email: "Nikethan@glidequantumlabs.com",
  whatsappMessage: "Hi Srinikethan! I saw your work on GlideQuantum Labs and I'm interested. Can we talk?",
  location: "Hyderabad, India",
  getWhatsAppLink: function() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  }
};

export default SITE_CONFIG;
