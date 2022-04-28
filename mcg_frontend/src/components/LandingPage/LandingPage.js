import { useState } from "react";
import "./LandingPage.css";
import Banner from "../Banner/Banner.js";
import ListeningImage from "../ListeningImage/ListeningImage";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";

function LandingPage() {
  // const pageNumber = 1;
  let [isFind, setFind] = useState(true);
  let [isAnalysing, setAnalysing] = useState(false);
  let [isFindAnother, setFindAnother] = useState(false);
  let [fileName, setFileName] = useState("");
  let [isUploaded, setUploaded] = useState(false);
  let [isRecommendation, setRecommendation] = useState(false);
  let [formData, setFormData] = useState(new FormData());
  let [genre, setGenre] = useState("");
  let [tracks, setTracks] = useState([]);

  const handleChange = (file) => {
    setUploaded(true);
    setFileName(file.name);
    console.log(file.name);
    console.log("File uploaded");

    formData.append("file", file);
    setFormData(formData);
  };

  const uploadAndFind = () => {
    console.log("Uploading");
    setFind(false);
    isAnalysing = true;
    setAnalysing(isAnalysing);
    setUploaded(false);
    fetch("http://localhost:5000/prediction", {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (isAnalysing) {
          console.log(data);
          setFindAnother(true);
          setAnalysing(false);
          setGenre(data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const goToFind = () => {
    console.log("Find");
    setFind(true);
    setAnalysing(false);
    setUploaded(false);
    setFindAnother(false);
    setRecommendation(false);
  };

  const showRecommendations = () => {
    setRecommendation(true);
    setFind(false);
    setAnalysing(false);
    setUploaded(false);
    setFindAnother(false);
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/search/",
      params: {
        q: genre,
        type: "multi",
        offset: "0",
        limit: "10",
        numberOfTopResults: "5",
      },
      headers: {
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        "X-RapidAPI-Key": "654743fc92msh8a1e0cb85336609p17f436jsn301dd7d85d65",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTracks(response.data.tracks.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const openTrack = (id) => {
    console.log("openTrack");
    window.open(`https://open.spotify.com/track/${id}`);
  }

  return (
    <div id="landing-page-container">
      <Banner />
      <div className="lp-content-ctr pt-50 pb-50 pl-50 pr-50">
        <div className="lp-content">
          {!isFindAnother && !isRecommendation ? (
            <div>
              <div className="lp-heading">Know your Music</div>
              <div className="lp-sub-heading pl-10 mt-20">
                Identify the music genre in seconds
              </div>
            </div>
          ) : null}

          {isFind && !isUploaded ? (
            <FileUploader
              multiple={false}
              handleChange={handleChange}
              name="file"
              label="Click-here to upload or drag and drop the .wav file"
            />
          ) : !isFindAnother && !isRecommendation ? (
            <div className="file-description mt-30 mb-30">
              <div className="wav-icon"></div>
              <div className="file-name ml-10">{fileName}</div>
              <div className="close ml-50" onClick={goToFind}>
                x
              </div>
            </div>
          ) : null}

          {isFind ? (
            <button className="action-button" onClick={uploadAndFind}>
              <div className="find-icon mr-5"></div>
              <div>Find</div>
            </button>
          ) : isAnalysing ? (
            <button className="action-button analyse-button">
              <div>Analysing</div>
              <div className="center ml-10">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            </button>
          ) : isFindAnother ? (
            <div className="result-container">
              <div className="genre-banner"></div>
              <div className="genre-result">Genre: {genre}</div>
              <div className="button-container">
                <button
                  className="action-button find-another-button"
                  onClick={goToFind}
                >
                  {" "}
                  Find Another{" "}
                </button>
                <button
                  className="action-button recommendation-button"
                  onClick={showRecommendations}
                >
                  Show Recommendations
                </button>
              </div>
            </div>
          ) : (
            <div>
              {tracks.length ? (
                <div>
                  <div className="container-title mb-50">Recommendations for {genre}</div>
                  <div className="recommendation-container mb-50">
                      <div className="track-container" alt={tracks[0].data.name} onClick={() => openTrack(tracks[0].data.id)}>
                        <img src={tracks[0].data.albumOfTrack.coverArt.sources[0].url} width="150px" height="150px"/>
                        <div className="track-title mt-20">{tracks[0].data.name}</div>
                      </div>
                      <div className="track-container" alt={tracks[1].data.name} onClick={() => openTrack(tracks[1].data.id)}>
                        <img src={tracks[1].data.albumOfTrack.coverArt.sources[0].url} width="150px" height="150px"/>
                        <div className="track-title mt-20">{tracks[1].data.name}</div>
                      </div>
                      <div className="track-container" alt={tracks[2].data.name} onClick={() => openTrack(tracks[2].data.id)}>
                        <img src={tracks[2].data.albumOfTrack.coverArt.sources[0].url} width="150px" height="150px"/>
                        <div className="track-title mt-20">{tracks[2].data.name}</div>
                      </div>
                      <div className="track-container" alt={tracks[3].data.name} onClick={() => openTrack(tracks[3].data.id)}>
                        <img src={tracks[3].data.albumOfTrack.coverArt.sources[0].url} width="150px" height="150px"/>
                        <div className="track-title mt-20">{tracks[3].data.name}</div>
                      </div>
                  </div>
                </div>
              ) : 
              <div className="center center-l mb-50">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
              }
              <button className="action-button" onClick={goToFind}>
                Back
              </button>
            </div>
          )}
        </div>
        <ListeningImage />
      </div>
    </div>
  );
}

export default LandingPage;
