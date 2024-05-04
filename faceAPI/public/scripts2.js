
// ! FACIAL RECOGNITION ! \\

const run = async()=>{


    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
    ])


    // ! REFERENCE FACE ! \\
    const referenceFace = await faceapi.fetchImage('images/waterfall2.png')

    const faceCheck = await faceapi.fetchImage('images/waterfall2.png')


    // ! get the reference image ! \\

    let RefFaceAIData = await faceapi.detectAllFaces(referenceFace).withFaceLandmarks().withFaceDescriptors()

    let FaceCheckAIData = await faceapi.detectAllFaces(faceCheck).withFaceLandmarks().withFaceDescriptors()

    // !  ! \\

    const canvas = document.getElementById('canvas')

    faceapi.matchDimensions(canvas,faceCheck)

    // ! CHECK IF FACES MATCH ! \\

    let faceMatcher = new faceapi.FaceMatcher(RefFaceAIData)

    FaceCheckAIData = faceapi.resizeResults(FaceCheckAIData,faceCheck)

    // !  ! \\

    FaceCheckAIData.forEach(face => {

        const {detection,descriptor} = face

        let label = faceMatcher.findBestMatch(descriptor).toString()

        console.log(label)

        if(label.includes("unknown")){
            return
        }

        let options = {label : "Someone"}

        const drawBox = new faceapi.draw.DrawBox(detection.box,options)

        drawBox.draw(canvas)

    })

}

run()