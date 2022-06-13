import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'

import { AuthenticationService } from './authentication.service';
import { RegisterUserDTO } from './DTO/registerUserDTO';
import { SuccessRegisterUserMockResponse } from '../__mocks__/registerUserMocks';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    httpClient = TestBed.inject(HttpTestingController)
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    httpClient.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request in register', (done: DoneFn) => {
    const url = 'http://localhost:3000/api/v1/auth/register'

    service.register('david', 'david@mail.com', '12345678').subscribe(() => {
      done()
    })

    const req: TestRequest = httpClient.expectOne(url)

    expect(req.request.urlWithParams).toEqual(url);
    expect(req.request.method).toEqual('POST');

    req.flush({});
  })

  it('should return a valid response when make a request', (done: DoneFn) => {
    const url = 'http://localhost:3000/api/v1/auth/register'

    service.register('david', 'david@mail.com', '12345678').subscribe((res: RegisterUserDTO) => {
      expect(res.message).toBeTruthy()
      expect(res.success).toBeTruthy()
      done()
    })

    httpClient.expectOne(url).flush(SuccessRegisterUserMockResponse);
  })
});
