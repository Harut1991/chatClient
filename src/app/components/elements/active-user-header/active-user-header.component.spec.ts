import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserHeaderComponent } from './active-user-header.component';

describe('ActiveUserHeaderComponent', () => {
  let component: ActiveUserHeaderComponent;
  let fixture: ComponentFixture<ActiveUserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
