
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

            // this.videoSource({url: "./assets/vid.mp4", brightVal: 0.0}),
            // this.videoSource({url: "./assets/vid.mp4", brightVal: 1.0}),
            // this.videoSource({url: "./assets/vid.mp4", brightVal: 0.0}),
            // this.videoSource({url: "./assets/vid.mp4", brightVal: 0.0}),
            // this.videoSource({url: "./assets/vid.mp4", brightVal: 1.0}),
            // this.videoSource({url: "./assets/vid.mp4", brightVal: 0.0}),

            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/sken10241024.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/spiritualBeings10241024.mp4", brightVal: 1.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/letsgetphysical10241024.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/sken10241024.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/needahand10241024.mp4", brightVal: 1.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/gnsw10241024.mp4", brightVal: 0.0}),

        ]

        this.videos = []

            this.vidSources.map((vidSource, i) => {

                const video = document.createElement('video');
                video.width = 1024;
                video.height = 1024;
                video.crossOrigin = "*";
                video.playsinline = true;
                video.src = vidSource.src;
                video.muted = true;
                video.loop = true;
                video.isBright = vidSource.bright;
                // video.currentTime = 0.0001;
                video.currentTime = Math.random() + 0.001;
                this.videos[i] = {vid: video, isBright: vidSource.isBright};    

            });

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

    videoSource({url, brightVal}) {

        return {
            src: url,
            isBright: brightVal
        }

    }

}

const mediaManger = new MediaManager();
export default mediaManger;