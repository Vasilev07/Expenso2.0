import { Component, OnInit } from "@angular/core";
import { CategoryIcon } from "./category-icons.enum";

@Component({
    templateUrl: 'category-create.page.html',
})
export class CategoryCreatePage implements OnInit {
   public categoryIcons: string[];

    public ngOnInit(): void {
        this.categoryIcons = Object.keys(CategoryIcon).filter(key => CategoryIcon[key]);
        console.log(this.categoryIcons);
    }

    prepareImageSelector() {
        setTimeout(() => {
            let buttonElements = document.querySelectorAll('div.alert-radio-group button');
            if (!buttonElements.length) {
                this.prepareImageSelector();
            } else {
                for (let index = 0; index < buttonElements.length; index++) {
                    let buttonElement = buttonElements[index];
                    let optionLabelElement = buttonElement.querySelector('.alert-radio-label');
                    let image = optionLabelElement.innerHTML.trim();
                    buttonElement.classList.add('imageselect', 'image_' + image);
                    if (image == this.image) {
                        buttonElement.classList.add('imageselected');
                    }
                }
            }
        }, 100);
}