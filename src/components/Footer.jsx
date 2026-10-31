import React from "react";
import AdBanner from "./AdBanner";

function Footer() {
  return (
    <footer className="app-footer">
      <AdBanner />
      <div className="footer-credits">
        <p>
          Developed by{" "}
          <a
            href="https://github.com/RAN-GAN"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rangandale
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/pradeepchandranm"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
