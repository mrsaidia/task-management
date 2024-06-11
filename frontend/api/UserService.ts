import HttpService from "./HttpService";

class UserService {
    register(requestParams) {
        return HttpService.Post("/register", requestParams);
    }

    login(requestParams) {
        return HttpService.Post("/login", requestParams);
    }

    changePassword(requestParams) {
        return HttpService.Post("/change_password", requestParams);
    }
}

export default new UserService()