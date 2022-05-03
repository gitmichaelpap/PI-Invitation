import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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
        return api.post(`/v1.0/login`,login)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };
        
    static createLogin = (user) => {
            return api.post("/v1.0/user", user)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    //#endregion Login --- Fim

    //#region Guests --- Inicio

    static getAllGuests = () => {

        const user = JSON.parse(localStorage.getItem('user'))
        return api.get(`/v1.0/guest/user/${user.id}`, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    static getGuest = id => {
        return api.get(`/v1.0/guest/${id}`, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    static createGuest = (data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.post("/v1.0/guest", data, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    static updateGuest = (id, data) => {
        data.user = JSON.parse(localStorage.getItem('user'));
        return api.put(`/v1.0/guest/${id}`, data, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    static removeGuest = (id) => {
        return api.delete(`/v1.0/guest/${id}`, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    static removeAllGuests = () => {
        return api.delete(`/v1.0/guest`, Http.getHeader())
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
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
            console.log(response);
            return response;
        })
        .catch(function (error) {
                console.log(error);
                return error;
        });

    };

    static getFiles = id => {
        return api.get(`/v1.0/invitation/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
    };

    //#endregion Invitation --- Fim
}


