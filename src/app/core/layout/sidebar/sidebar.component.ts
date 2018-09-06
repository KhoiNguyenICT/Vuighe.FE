import { Component, OnInit, AfterViewInit } from '@angular/core'
declare var $: any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let menu_timer
    $('.menu-activated-on-hover').on('mouseenter', 'ul.main-menu > li.has-sub-menu', function () {
      const $elem = $(this)
      clearTimeout(menu_timer)
      $elem.closest('ul').addClass('has-active').find('> li').removeClass('active')
      $elem.addClass('active')
    })

    $('.menu-activated-on-hover').on('mouseleave', 'ul.main-menu > li.has-sub-menu', function () {
      const $elem = $(this)
      menu_timer = setTimeout(function () {
        $elem.removeClass('active').closest('ul').removeClass('has-active')
      }, 30)
    })

    // INIT MENU TO ACTIVATE ON CLICK
    $('.menu-activated-on-click').on('click', 'li.has-sub-menu > a', function (event) {
      const $elem = $(this).closest('li')
      if ($elem.hasClass('active')) {
        $elem.removeClass('active')
      } else {
        $elem.closest('ul').find('li.active').removeClass('active')
        $elem.addClass('active')
      }
      return false
    })
  }

}
