import { Component } from '@angular/core'
import { NgForm} from '@angular/forms'
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  ColorCodes = [ "#123456","#675674","#428afc","#456fed","#cbafed","#aabbcc","#ddffee","#0f07f6","#12fe34","#789654","#786313","#28fe28","#abcdef","#987cde","#bc65df"];
  categoryList:Array<any>;
  categoryName:string="";
  categoryId:string="";
  dataStatus:string="Add";

  constructor(private categoryService:CategoryService){}
  
  ngOnInit(){
    this.categoryService.getCategories().subscribe(data=>{
      console.log(data)
      this.categoryList = data;
    })
  }
  
  onSubmit(f:NgForm){
    if(this.dataStatus=="Add"){
      let randomValue = Math.floor(Math.random()*15);
      let todoCategory = {
        category : f.value.categoryName,
        colorCode : this.ColorCodes[randomValue],
        todoCount : 0
      }
      this.categoryService.saveCategory(todoCategory);
    }
    else{
      this.categoryService.updateCategories(this.categoryId,this.categoryName)
    }
    f.resetForm();
    this.dataStatus="Add";
    
  }

  onEdit(data:any,id){
    this.categoryName = data;
    this.categoryId =id;
    this.dataStatus = "Edit";
    console.log(data)
  }

  onDelete(id){
    this.categoryService.deleteCategory(id);
  }

}
