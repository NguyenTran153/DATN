interface UserData {
  address: string | null;
  avatar: string | null;
  birthdate: string | null;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string | null;
  height: number | null;
  id: number;
  lastName: string;
  phoneNumber: string;
  role: string;
  updatedAt: string;
  weight: number | null;
}

interface PayloadToken {
  id: number;
  role: string;
}
