import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { ApiService } from '../../../services/api-service.service';
@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: ['./tags-table.component.scss']
})
export class TagsTableComponent implements OnInit {
  @Input('transactions') transactions;
  query; //search input query
  constructor(private apiService: ApiService, private notificationsService: NotificationsService) {

  }

  ngOnInit() {
  }

  /**
   * Delete a transaction
   * @param  transaction [Transaction to be deleted]
   */
  delete(transaction) {
    if (window.confirm('Are you sure you want this transaction deleted?')) {
      this.apiService.deleteTransaction(transaction._id).then(data => {
        //remove the deleted transaction from the transactions array
        var index = this.transactions.indexOf(transaction);
        if (index > -1) {
          this.transactions.splice(index, 1);
        }
        //show an alert telling the user the transaction has been deleted
        this.notificationsService.success('Success', 'Transaction successfully deleted.');
      })
        .catch(err => {
          //show an alert telling the user the transaction couldn't be deleted
          this.notificationsService.error('Error', 'An error occurred while trying to delete this transaction. Please try again later.');
        })
    }

  }

}
