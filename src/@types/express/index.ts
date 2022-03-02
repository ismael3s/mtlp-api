interface Customer {
    id: string;
    name: string;
    email: string;
    role: string;
}

declare namespace  Express {
    export interface Request {
        customer: Customer;
    }
}