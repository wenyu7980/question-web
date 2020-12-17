import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NzButtonModule, NzDividerModule, NzInputModule, NzInputNumberModule, NzRadioModule, NzSwitchModule} from 'ng-zorro-antd';
import {NzSpaceModule} from 'ng-zorro-antd/space';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzRadioModule,
    NzButtonModule,
    NzSpaceModule,
    NzInputNumberModule,
    NzInputModule,
    NzDividerModule,
    NzSwitchModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
