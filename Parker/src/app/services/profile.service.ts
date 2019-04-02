import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';

@Injectable()
export class ProfileService {
    private httpService: HttpService;

    constructor(httpService: HttpService){
        this.httpService = httpService;
    }

}