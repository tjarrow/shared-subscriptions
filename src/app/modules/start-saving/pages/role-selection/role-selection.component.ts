import { Component, OnInit } from '@angular/core';
import { UserRole } from '@core/models/user-role.model';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss'],
})
export class RoleSelectionComponent implements OnInit {
  public userRole = UserRole;

  constructor() {}

  ngOnInit(): void {}
}
