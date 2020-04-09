
/**
 * include project content here as well?
 */

class MediaManager {

    constructor() {

        this.loadVideos();
        this.loadImages();

    }

    loadVideos() {

        this.vidSources = [

            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/intrnshpproj.mp4",
            'https://s3.eu-west-3.amazonaws.com/douglaslilliequist/doli.mp4',
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/wormhole.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/11secvid_yippheader.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/sken.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/needahand.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/gdnghtswthrtweb.mp4",


        ]

        this.videos = []

        for(let i = 0; i < this.vidSources.length; i++) {

            const video = document.createElement('video');
            video.src = this.vidSources[i];
            video.crossOrigin = "*";
            video.muted = true;
            video.loop = true;
            video.currentTime = 0.0001;
            this.videos[i] = video;

        }

    }

    loadImages() {

        this.imgSources = [

        ]


    }

}

const mediaManger = new MediaManager();
export default mediaManger;