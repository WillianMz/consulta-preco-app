import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtiquetaPrecoFormPage } from './etiqueta-preco-form.page';

describe('EtiquetaPrecoFormPage', () => {
  let component: EtiquetaPrecoFormPage;
  let fixture: ComponentFixture<EtiquetaPrecoFormPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetaPrecoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaPrecoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
