import Http from "~/config/Http";

class UploadFilesService {
  upload(file, uploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    console.log(file);

    return Http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      uploadProgress,
    });
  }

  getFiles() {
    return Http.get("/upload-files");
  }
}

export default new UploadFilesService();