import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
  }
});

export default class Http {

    //#region Login --- Inicio

    static getLogin = (login) => {
        return api.post(`/v1.0/login`,login)
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
                return false;
            });
    };

    static createLogin = (user) => {
        return api.post("/v1.0/login", user)
            .then(function (response) {
                console.log(response);
                return true;
            })
            .catch(function (error) {
                console.error(error);
                return false;
            });
    };

    //#endregion Login --- Fim

    //#region Guests --- Inicio

    static getAllGuests = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return api.get(`/v1.0/guest/user/${user.id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static getGuest = id => {
        return api.get(`/v1.0/guest/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static createGuest = (data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.post("/v1.0/guest", data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static updateGuest = (id, data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.put(`/v1.0/guest/${id}`, data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static removeGuest = (id) => {
        return api.delete(`/v1.0/guest/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static removeAllGuests = () => {
        return api.delete(`/v1.0/guest`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    //#endregion Guest --- Fim

    //#region Invitation --- Inicio

    static uploadInvitation = (file, uploadProgress)  => {

        let formData = new FormData();

        formData.append("file", file);

        return api.post(
            "/invitation",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                uploadProgress,
            }
        )
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });

    };

    static getFiles = id => {
        return api.get(`/v1.0/invitation/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    //#endregion Invitation --- Fim
}
