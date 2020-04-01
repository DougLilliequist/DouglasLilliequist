import {
    Vec2
} from 'ogl';

//use trig to get viewPort dimensions
export const getCameraViewplaneSize = (camera) => {

    // rendering full screen quad as if the far plane is at distance 1
    const cameraFov = camera.fov;
    const cameraAspect = camera.aspect;
    const dist = Math.max(1.0, camera.position.z); //assuming the plane will always be one unit away from camera
    let viewportHeight = 2.0 * Math.tan((cameraFov * (Math.PI / 180.0)) * 0.5) * dist;
    let viewportWidth = viewportHeight * cameraAspect;

    return new Vec2(viewportWidth, viewportHeight);

}