import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/diary.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  alert: any;

  task: any = [];
  TaskTitle: string = '';
  TaskContent: string = '';
  id_update:string='';

  constructor(private taskService: TaskService, private router: Router, private alertController: AlertController) { }

  async presentAlert(id:string, titulo:string, contenido:string) {
    this.id_update=id;
    this.TaskTitle=titulo;
    this.TaskContent=contenido;
    this.alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: [{
        text: 'Cancel',
      },
      {
        text: 'OK',
        handler: this.UpdateTask.bind(this)
      },],
      inputs: [
        {
          placeholder: 'Title',
          attributes: {
            maxlength: 10,
          },
        },
        {
          type: 'textarea',
          placeholder: 'Content',
        },
      ],
    });
    await this.alert.present();
  }


  ngOnInit() {
    this.getAllTasks();
  }

  gotoHome(){
    this.router.navigateByUrl("/home");
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe(response => {
      this.task = response;
    })
  }

  DeleteTask(id: string) {
    this.taskService.delete(id).subscribe(response => {
      this.task = response;
      this.getAllTasks()
    })
    location.reload()

  }

  UpdateTask() {
// Accede a los elementos del DOM para obtener los valores
const titleInput = this.alert.querySelector('input[placeholder="Title"]').value;
const contentInput = this.alert.querySelector('textarea[placeholder="Content"]').value;
console.log(this.id_update);

if(titleInput && contentInput){
  this.TaskTitle= titleInput.toString();
  this.TaskContent= contentInput.toString();

}else{
  if(titleInput){
    this.TaskTitle= titleInput.toString();

  }else{
    if(contentInput){
    this.TaskContent= contentInput.toString();
    }
  }
}

let task={
  task_title: this.TaskTitle,
  task_content: this.TaskContent,
}

this.taskService.update(this.id_update,task).subscribe(response => {
  console.log(response);
  this.getAllTasks()
});
location.reload()
// Limpiar los campos del formulario después de guardar
this.TaskTitle = '';
this.TaskContent = '';
this.id_update ='';
//imprimir en la consola
console.log('Título:', titleInput);
console.log('Contenido:', contentInput);

console.log('Título:', this.TaskTitle);
console.log('Contenido:', this.TaskContent);

// Cierra el alert si es necesario
this.alert.dismiss();
  }
}
