import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaguetteItemComponent } from './baguette-item.component';

describe('BaguetteItemComponent', () => {
  let component: BaguetteItemComponent;
  let fixture: ComponentFixture<BaguetteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaguetteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaguetteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
