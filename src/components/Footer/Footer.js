import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faLinkedin, faDiscord,} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () =>{

    return (
        <footer>
          <div class="footer">
            <div class="row">
              <div class="col-md-6">
                <p>&copy; 2023 Major League Hacking. All Rights Reserved.</p>
              </div>
              <div class="col-md-6">
              <div className="social-icons">
          <a
            href="https://github.com/MLH"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/school/mlh-fellowship/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/MajorLeagueHacking/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://discord.mlh.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDiscord} size="2x" />
          </a>
        </div>
              </div>
            </div>
          </div>
        </footer>
    )
}

export default Footer