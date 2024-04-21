import { TestBed } from '@angular/core/testing';

import { ConnexionFormService } from './connexion-form.service';

describe('ConnexionFormService', () => {
  let service: ConnexionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnexionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
