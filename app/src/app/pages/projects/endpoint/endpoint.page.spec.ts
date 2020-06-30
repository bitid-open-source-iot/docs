import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEndpointPage } from './endpoint.page';

describe('ProjectEndpointPage', () => {
  let component: ProjectEndpointPage;
  let fixture: ComponentFixture<ProjectEndpointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEndpointPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEndpointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
