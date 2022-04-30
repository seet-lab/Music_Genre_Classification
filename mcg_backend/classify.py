import joblib
from pydub import AudioSegment
from collections import Counter
from musicnn.extractor import extractor
import os

AudioSegment.converter = "D:\\PFW\\First Semester\\Software Engineering\\ffmpeg\\bin\\ffmpeg.exe"
AudioSegment.ffmpeg = "D:\\PFW\\First Semester\\Software Engineering\\ffmpeg\\bin\\ffmpeg.exe"
AudioSegment.ffprobe = "D:\\PFW\\First Semester\\Software Engineering\\ffmpeg\\bin\\ffprobe.exe"

# Set the musical genres you want to check against
TAGS = [
    "Blues",
    "Classical",
    "Country",
    "Disco",
    "Hiphop",
    "Jazz",
    "Metal",
    "Pop",
    "Reggae",
    "Rock",
]

# Dictionaries for accessing tags
idx2tag = dict((n, TAGS[n]) for n in range(len(TAGS)))


def classify_audio(fname: str, extension: str, model_path="../models/features_classifier.pkl"):
    # Load classifier
    clf = joblib.load(model_path)
    if(extension == '.mp3'):
        startMin = 1
        startSec = 00

        endMin = 1
        endSec = 30

        # Time to miliseconds
        startTime = startMin*60*1000+startSec*1000
        endTime = endMin*60*1000+endSec*1000

        # Opening file and extracting segment
        song = AudioSegment.from_mp3(fname)
        extract = song[startTime:endTime]

        # Saving
        song.export('./file.wav', format="wav")

    # Extract the `max_pool' features using musicnn
    _, _, features = extractor(
        './file.wav', model="MSD_musicnn", input_overlap=1, extract_features=True
    )

    maxpool_features = features["max_pool"]

    # Classify each feature with the trained classifier
    y_pred = clf.predict(maxpool_features)

    # Assign a string tag (e.g. 'classical' instead of 1) to each predicted class
    y_pred_labels = [idx2tag[n] for n in y_pred]

    # The assigned genre is the most common tag
    tag = Counter(y_pred_labels).most_common()[0][0]

    if os.path.exists("./file.wav"):
        os.remove("./file.wav")

    return tag


if __name__ == "__main__":
    """
    If called from the command line, accept 
    as arguments a .wav file to classify, and
    additionally a model path.
    """

    import argparse

    parser = argparse.ArgumentParser(
        "Simple utility that assigns a genre to a sound file."
    )

    parser.add_argument("path", help="The path to an audio file.")

    parser.add_argument(
        "--model-path",
        default="../models/features_classifier.pkl",
        help="The path to a classifier model.",
    )

    args = parser.parse_args()
    tag = classify_audio(args.path, args.model_path)

    print(tag, end="")
