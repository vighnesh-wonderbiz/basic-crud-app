import { Component, CSP_NONCE } from '@angular/core';
import User from '../models/user.model';
import { UserService } from '../services/user.service';
import { GenderService } from '../services/gender.service';
import Gender from '../models/gender.model';
import Query from '../models/query.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  genders: Gender[] = [];
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

  isUpdate: boolean = false;

  ngOnInit(): void {
    this.genderService.getGenders().subscribe((data) => {
      this.genders = data;
    });
    this.route.params.subscribe((d) => {
      const id = d['id'];
      if (id) {
        this.user.userId = id;
        if (id != null || id != undefined) {
          this.userService.getUserById(this.user.userId).subscribe((data) => {
            this.user = data;
          });
        }
      }
    });
  }
  // click event
  onSave(): void {
    this.isValid();
    if (this.isUpdate) {
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
          alert(e.status == 400 ? 'Email already exists' : e.message);
        },
        complete: () => {
          alert('User created!');
          this.router.navigate(['/']);
        },
      });
  }
  updateUser(id: number): void {
    this.userService
      .updateUser(id, this.user)
      .pipe()
      .subscribe({
        error: (e) => {
          alert(e.status == 400 ? 'Email already exists' : e.message);
        },
        complete: () => {
          alert('User updated!');
          this.router.navigate(['/']);
        },
      });
  }

  isValid = (): string[] => {
    const errArr: string[] = [];
    const err = [
      { value: this.user.name, name: 'Name' },
      { value: this.user.email, name: 'Email' },
      { value: this.user.genderId, name: 'Gender' },
    ];
    err.forEach((e) => {
      if (!e.value || e.value == 0) {
        errArr.push(e.name);
      }
    });
    return errArr;
  };
}
