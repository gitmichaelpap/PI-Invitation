import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});

export default class Http {

    //Login --- Inicio
    
    static getLogin = (login) => {
        return api.get(`/login?email=${login.email}&&password=${login.password}`)
            .then(function (response) {
                console.log(response);
                return !!response.data.length
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
    
    //Login --- Inicio

    //Guests --- Inicio

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

    //Guest --- Fim

    static findByTitle = title => {
    return api.get(`/guests?title=${title}`)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

}