import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcfComponent } from './ucf.component';

describe('UcfComponent', () => {
  let component: UcfComponent;
  let fixture: ComponentFixture<UcfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UcfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UcfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
