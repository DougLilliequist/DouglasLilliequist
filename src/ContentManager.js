import {ProjectContent} from './Assets/ProjectContent.js';
import {AboutContent} from './Assets/AboutContent.js';

import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

class ContentManager {

    constructor() {

        this.contentCount = this.getFetchCount({viewContent:
        [ProjectContent, AboutContent]
        });

        this.progressCounter = 0;

        this.progress = 0;


    }

    initContent() {

        this.projects = this.loadViewContent({content: ProjectContent});
        this.about = this.loadViewContent({content: AboutContent});

    }

    loadViewContent({content}) {

        return content.map((c) => {

            if(c.media.videoSrc) {

                fetch(c.media.videoSrc).then((res) => {
                    if(res.status === 200) {
                        this.loadVideo({src: res.url}).then((video) => {
                            c.media.video = video;
                            this.updateProgress();
                        });
                    }
                });
            }

            if(c.media.imageSrc) {

                fetch(c.media.imageSrc).then((res) => {

                    if(res.status === 200) {
                        this.loadImage({src: res.url}).then((image) => {
                            c.media.image = image;
                            this.updateProgress();
                        });
                    }
                });
            }

            return c;

        });

    }

    loadVideo({src}) {

        return new Promise((resolve, reject) => {

            const video = document.createElement('video');
        
            video.width = 1024;
            
            video.height = 1024;
            
            video.crossOrigin = "*";
            
            video.setAttribute('webkit-playsinline', true);
            
            video.playsinline = true;
            
            video.src = src;
            
            video.muted = true;
            
            video.loop = true;
            
            video.currentTime = Math.random() + 0.001;
            
            resolve(video);

        });
    
    }

    loadImage({src}) {

        // const img = document.createElement('img');
        return new Promise((resolve, reject) => {
            
            const img = new Image();
        
            img.crossOrigin = "*";
            
            img.src = src;
            
            img.onload = () => {
                resolve(img);
            }

        });

    }

    updateProgress() {
        
        this.progressCounter++;
        this.progress = this.progressCounter / this.contentCount;
        if(this.progress === 1.0) {
            window.contentLoaded = true;
            emitter.emit(events.CONTENT_LOADED);
        }

    }

    getFetchCount({viewContent}) {

        let count = 0;

        viewContent.map((content) => {

            content.map((c) => {

                if(c.media.videoSrc) {
                    count++;
                }
    
                if(c.media.imageSrc) {
                    count++;
                }
    
            });

        })

        return count;

    }

    get Projects() {
        return this.projects;
    }

    get ProjectMedia() {
        return this.projects.map((project) => {
            return project.media;
        });
    }

    get About() {
        return this.about
    }

    get AboutMedia() {
        return this.about.map((about) => {
            return about.media;
        });
    }

}

const contentManager = new ContentManager();
export default contentManager;