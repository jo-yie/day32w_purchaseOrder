import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PurchaseOrder } from '../models';

@Component({
  selector: 'app-purchase-order',
  standalone: false,
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {

  private fb = inject(FormBuilder)

  protected form !: FormGroup
  protected lineItems !: FormArray

  ngOnInit(): void {

    console.log(">>>> in ngOnInit()")
    this.form = this.createForm()

  }

  private createForm(): FormGroup {

    this.lineItems = this.fb.array([])

    return this.fb.group({

      name: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]),
      address: this.fb.control<string>("", [ Validators.required, Validators.minLength(3) ]), 
      email: this.fb.control<string>("", [ Validators.required, Validators.email ]),
      deliveryDate: this.fb.control<string>("", [ Validators.required ]), 
      availability: this.fb.control<number>(0),
      urgent: this.fb.control<boolean>(false),

      lineItems: this.lineItems

    })

  }

  protected processForm(): void {

    // const values: any = this.form.value

    const values: PurchaseOrder = this.form.value
    console.info(">>>> values: ", values)

  }

  protected isCtrlValid(ctrl: string): boolean {
    return !!this.form.get(ctrl)?.valid
  }
  
  protected isCtrlInvalid(ctrl: string): boolean {
    return !!this.form.get(ctrl)?.invalid
  }

  private createLineItem(): FormGroup {

    return this.fb.group({

      itemName: this.fb.control<string>("", [ Validators.required ]), 
      quantity: this.fb.control<number>(0, [ Validators.required ]),
      unitPrice: this.fb.control<number>(0, [ Validators.required ])

    })

  }

  protected addLineItem() {

    this.lineItems.push(this.createLineItem())

  }

  protected isLineItemValid(index: number, ctrl: string): boolean {
    return !!this.lineItems.at(index).get(ctrl)?.valid
  }
  
  protected isLineItemInvalid(index: number, ctrl: string): boolean {
    return !!this.lineItems.at(index).get(ctrl)?.invalid
  }

  protected invalid(): boolean {
    return this.form.invalid || this.lineItems.controls.length <= 0
  }

  protected removeLineItem(id: number) {
    this.lineItems.removeAt(id)
  }

}
