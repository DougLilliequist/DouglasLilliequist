import projectVideos from './video/*.mp4'

export const ProjectContent = [

    {
        title: 'Spiritual Beings',
        type: 'Experiment',
        description: 'Beings flocking in a peaceful purgatory',
        tech: 'WebGL(THREE.js) / GLSL / GPGPU',
        year: 2019,
        role: null,
        link: 'https://douglilliequist.github.io/SpiritualBeings/',
        media: {
            videoSrc: projectVideos.spiritualBeings512512,
            imageSrc: null,
            brightVal: 1.0
        }
    },

    {
        title: 'Memory Phase',
        type: 'Experiment',
        description: 'Evanescent AR voxels',
        tech: 'Unity3D / ARFoundation + ARKit / GPGPU',
        year: 2019,
        role: null,
        link: '',
        media: {
            videoSrc: projectVideos.sken512512,
            imageSrc: null,
            brightVal: 0.0
        }

    },

    {
        title: 'Crashing Dawn',
        type: 'Experiment',
        description: 'Shaded particles with noise sampled curl noise',
        tech: 'WebGL(THREE.js) / GPGPU',
        year: 2020,
        role: null,
        link: 'https://douglilliequist.github.io/CrashingDawn/',
        media: {
            videoSrc: projectVideos.crashingdawn512512,
            imageSrc: null,
            brightVal: 1.0
        }

    },

    {
        title: 'Let\'s Get Physical',
        type: 'Client Project',
        description: 'Floor projected trails which reacts to the amount of present people and distance from eachother',
        tech: 'Unity3D / Custom GPGPU ribbons / In-house Blob Detection by Yipp Interactive',
        year: 2019,
        role: 'Developer',
        link: 'https://yipp.nl/projects/61-lets_get_physical/',
        media: {
            videoSrc: projectVideos.letsgetphysical512512,
            imageSrc: null,
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
            videoSrc: projectVideos.sken512512,
            imageSrc: null,
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
            videoSrc: projectVideos.needahand512512,
            imageSrc: null,
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
            videoSrc: projectVideos.gnsw512512,
            imageSrc: null,
            brightVal: 0.0
        }
    },

]