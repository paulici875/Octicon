import { UserType } from "./../../models/type.enums";
import { UserService } from "src/app/services/user.service";
import { Component, Input, HostListener, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() address: string;
  @Input() emptySpotsCount: number;
  @Input() currentUserType: string;
  @Output() openReservationModal = new EventEmitter();

  private userService: UserService;
  public typeU = UserType;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {}

  onOpenReservationModal(event) {
    this.openReservationModal.emit(event);
  }
}
