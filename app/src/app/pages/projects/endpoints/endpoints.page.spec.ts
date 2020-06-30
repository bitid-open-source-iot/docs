import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEndpointsPage } from './endpoints.page';

describe('ProjectEndpointsPage', () => {
  let component: ProjectEndpointsPage;
  let fixture: ComponentFixture<ProjectEndpointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEndpointsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEndpointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
