import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  routeContent: string = ''
  navContent: {title: string, link:string}[] = [
    {
      title: "Products",
      link: '/admin/products'
    },
    {
      title: "Categories",
      link: "/admin/categories"
    },
    {
      title: "Orders",
      link: "/admin/orders"
    }
  ]
  constructor(){}
  ngOnInit(): void {
    
  }
}
