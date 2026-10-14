import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <p>
        Have questions about booking a car?  
        Our support team is here to help you.
      </p>

      <div className="contact-details">
        <p><strong>Email:</strong> support@carrental.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> Hyderabad, India</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}