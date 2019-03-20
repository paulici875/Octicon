import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parking } from 'src/app/models/parking.model';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getParkings(): Observable<Parking[]> {
    return this.http.get<Parking[]>('http://localhost:57629/parking/all');
  }

}
