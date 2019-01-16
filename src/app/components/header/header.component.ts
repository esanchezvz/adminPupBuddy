import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private login: LoginService) {
    document.addEventListener("DOMContentLoaded", function () {

      // Vertically spread sidenav items evenly
      var sideNav = document.getElementById("sideNav");

      var navElm = document.getElementsByClassName("navItem") as HTMLCollectionOf<HTMLElement>;
      // var navHeight = sideNav.offsetHeight;

      function sideNavHeight() {
        var navHeight = sideNav.offsetHeight;
        if (navHeight <= 450) {
          sideNav.classList.add("scrollable");
          for (var i = 0; i < navElm.length; i++) {
            navElm[i].style.height = 65 + "px";
          }
        } else {
          sideNav.classList.remove("scrollable");
          for (var i = 0; i < navElm.length; i++) {
            navElm[i].style.height = navHeight / 10 + "px";
          }
        }
      }

      sideNavHeight();
      window.addEventListener('resize', sideNavHeight);

      // Menu Toggle
      var menuIcon = document.querySelector(".menuIcon");
      var sideNav = document.querySelector(".sideNav-wrapper") as HTMLElement;
      var navTitle = document.querySelectorAll(".navTitle");
      var main = document.getElementById("content-wrapper");

      menuIcon.addEventListener("click", function () {
        menuIcon.classList.toggle("open");
        sideNav.classList.toggle("open");

        for (var i = 0; i < navTitle.length; i++) {
          navTitle[i].classList.toggle("open");
        }

        if (this.className.match(/\bopen\b/)) {
          this.innerHTML = "close";
          main.style.marginLeft = "242px";
        } else {
          this.innerHTML = "menu";
          main.style.marginLeft = "50px";
        }
      });
    });
  }

  logMeOut() {
    this.login.logOut()
  }

  ngOnInit() {

  }

}
