import { Parking } from './../../models/parking.model';
import { UserService } from 'src/app/services/user.service';
import { ParkingReserve } from './../../models/reserve-parking.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParkingService } from './../../services/parking.service';

@Component({
  selector: 'app-normal-charging-parking-form',
  templateUrl: './normal-charging-parking-form.component.html',
  styleUrls: ['./normal-charging-parking-form.component.scss']
})
export class NormalChargingParkingFormComponent implements OnInit {
  form: FormGroup;
  @Output() submit = new EventEmitter();

  @Input() availableParkings: number;
  @Input() parking: Parking;
  @Input() parkingType: string;

  constructor(private formBuilder: FormBuilder, private parkingService: ParkingService, private userService: UserService) {}
  hoursSelect = [
    {
      value: '10:00'
    },
    {
      value: '12:00'
    },
    {
      value: '14:00'
    },
    {
      value: '16:00'
    },
    {
      value: '18:00'
    }
  ];
  ngOnInit() {
    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      date: ['', Validators.required],
      hours: ['', Validators.required],
      frequency: ['', Validators.required]
    });
  }
  get phone() {
    return this.form.get('phone');
  }

  get address() {
    return this.form.get('address');
  }

  get date() {
    return this.form.get('date');
  }

  get hours() {
    return this.form.get('hours');
  }
  get frequency() {
    return this.form.get('frequency');
  }

  public onSubmit() {
    const reservation: ParkingReserve =  new ParkingReserve();
    const hourRecived = this.form.get('hours').value;
    const date: Date = this.form.get('date').value;
    const finalDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hourRecived;
    const id = localStorage.getItem('id');

    console.log(this.parking);

    if (this.parkingType === 'normalParking') {
      reservation.isFastCharging = false;
    } else if (this.parkingType === 'electricalParking') {
      reservation.isFastCharging = true;
    }
    reservation.userId = +id;
    reservation.licensePlate = this.form.get('address').value;
    reservation.dateTime = finalDate;
    reservation.Type = this.form.get('frequency').value;
    reservation.parkingId = this.parking.id;

    this.parkingService.reserveParking(reservation).subscribe((data) => {
      if (data.statusCode === 200) {
        this.parking.emptySpotsCount -= 1;
        this.parking.reservedSpotsCount += 1;
        this.submit.emit();
      }
    });

  }
}
