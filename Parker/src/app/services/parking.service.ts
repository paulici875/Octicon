import { ParkingReserve } from './../models/reserve-parking.model';
import { Parking } from './../models/parking.model';
import { HttpService } from './../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class ParkingService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public reserveParking(parking: ParkingReserve): Observable<any> {
    const observable: Observable<any> = this.httpService
    .post('/parking/reserve', parking)
    .pipe(share());
    return observable;
  }

}
