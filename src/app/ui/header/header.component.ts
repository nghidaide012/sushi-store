import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navContent: { title: string; link: string }[] = [];
  loginStatus!: boolean;
  isAdmin?: boolean = false
  constructor(private auth: AuthService){
  }
  async ngOnInit() {

    this.auth.loginStatus$.subscribe({next: (res) => {this.loginStatus = res; this.checklogin(); console.log(this.loginStatus); }})
    this.checkAdmin()
  }

  async checkAdmin()
  {
    this.auth.getAdmin(await this.auth.getuserId().then((user) => { return user; })).subscribe({next: (res) =>{this.isAdmin = !!res; this.checklogin()}})
  }
  checklogin()
  {
    this.navContent = [
      {
        title: "MENU",
        link: "/",
      }
    ];
    if(!this.loginStatus)
    {
      this.navContent.push({
        title: "LOG IN / SIGN UP",
        link: "/auth"
      })
    }
    else
    {
      if(this.isAdmin)
    {
      this.navContent.push(
        {
          title: "ADMIN",
          link: "/admin"
        }
      )
    }
      this.navContent.push(
        {
          title: "ORDERS",
          link: "/order",
        },
        {
          title: "LOGOUT",
          link: ""
        }
      )
      
      
    }

  }
  checkLogout(item: any) {
    if(item.title === "LOGOUT")
    {
      this.auth.logout();     
      this.checklogin()
    }
  }
}
