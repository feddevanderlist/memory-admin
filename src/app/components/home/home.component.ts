import {Component, OnDestroy} from '@angular/core';
import {AggregateService} from "../../services/aggregate/aggregate.service";
import {map, Subject, takeUntil} from "rxjs";
import {TopFiveService} from "../../services/topFive/top-five.service";
import {PlayerServiceService} from "../../services/players/player-service.service";
import {NavigationExtras, Router} from "@angular/router";
import {ApiObj} from "../../objects/api-obj";
import {PlayerObject} from "../../objects/player-object";
import {AggregateObject} from "../../objects/aggregate-object";
import {TopFiveObject} from "../../objects/top-five-object";


@Component({
  selector: 'app-aggregate',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnDestroy {

  destroy: Subject<boolean> = new Subject<boolean>();
  aantal_spellen: number;
  aantal_spelers: number;
  api_data: ApiObj[];
  top_five_data: any;

  showTable: boolean = false;
  tableButtonText: string = "Show players";

  players: PlayerObject[]

  constructor(private aggregateService: AggregateService, private topFiveService: TopFiveService, private playerService: PlayerServiceService, private router: Router) {
    let token = localStorage.getItem('jwt');

    // check if there is any token available before page is loaded
    if (typeof token == 'undefined' || token == null) {
      localStorage.removeItem('jwt');
      const navigationExtras: NavigationExtras = {state: {data: 'Error: No token available. While navigating to admin panel'}};
      router.navigate([""], navigationExtras);
    }

    this.aantal_spellen = 0;
    this.aantal_spelers = 0;
    this.api_data = [];
    this.top_five_data = [];
    this.players = [];

    this.loadData(topFiveService, playerService);
  }

  loadData(topFiveService: TopFiveService, playerService: PlayerServiceService): void {

    this.aggregateService.getAggregateData()
      .pipe(takeUntil(this.destroy))
      .pipe(
        map((response: any) => {
          console.log(response);
          this.aantal_spelers = response[1].aantal_spelers;
          this.aantal_spellen = response[0].aantal_spellen;
          this.api_data = response[2].map((obj: ApiObj) => {
            if (obj.api === "") {
              obj.api = "Totaal";
            }
            return obj;
          });
        })).subscribe();

    topFiveService.getTopFive()
      .pipe(takeUntil(this.destroy))
      .pipe(
        map((response: TopFiveObject) => {
          this.top_five_data = response;
        })).subscribe()

    playerService.getPlayers()
      .pipe(takeUntil(this.destroy))
      .pipe(
        map((response: any) => {
          this.players = response;
        })
      ).subscribe()
  }


  showOrHideTable(): void {
    this.showTable = !this.showTable;
    if (this.showTable) {
      this.tableButtonText = "Hide players"
    } else {
      this.tableButtonText = "Show players"
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate([""]);
  }

  ngOnDestroy(): void {
    this.destroy.next(true);

  }
}

