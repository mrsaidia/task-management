import HttpService from "./HttpService";

class TaskService {
    createTask(requestParams) {
        const jwtToken = JSON.parse(localStorage.getItem("jwtToken")!);

        return HttpService.Post("/task", requestParams, {headers: {Authorization: `Bearer ${jwtToken}`}});
    }

    getTaskPagination(requestParams) {
        const jwtToken = JSON.parse(localStorage.getItem("jwtToken")!);

        const queryString = `?page=${requestParams.page}&limit=${requestParams.limit}`
        return HttpService.Get(`/task${queryString}`, {headers: {Authorization: `Bearer ${jwtToken}`}});
    }

    updateTask(requestParams) {
        const jwtToken = JSON.parse(localStorage.getItem("jwtToken")!);

        return HttpService.Patch("/task", requestParams, {headers: {Authorization: `Bearer ${jwtToken}`}});
    }

    deleteTask(requestParams) {
        const jwtToken = JSON.parse(localStorage.getItem("jwtToken")!);

        return HttpService.Delete(`/task?id=${requestParams}`, {headers: {Authorization: `Bearer ${jwtToken}`}});
    }
}

export default new TaskService()