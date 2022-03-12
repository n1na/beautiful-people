var canvasDiv = document.getElementById('drawingCanvas');

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

var headWidth = 0;
const headHeight = Constants.HEAD_HEIGHT;


// initialize two.js [https://github.com/jonobr1/two.js/]
var two = new Two({
    'fullscreen': true
}).appendTo(canvasDiv);

drawFace();

// triggered on button click and load
function drawFace() {
    two.clear(); // clear previous face

    // set head width to new random value every time draw is triggered
    headWidth = getRandom(Constants.HEAD_WIDTH_MIN_MAX);

    // draw head using two lines
    var headSegments = getRandom(Constants.HEAD_SEGMENTS_MIN_MAX);
    var headFirstStroke = getCurveyCircle(-30, 210, headWidth, headHeight, headSegments, true);
    setTranslation(headFirstStroke, centerX, centerY);
    var headSecondStroke = getCurveyCircle(-30, 210, headWidth, headHeight, headSegments, true);
    setTranslation(headSecondStroke, centerX, centerY);

    // draw hair
    var hairSegments = getRandom(Constants.HAIR_SEGMENTS_MIN_MAX);
    var hair = getCurveyCircle(210, 330, headWidth, headHeight, hairSegments, true, true);
    setTranslation(hair, centerX, centerY - headHeight);

    // draw ears
    var earWidth = getRandom(Constants.EAR_WIDTH_MIN_MAX);
    var earHeight = getRandom(Constants.EAR_HEIGHT_MIN_MAX);
    var earSegments = getRandom(Constants.EAR_SEGMENTS_MIN_MAX);

    makeEar(earWidth, earHeight, earSegments, true); // left
    makeEar(earWidth, earHeight, earSegments, false); // right

    // draw eyes
    var eyeSize = getRandom(Constants.EYE_SIZE_MIN_MAX);
    var eyeSegments = getRandom(Constants.EYE_SPACING_MIN_MAX);
    var spaceBetweenEyes = getRandom(Constants.EYE_SEGMENTS_MIN_MAX);
    // pupils
    var pupilSize = getRandom(Constants.PUPIL_SIZE_MIN_MAX);
    var pupilSegments = getRandom(Constants.PUPIL_SEGMENTS_MIN_MAX);
    // brows
    var browSize = getRandom(Constants.BROW_SIZE_MIN_MAX);
    var browSegments = getRandom(Constants.BROW_SEGMENTS_MIN_MAX);

    makeEye(eyeSize, eyeSegments, pupilSize, pupilSegments, browSize, browSegments, spaceBetweenEyes, true); // left
    makeEye(eyeSize, eyeSegments, pupilSize, pupilSegments, browSize, browSegments, spaceBetweenEyes, false); // right

    // draw nose
    var noseStartAngle = getRandom(Constants.NOSE_START_ANGLE_MIN_MAX);
    var noseEndAngle = getRandom(Constants.NOSE_END_ANGLE_MIN_MAX);
    var noseSegments = getRandom(Constants.NOSE_SEGMENTS_MIN_MAX);
    var noseSize = getRandom(Constants.NOSE_SIZE_MIN_MAX);
    var nose = getCurveyCircle(noseStartAngle, noseEndAngle, noseSize, noseSize, noseSegments, true);
    setTranslation(nose, centerX, centerY);

    // draw mouth
    var mouthStartAngle = getRandom(Constants.MOUTH_START_ANGLE_MIN_MAX);
    var mouthEndAngle = getRandom(Constants.MOUTH_END_ANGLE_MIN_MAX);
    var mouthSegments = getRandom(Constants.MOUTH_SEGMENTS_MIN_MAX);
    var mouthWidth = getRandom(Constants.MOUTH_WIDTH_MIN_MAX);
    var mouthHeight = getRandom(Constants.MOUTH_HEIGHT_MIN_MAX);
    var mouth = getCurveyCircle(mouthStartAngle, mouthEndAngle, mouthWidth, mouthHeight, mouthSegments, true);
    setTranslation(mouth, centerX, centerY + 35);

    two.update();
}

function setTranslation(elementToTranslate, x, y) {
    elementToTranslate.translation.set(x, y);
}

function makeEar(earWidth, earHeight, earSegments, isLeft) {
    var xPosition = isLeft ? centerX - headWidth - earWidth : centerX + headWidth + earWidth;
    var ear = getCurveyCircle(Constants.DEFAULT_START_ANGLE, Constants.DEFAULT_END_ANGLE, earWidth, earHeight, earSegments, true);
    setTranslation(ear, xPosition, centerY);
}

function makeEye(eyeSize, eyeSegments, pupilSize, pupilSegments, browSize, browSegments, spaceBetweenEyes, isLeft) {
    var xPosition = isLeft ? centerX - eyeSize - spaceBetweenEyes : centerX + eyeSize + spaceBetweenEyes;
    var yPosition = centerY - (headHeight / 3);

    var eye = getCurveyCircle(Constants.DEFAULT_START_ANGLE, Constants.DEFAULT_END_ANGLE, eyeSize, eyeSize, eyeSegments);
    setTranslation(eye, xPosition, yPosition);

    var pupil = getCurveyCircle(Constants.DEFAULT_START_ANGLE, Constants.DEFAULT_END_ANGLE, pupilSize, pupilSize, pupilSegments);
    pupil.fill = '#000';
    setTranslation(pupil, xPosition, yPosition);

    var brow = getCurveyCircle(210, 330, browSize, browSize, browSegments, true);
    setTranslation(brow, xPosition, yPosition - eyeSize - 5);
}

// thanks to Yagiz [https://github.com/yagiz]
function getCurveyCircle(startAngle, endAngle, radiusX, radiusY, segments, keepPathOpen, chaoticRandom) {
    var anchors = [];
    var randomizeFactor = chaoticRandom ? getRandom(Constants.RANDOMIZER_MIN_MAX) : 5; // chaoticRandom is used for hair
    for (var i = 0; i <= segments; i++) {
        var step = startAngle + i * (endAngle - startAngle) / segments;
        var px = Math.cos(step / 180 * Math.PI) * radiusX + randomizeValue(0, randomizeFactor);
        var py = Math.sin(step / 180 * Math.PI) * radiusY + randomizeValue(0, randomizeFactor);
        anchors.push(new Two.Anchor(px, py));
    }
    return two.makeCurve(anchors, keepPathOpen);
}

function getRandom(value) {
    var min = Math.ceil(value.min);
    var max = Math.floor(value.max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeValue(value, rand) {
    return value += Math.random() * rand - rand * 0.5;
}