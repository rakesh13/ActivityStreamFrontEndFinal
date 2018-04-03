/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkspaceusersService } from './workspaceusers.service';

describe('WorkspaceusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceusersService]
    });
  });

  it('should ...', inject([WorkspaceusersService], (service: WorkspaceusersService) => {
    expect(service).toBeTruthy();
  }));
});
