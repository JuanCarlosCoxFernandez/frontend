import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  endpoint = 'http://localhost:8080/task';
  constructor(private httpClient: HttpClient) { }

  getTasks(){
    return this.httpClient.get(this.endpoint);
  }

  add(task:any) {
    let body = new URLSearchParams();
    body.append("task_title", task.task_title);
    body.append("task_content", task.task_content);
    return this.httpClient.post(this.endpoint,body,httpOptions);
  }

  delete(id:string){
    return this.httpClient.delete(this.endpoint+`/${id}`,httpOptions);
  
  }

  update(id:string,task:any){
    let body = new URLSearchParams();
    body.append("task_title", task.task_title);
    body.append("task_content", task.task_content);
    return this.httpClient.put(this.endpoint+`/${id}`,body,httpOptions);
  }
}
