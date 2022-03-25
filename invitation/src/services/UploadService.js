import http from "../http-common";

class UploadFilesService {
  upload(file, uploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    console.log(file);

    return http.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      uploadProgress,
    });
  }

}

export default new UploadFilesService();