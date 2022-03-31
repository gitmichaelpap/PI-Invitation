import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json"
  }
});

export default class Http {

    //#region Login --- Inicio
    
    static getLogin = (login) => {
        return api.get(`/login?email=${login.email}&&password=${login.password}`)
            .then(function (response) {
                console.log(response);
                return response.data[0];
            })
            .catch(function (error) {
                console.error(error);
                return false;
            });
    };
    
    static createLogin = (user) => {
        return api.post("/login", user)
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
        return api.get("/guests")
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static getGuest = id => {
        return api.get(`/guests/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static createGuest = (data) => {
        return api.post("/guests", data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static updateGuest = (id, data) => {
        return api.put(`/guests/${id}`, data)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static removeGuest = (id) => {
        return api.delete(`/guests/${id}`)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    static removeAllGuests = () => {
        return api.delete(`/guests`)
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
        return api.get(`/invitation/${id}`)
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