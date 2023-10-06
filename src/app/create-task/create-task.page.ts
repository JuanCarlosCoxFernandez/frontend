import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/diary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {
  TaskTitle: string = '';
  TaskContent: string = '';
  task: Array<{ task_title: string; task_content: string }> = [];
  error: string = 'Rellene los campos';

  isAlertOpen = false;
  public alertButtons = ['OK'];
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  
  }
  constructor(private taskService: TaskService,private router: Router) { }

  ngOnInit() {
  }

  gotoHome(){
    this.router.navigateByUrl("/home");
  }

  addTask(){
    if (this.TaskTitle && this.TaskContent){
      let task ={
        task_title: this.TaskTitle,
        task_content: this.TaskContent,
      }
      this.taskService.add(task).subscribe(response => {
        console.log(response);
      });
      // Limpiar los campos del formulario después de guardar
      this.TaskTitle = '';
      this.TaskContent = '';
    }else{
      
      
    }
  }
}
