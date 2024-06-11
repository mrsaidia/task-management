import HttpService from "./HttpService";

class TaskService {
  createTask(requestParams) {
    return HttpService.Post("/task", requestParams);
  }

  getTaskPagination(requestParams) {
    const queryString = `?page=${requestParams.page}&limit=${requestParams.limit}`;
    return HttpService.Get(`/task${queryString}`);
  }

  getTaskByMonth(requestParams) {
    const queryString = `?startDate=${requestParams.startDate}&endDate=${requestParams.endDate}`;
    return HttpService.Get(`/calendar${queryString}`);
  }

  updateTask(requestParams) {
    return HttpService.Patch("/task", requestParams);
  }

  deleteTask(requestParams) {
    return HttpService.Delete(`/task?id=${requestParams}`);
  }
}

export default new TaskService();
