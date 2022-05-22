import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000",
  headers: {
    "Content-type": "application/json"
  }
});

export default class Http {

    static getHeader = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
    }

    //#region Login --- Inicio

    static getLogin = (login) => {
        return api.post(`/user/login`, login)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    static createLogin = (register) => {
            return api.post(`/user/register`, register)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    //#endregion Login --- Fim

    //#region Guests --- Inicio

    static getAllGuests = () => {

        const user = JSON.parse(localStorage.getItem('user'))
        return api.get(`/guest/user/${user.id}`, Http.getHeader())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    static getGuest = id => {
        return api.get(`/guest/${id}`, Http.getHeader())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    static createGuest = (data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.post("/guest", data, Http.getHeader())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    static updateGuest = (id, data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.put(`/guest/${id}`, data, Http.getHeader())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    static removeGuest = (id) => {
        return api.delete(`/guest/${id}`, Http.getHeader())
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
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
            return response;
        })
        .catch(function (error) {
                return error;
        });

    };

    static getFiles = id => {
        return api.get(`/invitation/${id}`)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    //#endregion Invitation --- Fim
}


