import { ModuleWithProviders, NgModule } from '@angular/core';
import { GtagConfig } from './interfaces';
import { GtagEventDirective } from './gtag-event.directive';
import { GtagService } from './gtag.service';


@NgModule({
  declarations: [GtagEventDirective],
  exports: [GtagEventDirective]
})
export class GtagModule {
  public static forRoot(config: GtagConfig): ModuleWithProviders<GtagModule> {
    return {
      ngModule: GtagModule,
      providers: [GtagService, { provide: 'config', useValue: config }]
    };
  }
}