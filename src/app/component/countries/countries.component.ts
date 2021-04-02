import { Component, OnInit } from '@angular/core';
import { dataSummary } from 'src/app/models/data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data: dataSummary[] = [];
  countries : string[] = [];
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {

    this.service.getData().subscribe(result=> {
      this.data = result;
      this.data.forEach(cs=> {
        this.countries.push(cs.country!)
      })
    })
  }

}
