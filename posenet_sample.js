
const imageScaleFactor = 0.2;
const outputStride = 16;
const flipHorizontal = false;
//const stats = new Stats();
const contentWidth = 600;
const contentHeight = 800;
const colors = ["red","blue","green"];
const fontLayout = "bold 50px Arial";
const canvasStream = document.querySelector('canvas').captureStream();
const recorder = new MediaRecorder(canvasStream);

let threshold = 0.1
bindPage();

async function bindPage() {
    const net = await posenet.load();
    let video;
    try {
        video = await loadVideo();
    } catch(e) {
        console.error(e);
        return;
    }
    detectPoseInRealTime(video, net);
}

async function loadVideo() {
    const video = await setupCamera();
    video.play();
    return video;
}

async function setupCamera() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': {
               'facingMode': 'environment'
            }
	});
        video.srcObject = stream;

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    } else {
        const errorMessage = "This browser does not support video capture, or this device does not have a camera";
        alert(errorMessage);
        return Promise.reject(errorMessage);
    }
}

function detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const flipHorizontal = true; // since images are being fed from a webc

    async function poseDetectionFrame() {
        //stats.begin();
        let poses = [];
        const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
        poses.push(pose);

        ctx.clearRect(0, 0, contentWidth,contentHeight);

        ctx.save();
        ctx.scale(-1, 1);
        //ctx.translate(-contentWidth, 0);
        ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
        ctx.restore();

        poses.forEach(({ s, keypoints }) => {
            //drawNaviko(keypoints[0],keypoints[1],ctx);
            for(i=0;i<17;i++){
               if(threshold < keypoints[i].score){
                  drawWristPoint(keypoints[i],ctx);
               }
            }
            
            // 肩の間
            if(threshold < keypoints[5].score && threshold < keypoints[6].score){
               drawLine(keypoints[5], keypoints[6], ctx);
		    }
            // 左腕
            if(threshold < keypoints[5].score && threshold < keypoints[7].score)
               drawLine(keypoints[5], keypoints[7], ctx);
            if(threshold < keypoints[7].score && threshold < keypoints[9].score)
               drawLine(keypoints[7], keypoints[9], ctx);
            // 右腕
            if(threshold < keypoints[6].score && threshold < keypoints[8].score)
               drawLine(keypoints[6], keypoints[8], ctx);
            if(threshold < keypoints[8].score && threshold < keypoints[10].score)
               drawLine(keypoints[8], keypoints[10], ctx);
            // 肩と腰
            if(threshold < keypoints[5].score && threshold < keypoints[11].score)
               drawLine(keypoints[5], keypoints[11], ctx);
            if(threshold < keypoints[6].score && threshold < keypoints[12].score)
               drawLine(keypoints[6], keypoints[12], ctx);
            if(threshold < keypoints[11].score && threshold < keypoints[12].score)
               drawLine(keypoints[11], keypoints[12], ctx);
            // 腰と膝
            if(threshold < keypoints[11].score && threshold < keypoints[13].score)
               drawLine(keypoints[11], keypoints[13], ctx);
            if(threshold < keypoints[12].score && threshold < keypoints[14].score)
               drawLine(keypoints[12], keypoints[14], ctx);
            // 膝と足首
            if(threshold < keypoints[13].score && threshold < keypoints[15].score)
               drawLine(keypoints[13], keypoints[15], ctx);
            if(threshold < keypoints[14].score && threshold < keypoints[16].score)
               drawLine(keypoints[14], keypoints[16], ctx);
            
            //ballsDecision(ctx,[keypoints[9],keypoints[10]]);
		    //console.log(keypoints)
        });

        requestAnimationFrame(poseDetectionFrame);
    }
    poseDetectionFrame();
}

function drawWristPoint(wrist,ctx){
    ctx.beginPath();
    ctx.arc(wrist.position.x , wrist.position.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function drawLine(p1, p2, ctx){
    ctx.beginPath();
    ctx.moveTo(p1.position.x, p1.position.y);
    ctx.lineTo(p2.position.x, p2.position.y);
    ctx.strokeStyle = "blue";
    ctx.closePath();
    ctx.stroke();
}

document.getElementById("recb").onclick = function() {
   $('#rec').removeClass('far');
   $('#rec').toggleClass('fas');
   $("#rec").css("color","red");
	
};
