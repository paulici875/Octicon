import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY'
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ProfitComponent implements OnInit {
  date = new FormControl(moment());
  public month = 'Aprilie';
  public reservations = [
    { chargingType: 'normal', date: '2019-04-03' },
    { chargingType: 'fast', date: '2019-04-04' },
    { chargingType: 'fast', date: '2019-04-05' },
    { chargingType: 'fast', date: '2019-04-05' },
    { chargingType: 'normal', date: '2019-04-05' },
    { chargingType: 'normal', date: '2019-04-05' },
    { chargingType: 'normal', date: '2019-04-05' },
    { chargingType: 'normal', date: '2019-04-06' },
    { chargingType: 'fast', date: '2019-04-06' },
    { chargingType: 'normal', date: '2019-04-07' },
    { chargingType: 'normal', date: '2019-04-08' },
    { chargingType: 'normal', date: '2019-04-09' },
    { chargingType: 'normal', date: '2019-04-10' },
    { chargingType: 'normal', date: '2019-04-11' },
    { chargingType: 'normal', date: '2019-04-12' },
    { chargingType: 'normal', date: '2019-04-13' },
    { chargingType: 'normal', date: '2019-04-14' },
    { chargingType: 'normal', date: '2019-04-15' },
    { chargingType: 'normal', date: '2019-04-16' },
    { chargingType: 'normal', date: '2019-04-17' },
    { chargingType: 'normal', date: '2019-04-18' },
    { chargingType: 'normal', date: '2019-04-19' },
    { chargingType: 'normal', date: '2019-04-20' },
    { chargingType: 'normal', date: '2019-04-21' },
    { chargingType: 'normal', date: '2019-04-22' },
    { chargingType: 'normal', date: '2019-04-23' }
  ];

  makeDataPointsForChart() {
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    let dataPoints = [];
    let p = groupBy(this.reservations, 'date');
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
        let sum = 0;
        for (let element of p[key]) {
          if (element.chargingType === 'normal') {
            sum += 60 * 1.25;
          } else {
            sum += 120 * 1.5;
          }
        }
        dataPoints.push({
          y: sum,
          label: key.split('-')[2]
        });
      }
    }
    return dataPoints;
  }
  ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        gridThickness: 0
      },
      data: [
        {
          type: 'line',
          dataPoints: this.makeDataPointsForChart()
        }
      ]
    });

    chart.render();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}
