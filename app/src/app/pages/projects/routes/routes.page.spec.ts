import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRoutesPage } from './routes.page';

describe('ProjectRoutesPage', () => {
  let component: ProjectRoutesPage;
  let fixture: ComponentFixture<ProjectRoutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRoutesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
