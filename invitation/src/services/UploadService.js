import http from "../http-common";

class UploadFilesService {
  upload(file, uploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    console.log(file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      uploadProgress,
    });
  }

  getFiles() {
    return http.get("/upload-files");
  }
}

export default new UploadFilesService();