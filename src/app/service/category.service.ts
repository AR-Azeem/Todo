import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {ToastrService} from "ngx-toastr"
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:AngularFirestore,private toaster:ToastrService) { }

  saveCategory(data){
    this.afs.collection('categories').add(data).then(res=>{
      this.toaster.success("New Category saved successfully");
      
    })
  }

  getCategories(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(action=>{
        return action.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id
          return {data,id}
        })
      })
    )
   }

   updateCategories(id,data){
    this.afs.doc('categories/'+id).update({category:data}).then(res=>{
      this.toaster.success("updated successfully!")
    })
   }

   deleteCategory(id){
    this.afs.doc('categories/'+id).delete().then(res=>{
      this.toaster.error("category deleted Successfully!")
    })
   }
}
