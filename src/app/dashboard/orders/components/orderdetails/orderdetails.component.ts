import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.scss'
})
export class OrderdetailsComponent {
// بيانات الطلب جاية من الأب أو Dummy data
    @Input() order: any = {
        id: 'ORD12345',
        customer: {
            name: 'Ahmed Ali',
            phone: '01001234567',
            address: '123 Street, Cairo, Egypt'
        },
        date: '2025-11-12 14:35',
        status: 'Processing',
        paymentMethod: 'Card',
        total: 1450,
        discount: 50,
        products: [
            { name: 'Product 1', quantity: 2, price: 300, image: '/maged-mostafa.webp' },
            { name: 'Product 2', quantity: 1, price: 500, image: '/maged-mostafa.webp' },
            { name: 'Product 3', quantity: 3, price: 100, image: '/maged-mostafa.webp' }
        ]
    }

    // تحسب المجموع النهائي بعد الخصم
    get finalTotal() {
        return this.order.total - (this.order.discount || 0);
    }




    changeStatus() {
//   this.orderService.updateStatus(this.order.id, this.order.status).subscribe({
//     next: (res) => {
//       Swal.fire({
//         icon: 'success',
//         title: 'Order status updated!',
//         showConfirmButton: false,
//         timer: 1500
//       });
//     },
//     error: (err) => {
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to update status',
//         text: err.message
//       });
//     }
//   });
}

}
