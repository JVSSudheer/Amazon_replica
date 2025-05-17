import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </div>
      <div className="footerLinksContainer">
        <div className="footerLinksGroup">
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Amazon</li>
            <li>Careers</li>
            <li>Careers</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footerLinksGroup">
          <h4>Connect with us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footerLinksGroup">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Amazon Rewards Visa Signature Cards</li>
            <li>Amazon.com Store Card</li>
            <li>Amazon Business Card</li>
            <li>Amazon Business Line of Credit</li>
            <li>Shop with Points</li>
            <li>Credit Card Marketplace</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>
        <div className="footerLinksGroup">
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
