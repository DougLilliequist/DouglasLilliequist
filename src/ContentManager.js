import {ProjectContent} from './Static/ProjectContent.js';
import {AboutContent} from './Static/AboutContent.js';

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

                    this.loadVideo({src: c.media.videoSrc}).then((video) => {
                        c.media.video = video;
                        this.updateProgress();
                    });
            }

            if(c.media.imageSrc) {


                this.loadImage({src: c.media.imageSrc}).then((image) => {
                    c.media.image = image;
                    this.updateProgress();
                });

            }

            return c;

        });

    }

    loadVideo({src}) {

        return new Promise((resolve) => {

            // fetch(src).then((res) => {

                const video = document.createElement('video');

                // video.autoplay = true;

                video.addEventListener('loadeddata', () => {
                    if(video.readyState >= video.HAVE_CURRENT_DATA) {
                        video.currentTime = Math.random() + .1;
                        resolve(video);
                    }
                });
        
                video.width = 512;
                
                video.height = 512;
                
                video.crossOrigin = "*";

                video.setAttribute('webkit-playsinline', true);
                
                video.playsinline = true;
                
                video.muted = true;
                
                video.loop = true;

                video.src = src;

                // video.load();

                // resolve(video);

            // });
            
        });
    
    }

    loadImage({src}) {

        return new Promise((resolve) => {

                const img = new Image();
        
                img.crossOrigin = "*";
                
                img.addEventListener('load' , () => {
                    resolve(img);
                });
    
                img.src = src;

        });

    }

    updateProgress() {
        
        this.progressCounter++;
        this.progress = this.progressCounter / this.contentCount;
        emitter.emit(events.UPDATE_PROGRESS, this.progress);
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