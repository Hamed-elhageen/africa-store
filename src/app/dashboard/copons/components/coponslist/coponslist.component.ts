import { Component, OnInit } from '@angular/core';
import { CoponsService } from '../../services/copons.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Coupon } from '../../models/copons';

@Component({
  selector: 'app-coponslist',
  templateUrl: './coponslist.component.html',
  styleUrl: './coponslist.component.scss'
})
export class CoponslistComponent implements OnInit {
    copons:Coupon[]=[]
    constructor(private coponsService:CoponsService , private spinner:NgxSpinnerService){

}

ngOnInit(): void {
    this.spinner.show()
    this.loadCoupons();
}

loadCoupons(){
this.coponsService.getAllCopons().subscribe({
        next:(result)=>{
                this.copons=result.data;
                console.log(this.copons)
                this.spinner.hide()
        },
        error:(err)=>{
            console.log("error in coponslist  component" +err)
            this.spinner.hide()
        }
    })
}



deleteCopon(coponId:string){
    Swal.fire({
    title: 'Are you sure?',
    text: 'This category and all its products will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',      // لون زرار الحذف
    cancelButtonColor: '#1C6F37',    // لون زرار الإلغاء
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result)=>{

    if(result.isConfirmed){
        this.spinner.show();
        this.coponsService.deleteCopon(coponId).subscribe({
            next:(result)=>{
            Swal.fire({
                title: 'Deleted!',
            text: result.message || 'Copon has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            })
                      this.copons = this.copons.filter(copon => copon._id !== coponId);                             //updating the categories imediately after deleting a category
            this.spinner.hide();
            },

            error:(err)=>{
                this.spinner.show()
                Swal.fire({
                title: 'Error!',
            text: err.message || 'Something went wrong while deleting.',
            icon: 'error'
                })
                this.spinner.hide();
            }
        })
    }
  })
}
}
