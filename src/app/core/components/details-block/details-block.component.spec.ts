import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBlockComponent } from './details-block.component';

describe('DetailsBlockComponent', () => {
  let component: DetailsBlockComponent;
  let fixture: ComponentFixture<DetailsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
