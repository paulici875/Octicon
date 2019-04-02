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
  @Output() openReservationModal = new EventEmitter();
  private userService: UserService;

  public currentUserType: string;
  public typeU = UserType;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.currentUserType = this.userService.getCurrentUserType();
    // console.log(this.currentUserType);
  }

  onOpenReservationModal(event) {
    this.openReservationModal.emit(event);
  }
}
