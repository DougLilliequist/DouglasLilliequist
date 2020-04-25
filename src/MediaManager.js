
/**
 * include project content here as well?
 */

class MediaManager {

    constructor() {

        this.loadVideos();
        this.loadImages();

    }

    loadVideos() {

        // this.vidSources = [

        //     "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/yolowebgl.mp4",
        //     'https://s3.eu-west-3.amazonaws.com/douglaslilliequist/doli.mp4',
        //     "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/spiritualbeings.mp4",
        //     "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/letsgetphysical.mp4",
        //     "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/sken.mp4",
        //     "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/needahand.mp4",
        //     "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/gdnghtswthrtweb.mp4",


        // ]

        this.vidSources = [

            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/yolowebgl.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/doli.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/spiritualbeings.mp4", brightVal: 1.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/letsgetphysical.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/sken.mp4", brightVal: 0.0}),
            this.videoSource({url: "https://douglaslilliequist.s3.eu-west-3.amazonaws.com/needahand.mp4", brightVal: 1.0}),
            this.videoSource({url: "https://s3.eu-west-3.amazonaws.com/douglaslilliequist/gdnghtswthrtweb.mp4", brightVal: 0.0}),

        ]

        this.videos = []

            this.vidSources.map((vidSource, i) => {

                const video = document.createElement('video');
                video.width = 1280;
                video.height = 720;
                video.src = vidSource.src;
                video.crossOrigin = "*";
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