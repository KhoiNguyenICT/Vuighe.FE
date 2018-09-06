import { Component, OnInit, Renderer2, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private bodyClassName = 'menu-position-side menu-side-left full-screen'

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setProperty(this.document.body, 'className', this.bodyClassName)
  }

}
