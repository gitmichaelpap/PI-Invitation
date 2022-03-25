import Http from "~/config/Http";

class UploadFilesService {
  upload(file, uploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    
    return Http.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      uploadProgress,
    });
  }

  getFiles() {
    return Http.getGuest("/upload-files");
  }

}

export default new UploadFilesService();