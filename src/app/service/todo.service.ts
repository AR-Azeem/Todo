import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ToastrService} from 'ngx-toastr'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs'
import {increment} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private afs:AngularFirestore,private toaster:ToastrService) { }
  
  saveTodo(data,id){
    this.afs.collection('categories').doc(id).collection('todos').add(data).then(res=>{
    
      this.afs.doc('categories/'+id).update({todoCount:increment(1)});
      this.toaster.success("todo added successfully!")
    })
  }

  loadTodoData(id){
    return this.afs.collection('categories').doc(id).collection('todos').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(action=>{
          let data = action.payload.doc.data();
          let id = action.payload.doc.id;
          return {data,id};
        })
      })
    )
    
  }

  updateToDoData(catId,todoId,data){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({todo:data}).then(res=>{
      this.toaster.success("todo editted successfully!")
    })
  }

  deleteTodo(catId,todoId){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).delete().then(res=>{
        this.afs.doc('categories/'+catId).update({todoCount:increment(-1)});
      this.toaster.error("todo deleted successfully")
    })
  }

  updateToDoDataMarkComplete(catId,todoId,data){
    this.afs.collection('categories').doc(catId).collection('todos').doc(todoId).update({isCompleted:data}).then(res=>{
      console.log(data)
        if(data==true){
        this.toaster.info("marked complete!")
      }
      else{
        this.toaster.warning("marked incomplete");
      }
    })
  }


}
