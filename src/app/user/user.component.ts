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
  genderObj: { [key: number]: string } = {};

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

  ngOnInit(): void {
    this.genderService.getGenders().subscribe((data) => {
      this.genders = data;
      this.genders.forEach((g) => {
        this.genderObj[g.genderId] = g.genderName;
      });
    });
    this.route.params.subscribe((d) => {
      var id = d['id'];
      this.user.userId = id;
      if (id != null || id != undefined) {
        this.userService.getUserById(this.user.userId).subscribe((data) => {
          this.user = data;
          Object.keys(this.genderObj).forEach((g) => {
            if (this.genderObj[+g] == this.user.gender) {
              this.user.genderId = +g;
            }
          });
        });
      }
    });
  }
  // click event
  onSave(): void {
    const { name, email, isActive, genderId } = this.user;
    const err = [
      { value: name, name: 'Name' },
      { value: email, name: 'Email' },
      { value: isActive, name: 'Active status' },
      { value: genderId, name: 'Gender' },
    ];

    const errArr: string[] = [];
    err.forEach((e) => {
      if (!e.value || e.value == 0) {
        errArr.push(e.name);
      }
    });

    if (errArr.length != 0) {
      return alert(`Please ${errArr.join(', ')} values`);
    }

    if (this.user.userId != 0) {
      this.updateUser(this.user.userId);
    } else {
      this.saveUser();
    }
    this.setDefaultUser();
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
          // {"headers":{"normalizedNames":{},"lazyUpdate":null},"status":400,"statusText":"Bad Request","url":"http://localhost:5029/api/user/undefined","ok":false,"name":"HttpErrorResponse","message":"Http failure response for http://localhost:5029/api/user/undefined: 400 Bad Request","error":{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.1","title":"One or more validation errors occurred.","status":400,"errors":{"id":["The value 'undefined' is not valid."]},"traceId":"00-5350768a6e789c32d61d14f40583ec09-ad45a0d9b4e22335-00"}}
          alert(e.status == 400 ? 'Email already exists' : e.message);
        },
        complete: () => {
          alert('User created!');
        },
      });
  }
  updateUser(id: number): void {
    const err = [
      { value: this.user.name, name: 'Name' },
      { value: this.user.email, name: 'Email' },
      { value: this.user.isActive, name: 'Active status' },
      { value: this.user.genderId, name: 'Gender' },
    ];

    const errArr: string[] = [];
    err.forEach((e) => {
      if (!e.value || e.value == 0) {
        errArr.push(e.name);
      }
    });

    if (errArr.length != 0) {
      return alert(`Please ${errArr.join(', ')} values`);
    }
    this.userService
      .updateUser(id, this.user)
      .pipe()
      .subscribe({
        error: (e) => {
          alert(JSON.stringify(e));
        },
        complete: () => {
          alert('User updated!');
        },
      });
  }
}
