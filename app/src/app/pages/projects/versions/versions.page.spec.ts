import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVersionsPage } from './versions.page';

describe('ProjectVersionsPage', () => {
  let component: ProjectVersionsPage;
  let fixture: ComponentFixture<ProjectVersionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectVersionsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectVersionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
