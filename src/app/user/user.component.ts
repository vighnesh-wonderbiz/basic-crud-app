import { Component } from '@angular/core';
import User from '../models/user.model';
import { UserService } from '../services/user.service';
import { GenderService } from '../services/gender.service';
import Gender from '../models/gender.model';
import Query from '../models/query.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private genderService: GenderService,
    private route: ActivatedRoute
  ) {}

  genders: Gender[] = [];

  allUsers: User[] = [];

  user: User = {
    userId: 0,
    name: '',
    email: '',
    isActive: false,
    gender: '',
    genderId: 0,
    createdDate: new Date(),
    createdBy: 1,
  };

  query: Query = {
    start: 1,
    limit: 5,
    q: '',
    filter: '',
    count: 5,
  };

  // event from children
  getUserFromList(user: User): void {
    this.user = user;
  }
  getQueryParams(query: Query): void {
    this.query = query;
  }

  ngOnInit(): void {
    this.route.params.subscribe((d) => {
      this.user.userId = d['id'];
      if (this.user.userId != null || this.user.userId != 0) {
        this.userService.getUserById(this.user.userId).subscribe((data) => {
          this.user = data;
        });
      }
    });
    this.genderService.getGenders().subscribe((data) => {
      this.genders = data;
    });
  }
  // click event
  onSave(): void {
    if (this.user.userId != 0) {
      this.updateUser(this.user.userId);
    } else {
      this.saveUser();
    }
    this.setDefaultUser();
  }

  // helper functions
  fetchAllUsers(start: number, limit: number, q: string, filter: string): void {
    this.userService.getUser(start, limit, q, filter).subscribe((data) => {
      this.allUsers = data;
    });
  }
  setDefaultUser(): void {
    this.user.userId = 0;
    this.user.name = '';
    this.user.email = '';
    this.user.isActive = false;
    this.user.gender = '';
    this.user.genderId = 0;
    this.user.createdDate = new Date();
    this.user.createdBy = 1;
  }

  saveUser(): void {
    this.userService
      .createUser(this.user)
      .pipe()
      .subscribe({
        next: (response) => {},
        error: (e) => {
          alert(JSON.stringify(e));
        },
        complete: () => {
          this.fetchAllUsers(
            this.query.start,
            this.query.limit,
            this.query.q,
            this.query.filter
          );
        },
      });
  }
  updateUser(id: number): void {
    this.userService
      .updateUser(id, this.user)
      .pipe()
      .subscribe({
        error: (e) => {
          alert(JSON.stringify(e));
        },
        complete: () => {
          this.fetchAllUsers(
            this.query.start,
            this.query.limit,
            this.query.q,
            this.query.filter
          );
        },
      });
  }
}
