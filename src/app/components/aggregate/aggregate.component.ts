import {Component} from '@angular/core';
import {AggregateService} from "../../services/aggregate/aggregate.service";

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {
  constructor(private aggregateService: AggregateService) {
  }

  loadData(): void {
    this.aggregateService.getAggregateData().subscribe(data => {
      console.log(data);

    })
  }

}
