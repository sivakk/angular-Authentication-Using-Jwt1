import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBuilderComponent } from './student-builder.component';

describe('StudentBuilderComponent', () => {
  let component: StudentBuilderComponent;
  let fixture: ComponentFixture<StudentBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
