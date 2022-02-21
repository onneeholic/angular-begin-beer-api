import { Component, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'angular-begin2';

  limit: number = 6;
  perpage: number = 1;
  row: any[] = [];
  temp: any[] = [];
  dataSelect: any = {};
  open: boolean = false;
  config: any;
 
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];


  constructor(
    private _api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    

    const page =  Number(this.route.snapshot.paramMap.get('page') || '1');
    this.perpage = page;
   

    this.config = {
      itemsPerPage: this.limit,
      totalItems: 100,
      currentPage: this.perpage,
    };

    this.getData(this.limit, this.perpage);
   
  }


  getData(limit: number, page: number) {
    this._api
      .getdata(limit, page)
      .then((resp) => {
        this.row = resp;
        this.temp = resp;
      })
      .catch((err) => {});
  }

  OpenModalForm(item: any) {
    console.log(item);
    this.open = true;
    this.dataSelect = item;
  }

  pageChange(page: number) {
    this.config.currentPage = page;
    this.getData(this.limit, page);
    this.router.navigate([''], { queryParams: { page: page } });
  }

 
}
