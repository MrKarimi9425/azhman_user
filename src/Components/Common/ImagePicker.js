import * as ImagePicker from "react-native-image-picker"
import { baseUrl, url } from "./Address"
import { isSet } from "./isSet"
import DocumentPicker from 'react-native-document-picker'

const uploadFile = async (data) => {
    let fileName;
    await fetch(`${baseUrl}${url}guest/getfile`, {
        method: 'POST',
        body: data
    }).then(response => response.json())
        .then(file => {
            if (isSet(file["data"])) {
                if (file["res"] == 1) {
                    fileName = file["data"]["name"]
                }
            }
        })
    return fileName
}

function Library(type) {
    return new Promise((resolve, reject) => {
        try {
            ImagePicker.launchImageLibrary({
                mediaType: type
            }).then(async response => {
                if (!response.didCancel) {
                    response.assets.forEach(file => {
                        const fileApi = new FormData();
                        if (type == 'video') {
                            let type2 = file.type.split('/')
                            fileApi.append("fileApi", {
                                uri: file.uri,
                                name: `${file.fileName}.${type2[1]}`,
                                type: file.type,
                            });
                        } else {
                            fileApi.append("fileApi", {
                                uri: file.uri,
                                name: file.fileName,
                                type: file.type,
                            });
                        }
                        uploadFile(fileApi).then(fileName => {
                            resolve({
                                status: 'uploaded',
                                image: fileName
                            })
                        })
                    })
                }
            })
        } catch (error) {
            reject({
                error: error,
                message: error.message
            })
        }
    })
}

function Camera() {
    return new Promise((resolve, reject) => {
        try {
            ImagePicker.launchCamera({
                mediaType: "photo"
            }).then(response => {
                if (!response.didCancel) {
                    response.assets.forEach(image => {
                        resolve({
                            status: 'uploaded',
                            image: image
                        })
                    })
                }
            })
        } catch (error) {
            reject({
                error: error,
                message: error.message
            })
        }
    })
}

function Audio() {
    return new Promise((resolve, reject) => {
        try {
            DocumentPicker.pick({ type: DocumentPicker.types.audio }).then(audio => {
                audio.forEach(response => {
                    const fileApi = new FormData();
                    fileApi.append("fileApi", {
                        uri: response.uri,
                        name: response.name,
                        type: response.type,
                    });
                    uploadFile(fileApi).then(fileName => {
                        resolve({
                            status: 'uploaded',
                            image: fileName
                        })
                    })
                })
            }).catch(e => console.log(e))
        } catch (error) {
            reject({
                error: error,
                message: error.message
            })
        }
    })
}

function Document() {
    return new Promise((resolve, reject) => {
        try {
            DocumentPicker.pick({ type: [DocumentPicker.types.docx, DocumentPicker.types.pdf] }).then(document => {
                document.forEach(response => {
                    const fileApi = new FormData();
                    fileApi.append("fileApi", {
                        uri: response.uri,
                        name: response.name,
                        type: response.type,
                    });
                    uploadFile(fileApi).then(fileName => {
                        resolve({
                            status: 'uploaded',
                            image: fileName
                        })
                    })
                })
            }).catch(e => console.log(e))
            // ImagePicker.launchImageLibrary({
            //     mediaType: type
            // }).then(async response => {
            //     if (!response.didCancel) {
            //         response.assets.forEach(file => {
            //             const fileApi = new FormData();
            //             if (type == 'video') {
            //                 let type2 = file.type.split('/')
            //                 fileApi.append("fileApi", {
            //                     uri: file.uri,
            //                     name: `${file.fileName}.${type2[1]}`,
            //                     type: file.type,
            //                 });
            //             } else {
            //                 fileApi.append("fileApi", {
            //                     uri: file.uri,
            //                     name: file.fileName,
            //                     type: file.type,
            //                 });
            //             }
            //             uploadFile(fileApi).then(fileName => {
            //                 resolve({
            //                     status: 'uploaded',
            //                     image: fileName
            //                 })
            //             })
            //         })
            //     }
            // })
        } catch (error) {
            reject({
                error: error,
                message: error.message
            })
        }
    })
}



export { Library, Camera, Audio, Document };