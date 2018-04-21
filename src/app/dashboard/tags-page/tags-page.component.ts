import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-tags-page',
  templateUrl: './tags-page.component.html',
  styleUrls: ['./tags-page.component.scss']
})
export class TagsPageComponent implements OnInit {
  transactions;
  constructor(private apiService:ApiService) {
    this.apiService.transactions().then(data => {
      this.transactions = data;
    })
    .catch(err => {

    })
  }

  ngOnInit() {
  }

}
