import {NgModule} from "@angular/core";
import {FileSizePipe} from "./file-size/file-size.pipe";

@NgModule({
  declarations: [
    FileSizePipe
  ],
  exports: [
    FileSizePipe
  ],
})
export class PipesModule { }
