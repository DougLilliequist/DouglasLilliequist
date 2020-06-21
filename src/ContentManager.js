import { ProjectContent } from "../Static/ProjectContent.js";
import { AboutContent } from "../Static/AboutContent.js";

import eventEmitter from "./EventEmitter.js";
const emitter = eventEmitter.emitter;
import events from "../utils/events.js";

import Preload from "preload-it";

class ContentManager {
  constructor() {}

  initContent() {
    this.preLoader = Preload();

    const urls = [];

    ProjectContent.forEach(content => {
      if (content.media.videoSrc) urls.push(content.media.videoSrc);
      if (content.media.imageSrc) urls.push(content.media.imageSrc);
    });

    AboutContent.forEach(content => {
      if (content.media.videoSrc) urls.push(content.media.videoSrc);
      if (content.media.imageSrc) urls.push(content.media.imageSrc);
    });

    this.preLoader.fetch(urls);

    this.preLoader.onprogress = event => {
      emitter.emit(events.UPDATE_PROGRESS, event.progress);
    };

    this.preLoader.oncomplete = () => {
      this.projects = this.loadViewContent({
        content: ProjectContent
      });
      this.about = this.loadViewContent({
        content: AboutContent
      });
      window.contentLoaded = true;
      emitter.emit(events.CONTENT_LOADED);
    };
  }

  loadViewContent({ content }) {
    return content.map(c => {
      if (c.media.videoSrc) {
        c.media.video = this.loadVideo({
          src: c.media.videoSrc
        });
      }

      if (c.media.imageSrc) {
        c.media.image = this.loadImage({
          src: c.media.imageSrc
        });
      }

      return c;
    });
  }

  loadVideo({ src }) {
    const video = document.createElement("video");

    //video.preload = "none";

    video.crossOrigin = "*";

    // video.preload = "metadata";

    // video.addEventListener('loadeddata', () => {
    //     if(video.readyState >= video.HAVE_CURRENT_DATA) {
    //         resolve(video);
    //     }
    // });

    video.src = this.preLoader.getItemByUrl(src).blobUrl;

    video.load();

    video.setAttribute("webkit-playsinline", true);

    video.playsinline = true;

    video.muted = true;

    video.loop = true;

    video.currentTime = Math.random() + 0.5;

    return video;
  }

  loadImage({ src }) {
    const img = new Image();

    img.crossOrigin = "*";

    img.src = this.preLoader.getItemByUrl(src).url;

    return img;
  }

  updateProgress() {
    this.progressCounter++;
    this.progress = this.progressCounter / this.contentCount;
    emitter.emit(events.UPDATE_PROGRESS, this.progress);
    if (this.progress === 1.0) {
      window.contentLoaded = true;
      emitter.emit(events.CONTENT_LOADED);
    }
  }

  get Projects() {
    return this.projects;
  }

  get ProjectMedia() {
    return this.projects;
  }

  get About() {
    return this.about;
  }

  get AboutMedia() {
    return this.about.map(about => {
      return about.media;
    });
  }
}

const contentManager = new ContentManager();
export default contentManager;
