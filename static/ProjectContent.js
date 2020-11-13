import projectVideos from './video/*.mp4'
import img from './img/*.png';

export const ProjectContent = [

    {
        title: 'Signature Faces',
        type: 'Client project',
        description: 'Virtual makeup line for LOreal Paris in collboration with Virtue Worldwide',
        tech: 'Lens Studio / Spark AR',
        year: 2020,
        role: 'Creative Technologist / Filter Dev / Shader Dev',
        link: 'https://www.loreal-paris.co.uk/signature-faces',
        media: {
            videoSrc: projectVideos.crashingdawn256256,
            imageSrc: img.selfportrait512512,
            brightVal: 1.0
        }

    },

    {
        title: 'Fabric',
        type: 'Experiment',
        description: 'Interactive cloth simulation',
        tech: 'WebGL(OGL) / GPGPU',
        year: 2020,
        role: null,
        link: 'https://douglilliequist.github.io/Fabric/',
        media: {
            videoSrc: projectVideos.crashingdawn256256,
            imageSrc: img.selfportrait512512,
            brightVal: 1.0
        }

    },

    {
        title: 'Crashing Dawn',
        type: 'Experiment',
        description: 'Shaded particles',
        tech: 'WebGL(THREE.js) / GPGPU',
        year: 2020,
        role: null,
        link: 'https://douglilliequist.github.io/CrashingDawn/',
        media: {
            videoSrc: projectVideos.crashingdawn256256,
            imageSrc: img.selfportrait512512,
            brightVal: 1.0
        }

    },

    {
        title: 'Spiritual Beings',
        type: 'Experiment',
        description: 'Beings flocking in a peaceful purgatory',
        tech: 'WebGL(THREE.js) / GLSL / GPGPU',
        year: 2019,
        role: null,
        link: 'https://douglilliequist.github.io/SpiritualBeings/',
        media: {
            videoSrc: projectVideos.spiritualbeings256256,
            imageSrc: img.selfportrait512512,
            brightVal: 1.0
        }
    },

    {
        title: 'Memory Phase',
        type: 'Experiment',
        description: 'Optical flow velocity applied to particles',
        tech: 'WebGL / Optical Flow / GPGPU',
        year: 2020,
        role: null,
        link: 'https://douglilliequist.github.io/MemoryPhase/',
        media: {
            videoSrc: projectVideos.sken256256,
            imageSrc: img.selfportrait512512,
            brightVal: 0.0
        }

    },

    {
        title: 'Let\'s Get Physical',
        type: 'Client Project',
        description: 'Installation project for Frame awards Amsterdam',
        tech: 'Unity3D / Custom GPGPU ribbons / In-house Blob Detection by Yipp Interactive',
        year: 2019,
        role: 'Developer',
        link: 'https://yipp.nl/projects/61-lets_get_physical/',
        media: {
            videoSrc: projectVideos.letsgetphysical256256,
            imageSrc: img.selfportrait512512,
            brightVal: 0.0
        }
    },
    {
        title: 'SKEN',
        type: 'Experiment',
        description: 'Flocking Ribbons',
        tech: 'WebGL(THREE.js) / GLSL / GPGPU',
        year: 2018,
        role: null,
        link: 'https://douglilliequist.github.io/SKEN/',
        media: {
            videoSrc: projectVideos.sken256256,
            imageSrc: img.selfportrait512512,
            brightVal: 0.0
        }
    },
    {
        title: 'Need a hand?',
        type: 'Experiment',
        description: 'Interactive, displacing mesh',
        tech: 'WebGL(THREE.js) / GLSL / Computed triangles from mesh data',
        year: 2018,
        role: null,
        link: 'https://douglilliequist.github.io/needAHand/',
        media: {
            videoSrc: projectVideos.needahand256256,
            imageSrc: img.selfportrait512512,
            brightVal: 1.0
        }
    },
    {
        title: 'Good Night Sweet Heart',
        type: 'Hyper Island Project',
        description: 'Art Puzzle Installation',
        tech: 'Arduino / Processing / Resolume',
        year: 2015,
        role: 'Developer, Designer',
        link: '',
        media: {
            videoSrc: projectVideos.gnsw256256,
            imageSrc: img.selfportrait512512,
            brightVal: 0.0
        }
    },

]