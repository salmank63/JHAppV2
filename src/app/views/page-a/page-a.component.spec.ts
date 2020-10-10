import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageAComponent } from './page-a.component';

describe('PageAComponent', () => {
  let component: PageAComponent;
  let fixture: ComponentFixture<PageAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
