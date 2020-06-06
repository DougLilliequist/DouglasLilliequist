import {ProjectContent} from './Static/ProjectContent.js';
import {AboutContent} from './Static/AboutContent.js';

import eventEmitter from './EventEmitter.js';
const emitter = eventEmitter.emitter;
import events from '../utils/events.js';

import Preload from 'preload-it';

class ContentManager {

    constructor() {

        // this.contentCount = this.getFetchCount({viewContent:
        // [ProjectContent, AboutContent]
        // });

        // this.progressCounter = 0;

        // this.progress = 0;        


    }

    initContent() {

        this.preload = Preload();

        const urls = [];

        ProjectContent.map((content) => {

            if(content.media.videoSrc) urls.push(content.media.videoSrc);
            if(content.media.imageSrc) urls.push(content.media.imageSrc);

        });

        AboutContent.map((content) => {

            if(content.media.videoSrc) urls.push(content.media.videoSrc);
            if(content.media.imageSrc) urls.push(content.media.imageSrc);

        });

        this.preload.fetch(urls);

        this.preload.onprogress = (event) => {
            emitter.emit(events.UPDATE_PROGRESS, event.progress);
        }

        this.preload.oncomplete = (data) => {

            this.projects = this.loadViewContent({content: ProjectContent});
            this.about = this.loadViewContent({content: AboutContent});
            window.contentLoaded = true;
            emitter.emit(events.CONTENT_LOADED);
        }


    }

    loadViewContent({content}) {

        return content.map((c) => {

            if(c.media.videoSrc) {
                const videoSrc = this.preload.getItemByUrl(c.media.videoSrc).blobUrl;
                c.media.video = this.loadVideo({src: videoSrc});
            }

            if(c.media.imageSrc) {
                const imageSrc = this.preload.getItemByUrl(c.media.imageSrc).blobUrl;
                c.media.image = this.loadImage({src: imageSrc})
            }

            return c;

        });

    }

    loadVideo({src}) {

        const video = document.createElement('video');
        
        video.crossOrigin = "*";

        video.autoplay = true;
        
        video.loop = true;

        video.setAttribute('webkit-playsinline', true);
                
        video.playsinline = true;
                
        video.muted = true;

        video.width = 512;
                
        video.height = 512;
                
        video.src = src;

        video.load();

        return video;
    
    }

    loadImage({src}) {

        // return new Promise((resolve) => {

            // fetch(src).then((res) => {

                const img = new Image();
        
                img.crossOrigin = "*";
                
                // img.addEventListener('load' , () => {
                //     resolve(img)
                // });
    
                img.src = src;

                return img;

            // });

        // });

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