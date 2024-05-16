import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Subject, map } from "rxjs";
import { AuthService } from "./auth.service";

const URL = 'https://guitar-hero-users-default-rtdb.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class UserService {
    private usersSubject = new Subject<User[]>();

    constructor(private http: HttpClient) { }

    createAndStoreUser(user: User) {
        const userData: User = user;
        this.http.post(`${URL}/users.json`, user).subscribe(
            responseData => {
                console.log(responseData);
            }, error => {
                console.log(error.message);
            })
    }

    getUsers() {
        return this.http.get<{ [key: string]: User }>(`${URL}/users.json`).pipe(
            map(responseData => {
                const usersArray: User[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        usersArray.push({ ...responseData[key], id: key })
                    }
                }
                this.usersSubject.next(usersArray);
                return usersArray;
            })
        );
    }

    deleteUser(userId: string) {
        this.http.delete(`${URL}/users/${userId}.json`).subscribe(
            () => {
                console.log('User deleted succesfully.')
            }, error => {
                console.log(error.message);
            }
        )
    }

    getUsersSubject() {
        return this.usersSubject.asObservable();
    }
}