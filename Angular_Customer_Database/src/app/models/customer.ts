export interface Customer {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    newsletter: boolean;

    isVIP?: boolean;  // Not stored in database!!
}
