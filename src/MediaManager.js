
class MediaManager {

    constructor() {

        this.sources = [

            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/sken.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/11secvid_yippheader.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/intrnshpproj.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/needahand.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/gdnghtswthrtweb.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/wormhole.mp4"

        ]

        this.videos = []

        for(let i = 0; i < this.sources.length; i++) {

            const video = document.createElement('video');
            video.src = this.sources[i];
            video.crossOrigin = "*";
            video.onloadeddata = () => {
                console.log('loaded and ready');
            }
            this.videos[i] = video;

        }

    }

}

const mediaManger = new MediaManager();
export default mediaManger;