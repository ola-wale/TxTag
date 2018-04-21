import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { ApiService } from '../../../services/api-service.service';
@Component({
  selector: 'app-new-tag-panel',
  templateUrl: './new-tag-panel.component.html',
  styleUrls: ['./new-tag-panel.component.scss']
})
export class NewTagPanelComponent implements OnInit {
  newTransactionForm: FormGroup;
  tags: Array<object>;
  tagFieldFocus:boolean;
  constructor(private apiService: ApiService, private notificationsService: NotificationsService) {
    this.newTransactionForm = new FormGroup({ //instantiate new FormGroup with FormControls
      hash: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]{64}$")
      ]),
      tags: new FormControl(''),
    });
  }

  ngOnInit() { }

  submitNewTransactionForm(form, event: Event) {
    event.preventDefault();
    let _tags = [];
    if (this.tags) {
      this.tags.forEach((element: any) => {
        _tags.push(element.value);
      })
    }
    this.newTransactionForm.value.tags = _tags;
    this.apiService.newTransaction(this.newTransactionForm.value).then(data => {
      this.notificationsService.success('Success', `Transaction tagged`);
    }).catch(err => {
      if (err.error.errors) {
        this.notificationsService.error('Error', err.error.errors[0].msg) //show an alert with the first error
      } else {
        this.notificationsService.error('Error', 'An error occurred while trying to tag this transaction. Please try again later.');
      }
    })
  }


}
