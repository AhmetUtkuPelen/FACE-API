

// ! FACIAL DETECTION AND AGE GENDER GUESS ! \\

const run = async()=>{


    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
    ])

    const face1 = await faceapi.fetchImage('images/youngman2.png')

    // ! get and handle the image ! \\

    let faceAIData = await faceapi.detectAllFaces(face1).withFaceLandmarks().withFaceDescriptors().withAgeAndGender()

    // !  ! \\

    const canvas = document.getElementById('canvas')

    canvas.style.left = face1.offsetLeft
    canvas.style.left = face1.offsetTop
    canvas.height = face1.height
    canvas.width = face1.width


    // ! place a box on the face ! \\

    faceAIData = faceapi.resizeResults(faceAIData,face1)

    faceapi.draw.drawDetections(canvas,faceAIData)

    // ! AI guees the age and gender ! \\

    faceAIData.forEach(face => {

        const {age,gender,genderProbability} = face
        
        const genderText = `${gender} - ${genderProbability}`

        const ageText = `${Math.round(age)} years`

        const textField = new faceapi.draw.DrawTextField([genderText,ageText],face.detection.box.topRight).draw(canvas)

        textField.draw(canvas)



    })


    // ! FACE RECOGNITION TO CHECK IF TWO FACES MATCH !



}

run()