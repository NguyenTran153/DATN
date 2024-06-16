interface Patient {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    phoneNumber: string;
    avatar: string | null;
    gender: string | null;
    birthdate: string | null;
    address: string | null;
    height: number | null;
    weight: number | null;
    firstName: string;
    lastName: string;
    role: string;
  }