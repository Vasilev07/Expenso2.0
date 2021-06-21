import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;

  constructor(private readonly rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private readonly document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public enableDarkMode(): void {
    this.renderer.addClass(this.document.body, 'dark');
  }

  public enableLightMode(): void {
    this.renderer.removeClass(this.document.body, 'dark');
  }
}
