import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Conference, Division, divisionsMap, TeamFilter} from "../../filter.models";
import {NbaService} from "../../nba.service";
import {Team} from "../../data.models";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-teams-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams-filter.component.html',
  styleUrls: ['./teams-filter.component.css']
})
export class TeamsFilterComponent implements OnInit {

  teams$: Observable<Team[]>;
  allTeams: Team[] = [];

  teamFilter$: BehaviorSubject<TeamFilter> = new BehaviorSubject<TeamFilter>({ conference: null, division: null });
  conferences = Object.entries(Conference);
  divisions = Object.values(Division);
  teamsLoadingMessage = 'Loading teams...';

  constructor(protected nbaService: NbaService) {
    this.teams$ = nbaService.getAllTeams().pipe(
      tap(teams => this.allTeams = teams),
      switchMap( teams => this.teamFilter$.pipe(map( teamFilter => {
        return teams.filter(team => {
          return (!teamFilter.division || team.division == teamFilter.division) &&
            (!teamFilter.conference || team.conference == teamFilter.conference);
        });
      })))
    );
  }

  ngOnInit() {
    setTimeout(() => this.teamsLoadingMessage = 'There are no teams to display',3000);
  }

  conferenceChange(c: string): void {
    const conference = c as Conference || null;
    this.divisions = divisionsMap.get(conference) ?? Object.values(Division);
    // Keep division only if it satisfies the filter
    const currDiv = this.teamFilter$.value.division;
    const division = currDiv && this.divisions.includes(currDiv) ? currDiv : null;
    this.teamFilter$.next({
      conference,
      division
    });
  }

  divisionChange(d: string): void {
    const division = d === '' ? null : d as Division;
    this.teamFilter$.next({
      conference: this.teamFilter$.value.conference,
      division
    });
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }
}
