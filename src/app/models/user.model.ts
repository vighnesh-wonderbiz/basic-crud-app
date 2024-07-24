interface User {
  userId: number;
  name: string;
  email: string;
  isActive: boolean;
  gender: string;
  genderId: number;
  createdDate: Date;
  createdBy: number;
}

export default User;
