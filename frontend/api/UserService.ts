import HttpService from "./HttpService";

class UserService {
    register(requestParams) {
        return HttpService.Post("/register", requestParams);
    }

    login(requestParams) {
        return HttpService.Post("/login", requestParams);
    }
}

export default new UserService()