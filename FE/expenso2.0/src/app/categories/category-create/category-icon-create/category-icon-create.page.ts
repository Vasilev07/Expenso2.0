import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { CategoryIconService } from "../services/category-icon.service";
import { categoryIcons, ICategoryIcons } from "./category-icons";

@Component({
  templateUrl: './category-icon-create.page.html'
})
export class CategoryIconCreatePage {
  public readonly icons: ICategoryIcons[] = categoryIcons;

  public constructor(private readonly categoryIconService: CategoryIconService,
    private navCtrl: NavController) {
  }

  public onIconSelected(icon: ICategoryIcons): void {
    this.categoryIconService.iconSelected.next(icon);

    this.navCtrl.back();
  }

  public onCancelClick(): void {
    this.navCtrl.back();
  }
}
