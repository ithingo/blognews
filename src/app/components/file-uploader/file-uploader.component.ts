import {NgModule, Component, Output, ElementRef, forwardRef, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  template:  `
                <div class="fileUpload btn btn-primary">
                    <input type="file" class="upload" accept="image/*" (change)="changeListener($event)">
                </div>`,
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploaderComponent),
    multi: true
  }
],
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  private _image: any = null;

  @Output()
  imageUploaded: EventEmitter<any> = new EventEmitter();

  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const imageFileReader: FileReader = new FileReader();

    imageFileReader.onloadend = event => {
      this._image = imageFileReader.result;
      this.imageUploaded.emit(this._image);
    }

    imageFileReader.readAsDataURL(file);
  }
}

@NgModule({
  declarations: [
    FileUploaderComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FileUploaderComponent,
  ]
})
export class FileUploadModule { }
