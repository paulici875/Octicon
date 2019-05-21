import { ParkingReserve } from './../models/reserve-parking.model';
import { Parking } from './../models/parking.model';
import { HttpService } from './../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class ParkingService {
  private httpService: HttpService;

  private checkSubject = new Subject<Parking>();
  public checkObservable = this.checkSubject.asObservable();

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public reserveParking(parking: ParkingReserve): Observable<any> {
    const observable: Observable<any> = this.httpService
    .post('/parking/reserve', parking)
    .pipe(share());
    return observable;
  }

  public toggleParking(id: any): Observable<any> {
    const observable: Observable<any> = this.httpService
    .post(`/parking/toggle-oppening/${id}`)
    .pipe(share());
    return observable;
  }

  public sendCheck(p: Parking) {
    this.checkSubject.next(p);
  }

}
