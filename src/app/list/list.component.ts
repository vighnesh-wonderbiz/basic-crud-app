import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import User from '../models/user.model';
import Query from '../models/query.model';
import Gender from '../models/gender.model';
import { UserService } from '../services/user.service';
import { GenderService } from '../services/gender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(
    private userService: UserService,
    private genderService: GenderService,
    private router: Router
  ) {}

  // user object
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

  allUsers: User[] = [];
  genders: Gender[] = [];

  ngOnInit(): void {
    this.fetchAllUsers(this.query);
    this.genderService.getGenders().subscribe((data) => {
      this.genders = data;
    });
  }
  changePage(e: any) {
    this.query.start = e;
    this.fetchAllUsers(this.query);
  }
  // helper to fetch users
  fetchAllUsers(query: Query): void {
    this.userService.getUser(query).subscribe((data) => {
      this.query.count = data.count;
      this.allUsers = data.users;
    });
  }

  // pagination
  onPageChange(e: number) {
    this.query.start = e;
    this.fetchAllUsers(this.query);
  }

  // gender filter
  updateFilter(gender: string): void {
    this.fetchAllUsers(this.query);
  }
  // search query
  searchQuery(): void {
    this.fetchAllUsers(this.query);
    this.query.q = '';
  }

  // on click events
  onUpdate(id: number): void {
    this.router.navigate(['/add', id]);
  }
  onDelete(id: number): void {
    this.userService
      .deleteUser(id)
      .pipe()
      .subscribe({
        error: (err) => {},
        complete: () => {
          alert('User deleted');
          this.fetchAllUsers(this.query);
        },
      });
  }
}
