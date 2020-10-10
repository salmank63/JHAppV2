import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageBComponent } from './page-b.component';

describe('PageBComponent', () => {
  let component: PageBComponent;
  let fixture: ComponentFixture<PageBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
