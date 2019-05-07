import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-fast-charging-parking-form",
  templateUrl: "./fast-charging-parking-form.component.html",
  styleUrls: ["./fast-charging-parking-form.component.scss"]
})
export class FastChargingParkingFormComponent implements OnInit {
  form: FormGroup;
  @Output() submit = new EventEmitter();
  @Input() availableParkings: number;
  constructor(private formBuilder: FormBuilder) {}
  hoursSelect = [
    {
      value: "10:00"
    },
    {
      value: "12:00"
    },
    {
      value: "14:00"
    },
    {
      value: "16:00"
    },
    {
      value: "18:00"
    }
  ];
  ngOnInit() {
    this.form = this.formBuilder.group({
      phone: ["", [Validators.required]],
      address: ["", Validators.required],
      date: ["", Validators.required],
      hours: ["", Validators.required],
      frequency: ["", Validators.required]
    });
  }
  get phone() {
    return this.form.get("phone");
  }

  get address() {
    return this.form.get("address");
  }

  get date() {
    return this.form.get("date");
  }

  get hours() {
    return this.form.get("hours");
  }
  get frequency() {
    return this.form.get("frequency");
  }
  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
