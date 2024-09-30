import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Icons for social media
import { AiFillApple, AiOutlineGoogle } from 'react-icons/ai'; // Icons for payment methods

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Branding and description */}
        <div style={styles.branding}>
          <h2 style={styles.logo}>FabYoh</h2>
          <p style={styles.description}>
            Fabyoh is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs
          </p>
        </div>
        {/* Shop Now Links */}
        <div style={styles.column}>
          <h3>Shop Now</h3>
          <ul style={styles.list}>
            <li><a href="#">Shop All</a></li>
            <li><a href="#">Shirts</a></li>
            <li><a href="#">Tshirts</a></li>
            <li><a href="#">Hoodies</a></li>
            <li><a href="#">Jackets</a></li>
            <li><a href="#">Room</a></li>
          </ul>
        </div>
        {/* Important Links */}
        <div style={styles.column}>
          <h3>Important Links</h3>
          <ul style={styles.list}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms And Conditions</a></li>
            <li><a href="#">Shipping And Returns</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
        {/* Social Media */}
        <div style={styles.column}>
          <h3>Follow Us On</h3>
          <div style={styles.socialIcons}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>
      {/* Copyright and Payment Methods */}
      <div style={styles.copyright}>
        <p>© 2024 Fabyoh.com - All Rights Reserved</p> 
        <h3>Developed by <span className='text-blue-500 hover:cursor-pointer hover:underline'>BackBencher's Studio (bdCalling IT LTD)</span></h3>
        <div style={styles.paymentIcons}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={styles.icon} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" style={styles.icon} />
          <img src="https://cdn.icon-icons.com/icons2/2342/PNG/512/discover_payment_method_icon_142757.png" alt="Discover" style={styles.icon} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={styles.icon} />
          <AiFillApple style={styles.icon} />
          <AiOutlineGoogle style={styles.icon} />
        </div>
      </div>
    </footer>
  );
};

// Styles for the footer
const styles = {
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '30px 20px',
    borderTop: '1px solid #ddd',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  branding: {
    textAlign: 'left',
    flex: '1',
    minWidth: '250px',
    marginBottom: '20px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '14px',
    marginTop: '10px',
    color: '#666',
  },
  column: {
    textAlign: 'left',
    flex: '1',
    minWidth: '150px',
    marginBottom: '20px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    fontSize: '14px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '10px',
    fontSize: '24px',
  },
  copyright: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#666',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  paymentIcons: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  icon: {
    width: '40px',
    height: 'auto',
  },
};

export default Footer;
