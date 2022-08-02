import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";

@NgModule({
  imports: [
    // ...
    // Your routing module for the feature module should be imported here:
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule {}
