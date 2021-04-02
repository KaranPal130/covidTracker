import { Component, OnInit } from '@angular/core';
import { dataSummary } from 'src/app/models/data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalActive = 0;

  data: dataSummary[] = [];
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      {
        next: (result: any) => {
          console.log(result) 
            this.data = result;
            result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
            this.totalActive+=cs.active
            this.totalConfirmed+= cs.confirmed
            this.totalDeaths+= cs.deaths
            this.totalRecovered+= cs.recovered
          }
          })
        }
      }
    )
  }
}
