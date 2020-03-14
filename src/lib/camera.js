export const camera = {
  webcam: null,
  video: null,
  isWebcamLoaded: false,
}

export function createLoadCamera(regl) {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

  if (!navigator.getUserMedia) {
    console.error('🎥🤳 getUserMedia not supported')
    return false
  }

  navigator.getUserMedia(
    { audio: true, video: { width: 1280, height: 720 } },
    function(stream) {
      camera.video = document.querySelector('video')
      camera.video.srcObject = stream
      camera.video.onloadedmetadata = function(e) {
        console.log('🎥🤳 play')
        camera.video.play()
        camera.webcam = regl.texture(camera.video)
        camera.isWebcamLoaded = Boolean(camera.webcam) && Boolean(camera.video)
      }
    },
    function(err) {
      console.error('🎥🤳 error: ' + err.name)
    },
  )
}
