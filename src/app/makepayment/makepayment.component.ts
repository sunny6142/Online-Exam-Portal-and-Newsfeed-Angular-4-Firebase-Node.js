import { Component, OnInit } from '@angular/core';
import { PaymentService } from "../payment.service";

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  }

  RedirectPaymentlink(){
    this.paymentService.getPaymentlink("Sunny")
    .subscribe(
        feed =>  {
          console.log(feed);
        }
    );
  }

}
