import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});

export default class Http {
    static getAll = () => {
    return api.get("/guests")
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    static get = id => {
    return api.get(`/guests/${id}`)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    static create = (data) => {
    return api.post("/guests", data)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    static update = (id, data) => {
    return api.put(`/guests/${id}`, data)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    static remove = (id) => {
    return api.delete(`/guests/${id}`)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

    static removeAll = () => {
    return api.delete(`/guests`)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            console.error(error);
        });
    };

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