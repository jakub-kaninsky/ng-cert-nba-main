import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {NbaService} from '../nba.service';
import {Game, Stats, Team} from '../data.models';
import {ModalResult, ModalService} from "../shared/modal/modal.service";
import {ModalComponent} from "../shared/modal/modal.component";

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input() team!: Team;
  @Input() index!: number;

  games$!: Observable<Game[]>;
  stats!: Stats;

  @ViewChild('card', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  modal: ModalComponent | undefined;

  constructor(protected nbaService: NbaService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.games$ = this.nbaService.getGames(this.team).pipe(
      tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

  async removeTrackedTeam() {
    this.modal = this.modalService.openModal(this.viewContainerRef, this.modalContent);
  }

  close() {
    this.modal?.action.next(ModalResult.Close);
  }

  confirm(index: number) {
    this.modal?.action.next(ModalResult.Confirm);
    this.nbaService.removeTrackedTeam(index);
  }
}
