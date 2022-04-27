import './LandingPage.css';
import Banner from '../Banner/Banner.js';
import ListeningImage from '../ListeningImage/ListeningImage';

function LandingPage() {
  return (
    <div id="landing-page-container">
        <Banner />
        <div className="lp-content-ctr pt-50 pb-50 pl-50 pr-50">
          <div className="lp-content">
            <div className="lp-heading">Know your Music</div>
            <div className="lp-sub-heading pl-10 mt-20">Identify the music genre in seconds</div>
            <button className="action-button">
              <div className="find-icon mr-5"></div>
              <div>Find</div>
            </button>
          </div>
          <ListeningImage />
        </div>
    </div>
  );
}

export default LandingPage;
