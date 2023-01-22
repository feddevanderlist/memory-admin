import {Component} from '@angular/core';
import {AggregateService} from "../../services/aggregate/aggregate.service";
import {map} from "rxjs";
import {TopFiveServiceService} from "../../services/topFive/top-five-service.service";
import {PlayerServiceService} from "../../services/players/player-service.service";

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent {
  aantal_spellen: number;
  aantal_spelers: number;
  api_data: Array<{ api: string, aantal: number }>;
  top_five_data: Array<{ username: string, score: number }>;

  showTable: boolean = false;
  tableButtonText: string = "Show players";

  players: Array<{ username: string, email: string }>

  constructor(private aggregateService: AggregateService, topFiveService: TopFiveServiceService, playerService: PlayerServiceService) {
    this.aantal_spellen = 0;
    this.aantal_spelers = 0;
    this.api_data = [];
    this.top_five_data = [];
    this.players = [];
    this.loadData(topFiveService, playerService);
  }

  loadData(topFiveService: TopFiveServiceService, playerService: PlayerServiceService): void {
    this.aggregateService.getAggregateData()
      .pipe(
        map((response: any) => {
          this.aantal_spelers = response[1].aantal_spelers;
          this.aantal_spellen = response[0].aantal_spellen;
          this.api_data = response[2];
        })).subscribe();

    topFiveService.getTopFive().pipe(map((response: any) => {
      this.top_five_data = response;
    })).subscribe()

    playerService.getPlayers().pipe(
      map((response: any) => {
        this.players = response;
      })
    ).subscribe()
  }


  showOrHideTable(): void {
      this.showTable = !this.showTable;
      if (this.showTable){
        this.tableButtonText = "Hide players"
      }else {
        this.tableButtonText = "Show players"
      }
  }
}
