const medias = {
  audio : false,
  video : true
};
const video = document.getElementById("video");
const promise = navigator.mediaDevices.getUserMedia(medias);


function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};

videoElement.addEventListener("click", function () {
  promise.then(successCallback).then(errorCallback);
});



