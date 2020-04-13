
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

            "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/yolowebgl.mp4",
            'https://s3.eu-west-3.amazonaws.com/douglaslilliequist/doli.mp4',
            "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/spiritualbeings.mp4",
            "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/letsgetphysical.mp4",
            "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/sken.mp4",
            "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/needahand.mp4",
            "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/gdnghtswthrtweb.mp4",


        ]

        this.videos = []

        for(let i = 0; i < this.vidSources.length; i++) {

            const video = document.createElement('video');
            video.width = 1280;
            video.height = 720;
            video.src = this.vidSources[i];
            video.crossOrigin = "*";
            video.muted = true;
            video.loop = true;
            // video.currentTime = 0.0001;
            video.currentTime = Math.random() + 0.001;
            this.videos[i] = video;

        }

    }

    loadImages() {

        this.imgSources = [
            'https://douglaslilliequist.s3.eu-west-3.amazonaws.com/portrait.png'
        ]

        this.images = [];

        for(let i = 0; i < this.imgSources.length; i++) {
            // const img = new Image();
            const img = document.createElement('img');
            img.crossOrigin = "anonymous";
            img.src = this.imgSources[i];
            this.images[i] = img;
        }

    }

}

const mediaManger = new MediaManager();
export default mediaManger;