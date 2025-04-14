<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>G-Analysis</title>
        <link rel="shortcut icon" type="image/x-icon" href="{{ asset('/assets/images/favicon.png') }}">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"/>
    <!-- Bootstrap CSS -->
    <link href="{{ asset('/assets/css/bootstrap.css') }}" rel="stylesheet" />
    <!-- custom style CSS -->
    <link href="{{ asset('/assets/css/style.css') }}" rel="stylesheet" />
    <!-- ---------icons----- -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"/>
    </head>
    <body>
    <header class="gp-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between">
            <a href="#" class="logo"><img src="{{ asset('/assets/images/logo.png') }}" class="img-fluid" alt="logo"></a>
            <span><img src="{{ asset('/assets/images/g_analysis.png') }}" class="" alt="g-analysis"></span>
      </div>
      </div>
    </header>
    <section class="gp-banner position-absolute top-0 pt-5">
       <div class="container d-flex flex-column justify-content-between h-100">
        <div class="row mt-5">
          <div class="col-lg-4">
            <span><img src="{{ asset('/assets/images/firstimg.jpg') }}" class="img-fluid gpsum-img" alt="g-analysis"></span>
          </div>
          <div class="col-lg-4">
            <span><img src="{{ asset('/assets/images/secondimg.jpg') }}" class="img-fluid gpsum-img" alt="g-analysis"></span>
          </div>
          <div class="col-lg-4">
            <span><img src="{{ asset('/assets/images/thirdimg.jpg') }}" class="img-fluid gpsum-img" alt="g-analysis"></span>
          </div>
        </div>
            <h1 class="gp-heading text-center">Willkommen bei Gipscomm-Analysis.</h1>
            <div class="gp-btn d-flex justify-content-center">
              <button type="button" class="btn yellow-btn" data-bs-toggle="modal" data-bs-target="#LoginModal">Einloggen</button>
              <button type="button" class="btn yellow-btn" data-bs-toggle="modal" data-bs-target="#DemoModal">Demo</button>
            </div>
        </div>
        
       </div>
    </section>

    <div class="modal fade" id="LoginModal" tabindex="-1" aria-labelledby="LoginModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header py-4">
            <h5 class="modal-title text-left text-white fw-bold fs-4" id="exampleModalLabel">Login</h5>            
          </div>
          <div class="modal-body">
                <form method="POST" action="{{ route('login.custom') }}">
                    @csrf
                    <div class="form-group mb-3">
                        <input type="text" placeholder="Username" id="username" class="form-control" name="username" required
                            autofocus>
                        @if ($errors->has('username'))
                        <span class="text-danger">{{ $errors->first('username') }}</span>
                        @endif
                    </div>
                    <div class="form-group mb-3">
                        <input type="password" placeholder="Password" id="password" class="form-control" name="password" required>
                        @if ($errors->has('password'))
                        <span class="text-danger">{{ $errors->first('password') }}</span>
                        @endif
                    </div>
                    <div class="form-group mb-3">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="remember"> Remember Me
                            </label>
                        </div>
                    </div>
                    <div class="d-grid mx-auto">
                        <!-- <button type="submit" class="btn btn-dark btn-block">Signin</button> -->
                        <button type="submit" class="btn btn-primary d-flex mx-auto yellow-smbtn">Login</button>
                    </div>
                </form>


            <!-- <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username <span>*</span></label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password <span>*</span></label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>              
              <button type="submit" class="btn btn-primary d-flex mx-auto yellow-smbtn">Login</button>
            </form> -->
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="DemoModal" tabindex="-1" aria-labelledby="DemoModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <p>Um Ihnen einen Demozugang zur VerfÃ¼gung stellen zu kÃ¶nnen schicken Sie uns eine E-mail an die unten angegebene Adresse oder fÃ¼llen Sie das folgende Formular aus und bestÃ¤tigen mit dem "Absenden" Knopf.</p>
            <p class="my-4">info@energie-gipscomm.de</p>
            <form>
              <div class="mb-3 w-25">
                <label for="exampleInputEmail1" class="form-label">Anrede <span>*</span></label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Vorname <span>*</span>:</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nachname <span>*</span>:</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Firma <span>*</span>:</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">E-mail <span>*</span>wenn mehrere durch Komma trennen</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mitteilung:</label>
                <textarea class="form-control" id="floatingTextarea2" style="height: 130px"></textarea>
              </div>              
              <button type="submit" class="btn btn-primary d-flex mx-auto yellow-smbtn">Absenden</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"></script>
    </body>
</html>
