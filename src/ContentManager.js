import {ProjectContent} from './Assets/ProjectContent.js';
import {AboutContent} from './Assets/AboutContent.js';

import eventEmitter from './EventEmitter.js'
const emitter = eventEmitter.emitter;
import events from '../utils/events';

class ContentManager {

    constructor() {

        this.contentCount = this.getFetchCount({viewContent:
        [ProjectContent, AboutContent]
        });

        this.progressCounter = 0;

        this.progress = 0;

        this.initContent();

    }

    initContent() {

        this.projects = this.loadViewContent({content: ProjectContent});
        this.about = this.loadViewContent({content: AboutContent});

    }

    //TODO:
    //RUN FETCH FOR EACH URL
    //WHEN RESOLVED, RUN LOADVIDEO / IMAGE

    loadViewContent({content}) {

        return content.map((c) => {

            if(c.media.videoSrc) {

                fetch(c.media.videoSrc).then((res) => {
                    c.media.video = this.loadVideo({src: res.url});
                    this.updateProgress();
                });
            }

            if(c.media.imageSrc) {

                fetch(c.media.imageSrc).then((res) => {
                    c.media.image = this.loadImage({src: res.url});
                    this.updateProgress();
                });
            }

            return c;

        });

    }

    loadVideo({src}) {

        // const url = await fetch(src);

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
        
        return video;
    
    }

    loadImage({src}) {

        // const url = await fetch(src);

        const img = document.createElement('img');
        
        img.crossOrigin = "anonymous";
        
        img.src = src;
        
        return img;

    }

    updateProgress() {

        this.progressCounter++;
        this.progress = this.progressCounter / this.contentCount;
        console.log(this.progress)
        if(this.progress === 1.0) {
            emitter.emit('show');
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