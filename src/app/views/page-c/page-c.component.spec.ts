import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageCComponent } from './page-c.component';

describe('PageCComponent', () => {
  let component: PageCComponent;
  let fixture: ComponentFixture<PageCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
