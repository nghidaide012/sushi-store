import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  loginStatusSub = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatusSub.asObservable();
  constructor(private router: Router, private auth: Auth, private db: Firestore) {

    if(localStorage.getItem('token'))
    {
      this.token = localStorage.getItem('token');
      this.loginStatusSub.next(true);
    }
   }


  signUp(email: string, password: string): Promise<string>
  {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      return 'success'
    })
      .catch(error => {
        console.log(error)
        return error
      })
  }

  login(email: string, password: string)
  {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      return this.auth.currentUser?.getIdToken()
      .then((token: string) => {
        this.token = token;
        localStorage.setItem('token', token);
        this.loginStatusSub.next(true);
        return true;
      })
    })
    .catch((error) => {
      console.log(error)
      this.loginStatusSub.next(false);
      return false;
    })
  }

  logout(): void{
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.loginStatusSub.next(false);
    this.router.navigate(['/']);
  }

  getuserId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  }

  getAdmin(uid: string | null)
  {
    return docData(
      doc(this.db, '/administrators/' + uid) as DocumentReference
    )
  }
}
